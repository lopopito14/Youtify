import { Body, Button, Card, CardItem, Content, H1, H2, Icon, Left, List, ListItem, Right, Spinner, Text, Thumbnail } from 'native-base';
import React from 'react';
import { spotifyTheme } from '../../theme';
import { ISpotifyNavigationProps, SpotifyViewType } from '../../spotifyView';
import useFetchArtist from './useFetchArtist';
import { msToTime } from '../../utils/helpers';
import usePlayTrack from '../usePlayTrack';

interface IProps extends ISpotifyNavigationProps {
    artistId: string;
}

const ArtistView: React.FunctionComponent<IProps> = (props: IProps) => {

    const { artist, relatedArtists, relatedArtistsFollowingStatus, artistTopTracks, loaded, setfollowOrUnfollowId } = useFetchArtist({ artistId: props.artistId });
    const { trackIdPlaying, playTrack, stopPlaying } = usePlayTrack();

    React.useEffect(() => {
        if (props.selectedView !== SpotifyViewType.ARTIST) {
            stopPlaying();
        }
    }, [props.selectedView]);

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
                                                <Text style={{ marginLeft: 20 }} note>{msToTime(t.duration_ms)}</Text>
                                            </Right>
                                            <Right>
                                                <Button style={{ marginLeft: 20, borderColor: spotifyTheme.secondaryColor, borderWidth: 1 }} light color={spotifyTheme.secondaryColor} rounded icon onPress={() => playTrack(t.id, t.preview_url)}>
                                                    <Icon android={t.id === trackIdPlaying ? "md-pause" : "md-play"} ios={t.id === trackIdPlaying ? "md-pause" : "md-play"} />
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
