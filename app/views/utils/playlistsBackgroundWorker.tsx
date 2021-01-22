import React, { useContext, useEffect, useState } from 'react'
import Context from '../../store/context';
import { pushSpotifyErrorNotification, pushYoutubeErrorNotification } from '../../store/types/notifications_actions';
import { Playlists } from '../../youtubeApi/youtube-api-playlists';
import SpotifyApi from 'spotify-web-api-js';
import { ISpotifyPlaylists, IYoutubePlaylists } from '../../store/state';

interface IProps {
    youtubePlaylists: IYoutubePlaylists,
    setYoutubePlaylists: React.Dispatch<React.SetStateAction<IYoutubePlaylists>>,
    spotifyPlaylists: ISpotifyPlaylists,
    setSpotifyPlaylists: React.Dispatch<React.SetStateAction<ISpotifyPlaylists>>
}

export const PlaylistsBackgroundWorker: React.FunctionComponent<IProps> = (props: IProps) => {
    const { state, dispatch } = useContext(Context);
    const [youtubePlaylistsPageToken, setYoutubePlaylistsPageToken] = useState<string | undefined>(undefined);
    const [spotifyPlaylistsOffset, setSpotifyPlaylistsOffset] = useState<number | undefined>(undefined);

    useEffect(() => {
        if (state.youtubeState.userProfile.loaded) {
            if (!props.youtubePlaylists.loaded) {
                _fetchYoutubePlaylists();
            }
        }
    }, [state.youtubeState.userProfile.loaded]);

    useEffect(() => {
        if (youtubePlaylistsPageToken) {
            _fetchYoutubePlaylists(youtubePlaylistsPageToken);
        }
    }, [youtubePlaylistsPageToken]);

    useEffect(() => {
        if (state.spotifyState.userProfile.loaded) {
            if (!props.spotifyPlaylists.loaded) {
                _fetchSpotifyPlaylists();
            }
        }
    }, [state.spotifyState.userProfile.loaded]);

    useEffect(() => {
        if (spotifyPlaylistsOffset) {
            _fetchSpotifyPlaylists(spotifyPlaylistsOffset);
        }
    }, [spotifyPlaylistsOffset]);

    function _matchPlaylistName(name: string): boolean {
        return new RegExp("Playlist [0-9]{4} - [0-9]{2}").test(name);
    }

    async function _fetchYoutubePlaylists(pageToken: string | undefined = undefined) {
        try {
            props.setYoutubePlaylists((prev) => {
                return {
                    ...prev,
                    loading: true,
                    loaded: false
                }
            });

            var response = await new Playlists(state.youtubeState.credential.accessToken).list({
                channelId: state.youtubeState.userProfile.channelId,
                part: ['snippet', 'contentDetails'],
                maxResults: 50,
                pageToken: pageToken
            });
            if (response && response.items) {

                const filteredPlaylists = response.items.filter(i => i.snippet?.title && _matchPlaylistName(i.snippet?.title));

                props.setYoutubePlaylists((prev) => {
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
                    props.setYoutubePlaylists((prev) => {
                        return {
                            ...prev,
                            loading: false,
                            loaded: true
                        }
                    });
                }
            }
        } catch (error) {
            props.setYoutubePlaylists((prev) => {
                return {
                    ...prev,
                    loading: false,
                    loaded: false
                }
            });
            dispatch(pushYoutubeErrorNotification(error));
        }
    }

    async function _fetchSpotifyPlaylists(offset: number | undefined = undefined) {
        try {
            props.setSpotifyPlaylists((prev) => {
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

                const filteredPlaylists = response.items.filter(i => _matchPlaylistName(i.name));

                props.setSpotifyPlaylists((prev) => {
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
                    props.setSpotifyPlaylists((prev) => {
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
            props.setSpotifyPlaylists((prev) => {
                return {
                    ...prev,
                    loading: false,
                    loaded: false
                }
            });
            dispatch(pushSpotifyErrorNotification(error));
        }
    }

    return (<></>)
}

export default PlaylistsBackgroundWorker
