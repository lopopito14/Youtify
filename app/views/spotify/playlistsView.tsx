import { Body, Button, Icon, Left, ListItem, Right, Text, Thumbnail } from 'native-base'
import React, { useContext, useEffect, useState } from 'react'
import Context from '../../store/context';
import SpotifyApi from 'spotify-web-api-js';
import RefreshableList from '../utils/refreshableList';

export interface IProps {
    backgroundColor: string;
}

const PlaylistsView: React.FunctionComponent<IProps> = (props: IProps) => {
    const [spotifyPlaylists, setspotifyPlaylists] = useState<globalThis.SpotifyApi.PlaylistObjectSimplified[]>([]);
    const { state } = useContext(Context);

    useEffect(() => {
        fetchSpotifyPlaylists();
    }, []);

    async function fetchSpotifyPlaylists() {
        try {
            var spotifyApi = new SpotifyApi();
            spotifyApi.setAccessToken(state.spotifyState.credential.accessToken);

            var response = await spotifyApi.getUserPlaylists(
                state.spotifyState.userProfile.id
            );
            if (response) {
                setspotifyPlaylists(response.items);
            }
        } catch (error) {
            console.log('Error => ' + error);
        }
    }

    return (
        <RefreshableList onRefresh={() => console.log('refresh')} backgroundColor={props.backgroundColor} lazyLoading={true} onLoad={() => console.log('lazy loading')}>
            {spotifyPlaylists.map((p) => (
                <ListItem thumbnail key={p.id}>
                    <Left>
                        {
                            <Thumbnail source={{ uri: p.images[1].url }} />
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
        </RefreshableList>
    )
}

export default PlaylistsView
