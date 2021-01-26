import { Body, Button, Card, CardItem, Content, H1, H2, Icon, Left, List, ListItem, Right, Spinner, Text, Thumbnail } from 'native-base'
import React, { useContext, useEffect, useState } from 'react'
import SpotifyApi from 'spotify-web-api-js';
import Context from '../../store/context';
import { spotifyTheme } from '../theme';
import { SpotifyViewType } from '../spotifyView';
import Sound from 'react-native-sound';

interface IProps {
    selectedView: SpotifyViewType;
    setselectedView(view: SpotifyViewType): any;
    artistId: string;
}

const ArtistView: React.FunctionComponent<IProps> = (props: IProps) => {
    const [artist, setArtist] = useState<globalThis.SpotifyApi.SingleArtistResponse>();
    const [relatedArtists, setRelatedArtists] = useState<globalThis.SpotifyApi.ArtistsRelatedArtistsResponse>();
    const [relatedArtistsFollowingStatus, setrelatedArtistsFollowingStatus] = useState<boolean[] | undefined>([]);
    const [artistTopTracks, setArtistTopTracks] = useState<globalThis.SpotifyApi.ArtistsTopTracksResponse>();
    const { state } = useContext(Context);
    const [loaded, setLoaded] = useState(false);
    const [trackIdPlaying, setTrackIdPlaying] = useState<string | undefined>(undefined);
    const [sound, setsound] = useState<Sound | undefined>(undefined);
    const [followOrUnfollowId, setfollowOrUnfollowId] = useState<string | undefined>(undefined)

    useEffect(() => {
        _fetchAllArtistDatas();
    }, [props.artistId]);

    useEffect(() => {
        if (props.selectedView !== SpotifyViewType.ARTIST) {
            if (sound) {
                sound.pause();
                sound.release();
                setsound(undefined);
                setTrackIdPlaying(undefined);
            }
        }
    }, [props.selectedView]);

    useEffect(() => {
        if (followOrUnfollowId) {
            _onFollow(followOrUnfollowId);
        }
    }, [followOrUnfollowId]);

    async function _fetchAllArtistDatas() {
        try {
            await Promise.all([_fetchArtist(), _fetchArtistTopTracks(), _fetchRelatedArtists()]);
        } catch (error) {
            console.log('Error => ' + error);
        } finally {
            setLoaded(true);
        }
    }

    async function _fetchArtist() {
        try {
            const spotifyApi = new SpotifyApi();
            spotifyApi.setAccessToken(state.spotifyState.credential.accessToken);

            var response = await spotifyApi.getArtist(props.artistId);
            if (response) {
                setArtist(response);
            }
        } catch (error) {
            console.log('Error => ' + error);
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
            console.log('Error => ' + error);
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
            console.log('Error => ' + error);
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
            console.log('Error => ' + error);
        }
    }

    function _msToTime(milliseconds: number) {
        var seconds = Math.floor((milliseconds / 1000) % 60);
        var minutes = Math.floor((milliseconds / (1000 * 60)) % 60);

        const minutesString = (minutes < 10) ? "0" + minutes : minutes;
        const secondsString = (seconds < 10) ? "0" + seconds : seconds;

        return minutesString + ":" + secondsString;
    }

    function _onPlayPreview(trackId: string, url: string) {
        if (sound) {
            sound.pause();
            sound.release();
            setsound(undefined);
            if (trackId === trackIdPlaying) {
                setTrackIdPlaying(undefined);
                return;
            }
        }

        setTrackIdPlaying(trackId);
        const track = new Sound(url, Sound.MAIN_BUNDLE, (e) => {
            if (e) {
                console.log('failed to load the sound', e);
                return;
            }
            console.log('duration in seconds: ' + track.getDuration() + 'number of channels: ' + track.getNumberOfChannels());

            track.play((success) => {
                if (success) {
                    console.log('successfully finished playing');
                } else {
                    console.log('playback failed due to audio decoding errors');
                }
                setTrackIdPlaying(undefined);
            });
        });

        setsound(track);
    }

    async function _onFollow(id: string) {
        try {
            const spotifyApi = new SpotifyApi();
            spotifyApi.setAccessToken(state.spotifyState.credential.accessToken);

            var copy = relatedArtistsFollowingStatus;
            const position = relatedArtists?.artists.findIndex((a) => a.id == id);

            if (position && copy) {
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
            console.log('Error => ' + error);
        } finally {
            setfollowOrUnfollowId(undefined);
        }
    }

    return (
        <>
            {
                props.selectedView === SpotifyViewType.ARTIST &&
                <Content style={{ backgroundColor: spotifyTheme.secondaryColor }}>
                    {
                        loaded && artist && artistTopTracks && relatedArtists && relatedArtistsFollowingStatus &&
                        <Card>
                            <CardItem header style={{ backgroundColor: spotifyTheme.secondaryBackgroundColor }}>
                                <Body>
                                    <H1>{artist.name}</H1>
                                </Body>
                            </CardItem>
                            <CardItem cardBody>
                                {
                                    artist.images.length >= 2 &&
                                    <Thumbnail square source={{ uri: artist.images[1].url }} style={{ height: 320, flex: 1 }} />
                                }
                            </CardItem>
                            <CardItem bordered>
                                <Left>
                                    <H2>Genres:</H2>
                                </Left>
                                <Body>
                                    {
                                        artist.genres.map((g, i) =>
                                            <Text key={i} note>{g}</Text>
                                        )
                                    }
                                </Body>
                            </CardItem>
                            <CardItem bordered>
                                <Left>
                                    <Text>Popularity:</Text>
                                    <Text note>{artist.popularity}</Text>
                                </Left>
                                <Body />
                                <Right>
                                    <Text>Followers:</Text>
                                    <Text note>{artist.followers.total}</Text>
                                </Right>
                            </CardItem>
                            <CardItem bordered style={{ backgroundColor: spotifyTheme.secondaryBackgroundColor }}>
                                <Body>
                                    <H2>{`Artist Top Tracks (${artistTopTracks.tracks.length})`}</H2>
                                </Body>
                            </CardItem>
                            <List>
                                {
                                    artistTopTracks.tracks.map((t, i) =>
                                        <ListItem thumbnail key={i}>
                                            <Body>
                                                <Text style={{ textAlignVertical: 'center' }} numberOfLines={1}>{t.name}</Text>
                                                <Text note style={{ textAlignVertical: 'center' }} numberOfLines={1}>{t.artists.map((a) => a.name).join(', ')}</Text>
                                            </Body>
                                            <Right>
                                                <Text style={{ marginLeft: 20 }} note>{_msToTime(t.duration_ms)}</Text>
                                            </Right>
                                            <Right>
                                                <Button style={{ marginLeft: 20, borderColor: spotifyTheme.secondaryColor, borderWidth: 1 }} light color={spotifyTheme.secondaryColor} rounded icon onPress={() => _onPlayPreview(t.id, t.preview_url)}>
                                                    <Icon android={t.id === trackIdPlaying ? "md-pause" : "md-play"} ios={t.id === trackIdPlaying ? "md-pause" : "md-play"} style={{ color: t.id === trackIdPlaying ? "white" : "black" }} />
                                                </Button>
                                            </Right>

                                        </ListItem>
                                    )
                                }
                            </List>
                            <CardItem bordered style={{ backgroundColor: spotifyTheme.secondaryBackgroundColor }}>
                                <Body>
                                    <H2>{`Related Artists (${relatedArtists.artists.length})`}</H2>
                                </Body>
                            </CardItem>
                            <List>
                                {
                                    relatedArtists.artists.map((a, i) =>
                                        <ListItem key={i} thumbnail>
                                            <Left>
                                                {
                                                    a.images.length >= 3 &&
                                                    <Thumbnail source={{ uri: a.images[2].url }} />
                                                }
                                            </Left>
                                            <Body>
                                                <Text>{a.name}</Text>
                                                <Text note numberOfLines={1}>{`${a.followers.total} followers`}</Text>
                                            </Body>
                                            <Right>
                                                <Button color={spotifyTheme.secondaryColor} transparent rounded icon onPress={() => setfollowOrUnfollowId(a.id)}>
                                                    <Icon name={relatedArtistsFollowingStatus[i] ? "user-unfollow" : "user-follow"} type="SimpleLineIcons" style={{ color: relatedArtistsFollowingStatus[i] ? "red" : "green" }} />
                                                </Button>
                                            </Right>
                                        </ListItem>
                                    )
                                }
                            </List>
                        </Card>
                    }
                    {
                        !loaded && <Spinner color={spotifyTheme.primaryColor} />
                    }
                </Content>
            }
        </>
    )
}

export default ArtistView
