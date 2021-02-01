import React from 'react';
import SpotifyApi from 'spotify-web-api-js';
import Context from '../../../store/context';
import { pushSpotifyErrorNotification } from '../../../store/types/notifications_actions';

interface IProps {
    artistId: string;
}

const useFetchArtist = (props: IProps) => {
    const { state, dispatch } = React.useContext(Context);

    const [artist, setArtist] = React.useState<globalThis.SpotifyApi.SingleArtistResponse>();
    const [relatedArtists, setRelatedArtists] = React.useState<globalThis.SpotifyApi.ArtistsRelatedArtistsResponse>();
    const [relatedArtistsFollowingStatus, setrelatedArtistsFollowingStatus] = React.useState<boolean[] | undefined>([]);
    const [artistTopTracks, setArtistTopTracks] = React.useState<globalThis.SpotifyApi.ArtistsTopTracksResponse>();
    const [loaded, setLoaded] = React.useState(false);
    const [followOrUnfollowId, setfollowOrUnfollowId] = React.useState<string | undefined>(undefined);

    React.useEffect(() => {

        async function _fetchAllArtistDatas() {
            try {
                await Promise.all([_fetchArtist(), _fetchArtistTopTracks(), _fetchRelatedArtists()]);
            } catch (error) {
                console.log('Error => ' + error);
            } finally {
                setLoaded(true);
            }
        }

        _fetchAllArtistDatas();
    }, [props.artistId]);

    React.useEffect(() => {
        if (followOrUnfollowId) {
            _onFollow(followOrUnfollowId);
        }
    }, [followOrUnfollowId]);

    async function _fetchArtist() {
        try {
            const spotifyApi = new SpotifyApi();
            spotifyApi.setAccessToken(state.spotifyState.credential.accessToken);

            var response = await spotifyApi.getArtist(props.artistId);
            if (response) {
                setArtist(response);
            }
        } catch (error) {
            dispatch(pushSpotifyErrorNotification(error));
        }
    }

    async function _fetchArtistTopTracks() {
        try {
            const spotifyApi = new SpotifyApi();
            spotifyApi.setAccessToken(state.spotifyState.credential.accessToken);

            var response = await spotifyApi.getArtistTopTracks(props.artistId, state.spotifyState.userProfile.country);
            if (response) {
                setArtistTopTracks(response);
            }
        } catch (error) {
            dispatch(pushSpotifyErrorNotification(error));
        }
    }

    async function _fetchRelatedArtists() {
        try {
            const spotifyApi = new SpotifyApi();
            spotifyApi.setAccessToken(state.spotifyState.credential.accessToken);

            var response = await spotifyApi.getArtistRelatedArtists(props.artistId);
            if (response) {
                setRelatedArtists(response);

                await _fetchAreArtistsFollowed(response.artists.map((a) => a.id));
            }
        } catch (error) {
            dispatch(pushSpotifyErrorNotification(error));
        }
    }

    async function _fetchAreArtistsFollowed(ids: string[]) {
        try {
            const spotifyApi = new SpotifyApi();
            spotifyApi.setAccessToken(state.spotifyState.credential.accessToken);

            var response = await spotifyApi.isFollowingArtists(ids);
            if (response) {
                setrelatedArtistsFollowingStatus(response);
            }
        } catch (error) {
            dispatch(pushSpotifyErrorNotification(error));
        }
    }

    async function _onFollow(id: string) {
        try {
            const spotifyApi = new SpotifyApi();
            spotifyApi.setAccessToken(state.spotifyState.credential.accessToken);

            var copy = relatedArtistsFollowingStatus;
            const position = relatedArtists?.artists.findIndex((a) => a.id == id);

            if (position !== undefined && copy) {

                const followStatus = copy[position];
                if (followStatus) {

                    await spotifyApi.unfollowArtists([id]);
                    if (copy) {
                        copy[position] = false;
                    }
                } else {

                    await spotifyApi.followArtists([id]);
                    if (copy) {
                        copy[position] = true;
                    }
                }

                setrelatedArtistsFollowingStatus(copy);
            }
        } catch (error) {
            dispatch(pushSpotifyErrorNotification(error));
        } finally {
            setfollowOrUnfollowId(undefined);
        }
    }

    return { artist, relatedArtists, relatedArtistsFollowingStatus, artistTopTracks, loaded, setfollowOrUnfollowId }
}

export default useFetchArtist
