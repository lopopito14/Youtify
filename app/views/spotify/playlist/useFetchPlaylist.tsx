import React from 'react';
import SpotifyApi from 'spotify-web-api-js';
import Context from '../../../store/context';
import { pushSpotifyErrorNotification } from '../../../store/types/notifications_actions';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useFetchPlaylist = (playlistId: string) => {

    /// ###### ///
    /// STATES ///
    /// ###### ///
    const { state, dispatch } = React.useContext(Context);
    const [playlist, setPlaylist] = React.useState<globalThis.SpotifyApi.SinglePlaylistResponse>();
    const [loaded, setLoaded] = React.useState(false);

    /// ####### ///
    /// EFFECTS ///
    /// ####### ///
    React.useEffect(() => {
        const fetchPlaylist = async () => {
            try {
                const spotifyApi = new SpotifyApi();
                spotifyApi.setAccessToken(state.spotifyState.credential.accessToken);

                const response = await spotifyApi.getPlaylist(playlistId);
                if (response) {
                    setPlaylist(response);
                    setLoaded(true);
                }
            } catch (error) {
                dispatch(pushSpotifyErrorNotification(error));
            }
        };

        fetchPlaylist();
    }, [dispatch, playlistId, state.spotifyState.credential.accessToken]);

    return { playlist, loaded };
}

export default useFetchPlaylist
