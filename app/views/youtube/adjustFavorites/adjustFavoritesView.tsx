import { Body, Button, Content, H1, Icon, Left, List, ListItem, Right, Spinner, SwipeRow, Text, Thumbnail, View } from 'native-base';
import React from 'react';
import { PlaylistItem, SearchResult, Video } from '../../../youtubeApi/youtube-api-models';
import { youtubeTheme } from '../../theme';
import ModalPopup, { ModalType } from '../../utils/modalPopup';
import { IYoutubeNavigationProps, YoutubeViewType } from '../../youtubeView';
import useFetchAdjustFavorites from './useFetchAdjustFavorites';
import useSearch from './useSearch';

export interface IProps extends IYoutubeNavigationProps { }

export interface IAdjustableVideo {
    playlistItem: PlaylistItem;
    video: Video;
}

const AdjustFavoritesView: React.FunctionComponent<IProps> = (props: IProps) => {
    const { adjustableVideos, progress, loaded, replace } = useFetchAdjustFavorites();
    const { searchResults, openSearch } = useSearch();
    const [adjustableVideo, setAdjustableVideo] = React.useState<IAdjustableVideo | undefined>(undefined);

    const onSearch = React.useCallback((adjustableVideo: IAdjustableVideo) => {
        if (adjustableVideo.video.snippet?.title) {
            setAdjustableVideo(adjustableVideo);
            openSearch(adjustableVideo.video.snippet?.title);
        }
    }, []);

    const onReplace = React.useCallback(async (searchResult: SearchResult) => {
        if (adjustableVideo) {
            await replace(searchResult, adjustableVideo)
            await openSearch(undefined);
        }
    }, [adjustableVideo]);

    const modalOkCallback = React.useCallback(async () => {
        // do nothing
    }, []);

    const modalCancelCallback = React.useCallback(async () => {
        await openSearch(undefined);
    }, []);

    return (
        <>
            {
                props.selectedView === YoutubeViewType.ADJUST_FAVORITES &&
                <>
                    <ModalPopup
                        backgroundColor={youtubeTheme.primaryBackgroundColor}
                        cancelCallback={modalCancelCallback}
                        okCallback={modalOkCallback}
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
                                        adjustableVideo &&
                                        <Button success onPress={() => onReplace(s)}>
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
                                        adjustableVideos.map((v, i) =>
                                            <ListItem thumbnail key={i}>
                                                <Left>
                                                    {
                                                        v.video.snippet?.thumbnails?.medium?.url &&
                                                        <Thumbnail source={{ uri: v.video.snippet?.thumbnails?.medium?.url }} />
                                                    }
                                                </Left>
                                                <Body>
                                                    <Text style={{ color: "white" }}>{v.video.snippet?.title}</Text>
                                                    <Text note style={{ textAlignVertical: 'center' }} numberOfLines={1}>{v.video.snippet?.channelTitle}</Text>
                                                    <Text note style={{ textAlignVertical: 'center' }} numberOfLines={1}>{v.video.statistics?.viewCount} views</Text>
                                                </Body>
                                                <Right>
                                                    <Button rounded icon light onPress={() => onSearch(v)}>
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
