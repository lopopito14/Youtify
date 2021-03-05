import React from 'react'
import SpotifyApi from 'spotify-web-api-js';
import Context from '../../../store/context';
import { pushSpotifyErrorNotification } from '../../../store/types/notifications_actions';

const useFetchArtists = () => {
    const { state, dispatch } = React.useContext(Context);

    const [followedArtists, setFollowedArtists] = React.useState<globalThis.SpotifyApi.ArtistObjectFull[]>([]);
    const [loaded, setLoaded] = React.useState(false);
    const [after, setAfter] = React.useState<string | undefined>(undefined);

    React.useEffect(() => {
        fetchFollowedArtists();
    }, []);

    const refreshArtists = React.useCallback(async () => {
        await fetchFollowedArtists()
    }, []);

    const loadArtists = React.useCallback(async () => {
        if (!loaded) {
            await fetchFollowedArtists(after);
        }
        else {
            console.log("all followed artists loaded");
        }
    }, [loaded, after]);

    const fetchFollowedArtists = async (after: string | undefined = undefined) => {
        try {
            const spotifyApi = new SpotifyApi();
            spotifyApi.setAccessToken(state.spotifyState.credential.accessToken);

            const option = after ?
                {
                    "type": "artist",
                    "limit": 10,
                    "after": after
                } :
                {
                    "type": "artist",
                    "limit": 10
                };

            var response = await spotifyApi.getFollowedArtists(option);
            if (response) {
                if (after) {
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
    }

    return { followedArtists, loaded, loadArtists, refreshArtists };
}

export default useFetchArtists;