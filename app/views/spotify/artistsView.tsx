import { Body, Button, Icon, Left, ListItem, Right, Spinner, Text, Thumbnail } from 'native-base'
import React, { useContext, useEffect, useState } from 'react'
import RefreshableList from '../utils/refreshableList';
import SpotifyApi from 'spotify-web-api-js';
import Context from '../../store/context';
import { spotifyTheme } from '../theme';
import { SpotifyViewType } from '../spotifyView';
import ArtistView from './artistView';

interface IProps {
    selectedView: SpotifyViewType;
    setselectedView(view: SpotifyViewType): any;
}

const ArtistsView: React.FunctionComponent<IProps> = (props: IProps) => {
    const { state } = useContext(Context);
    const [followedArtists, setFollowedArtists] = useState<globalThis.SpotifyApi.ArtistObjectFull[]>([]);
    const [loaded, setLoaded] = useState(false);
    const [after, setafter] = useState<string | undefined>(undefined);
    const [selectedArtistId, setselectedArtistId] = useState<string | undefined>(undefined);

    useEffect(() => {
        fetchFollowedArtists();
    }, []);

    useEffect(() => {
        if (props.selectedView === SpotifyViewType.Artists) {
            setselectedArtistId(undefined);
        }
    }, [props.selectedView]);

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
                    "limit": 10,
                    "after": after
                } :
                {
                    "type": "artist",
                    "limit": 10
                };

            var response = await spotifyApi.getFollowedArtists(option);
            if (response) {
                if (after) {
                    setFollowedArtists([...followedArtists, ...response.artists.items]);
                }
                else {
                    setFollowedArtists(response.artists.items);
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

    function onOpenArtist(id: string) {
        setselectedArtistId(id);
        props.setselectedView(SpotifyViewType.Artist);
    }

    return (
        <>
            {
                props.selectedView === SpotifyViewType.Artists &&
                <RefreshableList onRefresh={onRefresh} backgroundColor={spotifyTheme.secondaryColor} lazyLoading={true} onLoad={onLoad}>
                    {
                        followedArtists.map((p) =>
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
                                    <Button iconRight light onPress={() => onOpenArtist(p.id)}>
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
                props.selectedView !== SpotifyViewType.Artists && selectedArtistId &&
                <ArtistView selectedView={props.selectedView} setselectedView={props.setselectedView} artistId={selectedArtistId} />
            }
        </>
    )
}

export default ArtistsView
