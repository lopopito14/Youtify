import { Body, Button, Content, H1, Icon, Left, List, ListItem, Right, Spinner, SwipeRow, Text, Thumbnail, View } from 'native-base';
import React from 'react';
import Context from '../../store/context';
import { pushYoutubeErrorNotification } from '../../store/types/notifications_actions';
import { PlaylistItem, SearchResult, Video } from '../../youtubeApi/youtube-api-models';
import { PlaylistItems } from '../../youtubeApi/youtube-api-playlistItems';
import { Search } from '../../youtubeApi/youtube-api-search';
import { Videos } from '../../youtubeApi/youtube-api-videos';
import { youtubeTheme } from '../theme';
import ModalPopup, { ModalType } from '../utils/modalPopup';
import { YoutubeViewType } from '../youtubeView';

export interface IProps {
    selectedView: YoutubeViewType;
    setselectedView(view: YoutubeViewType): any;
}

interface IAdjustableVideo {
    playlistItem: PlaylistItem;
    video: Video;
}

const AdjustFavoritesView: React.FunctionComponent<IProps> = (props: IProps) => {
    const { state, dispatch } = React.useContext(Context);

    const [loaded, setLoaded] = React.useState(false);
    const [progress, setProgress] = React.useState(0);
    const [adjustableVideos, setAdjustableVideos] = React.useState<IAdjustableVideo[]>([]);
    const [pageToken, setpageToken] = React.useState<string | undefined>(undefined);
    const [adjustableVideo, setAdjustableVideo] = React.useState<IAdjustableVideo | undefined>(undefined);
    const [searchResults, setSearchResults] = React.useState<SearchResult[] | undefined>(undefined);

    const favoritePlaylistId = "FL65Vblm8jhqYm8-0QPi3Z6A";

    const filteredChannelIds = [
        "UC6murUWtqOwnTL68pwjoGjQ",
        "UCv-XlFFGN30KJkG8BhvF7nA",
        "UCBOQta0mgFd7a9Ss3CYbXAA",
        "UCQxonuu3uUCnt7DdV9KZljA",
        "UCzH6Fc7Ba-S4U83P5ZR6dLA",
        "UCuSoYG4BvzRVnNfkwXICBpg",
        "UC67WZta3Qqm-P2Eu3fej1bw"
    ];

    React.useEffect(() => {
        if (!loaded) {
            _fetchFavoriteVideos();
        }
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
                part: ['snippet', 'contentDetails'],
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
                        const videos = videosResponse.items.filter(v => v.snippet?.channelId && filteredChannelIds.includes(v.snippet?.channelId));

                        let adjustableVideos: IAdjustableVideo[] = [];

                        videos.forEach(video => {
                            const playlistItem = playlistItemsResponse.items?.find(p => p.contentDetails?.videoId === video.id);
                            if (playlistItem) {
                                adjustableVideos.push({
                                    playlistItem: playlistItem,
                                    video: video
                                });
                            }
                        });

                        setAdjustableVideos((prev) => {
                            return [...prev, ...adjustableVideos]
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

    const _onOpenSearch = React.useCallback((adjustableVideo: IAdjustableVideo) => {
        _search(adjustableVideo);
    }, []);

    async function _search(adjustableVideo: IAdjustableVideo) {
        try {
            let publishedBefore = undefined;
            let publishedAfter = undefined;

            /*if (adjustableVideo.video.snippet?.publishedAt) {
                const date = new Date(adjustableVideo.video.snippet?.publishedAt);
                const startDate = new Date(date.setMonth(date.getMonth() - 6));
                const endDate = new Date(date.setMonth(date.getMonth() + 12));

                publishedBefore = endDate.toISOString();
                publishedAfter = startDate.toISOString();

                publishedBefore = publishedBefore.slice(0, 19) + publishedBefore.slice(23);
                publishedAfter = publishedAfter.slice(0, 19) + publishedAfter.slice(23);
            }*/

            const searchResponse = await new Search(state.youtubeState.credential.accessToken).list({
                maxResults: 10,
                publishedBefore: publishedBefore,
                publishedAfter: publishedAfter,
                part: ['snippet'],
                q: adjustableVideo.video.snippet?.title ? adjustableVideo.video.snippet.title : ''
            });
            if (searchResponse && searchResponse.items) {
                setAdjustableVideo(adjustableVideo);
                setSearchResults(searchResponse.items);
            }
        } catch (error) {
            dispatch(pushYoutubeErrorNotification(error));
        }
    }

    const _onReplace = React.useCallback((searchResult: SearchResult) => {
        if (adjustableVideo) {
            _replace(searchResult, adjustableVideo);
        }
    }, [adjustableVideo]);

    async function _replace(searchResult: SearchResult, adjustableVideo: IAdjustableVideo) {

        // remove the old one
        async function _remove() {
            try {
                if (adjustableVideo.playlistItem.id) {
                    await new PlaylistItems(state.youtubeState.credential.accessToken).delete({
                        id: adjustableVideo.playlistItem.id
                    });
                }
            } catch (error) {
                console.error(error);
                dispatch(pushYoutubeErrorNotification(error));
            }
        }

        // insert the new one
        async function _insert() {
            try {
                await new PlaylistItems(state.youtubeState.credential.accessToken).insert({
                    part: ['snippet'],
                    requestBody: {
                        snippet: {
                            position: adjustableVideo.playlistItem.snippet?.position,
                            playlistId: favoritePlaylistId,
                            resourceId: searchResult.id
                        },
                        id: adjustableVideo.playlistItem.id
                    }
                });

            } catch (error) {
                console.error(error);
                dispatch(pushYoutubeErrorNotification(error));
            }
        }

        await Promise.all([_remove(), _insert()]);

        setAdjustableVideos((prev) => {
            return prev.filter((i) => i.playlistItem.id !== adjustableVideo.playlistItem.id);
        });

        setSearchResults(undefined);
    }

    return (
        <>
            {
                props.selectedView === YoutubeViewType.ADJUST_FAVORITES &&
                <>
                    <ModalPopup
                        backgroundColor={youtubeTheme.primaryBackgroundColor}
                        cancelCallback={() => setSearchResults(undefined)}
                        okCallback={() => { }}
                        title='Search'
                        type={ModalType.CANCEL}
                        visible={searchResults !== undefined}
                    >
                        {
                            searchResults &&
                            searchResults.map((s, i) =>
                                <SwipeRow
                                    key={i}
                                    disableRightSwipe={true}
                                    rightOpenValue={-75}
                                    stopRightSwipe={-75}
                                    body={
                                        <View style={{ flexDirection: 'row' }}>
                                            {
                                                s.snippet?.thumbnails?.medium?.url &&
                                                <Thumbnail source={{ uri: s.snippet?.thumbnails?.medium?.url }} style={{ width: 80, height: 80 }} />
                                            }
                                            <View style={{ marginLeft: 5, alignSelf: 'center' }}>
                                                <Text numberOfLines={3} style={{ maxWidth: 250 }}>{s.snippet?.title}</Text>
                                                <Text note>{s.snippet?.channelTitle}</Text>
                                            </View>
                                        </View>
                                    }
                                    right={
                                        <Button success onPress={() => _onReplace(s)}>
                                            <Icon active name="add" />
                                        </Button>
                                    }
                                />
                            )
                        }
                    </ModalPopup>
                    <Content style={{ backgroundColor: youtubeTheme.secondaryColor }}>
                        {
                            loaded && adjustableVideos &&
                            <>
                                <H1 style={{ color: "white" }}>Issues {adjustableVideos.length}</H1>
                                <List>
                                    {
                                        adjustableVideos.map((adjustableVideo, i) =>
                                            <ListItem thumbnail key={i}>
                                                <Left>
                                                    {
                                                        adjustableVideo.video.snippet?.thumbnails?.medium?.url &&
                                                        <Thumbnail source={{ uri: adjustableVideo.video.snippet?.thumbnails?.medium?.url }} />
                                                    }
                                                </Left>
                                                <Body>
                                                    <Text style={{ color: "white" }}>{adjustableVideo.video.snippet?.title}</Text>
                                                    <Text note style={{ textAlignVertical: 'center' }} numberOfLines={1}>{adjustableVideo.video.snippet?.channelTitle}</Text>
                                                    <Text note style={{ textAlignVertical: 'center' }} numberOfLines={1}>{adjustableVideo.video.statistics?.viewCount} views</Text>
                                                </Body>
                                                <Right>
                                                    <Button rounded icon light onPress={() => _onOpenSearch(adjustableVideo)}>
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
                </>
            }
        </>
    )
}

export default AdjustFavoritesView
