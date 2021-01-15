import React, { useContext, useEffect, useState } from 'react'
import Context from '../../store/context';
import { ErrorResponseException, Playlist } from '../../youtubeApi/youtube-api-models';
import { Playlists } from '../../youtubeApi/youtube-api-playlists';
import PlaylistBackgroundWorker from './playlistBackgroundWorker';

interface IProps { }

export const PlaylistsBackgroundWorker: React.FunctionComponent<IProps> = () => {
    const { state } = useContext(Context);
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

    function _matchPlaylistName(name: string): boolean {
        return new RegExp("Playlist [0-9]{4} - [0-9]{2}").test(name);
    }

    async function _fetchPlaylists(pageToken: string | undefined = undefined) {
        try {
            var response = await new Playlists(state.youtubeState.credential.accessToken).list({
                channelId: state.youtubeState.userProfile.channelId,
                part: ['snippet'],
                maxResults: 50,
                pageToken: pageToken
            });
            if (response && response.items) {

                const filteredPlaylists = response.items.filter(i => i.snippet?.title && _matchPlaylistName(i.snippet?.title));

                if (playlists) {
                    setplaylists([...playlists, ...filteredPlaylists])
                } else {
                    setplaylists(filteredPlaylists)
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

    return (
        <>
            {
                state.myPlaylist.loaded &&
                state.myPlaylist.myPlaylists.map((p, i) =>
                    <PlaylistBackgroundWorker key={i * 10} playlist={p} playlists={playlists} />
                )
            }
        </>
    )
}

export default PlaylistsBackgroundWorker
