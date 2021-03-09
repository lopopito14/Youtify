import React from 'react'
import SpotifyApi from 'spotify-web-api-js';
import Context from '../../../store/context';
import { pushSpotifyErrorNotification } from '../../../store/types/notifications_actions';
import logger from '../../utils/logger';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useFetchPlaylists = () => {
    const { state, dispatch } = React.useContext(Context);

    const { log } = logger();
    const [playlists, setPlaylists] = React.useState<globalThis.SpotifyApi.PlaylistObjectSimplified[]>([]);
    const [loaded, setLoaded] = React.useState<boolean>(false);

    const fetchPlaylists = React.useCallback(async (offset = 0) => {
        try {
            const spotifyApi = new SpotifyApi();
            spotifyApi.setAccessToken(state.spotifyState.credential.accessToken);

            const response = await spotifyApi.getUserPlaylists(
                state.spotifyState.userProfile.id,
                {
                    "limit": 10,
                    "offset": offset,
                }
            );
            if (response) {

                setPlaylists(prev => {
                    if (prev.length + response.items.length === response.total) {
                        setLoaded(true);
                    }

                    if (offset === 0) {
                        return response.items;
                    }

                    return [...prev, ...response.items];
                });
            }
        } catch (error) {
            dispatch(pushSpotifyErrorNotification(error));
        }
    }, [dispatch, state.spotifyState.credential.accessToken, state.spotifyState.userProfile.id]);

    React.useEffect(() => {
        fetchPlaylists();
    }, [fetchPlaylists]);

    const refreshPlaylists = React.useCallback(async () => {
        await fetchPlaylists();
    }, [fetchPlaylists]);

    const loadPlaylists = React.useCallback(async () => {
        if (!loaded) {
            await fetchPlaylists(playlists.length);
        }
        else {
            log("all playlists loaded");
        }
    }, [fetchPlaylists, loaded, log, playlists.length]);

    return { playlists, loaded, loadPlaylists, refreshPlaylists };
}

export default useFetchPlaylists;