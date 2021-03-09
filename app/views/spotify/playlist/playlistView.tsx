import { Body, Button, Card, CardItem, Content, H1, H2, Icon, Left, Spinner, Text, Thumbnail } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { spotifyTheme } from '../../theme';
import { msToTime } from '../../utils/helpers';
import useFetchPlaylist from './useFetchPlaylist';
import usePlayTrack from '../usePlayTrack';
import { ISpotifyNavigationProps, SpotifyViewType } from '../../../interfaces/spotifyInterfaces';

interface IProps extends ISpotifyNavigationProps {
    playlistId: string;
}

const PlaylistView: React.FunctionComponent<IProps> = (props: IProps) => {
    const { playlistId, selectedView } = props;

    /// ###### ///
    /// STATES ///
    /// ###### ///
    const { playlist, loaded } = useFetchPlaylist(playlistId);
    const { trackIdPlaying, playTrack, stopPlaying } = usePlayTrack();

    /// ######### ///
    /// CALLBACKS ///
    /// ######### ///
    const isSelected = React.useCallback((view: SpotifyViewType) => selectedView === view, [selectedView]);

    /// ####### ///
    /// EFFECTS ///
    /// ####### ///
    React.useEffect(() => {
        if (!isSelected(SpotifyViewType.PLAYLIST)) {
            stopPlaying();
        }
    }, [isSelected, stopPlaying]);

    return (
        <>
            {
                isSelected(SpotifyViewType.PLAYLIST) &&
                <Content style={styles.contentStyle}>
                    {
                        loaded && playlist &&
                        <Card style={styles.cardStyle}>
                            <CardItem header style={styles.cardItemStyle}>
                                <Body>
                                    <H1>{playlist.name}</H1>
                                </Body>
                            </CardItem>
                            <CardItem style={styles.cardItemStyle}>
                                {
                                    playlist.images.length >= 2 &&
                                    <Thumbnail source={{ uri: playlist.images[0].url }} style={styles.thumbnailStyle} />
                                }
                            </CardItem>
                            <CardItem style={styles.cardItemStyle}>
                                <Left>
                                    <H2>Tracks:</H2>
                                </Left>
                            </CardItem>
                            {
                                playlist.tracks.items.map((t, i) =>
                                (t.track.type === 'track' &&
                                    <CardItem bordered key={t.track.id} style={styles.cardItemStyle}>
                                        <Text style={styles.numberingStyle}>{i + 1}</Text>
                                        <Body>
                                            <Text numberOfLines={1}>{t.track.name}</Text>
                                            <Text note numberOfLines={1}>{t.track.artists.map((a) => a.name).join(', ')}</Text>
                                        </Body>
                                        <Text style={styles.durationTextStyle} note>{msToTime(t.track.duration_ms)}</Text>
                                        <Button style={styles.buttonStyle} light color={spotifyTheme.secondaryColor} rounded icon onPress={() => playTrack(t.track.id, t.track.type === 'track' ? t.track.preview_url : '')}>
                                            <Icon android={t.track.id === trackIdPlaying ? "md-pause" : "md-play"} ios={t.track.id === trackIdPlaying ? "md-pause" : "md-play"} />
                                        </Button>
                                    </CardItem>
                                )
                                    // ||
                                    // (t.track.type === 'episode' &&
                                    //     <CardItem bordered key={i} style={styles.cardItemStyle}>
                                    //         <Text style={{ marginRight: 20 }}>{i + 1}</Text>
                                    //         <Body>
                                    //             <Text style={{ textAlignVertical: 'center' }} numberOfLines={1}>{t.track.name}</Text>
                                    //         </Body>
                                    //         <Text style={{ marginLeft: 20 }} note>{msToTime(t.track.duration_ms)}</Text>
                                    //     </CardItem>
                                    // )
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

const styles = StyleSheet.create({
    contentStyle: {
        backgroundColor: spotifyTheme.secondaryColor,
    },
    cardStyle: {
        margin: 5
    },
    cardItemStyle: {
        backgroundColor: spotifyTheme.secondaryBackgroundColor
    },
    thumbnailStyle: {
        height: 300,
        flex: 1
    },
    numberingStyle: {
        marginRight: 20
    },
    durationTextStyle: {
        marginLeft: 20
    },
    buttonStyle: {
        marginLeft: 20,
        borderColor: spotifyTheme.secondaryColor,
        borderWidth: 1
    }
});

export default PlaylistView;