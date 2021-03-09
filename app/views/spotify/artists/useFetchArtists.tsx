import React from 'react';
import SpotifyApi from 'spotify-web-api-js';
import Context from '../../../store/context';
import { pushSpotifyErrorNotification } from '../../../store/types/notifications_actions';
import logger from '../../utils/logger';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useFetchArtists = () => {
    const { state, dispatch } = React.useContext(Context);

    const { log } = logger();
    const [init, setInit] = React.useState<boolean>(true);
    const [followedArtists, setFollowedArtists] = React.useState<globalThis.SpotifyApi.ArtistObjectFull[]>([]);
    const [loaded, setLoaded] = React.useState(false);
    const [after, setAfter] = React.useState<string | undefined>(undefined);

    const fetchFollowedArtists = React.useCallback(async (afterValue: string | undefined = undefined) => {
        try {
            const spotifyApi = new SpotifyApi();
            spotifyApi.setAccessToken(state.spotifyState.credential.accessToken);

            const option = afterValue ?
                {
                    "type": "artist",
                    "limit": 10,
                    "after": afterValue
                } :
                {
                    "type": "artist",
                    "limit": 10
                };

            const response = await spotifyApi.getFollowedArtists(option);
            if (response) {
                if (afterValue) {
                    setFollowedArtists([...followedArtists, ...response.artists.items]);
                }
                else {
                    setFollowedArtists(response.artists.items);
                }

                if (response.artists.cursors.after) {
                    setAfter(response.artists.cursors.after);
                } else {
                    setAfter(undefined);
                    setLoaded(true);
                }
            }
        } catch (error) {
            dispatch(pushSpotifyErrorNotification(error));
        }
    }, [dispatch, followedArtists, state.spotifyState.credential.accessToken]);

    React.useEffect(() => {
        if (init) {
            setInit(false);
            fetchFollowedArtists();
        }
    }, [fetchFollowedArtists, init]);

    const refreshArtists = React.useCallback(async () => {
        await fetchFollowedArtists()
    }, [fetchFollowedArtists]);

    const loadArtists = React.useCallback(async () => {
        if (!loaded) {
            await fetchFollowedArtists(after);
        }
        else {
            log("all followed artists loaded");
        }
    }, [loaded, fetchFollowedArtists, after, log]);

    return { followedArtists, loaded, loadArtists, refreshArtists };
}

export default useFetchArtists;