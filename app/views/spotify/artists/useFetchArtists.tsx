import React from 'react'
import SpotifyApi from 'spotify-web-api-js';
import Context from '../../../store/context';
import { pushSpotifyErrorNotification } from '../../../store/types/notifications_actions';

const useFetchArtists = () => {
    const { state, dispatch } = React.useContext(Context);

    const [followedArtists, setFollowedArtists] = React.useState<globalThis.SpotifyApi.ArtistObjectFull[]>([]);
    const [loaded, setLoaded] = React.useState(false);
    const [after, setafter] = React.useState<string | undefined>(undefined);

    React.useEffect(() => {
        _fetchFollowedArtists();
    }, []);

    const refreshArtists = () => {
        _fetchFollowedArtists()
    }

    const loadArtists = () => {
        if (!loaded) {
            _fetchFollowedArtists(after);
        }
        else {
            console.log("all followed artists loaded");
        }
    }

    async function _fetchFollowedArtists(after: string | undefined = undefined) {
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
                    setafter(response.artists.cursors.after);
                } else {
                    setafter(undefined);
                    setLoaded(true);
                }
            }
        } catch (error) {
            dispatch(pushSpotifyErrorNotification(error));
        }
    }

    return { followedArtists, loaded, loadArtists, refreshArtists };
}

export default useFetchArtists
