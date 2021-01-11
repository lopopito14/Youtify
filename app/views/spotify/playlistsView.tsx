import { Body, Button, Icon, Left, ListItem, Right, Spinner, Text, Thumbnail } from 'native-base'
import React, { useContext, useEffect, useState } from 'react'
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
    const [playlists, setPlaylists] = useState<globalThis.SpotifyApi.PlaylistObjectSimplified[]>([]);
    const { state } = useContext(Context);
    const [loaded, setLoaded] = useState(false);
    const [selectedPlaylistId, setselectedPlaylistId] = useState<string | undefined>(undefined);

    useEffect(() => {
        fetchPlaylists();
    }, []);

    useEffect(() => {
        if (props.selectedView === SpotifyViewType.Artists) {
            setselectedPlaylistId(undefined);
        }
    }, [props.selectedView])

    function onRefresh() {
        fetchPlaylists();
    }

    function onLoad() {
        if (!loaded) {
            fetchPlaylists(playlists.length);
        }
        else {
            console.log("all playlists loaded");
        }
    }

    async function fetchPlaylists(offset: number = 0) {
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

    function onOpenPlaylist(id: string) {
        setselectedPlaylistId(id);
        props.setselectedView(SpotifyViewType.Playlist);
    }

    return (
        <>
            {
                props.selectedView === SpotifyViewType.Playlists &&
                <RefreshableList onRefresh={onRefresh} backgroundColor={spotifyTheme.secondaryColor} lazyLoading={true} onLoad={onLoad}>
                    {playlists.map((p) => (
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
                                <Button iconRight light onPress={() => onOpenPlaylist(p.id)}>
                                    <Text>Manage</Text>
                                    <Icon name='arrow-forward' />
                                </Button>
                            </Right>
                        </ListItem>
                    ))}
                    {
                        !loaded && <Spinner color={spotifyTheme.primaryColor} />
                    }
                </RefreshableList>
            }
            {
                props.selectedView !== SpotifyViewType.Playlists && selectedPlaylistId &&
                <PlaylistView selectedView={props.selectedView} setselectedView={props.setselectedView} playlistId={selectedPlaylistId} />
            }
        </>
    )
}

export default PlaylistsView
