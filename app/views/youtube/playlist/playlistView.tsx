import { Body, Button, Card, CardItem, Content, H1, H2, Icon, Left, List, ListItem, Spinner, Text, Thumbnail, View } from 'native-base';
import React from 'react';
import YoutubePlayer, { YoutubeIframeRef } from "react-native-youtube-iframe";
import { Image, StyleSheet } from 'react-native';
import { youtubeTheme } from '../../theme';
import { Playlist } from '../../../youtubeApi/youtube-api-models';
import useFetchPlaylist from './useFetchPlaylist';
import { getYoutubeVideoDuration, msToTime } from '../../utils/helpers';
import { IYoutubeNavigationProps, YoutubeViewType } from '../../../interfaces/youtubeInterfaces';
import logger from '../../utils/logger';

interface IProps extends IYoutubeNavigationProps {
    playlist: Playlist;
}

const PlaylistView: React.FunctionComponent<IProps> = (props: IProps) => {
    const { playlist, selectedView } = props;

    const { error } = logger();

    const { youtubeVideos, loaded } = useFetchPlaylist(playlist);
    const [videoIdPlaying, setVideoIdPlaying] = React.useState<string | undefined>(undefined);

    const playerRef = React.useRef<YoutubeIframeRef>(null);

    // eslint-disable-next-line @typescript-eslint/ban-types
    const onStateChange = React.useCallback((state: String) => {
        if (state === "ended") {
            setVideoIdPlaying(undefined);
        }
    }, []);

    const onError = React.useCallback((e: string) => {
        error(e);
    }, [error]);

    const playBackward = React.useCallback(() => {
        playerRef.current?.getCurrentTime().then(currentTime =>
            playerRef.current?.seekTo(currentTime - 30, false)
        );
    }, [playerRef]);

    const togglePlaying = React.useCallback((videoId: string) => {
        setVideoIdPlaying((prev) => {
            const sameVideo = videoId === prev;
            if (sameVideo) {
                return undefined;
            }
            return videoId;

        });
    }, []);

    const playForward = React.useCallback(() => {
        playerRef.current?.getCurrentTime().then(currentTime =>
            playerRef.current?.seekTo(currentTime + 30, true)
        );
    }, [playerRef]);

    const getYoutubeDuration = (duration: string | undefined | null) => {
        if (duration) {
            return msToTime(getYoutubeVideoDuration(duration));
        }

        return '';
    }

    return (
        <>
            {
                selectedView === YoutubeViewType.PLAYLIST &&
                <Content style={styles.contentStyle}>
                    {
                        loaded &&
                        <>
                            {
                                videoIdPlaying &&
                                <YoutubePlayer
                                    ref={playerRef}
                                    height={0}
                                    play={videoIdPlaying !== undefined}
                                    videoId={videoIdPlaying}
                                    onChangeState={onStateChange}
                                    onError={onError}
                                    initialPlayerParams={{ controls: false, preventFullScreen: true, start: 30 }}
                                />
                            }
                            <Card style={styles.cardStyle}>
                                <CardItem header style={styles.cardItemStyle}>
                                    <Body>
                                        <H1>{playlist.snippet?.title}</H1>
                                    </Body>
                                </CardItem>
                                <CardItem cardBody style={styles.cardItemStyle}>
                                    {
                                        playlist.snippet?.thumbnails?.medium?.url &&
                                        <Thumbnail square source={{ uri: playlist.snippet?.thumbnails.medium?.url }} style={styles.thumbnailStyle} />
                                    }
                                </CardItem>
                                <CardItem style={styles.cardItemStyle}>
                                    <Left>
                                        <H2>Videos:</H2>
                                    </Left>
                                </CardItem>
                                <List>
                                    {
                                        youtubeVideos.map((video, i) =>
                                            <ListItem key={video.id}>
                                                <Text style={styles.numberingStyle}>{i + 1}</Text>
                                                <Body>
                                                    <Text numberOfLines={3}>{video.snippet?.title}</Text>
                                                    <Text note numberOfLines={1}>{video.snippet?.channelTitle}</Text>
                                                    <Text note numberOfLines={1}>{video.statistics?.viewCount} views</Text>
                                                    <Text note numberOfLines={1}>{getYoutubeDuration(video.contentDetails?.duration)}</Text>
                                                </Body>
                                                {
                                                    video.id && video.snippet?.thumbnails?.medium?.url &&
                                                    <View style={styles.imageContainerStyle}>
                                                        <Image source={{ uri: video.snippet?.thumbnails?.medium?.url }} style={styles.imageContainerStyle} />
                                                        {
                                                            video.id === videoIdPlaying &&
                                                            <Button light onPress={playBackward} style={{ ...styles.buttonStyle, ...styles.backwardButtonStyle }} rounded icon color={youtubeTheme.secondaryColor}>
                                                                <Icon name='step-backward' type='FontAwesome' />
                                                            </Button>
                                                        }
                                                        <Button light onPress={() => togglePlaying(video.id ? video.id : '')} style={{ ...styles.buttonStyle, ...styles.playButtonStyle, top: video.id === videoIdPlaying ? 0 : 25, }} rounded icon color={youtubeTheme.secondaryColor}>
                                                            <Icon android={video.id === videoIdPlaying ? "md-pause" : "md-play"} ios={video.id === videoIdPlaying ? "md-pause" : "md-play"} />
                                                        </Button>
                                                        {
                                                            video.id === videoIdPlaying &&
                                                            <Button light onPress={playForward} style={{ ...styles.buttonStyle, ...styles.forwardButtonStyle }} rounded icon color={youtubeTheme.secondaryColor}>
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

const styles = StyleSheet.create({
    contentStyle: {
        backgroundColor: youtubeTheme.secondaryColor,
    },
    cardStyle: {
        margin: 5
    },
    cardItemStyle: {
        backgroundColor: youtubeTheme.secondaryBackgroundColor
    },
    thumbnailStyle: {
        height: 180,
        flex: 1
    },
    numberingStyle: {
        marginRight: 5
    },
    imageContainerStyle: {
        height: 90,
        width: 160
    },
    buttonStyle: {
        position: 'absolute',
        borderColor: youtubeTheme.secondaryColor,
        borderWidth: 1
    },
    backwardButtonStyle: {
        bottom: 0,
        left: 10,
        right: 100,
    },
    playButtonStyle: {
        left: 50,
    },
    forwardButtonStyle: {
        bottom: 0,
        left: 100,
        right: 10,
    }
});

export default PlaylistView;