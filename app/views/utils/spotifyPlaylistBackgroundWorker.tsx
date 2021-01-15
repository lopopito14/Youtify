import React, { useContext, useEffect, useState } from 'react'
import Context from '../../store/context';
import { IYoutubeMonthPlaylist } from '../../store/state';
import { pushSpotifyErrorNotification, pushSpotifySuccessNotification } from '../../store/types/notifications_actions';
import { bindSpotifyPlaylist, bindSpotifyPlaylistItemsComplete, bindSpotifyPlaylistItemsError as bindSpotifyPlaylistTracksError, bindSpotifyPlaylistItemsRequest as bindSpotifyPlaylistTracksRequest, bindSpotifyPlaylistItemsSuccess as bindSpotifyPlaylistTracksSuccess } from '../../store/types/my_playlists_actions';
import SpotifyApi from 'spotify-web-api-js';

interface IProps {
    playlists?: globalThis.SpotifyApi.PlaylistObjectSimplified[];
    playlist: IYoutubeMonthPlaylist;
}

export const SpotifyPlaylistBackgroundWorker: React.FunctionComponent<IProps> = (props: IProps) => {
    const { state, dispatch } = useContext(Context);
    const [playlistTrackPageOffset, setPlaylistTrackPageOffset] = useState<number | undefined>(undefined);

    useEffect(() => {
        if (props.playlists) {
            const playlist = props.playlists.find(p => p.name === props.playlist.title);
            if (playlist) {
                dispatch(bindSpotifyPlaylist(
                    {
                        year: props.playlist.year,
                        month: props.playlist.month,
                        playlist: playlist
                    }
                ));
            } else {
                dispatch(bindSpotifyPlaylist(
                    {
                        year: props.playlist.year,
                        month: props.playlist.month,
                        playlist: undefined
                    }
                ));
            }
        }
    }, [props.playlists]);

    useEffect(() => {
        if (props.playlist.spotify?.playlist.id) {
            _fetchPlaylistTracks();
        }
    }, [props.playlist.spotify?.playlist.id]);

    useEffect(() => {
        if (playlistTrackPageOffset) {
            _fetchPlaylistTracks(playlistTrackPageOffset);
        }
    }, [playlistTrackPageOffset]);

    async function _fetchPlaylistTracks(offset: number | undefined = undefined) {
        if (props.playlist.spotify?.playlist.id) {
            try {
                dispatch(bindSpotifyPlaylistTracksRequest());
                const spotifyApi = new SpotifyApi();
                spotifyApi.setAccessToken(state.spotifyState.credential.accessToken);

                const limit = 50;
                var options: Object;
                if (offset) {
                    options = {
                        "market": state.spotifyState.userProfile.country,
                        "limit": limit,
                        "offset": offset,
                    }
                }
                else {
                    options = {
                        "market": state.spotifyState.userProfile.country,
                        "limit": limit
                    }
                }

                var response = await spotifyApi.getPlaylistTracks(props.playlist.spotify.playlist.id, options);
                if (response) {

                    var filteredTracks: globalThis.SpotifyApi.TrackObjectFull[] = [];
                    response.items.forEach(t => {
                        if (t.track.type === 'track') {
                            filteredTracks.push(t.track);
                        }
                    });

                    dispatch(bindSpotifyPlaylistTracksSuccess({ year: props.playlist.year, month: props.playlist.month, items: filteredTracks }));

                    if (response.next === null) {
                        setPlaylistTrackPageOffset(undefined);
                    } else {
                        dispatch(bindSpotifyPlaylistItemsComplete());
                        setPlaylistTrackPageOffset(response.offset + limit);
                    }
                }
            } catch (error) {
                dispatch(bindSpotifyPlaylistTracksError(error));
                dispatch(pushSpotifyErrorNotification(error));
            }
        }
    }

    return (<></>)
}

export default SpotifyPlaylistBackgroundWorker
