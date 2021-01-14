import React, { useContext, useEffect, useState } from 'react'
import Context from '../../store/context';
import { youtubePlaylistsExists } from '../../store/types/youtube_playlists_actions';
import { ErrorResponseException, Playlist } from '../../youtubeApi/youtube-api-models';
import { Playlists } from '../../youtubeApi/youtube-api-playlists';
import MonthPlaylistBackgroundWorker from './monthPlaylistBackgroundWorker';

interface IProps { }

export const MonthPlaylistsBackgroundWorker: React.FunctionComponent<IProps> = () => {
    const { state, dispatch } = useContext(Context);
    const [playlists, setplaylists] = useState<Playlist[] | undefined>(undefined);
    const [playlistspageToken, setplaylistspageToken] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (state.youtubeState.userProfile.loaded) {
            _fetchPlaylists();
        }
    }, [state.youtubeState.userProfile.loaded]);

    useEffect(() => {
        if (playlistspageToken) {
            _fetchPlaylists(playlistspageToken);
        }
    }, [playlistspageToken]);

    useEffect(() => {
        if (state.youtubeState.playlists.loaded && playlists) {
            computePlaylist();
        }
    }, [state.youtubeState.playlists.loaded, playlists])

    async function _fetchPlaylists(pageToken: string | undefined = undefined) {
        try {
            var response = await new Playlists(state.youtubeState.credential.accessToken).list({
                channelId: state.youtubeState.userProfile.channelId,
                part: ['snippet'],
                maxResults: 50,
                pageToken: pageToken
            });
            if (response && response.items) {

                if (playlists) {
                    setplaylists([...playlists, ...response.items])
                } else {
                    setplaylists(response.items)
                }

                if (response.nextPageToken) {
                    setplaylistspageToken(response.nextPageToken);
                } else {
                    setplaylistspageToken(undefined);
                }
            }
        } catch (error) {
            if (error instanceof ErrorResponseException) {
                console.log(error.errorResponse.error.message);
            } else {
                console.log('Error => ' + error);
            }
        }
    }

    function computePlaylist() {
        if (playlists) {
            state.youtubeState.playlists.yearPlaylist.map(y => {
                y.playlists.map(m => {
                    const playlist = playlists.find(p => p.snippet?.title === _buildPlaylistName(y.year, m.month));
                    if (playlist) {
                        dispatch(youtubePlaylistsExists(
                            {
                                year: y.year,
                                month: m.month,
                                playlistId: playlist.id ? playlist.id : undefined
                            }
                        ));
                    } else {
                        dispatch(youtubePlaylistsExists(
                            {
                                year: y.year,
                                month: m.month,
                                playlistId: undefined
                            }
                        ));
                    }

                })
            });
        }
    }

    function _buildPlaylistName(year: number, month: number): string {
        return `Playlist ${year} - ${pad(month)}`;
    }

    function pad(d: number) {
        return (d < 10) ? '0' + d.toString() : d.toString();
    }

    return (
        <>
            {
                state.youtubeState.playlists.loaded &&
                state.youtubeState.playlists.yearPlaylist.map((y, i) =>
                    y.playlists.map((m, j) =>
                        <MonthPlaylistBackgroundWorker key={i * 10 + j * 100} year={y.year} playlist={m} />
                    )
                )
            }
        </>
    )
}

export default MonthPlaylistsBackgroundWorker
