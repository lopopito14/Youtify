import React from 'react'
import Context from '../../../store/context';
import SpotifyApi from 'spotify-web-api-js';
import { pushSpotifyErrorNotification } from '../../../store/types/notifications_actions';

const useFetchPlaylists = () => {
    const { state, dispatch } = React.useContext(Context);

    const [playlists, setPlaylists] = React.useState<globalThis.SpotifyApi.PlaylistObjectSimplified[]>([]);
    const [loaded, setLoaded] = React.useState(false);

    React.useEffect(() => {
        fetchPlaylists();
    }, []);

    const refreshPlaylists = React.useCallback(async () => {
        await fetchPlaylists();
    }, []);

    const loadPlaylists = React.useCallback(async () => {
        if (!loaded) {
            await fetchPlaylists(playlists.length);
        }
        else {
            console.log("all playlists loaded");
        }
    }, [loaded, playlists]);

    const fetchPlaylists = async (offset: number = 0) => {
        try {
            var spotifyApi = new SpotifyApi();
            spotifyApi.setAccessToken(state.spotifyState.credential.accessToken);

            var response = await spotifyApi.getUserPlaylists(
                state.spotifyState.userProfile.id,
                {
                    "limit": 10,
                    "offset": offset,
                }
            );
            if (response) {

                if (playlists.length + response.items.length === response.total) {
                    setLoaded(true);
                }

                if (offset === 0) {
                    setPlaylists(response.items);
                }
                else {
                    setPlaylists([...playlists, ...response.items]);
                }
            }
        } catch (error) {
            dispatch(pushSpotifyErrorNotification(error));
        }
    }

    return { playlists, loaded, loadPlaylists, refreshPlaylists };
}

export default useFetchPlaylists;