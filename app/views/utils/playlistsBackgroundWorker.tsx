import React, { useContext, useEffect, useState } from 'react'
import Context from '../../store/context';
import { pushSpotifyErrorNotification, pushSpotifySuccessNotification, pushYoutubeErrorNotification, pushYoutubeSuccessNotification } from '../../store/types/notifications_actions';
import { Playlist } from '../../youtubeApi/youtube-api-models';
import { Playlists } from '../../youtubeApi/youtube-api-playlists';
import YoutubePlaylistBackgroundWorker from './youtubePlaylistBackgroundWorker';
import SpotifyApi from 'spotify-web-api-js';
import SpotifyPlaylistBackgroundWorker from './spotifyPlaylistBackgroundWorker';

interface IProps { }

export const PlaylistsBackgroundWorker: React.FunctionComponent<IProps> = () => {
    const { state, dispatch } = useContext(Context);
    const [youtubePlaylists, setYoutubePlaylists] = useState<Playlist[] | undefined>(undefined);
    const [youtubePlaylistsPageToken, setYoutubePlaylistsPageToken] = useState<string | undefined>(undefined);
    const [spotifyPlaylists, setSpotifyPlaylists] = useState<globalThis.SpotifyApi.PlaylistObjectSimplified[] | undefined>(undefined);
    const [spotifyPlaylistsOffset, setSpotifyPlaylistsOffset] = useState<number | undefined>(undefined);

    useEffect(() => {
        if (state.youtubeState.userProfile.loaded) {
            _fetchYoutubePlaylists();
        }
    }, [state.youtubeState.userProfile.loaded]);

    useEffect(() => {
        if (youtubePlaylistsPageToken) {
            _fetchYoutubePlaylists(youtubePlaylistsPageToken);
        }
    }, [youtubePlaylistsPageToken]);

    useEffect(() => {
        if (state.spotifyState.userProfile.loaded) {
            _fetchSpotifyPlaylists();
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
            var response = await new Playlists(state.youtubeState.credential.accessToken).list({
                channelId: state.youtubeState.userProfile.channelId,
                part: ['snippet'],
                maxResults: 50,
                pageToken: pageToken
            });
            if (response && response.items) {

                const filteredPlaylists = response.items.filter(i => i.snippet?.title && _matchPlaylistName(i.snippet?.title));

                if (youtubePlaylists) {
                    setYoutubePlaylists([...youtubePlaylists, ...filteredPlaylists])
                } else {
                    setYoutubePlaylists(filteredPlaylists)
                }

                if (response.nextPageToken) {
                    setYoutubePlaylistsPageToken(response.nextPageToken);
                } else {
                    setYoutubePlaylistsPageToken(undefined);
                    dispatch(pushYoutubeSuccessNotification("My YOUTUBE playlists loaded !"));
                }
            }
        } catch (error) {
            dispatch(pushYoutubeErrorNotification(error));
        }
    }

    async function _fetchSpotifyPlaylists(offset: number | undefined = undefined) {
        try {
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

                if (spotifyPlaylists) {
                    setSpotifyPlaylists([...spotifyPlaylists, ...filteredPlaylists]);
                }
                else {
                    setSpotifyPlaylists(filteredPlaylists);
                }

                if (response.next === null) {
                    setSpotifyPlaylistsOffset(undefined);
                    dispatch(pushSpotifySuccessNotification("My SPOTIFY playlists loaded !"));
                } else {
                    setSpotifyPlaylistsOffset(response.offset + limit);
                }
            }
        } catch (error) {
            dispatch(pushSpotifyErrorNotification(error));
        }
    }

    return (
        <>
            {
                state.myPlaylist.loaded &&
                <>
                    {
                        state.myPlaylist.myPlaylists.map((p, i) =>
                            <YoutubePlaylistBackgroundWorker key={i} playlist={p} playlists={youtubePlaylists} />
                        )
                    }
                    {
                        state.myPlaylist.myPlaylists.map((p, i) =>
                            <SpotifyPlaylistBackgroundWorker key={i * 10} playlist={p} playlists={spotifyPlaylists} />
                        )
                    }
                </>
            }
        </>
    )
}

export default PlaylistsBackgroundWorker
