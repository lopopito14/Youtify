import { Body, Button, Card, CardItem, Content, H1, H2, Icon, Left, List, ListItem, Spinner, Text, Thumbnail, View } from 'native-base';
import React from 'react';
import Context from '../../store/context';
import { youtubeTheme } from '../theme';
import Sound from 'react-native-sound';
import { YoutubeViewType } from '../youtubeView';
import { Playlist, Video } from '../../youtubeApi/youtube-api-models';
import { PlaylistItems } from '../../youtubeApi/youtube-api-playlistItems';
import { pushYoutubeErrorNotification } from '../../store/types/notifications_actions';
import YoutubePlayer, { YoutubeIframeRef } from "react-native-youtube-iframe";
import { Image } from 'react-native';
import { Videos } from '../../youtubeApi/youtube-api-videos';

interface IProps {
    selectedView: YoutubeViewType;
    setselectedView(view: YoutubeViewType): any;
    playlist: Playlist;
}

const PlaylistView: React.FunctionComponent<IProps> = (props: IProps) => {
    const { state, dispatch } = React.useContext(Context);

    const [loaded, setLoaded] = React.useState(true);
    const [youtubeVideos, setYoutubeVideos] = React.useState<Video[]>([]);
    const [pageToken, setpageToken] = React.useState<string | undefined>(undefined);
    const [videoIdPlaying, setVideoIdPlaying] = React.useState<string | undefined>(undefined);
    const [sound, setsound] = React.useState<Sound | undefined>(undefined);

    const playerRef = React.useRef<YoutubeIframeRef>(null);

    React.useEffect(() => {
        _fetchPlaylistVideos();
    }, [props.playlist]);

    React.useEffect(() => {
        if (pageToken) {
            _fetchPlaylistVideos(pageToken);
        }
    }, [pageToken]);

    React.useEffect(() => {
        if (props.selectedView !== YoutubeViewType.PLAYLIST) {
            if (sound) {
                sound.pause();
                sound.release();
                setsound(undefined);
                setVideoIdPlaying(undefined);
            }
        }
    }, [props.selectedView]);

    async function _fetchPlaylistVideos(pageToken: string | undefined = undefined) {
        try {
            var playlistItemsResponse = await new PlaylistItems(state.youtubeState.credential.accessToken).list({
                playlistId: props.playlist.id ? props.playlist.id : '',
                part: ['contentDetails'],
                maxResults: 50,
                pageToken: pageToken
            });
            if (playlistItemsResponse) {

                if (playlistItemsResponse.items) {
                    let videosIds: string[] = [];

                    playlistItemsResponse.items.forEach(i => {
                        if (i.contentDetails?.videoId) {
                            videosIds.push(i.contentDetails?.videoId);
                        }
                    });

                    var videosResponse = await new Videos(state.youtubeState.credential.accessToken).list({
                        id: videosIds,
                        part: ['snippet', 'contentDetails', 'statistics'],
                        maxResults: 50,
                    });

                    if (videosResponse && videosResponse.items) {
                        const items = videosResponse.items;
                        setYoutubeVideos((prev) => {
                            return [...prev, ...items]
                        });
                    }
                }

                if (playlistItemsResponse.nextPageToken) {
                    setpageToken(playlistItemsResponse.nextPageToken);
                } else {
                    setLoaded(true);
                    setpageToken(undefined);
                }
            }
        } catch (error) {
            dispatch(pushYoutubeErrorNotification(error));
        }
    }

    const _onStateChange = React.useCallback((state: String) => {
        if (state === "ended") {
            setVideoIdPlaying(undefined);
        }
    }, []);

    const _onError = React.useCallback((error: String) => {
        console.log(error);
    }, []);

    const _playBackward = React.useCallback(
        () => {
            playerRef.current?.getCurrentTime().then(currentTime =>
                playerRef.current?.seekTo(currentTime - 30, false)
            );
        },
        [],
    );

    const _togglePlaying = React.useCallback((videoId: string) => {
        setVideoIdPlaying((prev) => {
            const sameVideo = videoId === prev;
            if (sameVideo) {
                return undefined;
            } else {
                return videoId;
            }
        });
    }, []);

    const _playForward = React.useCallback(
        () => {
            playerRef.current?.getCurrentTime().then(currentTime =>
                playerRef.current?.seekTo(currentTime + 30, true)
            );
        },
        [],
    );

    return (
        <>
            {
                props.selectedView === YoutubeViewType.PLAYLIST &&
                <Content style={{ backgroundColor: youtubeTheme.secondaryColor }}>
                    {
                        loaded && youtubeVideos &&
                        <>
                            {
                                videoIdPlaying &&
                                <YoutubePlayer
                                    ref={playerRef}
                                    height={0}
                                    play={videoIdPlaying !== undefined}
                                    videoId={videoIdPlaying}
                                    onChangeState={_onStateChange}
                                    onError={_onError}
                                    initialPlayerParams={{ controls: false, preventFullScreen: true, start: 30 }}
                                />
                            }
                            <Card style={{ margin: 5 }}>
                                <CardItem header style={{ backgroundColor: youtubeTheme.secondaryBackgroundColor }}>
                                    <Body>
                                        <H1>{props.playlist.snippet?.title}</H1>
                                    </Body>
                                </CardItem>
                                <CardItem cardBody style={{ backgroundColor: youtubeTheme.secondaryBackgroundColor }}>
                                    {
                                        props.playlist.snippet?.thumbnails?.medium?.url &&
                                        <Thumbnail square source={{ uri: props.playlist.snippet?.thumbnails.medium?.url }} style={{ height: 180, flex: 1 }} />
                                    }
                                </CardItem>
                                <CardItem style={{ backgroundColor: youtubeTheme.secondaryBackgroundColor }}>
                                    <Left>
                                        <H2>Videos:</H2>
                                    </Left>
                                </CardItem>
                                <List>
                                    {
                                        youtubeVideos.map((video, i) =>
                                            <ListItem key={i}>
                                                <Text style={{ marginRight: 10 }}>{i + 1}</Text>
                                                <Body>
                                                    <Text style={{ textAlignVertical: 'center' }} numberOfLines={3}>{video.snippet?.title}</Text>
                                                    <Text note style={{ textAlignVertical: 'center' }} numberOfLines={1}>{video.snippet?.channelTitle}</Text>
                                                    <Text note style={{ textAlignVertical: 'center' }} numberOfLines={1}>{video.statistics?.viewCount} views</Text>
                                                </Body>
                                                {
                                                    video.id && video.snippet?.thumbnails?.medium?.url &&
                                                    <View style={{ height: 90, width: 160, backgroundColor: "red" }}>
                                                        <Image source={{ uri: video.snippet?.thumbnails?.medium?.url }} style={{ height: 90, width: 160 }} />
                                                        {
                                                            video.id === videoIdPlaying &&
                                                            <Button light onPress={_playBackward} style={{ position: 'absolute', bottom: 0, left: 10, right: 100, borderColor: youtubeTheme.secondaryColor, borderWidth: 1 }} rounded icon color={youtubeTheme.secondaryColor}>
                                                                <Icon name='step-backward' type='FontAwesome' />
                                                            </Button>
                                                        }
                                                        <Button light onPress={() => _togglePlaying(video.id ? video.id : '')} style={{ position: 'absolute', top: video.id === videoIdPlaying ? 0 : 25, left: 50, borderColor: youtubeTheme.secondaryColor, borderWidth: 1 }} rounded icon color={youtubeTheme.secondaryColor}>
                                                            <Icon android={video.id === videoIdPlaying ? "md-pause" : "md-play"} ios={video.id === videoIdPlaying ? "md-pause" : "md-play"} />
                                                        </Button>
                                                        {
                                                            video.id === videoIdPlaying &&
                                                            <Button light onPress={_playForward} style={{ position: 'absolute', bottom: 0, left: 100, right: 10, borderColor: youtubeTheme.secondaryColor, borderWidth: 1 }} rounded icon color={youtubeTheme.secondaryColor}>
                                                                <Icon name='step-forward' type='FontAwesome' />
                                                            </Button>
                                                        }
                                                    </View>
                                                }
                                            </ListItem>

                                        )
                                    }
                                </List>
                            </Card>
                        </>
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
