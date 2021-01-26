import { Body, Button, Card, CardItem, Content, H1, H2, Icon, Left, Spinner, Text, Thumbnail } from 'native-base'
import React from 'react'
import SpotifyApi from 'spotify-web-api-js';
import Context from '../../store/context';
import { spotifyTheme } from '../theme';
import { SpotifyViewType } from '../spotifyView';
import Sound from 'react-native-sound';

interface IProps {
    selectedView: SpotifyViewType;
    setselectedView(view: SpotifyViewType): any;
    playlistId: string;
}

const PlaylistView: React.FunctionComponent<IProps> = (props: IProps) => {
    const { state } = React.useContext(Context);

    const [loaded, setLoaded] = React.useState(false);
    const [playlist, setPlaylist] = React.useState<globalThis.SpotifyApi.SinglePlaylistResponse>();
    const [trackIdPlaying, setTrackIdPlaying] = React.useState<string | undefined>(undefined);
    const [sound, setsound] = React.useState<Sound | undefined>(undefined);

    React.useEffect(() => {
        _fetchPlaylist();
    }, [props.playlistId]);

    React.useEffect(() => {
        if (props.selectedView !== SpotifyViewType.PLAYLIST) {
            if (sound) {
                sound.pause();
                sound.release();
                setsound(undefined);
                setTrackIdPlaying(undefined);
            }
        }
    }, [props.selectedView]);

    async function _fetchPlaylist() {
        try {
            const spotifyApi = new SpotifyApi();
            spotifyApi.setAccessToken(state.spotifyState.credential.accessToken);

            var response = await spotifyApi.getPlaylist(props.playlistId);
            if (response) {
                setPlaylist(response);
                setLoaded(true);
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
            // loaded successfully
            console.log('duration in seconds: ' + track.getDuration() + 'number of channels: ' + track.getNumberOfChannels());

            // Play the sound with an onEnd callback
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
                                            <Text style={{ marginLeft: 20 }} note>{_msToTime(t.track.duration_ms)}</Text>
                                            <Button style={{ marginLeft: 20, borderColor: spotifyTheme.secondaryColor, borderWidth: 1 }} light color={spotifyTheme.secondaryColor} rounded icon onPress={() => _onPlayPreview(t.track.id, t.track.type === 'track' ? t.track.preview_url : '')}>
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
                                            <Text style={{ marginLeft: 20 }} note>{_msToTime(t.track.duration_ms)}</Text>
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
