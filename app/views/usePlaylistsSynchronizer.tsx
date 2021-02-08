import React from 'react';
import Context from '../store/context';
import { pushSpotifyErrorNotification, pushSpotifySuccessNotification, pushYoutubeErrorNotification, pushYoutubeSuccessNotification } from '../store/types/notifications_actions';
import { Playlists } from '../youtubeApi/youtube-api-playlists';
import SpotifyApi from 'spotify-web-api-js';
import { IMyPlaylists, IYoutubeMonthPlaylist } from './synchronizeView';
import { Playlist, PlaylistItem } from '../youtubeApi/youtube-api-models';
import { PlaylistItems } from '../youtubeApi/youtube-api-playlistItems';
import { ILoad } from '../store/state';

export interface IYoutubePlaylists extends ILoad {
    playlists: Playlist[];
}

export interface ISpotifyPlaylists extends ILoad {
    playlists: globalThis.SpotifyApi.PlaylistObjectSimplified[];
}

const usePlaylistsSynchronizer = () => {
    const { state, dispatch } = React.useContext(Context);

    const [myPlaylist, setMyPlaylist] = React.useState<IMyPlaylists>({
        loaded: false,
        loading: false,
        playlists: []
    })
    const [favoritepageToken, setfavoritepageToken] = React.useState<string | undefined>(undefined);
    const [youtubePlaylists, setYoutubePlaylists] = React.useState<IYoutubePlaylists>({
        loaded: false,
        loading: false,
        playlists: []
    });
    const [spotifyPlaylists, setSpotifyPlaylists] = React.useState<ISpotifyPlaylists>({
        loaded: false,
        loading: false,
        playlists: []
    });
    const [youtubePlaylistsPageToken, setYoutubePlaylistsPageToken] = React.useState<string | undefined>(undefined);
    const [spotifyPlaylistsOffset, setSpotifyPlaylistsOffset] = React.useState<number | undefined>(undefined);

    const favoritePlaylistId = "FL65Vblm8jhqYm8-0QPi3Z6A";

    React.useEffect(() => {
        if (state.youtubeState.userProfile.loaded) {
            if (!myPlaylist.loaded) {
                fetchFavoritePlaylistItems();
            }

            if (!youtubePlaylists.loaded) {
                fetchYoutubePlaylists();
            }
        }
    }, [state.youtubeState.userProfile.loaded]);

    React.useEffect(() => {
        if (favoritepageToken) {
            fetchFavoritePlaylistItems(favoritepageToken);
        }
    }, [favoritepageToken]);

    React.useEffect(() => {
        if (youtubePlaylistsPageToken) {
            fetchYoutubePlaylists(youtubePlaylistsPageToken);
        }
    }, [youtubePlaylistsPageToken]);

    React.useEffect(() => {
        if (state.spotifyState.userProfile.loaded) {
            if (!spotifyPlaylists.loaded) {
                fetchSpotifyPlaylists();
            }
        }
    }, [state.spotifyState.userProfile.loaded]);

    React.useEffect(() => {
        if (spotifyPlaylistsOffset) {
            fetchSpotifyPlaylists(spotifyPlaylistsOffset);
        }
    }, [spotifyPlaylistsOffset]);

    React.useEffect(() => {
        if (myPlaylist.loaded && youtubePlaylists.loaded && spotifyPlaylists.loaded) {

            for (let i = 0; i < myPlaylist.playlists.length; i++) {
                const monthlyPlaylist = myPlaylist.playlists[i];

                const youtubePlaylist = youtubePlaylists.playlists.find(p => p.snippet?.title === monthlyPlaylist.title);
                const spotifyPlaylist = spotifyPlaylists.playlists.find(p => p.name === monthlyPlaylist.title);

                setMyPlaylist((previous) => {
                    return {
                        ...previous,
                        playlists: [
                            ...previous.playlists.slice(0, i),
                            {
                                ...monthlyPlaylist,
                                spotifyPlaylist: spotifyPlaylist,
                                youtubePlaylist: youtubePlaylist
                            },
                            ...previous.playlists.slice(i + 1),
                        ]
                    }
                });
            }
        }
    }, [myPlaylist.loaded, youtubePlaylists.loaded, spotifyPlaylists.loaded]);

    const createPlaylists = React.useCallback(async (myPlaylist: IYoutubeMonthPlaylist) => {
        if (myPlaylist.spotifyPlaylist === undefined) {
            try {
                const spotifyApi = new SpotifyApi();
                spotifyApi.setAccessToken(state.spotifyState.credential.accessToken);

                const options = {
                    "name": myPlaylist.title,
                    "description": "",
                    "public": true,
                };

                var createSpotifyPlaylistResponse = await spotifyApi.createPlaylist(state.spotifyState.userProfile.id, options);
                if (createSpotifyPlaylistResponse) {
                    fetchSpotifyPlaylists();
                    dispatch(pushSpotifySuccessNotification(`Spotify playlist '${myPlaylist.title}' created !`));
                }
            } catch (error) {
                dispatch(pushSpotifyErrorNotification(error));
            }
        }

        if (myPlaylist.youtubePlaylist === undefined) {
            try {
                var createYoutubePlaylistResponse = await new Playlists(state.youtubeState.credential.accessToken).insert({
                    part: ['snippet', 'contentDetails'],
                    requestBody: {
                        snippet: {
                            title: myPlaylist.title
                        }
                    }
                });
                if (createYoutubePlaylistResponse) {
                    fetchYoutubePlaylists();
                    dispatch(pushYoutubeSuccessNotification(`Youtube playlist '${myPlaylist.title}' created !`));
                }
            } catch (error) {
                dispatch(pushYoutubeErrorNotification(error));
            }
        }
    }, []);

    const matchPlaylistName = (name: string): boolean => {
        return new RegExp("Playlist [0-9]{4} - [0-9]{2}").test(name);
    }

    const fetchFavoritePlaylistItems = async (pageToken: string | undefined = undefined) => {
        try {
            setMyPlaylist((previous) => {
                return {
                    ...previous,
                    loading: true,
                    loaded: false
                }
            });

            var playlistItemsResponse = await new PlaylistItems(state.youtubeState.credential.accessToken).list({
                playlistId: favoritePlaylistId,
                part: ['snippet', 'contentDetails'],
                maxResults: 50,
                pageToken: pageToken
            });
            if (playlistItemsResponse && playlistItemsResponse.items && playlistItemsResponse.pageInfo?.totalResults) {

                const copy = { ...myPlaylist };

                var year: number | undefined;
                var month: number | undefined;
                var items: PlaylistItem[] = [];

                for (let index = 0; index < playlistItemsResponse.items.length; index++) {
                    const item = playlistItemsResponse.items[index];

                    if (item.snippet?.publishedAt) {
                        const date = new Date(item.snippet?.publishedAt);
                        const currentYear = date.getFullYear();
                        const currentMonth = date.getMonth() + 1;

                        if (!year || !month) {
                            year = date.getFullYear();
                            month = date.getMonth() + 1;
                            items.push(item);
                            continue;
                        }

                        if (currentYear > year || (currentYear === year && currentMonth >= month)) {
                            // if (year == currentYear && month == currentMonth) {
                            items.push(item);
                            continue;
                        }

                        const playlist = copy.playlists.find(p => p.year === year && p.month === month);
                        if (playlist) {
                            items.forEach(i => playlist.favoriteitems.push(i));
                        } else {
                            copy.playlists.push({
                                year: year,
                                month: month,
                                title: `Playlist ${year} - ${(month < 10) ? '0' : ''}${month}`,
                                favoriteitems: items,
                            })
                        }

                        year = currentYear;
                        month = currentMonth;
                        items = [item];
                    }
                }

                setMyPlaylist(copy);

                const lastItem = playlistItemsResponse.items[playlistItemsResponse.items.length - 1];

                // todo => removed in production mode
                if (lastItem.snippet?.publishedAt) {
                    const date = new Date(lastItem.snippet?.publishedAt);
                    const currentYear = date.getFullYear();

                    const limitYear = 2020;

                    if (currentYear < limitYear) {
                        playlistItemsResponse.nextPageToken = undefined;
                    }
                }

                if (playlistItemsResponse.nextPageToken) {
                    setfavoritepageToken(playlistItemsResponse.nextPageToken);
                } else {
                    setfavoritepageToken(undefined);
                    setMyPlaylist((previous) => {
                        return {
                            ...previous,
                            loading: false,
                            loaded: true
                        }
                    });
                }
            }
        } catch (error) {
            setMyPlaylist((previous) => {
                return {
                    ...previous,
                    loading: false,
                    loaded: false
                }
            });
            dispatch(pushYoutubeErrorNotification(error));
        }
    }

    const fetchYoutubePlaylists = async (pageToken: string | undefined = undefined) => {
        try {
            if (pageToken) {
                setYoutubePlaylists((prev) => {
                    return {
                        ...prev,
                        loading: true,
                        loaded: false
                    }
                });
            } else {
                setYoutubePlaylists((prev) => {
                    return {
                        loading: true,
                        loaded: false,
                        playlists: []
                    }
                });
            }

            var response = await new Playlists(state.youtubeState.credential.accessToken).list({
                channelId: state.youtubeState.userProfile.channelId,
                part: ['snippet', 'contentDetails'],
                maxResults: 50,
                pageToken: pageToken
            });
            if (response && response.items) {

                const filteredPlaylists = response.items.filter(i => i.snippet?.title && matchPlaylistName(i.snippet?.title));

                setYoutubePlaylists((prev) => {
                    return {
                        ...prev,
                        playlists: [
                            ...prev.playlists,
                            ...filteredPlaylists
                        ],
                    }
                });

                if (response.nextPageToken) {
                    setYoutubePlaylistsPageToken(response.nextPageToken);
                } else {
                    setYoutubePlaylistsPageToken(undefined);
                    setYoutubePlaylists((prev) => {
                        return {
                            ...prev,
                            loading: false,
                            loaded: true
                        }
                    });
                }
            }
        } catch (error) {
            setYoutubePlaylists((prev) => {
                return {
                    ...prev,
                    loading: false,
                    loaded: false
                }
            });
            dispatch(pushYoutubeErrorNotification(error));
        }
    }

    const fetchSpotifyPlaylists = async (offset: number | undefined = undefined) => {
        try {
            setSpotifyPlaylists((prev) => {
                return {
                    ...prev,
                    loading: true,
                    loaded: false
                }
            });

            var spotifyApi = new SpotifyApi();
            spotifyApi.setAccessToken(state.spotifyState.credential.accessToken);

            const limit = 50;
            var options: Object;
            if (offset) {
                options = {
                    "limit": limit,
                    "offset": offset,
                }
            }
            else {
                options = {
                    "limit": limit
                }
            }
            var response = await spotifyApi.getUserPlaylists(
                state.spotifyState.userProfile.id, options
            );
            if (response) {

                const filteredPlaylists = response.items.filter(i => matchPlaylistName(i.name));

                setSpotifyPlaylists((prev) => {
                    return {
                        ...prev,
                        playlists: [
                            ...prev.playlists,
                            ...filteredPlaylists
                        ]
                    }
                });

                if (response.next === null) {
                    setSpotifyPlaylistsOffset(undefined);
                    setSpotifyPlaylists((prev) => {
                        return {
                            ...prev,
                            loading: false,
                            loaded: true
                        }
                    });
                } else {
                    setSpotifyPlaylistsOffset(response.offset + limit);
                }
            }
        } catch (error) {
            setSpotifyPlaylists((prev) => {
                return {
                    ...prev,
                    loading: false,
                    loaded: false
                }
            });
            dispatch(pushSpotifyErrorNotification(error));
        }
    }

    return { myPlaylist, createPlaylists };
}

export default usePlaylistsSynchronizer
