import React from 'react';
import SpotifyApi from 'spotify-web-api-js';
import Context from '../../../store/context';
import { pushSpotifyErrorNotification } from '../../../store/types/notifications_actions';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useFetchArtist = (artistId: string) => {
    const { state, dispatch } = React.useContext(Context);

    const [artist, setArtist] = React.useState<globalThis.SpotifyApi.SingleArtistResponse>();
    const [relatedArtists, setRelatedArtists] = React.useState<globalThis.SpotifyApi.ArtistsRelatedArtistsResponse>();
    const [relatedArtistsFollowingStatus, setRelatedArtistsFollowingStatus] = React.useState<boolean[] | undefined>([]);
    const [artistTopTracks, setArtistTopTracks] = React.useState<globalThis.SpotifyApi.ArtistsTopTracksResponse>();
    const [loaded, setLoaded] = React.useState(false);

    React.useEffect(() => {

        const fetchAllArtistDatas = async () => {
            try {
                await Promise.all([fetchArtist(), fetchArtistTopTracks(), fetchRelatedArtists()]);
            } catch (error) {
                // eslint-disable-next-line no-console
                console.log(`Error => ${error}`);
            } finally {
                setLoaded(true);
            }
        }

        fetchAllArtistDatas();
    }, [artistId]);


    const fetchArtist = async () => {
        try {
            const spotifyApi = new SpotifyApi();
            spotifyApi.setAccessToken(state.spotifyState.credential.accessToken);

            const response = await spotifyApi.getArtist(artistId);
            if (response) {
                setArtist(response);
            }
        } catch (error) {
            dispatch(pushSpotifyErrorNotification(error));
        }
    }

    const fetchArtistTopTracks = async () => {
        try {
            const spotifyApi = new SpotifyApi();
            spotifyApi.setAccessToken(state.spotifyState.credential.accessToken);

            const response = await spotifyApi.getArtistTopTracks(artistId, state.spotifyState.userProfile.country);
            if (response) {
                setArtistTopTracks(response);
            }
        } catch (error) {
            dispatch(pushSpotifyErrorNotification(error));
        }
    }

    const fetchRelatedArtists = async () => {
        try {
            const spotifyApi = new SpotifyApi();
            spotifyApi.setAccessToken(state.spotifyState.credential.accessToken);

            const response = await spotifyApi.getArtistRelatedArtists(artistId);
            if (response) {
                setRelatedArtists(response);

                await fetchAreArtistsFollowed(response.artists.map((a) => a.id));
            }
        } catch (error) {
            dispatch(pushSpotifyErrorNotification(error));
        }
    }

    const fetchAreArtistsFollowed = async (ids: string[]) => {
        try {
            const spotifyApi = new SpotifyApi();
            spotifyApi.setAccessToken(state.spotifyState.credential.accessToken);

            const response = await spotifyApi.isFollowingArtists(ids);
            if (response) {
                setRelatedArtistsFollowingStatus(response);
            }
        } catch (error) {
            dispatch(pushSpotifyErrorNotification(error));
        }
    }

    const onFollow = React.useCallback(async (id: string) => {
        try {
            const spotifyApi = new SpotifyApi();
            spotifyApi.setAccessToken(state.spotifyState.credential.accessToken);

            const position = relatedArtists?.artists.findIndex((a) => a.id === id);

            if (position !== undefined && relatedArtistsFollowingStatus) {

                const followStatus = relatedArtistsFollowingStatus[position];
                if (followStatus) {
                    await spotifyApi.unfollowArtists([id]);
                } else {
                    await spotifyApi.followArtists([id]);
                }

                setRelatedArtistsFollowingStatus((prev) => {

                    if (!prev) {
                        return prev;
                    }

                    return [
                        ...prev?.slice(0, position),
                        !followStatus,
                        ...prev.slice(position + 1)
                    ]
                });
            }
        } catch (error) {
            dispatch(pushSpotifyErrorNotification(error));
        }
    }, [relatedArtists, relatedArtistsFollowingStatus]);

    return { artist, relatedArtists, relatedArtistsFollowingStatus, artistTopTracks, loaded, onFollow }
}

export default useFetchArtist;