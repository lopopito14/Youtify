import { Body, Button, Icon, Left, ListItem, Right, Spinner, Text, Thumbnail } from 'native-base'
import React from 'react'
import Context from '../../store/context';
import SpotifyApi from 'spotify-web-api-js';
import RefreshableList from '../utils/refreshableList';
import { spotifyTheme } from '../theme';
import { SpotifyViewType } from '../spotifyView';
import PlaylistView from './playlistView';

export interface IProps {
    selectedView: SpotifyViewType;
    setselectedView(view: SpotifyViewType): any;
}

export const PlaylistsView: React.FunctionComponent<IProps> = (props: IProps) => {
    const { state } = React.useContext(Context);

    const [loaded, setLoaded] = React.useState(false);
    const [playlists, setPlaylists] = React.useState<globalThis.SpotifyApi.PlaylistObjectSimplified[]>([]);
    const [selectedPlaylistId, setselectedPlaylistId] = React.useState<string | undefined>(undefined);

    React.useEffect(() => {
        _fetchPlaylists();
    }, []);

    React.useEffect(() => {
        if (props.selectedView === SpotifyViewType.PLAYLISTS) {
            setselectedPlaylistId(undefined);
        }
    }, [props.selectedView]);

    function _onRefresh() {
        _fetchPlaylists();
    }

    function _onLoad() {
        if (!loaded) {
            _fetchPlaylists(playlists.length);
        }
        else {
            console.log("all playlists loaded");
        }
    }

    async function _fetchPlaylists(offset: number = 0) {
        try {
            var spotifyApi = new SpotifyApi();
            spotifyApi.setAccessToken(state.spotifyState.credential.accessToken);

            var response = await spotifyApi.getUserPlaylists(
                state.spotifyState.userProfile.id,
                {
                    "limit": 10,
                    "offset": offset,
                }
            );
            if (response) {

                if (playlists.length + response.items.length === response.total) {
                    setLoaded(true);
                }

                if (offset === 0) {
                    setPlaylists(response.items);
                }
                else {
                    setPlaylists([...playlists, ...response.items]);
                }
            }
        } catch (error) {
            console.log('Error => ' + error);
        }
    }

    function _onOpenPlaylist(id: string) {
        setselectedPlaylistId(id);
        props.setselectedView(SpotifyViewType.PLAYLIST);
    }

    return (
        <>
            {
                props.selectedView === SpotifyViewType.PLAYLISTS &&
                <RefreshableList onRefresh={_onRefresh} backgroundColor={spotifyTheme.secondaryColor} lazyLoading={true} onLoad={_onLoad}>
                    {
                        playlists.map((p) =>
                            <ListItem thumbnail key={p.id}>
                                <Left>
                                    {
                                        p.images && p.images.length >= 3 &&
                                        <Thumbnail source={{ uri: p.images[2].url }} />
                                    }
                                </Left>
                                <Body>
                                    <Text style={{ color: "white" }}>{p.name}</Text>
                                    <Text note numberOfLines={1}>{p.tracks.total} tracks</Text>
                                </Body>
                                <Right>
                                    <Button iconRight light onPress={() => _onOpenPlaylist(p.id)}>
                                        <Text>Manage</Text>
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
