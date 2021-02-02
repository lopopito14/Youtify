import React from 'react';
import Context from '../../../store/context';
import SpotifyApi from 'spotify-web-api-js';
import { pushSpotifyErrorNotification } from '../../../store/types/notifications_actions';

const useFetchPlaylist = (playlistId: string) => {
    const { state, dispatch } = React.useContext(Context);

    const [playlist, setPlaylist] = React.useState<globalThis.SpotifyApi.SinglePlaylistResponse>();
    const [loaded, setLoaded] = React.useState(false);

    React.useEffect(() => {
        fetchPlaylist();
    }, []);

    const fetchPlaylist = async () => {
        try {
            const spotifyApi = new SpotifyApi();
            spotifyApi.setAccessToken(state.spotifyState.credential.accessToken);

            var response = await spotifyApi.getPlaylist(playlistId);
            if (response) {
                setPlaylist(response);
                setLoaded(true);
            }
        } catch (error) {
            dispatch(pushSpotifyErrorNotification(error));
        }
    }

    return { playlist, loaded };
}

export default useFetchPlaylist
