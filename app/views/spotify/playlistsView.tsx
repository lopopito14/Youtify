import { Body, Button, Icon, Left, ListItem, Right, Spinner, Text, Thumbnail } from 'native-base'
import React, { useContext, useEffect, useState } from 'react'
import Context from '../../store/context';
import SpotifyApi from 'spotify-web-api-js';
import RefreshableList from '../utils/refreshableList';

export interface IProps {
    backgroundColor: string;
}

const PlaylistsView: React.FunctionComponent<IProps> = (props: IProps) => {
    const [playlists, setPlaylists] = useState<globalThis.SpotifyApi.PlaylistObjectSimplified[]>([]);
    const [totalTracks, settotalTracks] = useState(0);
    const { state } = useContext(Context);
    const [isLoading, setisLoading] = useState(false)

    useEffect(() => {
        fetchPlaylists();
    }, []);

    function onRefresh() {
        fetchPlaylists();
    }

    function onLoad() {
        if (playlists.length < totalTracks) {
            fetchPlaylists(playlists.length);
        }
        else {
            console.log("all playlists loaded");
        }
    }

    async function fetchPlaylists(offset: number = 0) {
        try {
            setisLoading(true);

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
                if (offset === 0) {
                    setPlaylists(response.items);
                }
                else {
                    setPlaylists([...playlists, ...response.items]);
                }

                settotalTracks(response.total);
            }
        } catch (error) {
            console.log('Error => ' + error);
        }
        finally {
            setisLoading(false);
        }
    }

    return (
        <RefreshableList onRefresh={onRefresh} backgroundColor={props.backgroundColor} lazyLoading={true} onLoad={onLoad}>
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
                        <Button iconRight light>
                            <Text>Manage</Text>
                            <Icon name='arrow-forward' />
                        </Button>
                    </Right>
                </ListItem>
            ))}
            {
                isLoading && <Spinner />
            }
        </RefreshableList>
    )
}

export default PlaylistsView
