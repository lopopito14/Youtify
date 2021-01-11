import { Body, Button, Icon, Left, ListItem, Right, Spinner, Text, Thumbnail } from 'native-base'
import React, { useContext, useEffect, useState } from 'react'
import RefreshableList from '../utils/refreshableList';
import SpotifyApi from 'spotify-web-api-js';
import Context from '../../store/context';
import { spotifyTheme } from '../theme';

export interface IProps {
    backgroundColor: string;
}

const ArtistsView: React.FunctionComponent<IProps> = (props: IProps) => {
    const [followedArtists, setFollowedArtists] = useState<globalThis.SpotifyApi.ArtistObjectFull[]>([]);
    const { state } = useContext(Context);
    const [loaded, setLoaded] = useState(false);
    const [after, setafter] = useState<string | undefined>(undefined);

    useEffect(() => {
        fetchFollowedArtists();
    }, []);

    function onRefresh() {
        fetchFollowedArtists();
    }

    function onLoad() {
        if (!loaded) {
            fetchFollowedArtists(after);
        }
        else {
            console.log("all followed artists loaded");
        }
    }

    async function fetchFollowedArtists(after: string | undefined = undefined) {
        try {
            const spotifyApi = new SpotifyApi();
            spotifyApi.setAccessToken(state.spotifyState.credential.accessToken);

            const option = after ?
                {
                    "type": "artist",
                    "limit": 50,
                    "after": after
                } :
                {
                    "type": "artist",
                    "limit": 50
                };

            var response = await spotifyApi.getFollowedArtists(option);
            if (response) {
                if (after === '') {
                    setFollowedArtists(response.artists.items);
                }
                else {
                    setFollowedArtists([...followedArtists, ...response.artists.items]);
                }

                if (response.artists.cursors.after) {
                    setafter(response.artists.cursors.after);
                } else {
                    setafter(undefined);
                    setLoaded(true);
                }
            }
        } catch (error) {
            console.log('Error => ' + error);
        }
    }

    return (
        <RefreshableList onRefresh={onRefresh} backgroundColor={props.backgroundColor} lazyLoading={true} onLoad={onLoad}>
            {followedArtists.map((p) => (
                <ListItem thumbnail key={p.id}>
                    <Left>
                        {
                            p.images && p.images.length >= 3 &&
                            <Thumbnail source={{ uri: p.images[2].url }} />
                        }
                    </Left>
                    <Body>
                        <Text style={{ color: "white" }}>{p.name}</Text>
                        <Text note numberOfLines={1}>popularity: {p.popularity}</Text>
                        <Text note numberOfLines={1}>followers: {p.followers.total}</Text>
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
                !loaded && <Spinner color={spotifyTheme.primaryColor} />
            }
        </RefreshableList>
    )
}

export default ArtistsView
