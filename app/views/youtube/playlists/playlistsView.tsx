import { Body, Button, Icon, Left, ListItem, Right, Spinner, Text, Thumbnail } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Playlist } from '../../../youtubeApi/youtube-api-models';
import { youtubeTheme } from '../../theme';
import { defaultThumbnail } from '../../utils/helpers';
import RefreshableList from '../../utils/refreshableList';
import { IYoutubeNavigationProps, YoutubeViewType } from '../../youtubeView';
import PlaylistView from '../playlist/playlistView';
import useFetchPlaylists from './useFetchPlaylists';

interface IProps extends IYoutubeNavigationProps { }

const PlaylistsView: React.FunctionComponent<IProps> = (props: IProps) => {

    const { playlists, loaded, loadPlaylist, refreshPlaylist } = useFetchPlaylists();
    const [selectedPlaylist, setSelectedPlaylist] = React.useState<Playlist | undefined>(undefined);

    React.useEffect(() => {
        if (props.selectedView === YoutubeViewType.PLAYLISTS) {
            setSelectedPlaylist(undefined);
        }
    }, [props.selectedView]);

    const onOpenPlaylist = React.useCallback((playlist: Playlist) => {
        setSelectedPlaylist(playlist);
        props.setSelectedView(YoutubeViewType.PLAYLIST);
    }, []);

    return (
        <>
            {
                props.selectedView === YoutubeViewType.PLAYLISTS &&
                <RefreshableList onRefresh={refreshPlaylist} backgroundColor={youtubeTheme.secondaryColor} lazyLoading={true} onLoad={loadPlaylist}>
                    {
                        playlists.map((p, i) =>
                            <ListItem thumbnail key={i}>
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
                props.selectedView !== YoutubeViewType.PLAYLISTS && selectedPlaylist &&
                <PlaylistView selectedView={props.selectedView} setSelectedView={props.setSelectedView} playlist={selectedPlaylist} />
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