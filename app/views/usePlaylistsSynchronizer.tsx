import React from 'react';
import SpotifyApi from 'spotify-web-api-js';
import Context from '../store/context';
import { pushSpotifyErrorNotification, pushSpotifySuccessNotification, pushYoutubeErrorNotification, pushYoutubeSuccessNotification } from '../store/types/notifications_actions';
import { Playlists } from '../youtubeApi/youtube-api-playlists';
import { Playlist, PlaylistItem } from '../youtubeApi/youtube-api-models';
import { PlaylistItems } from '../youtubeApi/youtube-api-playlistItems';
import { ILoad } from '../store/state';
import { IMyPlaylists, IYoutubeMonthPlaylist } from '../interfaces/synchronizeInterfaces';
import logger from './utils/logger';

interface IYoutubePlaylists extends ILoad {
    playlists: Playlist[];
}

interface ISpotifyPlaylists extends ILoad {
    playlists: globalThis.SpotifyApi.PlaylistObjectSimplified[];
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const usePlaylistsSynchronizer = () => {

    /// ###### ///
    /// STATES ///
    /// ###### ///
    const { state, dispatch } = React.useContext(Context);
    const { log } = logger();
    const [initMerge, setInitMerge] = React.useState<boolean>(true);
    const [myPlaylist, setMyPlaylist] = React.useState<IMyPlaylists>({
        loaded: false,
        loading: false,
        playlists: []
    });
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

    /// ######### ///
    /// CALLBACKS ///
    /// ######### ///
    const fetchFavoritePlaylistItems = React.useCallback(async (pageToken: string | undefined = undefined) => {
        try {
            setMyPlaylist((previous) => ({
                ...previous,
                loading: true,
                loaded: false
            }));

            const playlistItemsResponse = await new PlaylistItems(state.youtubeState.credential.accessToken).list({
                playlistId: state.youtubeState.userProfile.favoritePlaylistId,
                part: ['snippet', 'contentDetails'],
                maxResults: 50,
                pageToken
            });
            if (playlistItemsResponse && playlistItemsResponse.items && playlistItemsResponse.pageInfo?.totalResults) {

                setMyPlaylist((prev) => {
                    const copy = { ...prev };

                    let year: number | undefined;
                    let month: number | undefined;
                    let items: PlaylistItem[] = [];

                    if (playlistItemsResponse && playlistItemsResponse.items && playlistItemsResponse.pageInfo?.totalResults) {
                        for (let index = 0; index < playlistItemsResponse.items.length; index += 1) {
                            const item = playlistItemsResponse.items[index];

                            if (item.snippet?.publishedAt) {
                                const date = new Date(item.snippet?.publishedAt);
                                const currentYear = date.getFullYear();
                                const currentMonth = date.getMonth() + 1;

                                if (!year || !month) {
                                    year = date.getFullYear();
                                    month = date.getMonth() + 1;
                                    items.push(item);
                                } else if (currentYear > year || (currentYear === year && currentMonth >= month)) {
                                    // if (year == currentYear && month == currentMonth) {
                                    items.push(item);
                                } else {
                                    // eslint-disable-next-line @typescript-eslint/no-loop-func
                                    const playlist = copy.playlists.find(p => p.year === year && p.month === month);
                                    if (playlist) {
                                        items.forEach(i => playlist.favoriteitems.push(i));
                                    } else {
                                        copy.playlists.push({
                                            year,
                                            month,
                                            title: `Playlist ${year} - ${(month < 10) ? '0' : ''}${month}`,
                                            favoriteitems: items,
                                        })
                                    }

                                    year = currentYear;
                                    month = currentMonth;
                                    items = [item];
                                }
                            }
                        }
                    }

                    return copy;
                });

                // // todo => removed in production mode
                // const lastItem = playlistItemsResponse.items[playlistItemsResponse.items.length - 1];
                // if (lastItem.snippet?.publishedAt) {
                //     const date = new Date(lastItem.snippet?.publishedAt);
                //     const currentYear = date.getFullYear();

                //     const limitYear = 2021;

                //     if (currentYear < limitYear) {
                //         playlistItemsResponse.nextPageToken = undefined;
                //     }
                // }

                if (playlistItemsResponse.nextPageToken) {
                    setfavoritepageToken(playlistItemsResponse.nextPageToken);
                } else {
                    setfavoritepageToken(undefined);
                    setMyPlaylist((previous) => ({
                        ...previous,
                        loading: false,
                        loaded: true
                    }));
                }
            }
        } catch (e) {
            setMyPlaylist((previous) => ({
                ...previous,
                loading: false,
                loaded: false
            }));
            dispatch(pushYoutubeErrorNotification(e));
        }
    }, [dispatch, state.youtubeState.credential.accessToken, state.youtubeState.userProfile.favoritePlaylistId]);

    const fetchYoutubePlaylists = React.useCallback(async (pageToken: string | undefined = undefined) => {
        try {
            if (pageToken) {
                setYoutubePlaylists((prev) => ({
                    ...prev,
                    loading: true,
                    loaded: false
                }));
            } else {
                setYoutubePlaylists((prev) => ({
                    ...prev,
                    loading: true,
                    loaded: false,
                    playlists: []
                }));
            }

            const response = await new Playlists(state.youtubeState.credential.accessToken).list({
                channelId: state.youtubeState.userProfile.channelId,
                part: ['snippet', 'contentDetails'],
                maxResults: 50,
                pageToken
            });
            if (response && response.items) {

                const filteredPlaylists = response.items.filter(i => i.snippet?.title && matchPlaylistName(i.snippet?.title));

                setYoutubePlaylists((prev) => ({
                    ...prev,
                    playlists: [
                        ...prev.playlists,
                        ...filteredPlaylists
                    ],
                }));

                if (response.nextPageToken) {
                    setYoutubePlaylistsPageToken(response.nextPageToken);
                } else {
                    setYoutubePlaylistsPageToken(undefined);
                    setYoutubePlaylists((prev) => ({
                        ...prev,
                        loading: false,
                        loaded: true
                    }));
                }
            }
        } catch (e) {
            setYoutubePlaylists((prev) => ({
                ...prev,
                loading: false,
                loaded: false
            }));
            dispatch(pushYoutubeErrorNotification(e));
        }
    }, [dispatch, state.youtubeState.credential.accessToken, state.youtubeState.userProfile.channelId]);

    const fetchSpotifyPlaylists = React.useCallback(async (offset: number | undefined = undefined) => {
        try {
            setSpotifyPlaylists((prev) => ({
                ...prev,
                loading: true,
                loaded: false
            }));

            const spotifyApi = new SpotifyApi();
            spotifyApi.setAccessToken(state.spotifyState.credential.accessToken);

            const limit = 50;
            // eslint-disable-next-line @typescript-eslint/ban-types
            let options: Object;
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
            const response = await spotifyApi.getUserPlaylists(
                state.spotifyState.userProfile.id, options
            );
            if (response) {

                const filteredPlaylists = response.items.filter(i => matchPlaylistName(i.name));

                setSpotifyPlaylists((prev) => ({
                    ...prev,
                    playlists: [
                        ...prev.playlists,
                        ...filteredPlaylists
                    ]
                }));

                if (response.next === null) {
                    setSpotifyPlaylistsOffset(undefined);
                    setSpotifyPlaylists((prev) => ({
                        ...prev,
                        loading: false,
                        loaded: true
                    }));
                } else {
                    setSpotifyPlaylistsOffset(response.offset + limit);
                }
            }
        } catch (e) {
            setSpotifyPlaylists((prev) => ({
                ...prev,
                loading: false,
                loaded: false
            }));
            dispatch(pushSpotifyErrorNotification(e));
        }
    }, [dispatch, state.spotifyState.credential.accessToken, state.spotifyState.userProfile.id]);

    const createPlaylists = React.useCallback(async (monthPlaylist: IYoutubeMonthPlaylist) => {
        if (monthPlaylist.spotifyPlaylist === undefined) {
            try {
                const spotifyApi = new SpotifyApi();
                spotifyApi.setAccessToken(state.spotifyState.credential.accessToken);

                const options = {
                    "name": monthPlaylist.title,
                    "description": "",
                    "public": true,
                };

                const createSpotifyPlaylistResponse = await spotifyApi.createPlaylist(state.spotifyState.userProfile.id, options);
                if (createSpotifyPlaylistResponse) {
                    await fetchSpotifyPlaylists();
                    dispatch(pushSpotifySuccessNotification(`Spotify playlist '${monthPlaylist.title}' created !`));
                }
            } catch (error) {
                dispatch(pushSpotifyErrorNotification(error));
            }
        }

        if (monthPlaylist.youtubePlaylist === undefined) {
            try {
                const createYoutubePlaylistResponse = await new Playlists(state.youtubeState.credential.accessToken).insert({
                    part: ['snippet', 'contentDetails'],
                    requestBody: {
                        snippet: {
                            title: monthPlaylist.title
                        }
                    }
                });
                if (createYoutubePlaylistResponse) {
                    await fetchYoutubePlaylists();
                    dispatch(pushYoutubeSuccessNotification(`Youtube playlist '${monthPlaylist.title}' created !`));
                }
            } catch (error) {
                dispatch(pushYoutubeErrorNotification(error));
            }
        }
    }, [dispatch, fetchSpotifyPlaylists, fetchYoutubePlaylists, state.spotifyState.credential.accessToken, state.spotifyState.userProfile.id, state.youtubeState.credential.accessToken]);

    /// ####### ///
    /// EFFECTS ///
    /// ####### ///
    React.useEffect(() => {
        fetchFavoritePlaylistItems();
        fetchYoutubePlaylists();
    }, [fetchFavoritePlaylistItems, fetchYoutubePlaylists]);

    React.useEffect(() => {
        if (favoritepageToken) {
            fetchFavoritePlaylistItems(favoritepageToken);
        } else {
            log('all favorites loaded');
        }
    }, [favoritepageToken, fetchFavoritePlaylistItems, log]);

    React.useEffect(() => {
        if (youtubePlaylistsPageToken) {
            fetchYoutubePlaylists(youtubePlaylistsPageToken);
        } else {
            log('all youtube playlists loaded');
        }
    }, [youtubePlaylistsPageToken, fetchYoutubePlaylists, log]);

    React.useEffect(() => {
        fetchSpotifyPlaylists();
    }, [fetchSpotifyPlaylists]);

    React.useEffect(() => {
        if (spotifyPlaylistsOffset) {
            fetchSpotifyPlaylists(spotifyPlaylistsOffset);
        } else {
            log('all spotify playlists loaded');
        }
    }, [spotifyPlaylistsOffset, fetchSpotifyPlaylists, log]);

    React.useEffect(() => {
        if (myPlaylist.loaded && youtubePlaylists.loaded && spotifyPlaylists.loaded) {

            log('avant merge init !');

            if (initMerge) {
                log('merge playlist !');
                setInitMerge(false);

                for (let i = 0; i < myPlaylist.playlists.length; i += 1) {
                    const monthlyPlaylist = myPlaylist.playlists[i];

                    const youtubePlaylist = youtubePlaylists.playlists.find(p => p.snippet?.title === monthlyPlaylist.title);
                    const spotifyPlaylist = spotifyPlaylists.playlists.find(p => p.name === monthlyPlaylist.title);

                    setMyPlaylist((previous) => ({
                        ...previous,
                        playlists: [
                            ...previous.playlists.slice(0, i),
                            {
                                ...monthlyPlaylist,
                                spotifyPlaylist,
                                youtubePlaylist
                            },
                            ...previous.playlists.slice(i + 1),
                        ]
                    }));
                }
            }
        }
    }, [myPlaylist.loaded, youtubePlaylists.loaded, spotifyPlaylists.loaded, myPlaylist.playlists, youtubePlaylists.playlists, spotifyPlaylists.playlists, log, initMerge]);

    const matchPlaylistName = (name: string): boolean => new RegExp("Playlist [0-9]{4} - [0-9]{2}").test(name)

    return { myPlaylist, createPlaylists };
}

export default usePlaylistsSynchronizer;
