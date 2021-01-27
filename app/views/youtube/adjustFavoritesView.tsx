import { Body, Button, Content, H1, Icon, Left, List, ListItem, Right, Spinner, Text, Thumbnail } from 'native-base';
import React from 'react';
import Context from '../../store/context';
import { pushYoutubeErrorNotification } from '../../store/types/notifications_actions';
import { Video } from '../../youtubeApi/youtube-api-models';
import { PlaylistItems } from '../../youtubeApi/youtube-api-playlistItems';
import { Search } from '../../youtubeApi/youtube-api-search';
import { Videos } from '../../youtubeApi/youtube-api-videos';
import { youtubeTheme } from '../theme';
import { YoutubeViewType } from '../youtubeView';

export interface IProps {
    selectedView: YoutubeViewType;
    setselectedView(view: YoutubeViewType): any;
}

const AdjustFavoritesView: React.FunctionComponent<IProps> = (props: IProps) => {
    const { state, dispatch } = React.useContext(Context);

    const [loaded, setLoaded] = React.useState(false);
    const [progress, setProgress] = React.useState(0);
    const [youtubeVideos, setYoutubeVideos] = React.useState<Video[]>([]);
    const [pageToken, setpageToken] = React.useState<string | undefined>(undefined);

    const favoritePlaylistId = "FL65Vblm8jhqYm8-0QPi3Z6A";

    const filteredChannelIds = [
        "UC6murUWtqOwnTL68pwjoGjQ",
        "UCv-XlFFGN30KJkG8BhvF7nA",
        "UCBOQta0mgFd7a9Ss3CYbXAA",
        "UCQxonuu3uUCnt7DdV9KZljA",
        "UCzH6Fc7Ba-S4U83P5ZR6dLA",
        "UCuSoYG4BvzRVnNfkwXICBpg"
    ];

    React.useEffect(() => {
        _fetchFavoriteVideos();
    }, []);

    React.useEffect(() => {
        if (pageToken) {
            _fetchFavoriteVideos(pageToken);
        }
    }, [pageToken]);

    async function _fetchFavoriteVideos(pageToken: string | undefined = undefined) {

        try {
            var playlistItemsResponse = await new PlaylistItems(state.youtubeState.credential.accessToken).list({
                playlistId: favoritePlaylistId,
                part: ['contentDetails'],
                maxResults: 50,
                pageToken: pageToken
            });
            if (playlistItemsResponse) {

                if (playlistItemsResponse.items) {

                    setProgress((prev) => {
                        let result = prev;
                        if (playlistItemsResponse.pageInfo &&
                            playlistItemsResponse.pageInfo.totalResults &&
                            playlistItemsResponse.items) {
                            result += 100 * (playlistItemsResponse.items.length / playlistItemsResponse.pageInfo.totalResults)
                        }
                        return result;
                    });

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
                        const items = videosResponse.items.filter(v => v.snippet?.channelId && filteredChannelIds.includes(v.snippet?.channelId));
                        setYoutubeVideos((prev) => {
                            return [...prev, ...items]
                        });
                    }
                }

                // todo => remove
                playlistItemsResponse.nextPageToken = undefined;

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

    const _onOpenSearch = React.useCallback((video: Video) => {
        _search(video);
    }, []);

    async function _search(video: Video) {
        try {

            let publishedBefore = undefined;
            let publishedAfter = undefined;

            if (video.snippet?.publishedAt) {
                const date = new Date(video.snippet?.publishedAt);
                const startDate = new Date(date.setMonth(date.getMonth() - 3));
                const endDate = new Date(date.setMonth(date.getMonth() + 6));

                publishedBefore = endDate.toISOString();
                publishedAfter = startDate.toISOString();

                publishedBefore = publishedBefore.slice(0, 19) + publishedBefore.slice(23);
                publishedAfter = publishedAfter.slice(0, 19) + publishedAfter.slice(23);
            }

            const searchResponse = await new Search(state.youtubeState.credential.accessToken).list({
                maxResults: 10,
                publishedBefore: publishedBefore,
                publishedAfter: publishedAfter,
                part: ['snippet'],
                q: video?.snippet?.title ? video.snippet.title : ''
            });
            if (searchResponse) {
                searchResponse.items?.forEach(i => {
                    console.log('#############');
                    console.log(i.snippet?.title);
                    console.log(i.snippet?.channelTitle);
                    console.log('#############');
                })
            }
        } catch (error) {
            dispatch(pushYoutubeErrorNotification(error));
        }
    }

    return (
        <>
            {
                props.selectedView === YoutubeViewType.ADJUST_FAVORITES &&
                <Content style={{ backgroundColor: youtubeTheme.secondaryColor }}>
                    {
                        loaded && youtubeVideos &&
                        <>
                            <H1 style={{ color: "white" }}>Issues {youtubeVideos.length}</H1>
                            <List>
                                {
                                    youtubeVideos.map((video, i) =>
                                        <ListItem thumbnail key={i}>
                                            <Left>
                                                {
                                                    video.snippet?.thumbnails?.medium?.url &&
                                                    <Thumbnail source={{ uri: video.snippet?.thumbnails?.medium?.url }} />
                                                }
                                            </Left>
                                            <Body>
                                                <Text style={{ color: "white" }}>{video.snippet?.title}</Text>
                                                <Text note style={{ textAlignVertical: 'center' }} numberOfLines={1}>{video.snippet?.channelTitle}</Text>
                                                <Text note style={{ textAlignVertical: 'center' }} numberOfLines={1}>{video.statistics?.viewCount} views</Text>
                                            </Body>
                                            <Right>
                                                <Button rounded icon light onPress={() => _onOpenSearch(video)}>
                                                    <Icon name='arrow-forward' />
                                                </Button>
                                            </Right>
                                        </ListItem>
                                    )
                                }
                            </List>
                        </>
                    }
                    {
                        !loaded &&
                        <>
                            <Spinner color={youtubeTheme.primaryColor} />
                            <Text style={{ color: "white" }}>{progress}</Text>
                        </>
                    }
                </Content>
            }
            {/* {
                props.selectedView !== YoutubeViewType.PLAYLISTS && selectedPlaylist &&
                <PlaylistView selectedView={props.selectedView} setselectedView={props.setselectedView} playlist={selectedPlaylist} />
            } */}
        </>
    )
}

export default AdjustFavoritesView
