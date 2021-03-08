import { Body, Button, Icon, Left, ListItem, Right, Spinner, Text, Thumbnail } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import RefreshableList from '../../utils/refreshableList';
import { spotifyTheme } from '../../theme';
import PlaylistView from '../playlist/playlistView';
import useFetchPlaylists from './useFetchPlaylists';
import { defaultThumbnail } from '../../utils/helpers';
import { ISpotifyNavigationProps, SpotifyViewType } from '../../../interfaces/spotifyInterfaces';

type IProps = ISpotifyNavigationProps

const PlaylistsView: React.FunctionComponent<IProps> = (props: IProps) => {

    const { selectedView, setSelectedView } = props;

    const { playlists, loaded, loadPlaylists, refreshPlaylists } = useFetchPlaylists();
    const [selectedPlaylistId, setselectedPlaylistId] = React.useState<string | undefined>(undefined);

    React.useEffect(() => {
        if (selectedView === SpotifyViewType.PLAYLISTS) {
            setselectedPlaylistId(undefined);
        }
    }, [selectedView]);

    const onOpenPlaylist = React.useCallback((id: string) => {
        setselectedPlaylistId(id);
        setSelectedView(SpotifyViewType.PLAYLIST);
    }, []);

    return (
        <>
            {
                selectedView === SpotifyViewType.PLAYLISTS &&
                <RefreshableList onRefresh={refreshPlaylists} backgroundColor={spotifyTheme.secondaryColor} lazyLoading onLoad={loadPlaylists}>
                    {
                        playlists.map((p) =>
                            <ListItem thumbnail key={p.id}>
                                <Left>
                                    <Thumbnail source={{ uri: p.images && p.images.length >= 3 ? p.images[2].url : defaultThumbnail }} />
                                </Left>
                                <Body>
                                    <Text style={styles.titleStyle}>{p.name}</Text>
                                    <Text note numberOfLines={1}>{p.tracks.total} tracks</Text>
                                </Body>
                                <Right>
                                    <Button iconRight light onPress={() => onOpenPlaylist(p.id)} disabled={p.tracks.total === 0}>
                                        <Text style={{ opacity: p.tracks.total === 0 ? 0.1 : 1 }}>Manage</Text>
                                        <Icon name='arrow-forward' />
                                    </Button>
                                </Right>
                            </ListItem>
                        )
                    }
                    {
                        !loaded && <Spinner color={spotifyTheme.primaryColor} />
                    }
                </RefreshableList>
            }
            {
                selectedView !== SpotifyViewType.PLAYLISTS && selectedPlaylistId &&
                <PlaylistView selectedView={selectedView} setSelectedView={setSelectedView} playlistId={selectedPlaylistId} />
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