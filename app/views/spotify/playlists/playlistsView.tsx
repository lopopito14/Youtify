import { Body, Button, Icon, Left, ListItem, Right, Spinner, Text, Thumbnail } from 'native-base';
import React from 'react';
import RefreshableList from '../../utils/refreshableList';
import { spotifyTheme } from '../../theme';
import { ISpotifyNavigationProps, SpotifyViewType } from '../../spotifyView';
import PlaylistView from '../playlist/playlistView';
import useFetchPlaylists from './useFetchPlaylists';
import { defaultThumbnail } from '../../utils/helpers';

interface IProps extends ISpotifyNavigationProps { }

export const PlaylistsView: React.FunctionComponent<IProps> = (props: IProps) => {

    const { playlists, loaded, loadPlaylists, refreshPlaylists } = useFetchPlaylists();
    const [selectedPlaylistId, setselectedPlaylistId] = React.useState<string | undefined>(undefined);

    React.useEffect(() => {
        if (props.selectedView === SpotifyViewType.PLAYLISTS) {
            setselectedPlaylistId(undefined);
        }
    }, [props.selectedView]);

    function _onOpenPlaylist(id: string) {
        setselectedPlaylistId(id);
        props.setselectedView(SpotifyViewType.PLAYLIST);
    }

    return (
        <>
            {
                props.selectedView === SpotifyViewType.PLAYLISTS &&
                <RefreshableList onRefresh={() => refreshPlaylists()} backgroundColor={spotifyTheme.secondaryColor} lazyLoading={true} onLoad={() => loadPlaylists()}>
                    {
                        playlists.map((p) =>
                            <ListItem thumbnail key={p.id}>
                                <Left>
                                    <Thumbnail source={{ uri: p.images && p.images.length >= 3 ? p.images[2].url : defaultThumbnail() }} />
                                </Left>
                                <Body>
                                    <Text style={{ color: "white" }}>{p.name}</Text>
                                    <Text note numberOfLines={1}>{p.tracks.total} tracks</Text>
                                </Body>
                                <Right>
                                    <Button iconRight light onPress={() => _onOpenPlaylist(p.id)} disabled={p.tracks.total == 0}>
                                        <Text style={{ opacity: p.tracks.total == 0 ? 0.1 : 1 }}>Manage</Text>
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
                props.selectedView !== SpotifyViewType.PLAYLISTS && selectedPlaylistId &&
                <PlaylistView selectedView={props.selectedView} setselectedView={props.setselectedView} playlistId={selectedPlaylistId} />
            }
        </>
    )
}

export default PlaylistsView
