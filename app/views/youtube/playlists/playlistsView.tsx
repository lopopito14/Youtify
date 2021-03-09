import { Body, Button, Icon, Left, ListItem, Right, Spinner, Text, Thumbnail } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { IYoutubeNavigationProps, YoutubeViewType } from '../../../interfaces/youtubeInterfaces';
import { Playlist } from '../../../youtubeApi/youtube-api-models';
import { youtubeTheme } from '../../theme';
import { defaultThumbnail } from '../../utils/helpers';
import RefreshableList from '../../utils/refreshableList';
import PlaylistView from '../playlist/playlistView';
import useFetchPlaylists from './useFetchPlaylists';

type IProps = IYoutubeNavigationProps

const PlaylistsView: React.FunctionComponent<IProps> = (props: IProps) => {
    const { selectedView, setSelectedView } = props;

    const { playlists, loaded, loadPlaylist, refreshPlaylist } = useFetchPlaylists();
    const [selectedPlaylist, setSelectedPlaylist] = React.useState<Playlist | undefined>(undefined);

    React.useEffect(() => {
        if (selectedView === YoutubeViewType.PLAYLISTS) {
            setSelectedPlaylist(undefined);
        }
    }, [selectedView]);

    const onOpenPlaylist = React.useCallback((playlist: Playlist) => {
        setSelectedPlaylist(playlist);
        setSelectedView(YoutubeViewType.PLAYLIST);
    }, [setSelectedView]);

    return (
        <>
            {
                selectedView === YoutubeViewType.PLAYLISTS &&
                <RefreshableList onRefresh={refreshPlaylist} backgroundColor={youtubeTheme.secondaryColor} lazyLoading onLoad={loadPlaylist}>
                    {
                        playlists.map((p) =>
                            <ListItem thumbnail key={p.id}>
                                <Left>
                                    <Thumbnail source={{ uri: p.snippet?.thumbnails?.medium?.url ? p.snippet?.thumbnails?.medium?.url : defaultThumbnail }} />
                                </Left>
                                <Body>
                                    <Text style={styles.titleStyle}>{p.snippet?.title}</Text>
                                    <Text note numberOfLines={1}>{p.contentDetails?.itemCount} videos.</Text>
                                </Body>
                                <Right>
                                    <Button iconRight light onPress={() => onOpenPlaylist(p)}>
                                        <Text>Manage</Text>
                                        <Icon name='arrow-forward' />
                                    </Button>
                                </Right>
                            </ListItem>
                        )
                    }
                    {
                        !loaded && <Spinner color={youtubeTheme.primaryColor} />
                    }
                </RefreshableList>
            }
            {
                selectedView === YoutubeViewType.PLAYLIST && selectedPlaylist &&
                <PlaylistView selectedView={selectedView} setSelectedView={setSelectedView} playlist={selectedPlaylist} />
            }
        </>
    )
}

const styles = StyleSheet.create({
    titleStyle: {
        color: "white"
    }
});

export default PlaylistsView;