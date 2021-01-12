import { Body, Button, Card, CardItem, Content, H1, H2, Icon, Left, Spinner, Text, Thumbnail } from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import Context from '../../store/context';
import { youtubeTheme } from '../theme';
import Sound from 'react-native-sound';
import { YoutubeViewType } from '../youtubeView';
import { ErrorResponseException, Playlist, PlaylistItem } from '../../youtubeApi/youtube-api-models';
import { PlaylistItems } from '../../youtubeApi/youtube-api-playlistItems';

interface IProps {
    selectedView: YoutubeViewType;
    setselectedView(view: YoutubeViewType): any;
    playlist: Playlist;
}

const PlaylistView: React.FunctionComponent<IProps> = (props: IProps) => {
    const [playlistItems, setPlaylistItems] = useState<PlaylistItem[]>([]);
    const { state } = useContext(Context);
    const [loaded, setLoaded] = useState(true);
    const [pageToken, setpageToken] = useState<string | undefined>(undefined);
    const [trackIdPlaying, setTrackIdPlaying] = useState<string | undefined>(undefined);
    const [sound, setsound] = useState<Sound | undefined>(undefined);

    useEffect(() => {
        _fetchPlaylistItems();
    }, [props.playlist]);

    useEffect(() => {
        if (props.selectedView !== YoutubeViewType.Playlist) {
            if (sound) {
                sound.pause();
                sound.release();
                setsound(undefined);
                setTrackIdPlaying(undefined);
            }
        }
    }, [props.selectedView]);

    async function _fetchPlaylistItems() {
        try {
            var response = await new PlaylistItems(state.youtubeState.credential.accessToken).list({
                playlistId: props.playlist.id ? props.playlist.id : '',
                part: ['snippet', 'contentDetails'],
                maxResults: 50,
                pageToken: pageToken
            });
            if (response && response.items) {
                if (pageToken) {
                    setPlaylistItems([...playlistItems, ...response.items]);
                }
                else {
                    setPlaylistItems(response.items);
                }

                if (response.nextPageToken) {
                    setpageToken(response.nextPageToken);
                } else {
                    setLoaded(true);
                    setpageToken(undefined);
                }
            }
        } catch (error) {
            if (error instanceof ErrorResponseException) {
                console.log(error.errorResponse.error.message);
            } else {
                console.log('Error => ' + error);
            }
        }
    }

    // function _msToTime(milliseconds: number) {
    //     var seconds = Math.floor((milliseconds / 1000) % 60);
    //     var minutes = Math.floor((milliseconds / (1000 * 60)) % 60);

    //     const minutesString = (minutes < 10) ? "0" + minutes : minutes;
    //     const secondsString = (seconds < 10) ? "0" + seconds : seconds;

    //     return minutesString + ":" + secondsString;
    // }

    // function _onPlayPreview(trackId: string, url: string) {
    //     if (sound) {
    //         sound.pause();
    //         sound.release();
    //         setsound(undefined);
    //         if (trackId === trackIdPlaying) {
    //             setTrackIdPlaying(undefined);
    //             return;
    //         }
    //     }

    //     setTrackIdPlaying(trackId);
    //     const track = new Sound(url, Sound.MAIN_BUNDLE, (e) => {
    //         if (e) {
    //             console.log('failed to load the sound', e);
    //             return;
    //         }
    //         // loaded successfully
    //         console.log('duration in seconds: ' + track.getDuration() + 'number of channels: ' + track.getNumberOfChannels());

    //         // Play the sound with an onEnd callback
    //         track.play((success) => {
    //             if (success) {
    //                 console.log('successfully finished playing');
    //             } else {
    //                 console.log('playback failed due to audio decoding errors');
    //             }
    //             setTrackIdPlaying(undefined);
    //         });
    //     });

    //     setsound(track);
    // }

    return (
        <>
            {
                props.selectedView === YoutubeViewType.Playlist &&
                <Content style={{ backgroundColor: youtubeTheme.secondaryColor }}>
                    {
                        loaded && playlistItems &&
                        (<Card style={{ margin: 5 }}>
                            <CardItem header style={{ backgroundColor: youtubeTheme.secondaryBackgroundColor }}>
                                <Body>
                                    <H1>{props.playlist.snippet?.title}</H1>
                                </Body>
                            </CardItem>
                            <CardItem style={{ backgroundColor: youtubeTheme.secondaryBackgroundColor }}>
                                {
                                    props.playlist.snippet?.thumbnails?.medium?.url &&
                                    <Thumbnail source={{ uri: props.playlist.snippet?.thumbnails.medium?.url }} style={{ height: 180, flex: 1 }} />
                                }
                            </CardItem>
                            <CardItem style={{ backgroundColor: youtubeTheme.secondaryBackgroundColor }}>
                                <Left>
                                    <H2>Videos:</H2>
                                </Left>
                            </CardItem>
                            {
                                playlistItems.map((item, i) =>
                                    <CardItem bordered key={i} style={{ backgroundColor: youtubeTheme.secondaryBackgroundColor }}>
                                        <Text style={{ marginRight: 20 }}>{i}</Text>
                                        <Body>
                                            <Text style={{ textAlignVertical: 'center' }} numberOfLines={1}>{item.snippet?.title}</Text>
                                            <Text note style={{ textAlignVertical: 'center' }} numberOfLines={1}>{item.snippet?.channelTitle}</Text>
                                        </Body>
                                        <Button style={{ marginLeft: 20, borderColor: youtubeTheme.secondaryColor, borderWidth: 1 }} light color={youtubeTheme.secondaryColor} rounded icon>
                                            <Icon android={item.id === trackIdPlaying ? "md-pause" : "md-play"} ios={item.id === trackIdPlaying ? "md-pause" : "md-play"} />
                                        </Button>
                                    </CardItem>

                                )
                            }
                        </Card>)
                    }
                    {
                        !loaded && <Spinner color={youtubeTheme.primaryColor} />
                    }
                </Content>
            }
        </>
    )
}

export default PlaylistView
