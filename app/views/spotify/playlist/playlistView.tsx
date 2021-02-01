import { Body, Button, Card, CardItem, Content, H1, H2, Icon, Left, Spinner, Text, Thumbnail } from 'native-base';
import React from 'react';
import { spotifyTheme } from '../../theme';
import { ISpotifyNavigationProps, SpotifyViewType } from '../../spotifyView';
import { msToTime } from '../../utils/helpers';
import useFetchPlaylist from './useFetchPlaylist';
import usePlayTrack from '../usePlayTrack';

interface IProps extends ISpotifyNavigationProps {
    playlistId: string;
}

const PlaylistView: React.FunctionComponent<IProps> = (props: IProps) => {

    const { playlist, loaded } = useFetchPlaylist(props.playlistId);
    const { trackIdPlaying, playTrack, stopPlaying } = usePlayTrack();

    React.useEffect(() => {
        if (props.selectedView !== SpotifyViewType.PLAYLIST) {
            stopPlaying();
        }
    }, [props.selectedView]);

    return (
        <>
            {
                props.selectedView === SpotifyViewType.PLAYLIST &&
                <Content style={{ backgroundColor: spotifyTheme.secondaryColor }}>
                    {
                        loaded && playlist &&
                        <Card style={{ margin: 5 }}>
                            <CardItem header style={{ backgroundColor: spotifyTheme.secondaryBackgroundColor }}>
                                <Body>
                                    <H1>{playlist.name}</H1>
                                </Body>
                            </CardItem>
                            <CardItem style={{ backgroundColor: spotifyTheme.secondaryBackgroundColor }}>
                                {
                                    playlist.images.length >= 2 &&
                                    <Thumbnail source={{ uri: playlist.images[0].url }} style={{ height: 300, flex: 1 }} />
                                }
                            </CardItem>
                            <CardItem style={{ backgroundColor: spotifyTheme.secondaryBackgroundColor }}>
                                <Left>
                                    <H2>Tracks:</H2>
                                </Left>
                            </CardItem>
                            {
                                playlist.tracks.items.map((t, i) =>
                                    (t.track.type === 'track' &&
                                        <CardItem bordered key={i} style={{ backgroundColor: spotifyTheme.secondaryBackgroundColor }}>
                                            <Text style={{ marginRight: 20 }}>{i + 1}</Text>
                                            <Body>
                                                <Text style={{ textAlignVertical: 'center' }} numberOfLines={1}>{t.track.name}</Text>
                                                <Text note style={{ textAlignVertical: 'center' }} numberOfLines={1}>{t.track.artists.map((a) => a.name).join(', ')}</Text>
                                            </Body>
                                            <Text style={{ marginLeft: 20 }} note>{msToTime(t.track.duration_ms)}</Text>
                                            <Button style={{ marginLeft: 20, borderColor: spotifyTheme.secondaryColor, borderWidth: 1 }} light color={spotifyTheme.secondaryColor} rounded icon onPress={() => playTrack(t.track.id, t.track.type === 'track' ? t.track.preview_url : '')}>
                                                <Icon android={t.track.id === trackIdPlaying ? "md-pause" : "md-play"} ios={t.track.id === trackIdPlaying ? "md-pause" : "md-play"} />
                                            </Button>
                                        </CardItem>
                                    ) ||
                                    (t.track.type === 'episode' &&
                                        <CardItem bordered key={i} style={{ backgroundColor: spotifyTheme.secondaryBackgroundColor }}>
                                            <Text style={{ marginRight: 20 }}>{i + 1}</Text>
                                            <Body>
                                                <Text style={{ textAlignVertical: 'center' }} numberOfLines={1}>{t.track.name}</Text>
                                            </Body>
                                            <Text style={{ marginLeft: 20 }} note>{msToTime(t.track.duration_ms)}</Text>
                                        </CardItem>
                                    )
                                )
                            }
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

export default PlaylistView
