import React from 'react';
import SpotifyApi from 'spotify-web-api-js';
import Context from '../../../store/context';
import { pushSpotifyErrorNotification } from '../../../store/types/notifications_actions';
import logger from '../../utils/logger';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useFetchArtist = (artistId: string) => {

    /// ###### ///
    /// STATES ///
    /// ###### ///
    const { state, dispatch } = React.useContext(Context);
    const { error } = logger();
    const [artist, setArtist] = React.useState<globalThis.SpotifyApi.SingleArtistResponse>();
    const [relatedArtists, setRelatedArtists] = React.useState<globalThis.SpotifyApi.ArtistObjectFull[]>();
    const [relatedArtistsFollowingStatus, setRelatedArtistsFollowingStatus] = React.useState<boolean[] | undefined>([]);
    const [artistTopTracks, setArtistTopTracks] = React.useState<globalThis.SpotifyApi.ArtistsTopTracksResponse>();
    const [loaded, setLoaded] = React.useState(false);

    /// ######### ///
    /// CALLBACKS ///
    /// ######### ///
    const onFollow = React.useCallback(async (id: string) => {
        if (relatedArtists) {
            try {
                const spotifyApi = new SpotifyApi();
                spotifyApi.setAccessToken(state.spotifyState.credential.accessToken);

                const position = relatedArtists.findIndex((a) => a.id === id);

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
            } catch (e) {
                dispatch(pushSpotifyErrorNotification(e));
            }
        }

    }, [dispatch, relatedArtists, relatedArtistsFollowingStatus, state.spotifyState.credential.accessToken]);

    /// ####### ///
    /// EFFECTS ///
    /// ####### ///
    React.useEffect(() => {

        const fetchArtist = async () => {
            try {
                const spotifyApi = new SpotifyApi();
                spotifyApi.setAccessToken(state.spotifyState.credential.accessToken);

                const response = await spotifyApi.getArtist(artistId);
                if (response) {
                    setArtist(response);
                }
            } catch (e) {
                dispatch(pushSpotifyErrorNotification(e));
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
            } catch (e) {
                dispatch(pushSpotifyErrorNotification(e));
            }
        }

        const fetchRelatedArtists = async () => {
            try {
                const spotifyApi = new SpotifyApi();
                spotifyApi.setAccessToken(state.spotifyState.credential.accessToken);

                const response = await spotifyApi.getArtistRelatedArtists(artistId);
                if (response && response.artists) {
                    setRelatedArtists(response.artists);

                    await fetchAreArtistsFollowed(response.artists.map((a) => a.id));
                }
            } catch (e) {
                dispatch(pushSpotifyErrorNotification(e));
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
            } catch (e) {
                dispatch(pushSpotifyErrorNotification(e));
            }
        }

        const fetchAllArtistDatas = async () => {
            try {
                await Promise.all([fetchArtist(), fetchArtistTopTracks(), fetchRelatedArtists()]);
            } catch (e) {
                error(e);
            } finally {
                setLoaded(true);
            }
        }

        fetchAllArtistDatas();
    }, [artistId, dispatch, state.spotifyState.credential.accessToken, state.spotifyState.userProfile.country, error]);

    return { artist, relatedArtists, relatedArtistsFollowingStatus, artistTopTracks, loaded, onFollow }
}

export default useFetchArtist;