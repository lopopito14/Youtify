import { Body, Button, Icon, Left, ListItem, Right, Spinner, Text, Thumbnail } from 'native-base'
import React, { useContext, useEffect, useState } from 'react';
import Context from '../../store/context';
import { ErrorResponseException, Playlist } from '../../youtubeApi/youtube-api-models';
import { Playlists } from '../../youtubeApi/youtube-api-playlists';
import { youtubeTheme } from '../theme';
import RefreshableList from '../utils/refreshableList';

export interface IProps {
    backgroundColor: string;
}

const PlaylistsView: React.FunctionComponent<IProps> = (props: IProps) => {
    const [playlists, setplaylists] = useState<Playlist[]>([]);
    const { state } = useContext(Context);
    const [loaded, setLoaded] = useState(false);
    const [pageToken, setpageToken] = useState<string | undefined>(undefined);

    useEffect(() => {
        fetchPlaylists();
    }, []);

    function onRefresh() {
        fetchPlaylists();
    }

    function onLoad() {
        if (!loaded) {
            fetchPlaylists(pageToken);
        }
        else {
            console.log("all playlists loaded");
        }
    }

    async function fetchPlaylists(pageToken: string | undefined = undefined) {
        try {
            var response = await new Playlists(state.youtubeState.credential.accessToken).list({
                channelId: state.youtubeState.userProfile.channelId,
                part: ['snippet', 'contentDetails'],
                maxResults: 10,
                pageToken: pageToken
            });
            if (response && response.items) {
                if (pageToken) {
                    setplaylists([...playlists, ...response.items]);
                }
                else {
                    setplaylists(response.items);
                }

                if (response.nextPageToken) {
                    setpageToken(response.nextPageToken);
                } else {
                    setLoaded(true);
                    setpageToken(undefined);
                }
            }
        } catch (error) {
            if (error instanceof ErrorResponseException) {
                console.log(error.errorResponse.error.message);
            } else {
                console.log('Error => ' + error);
            }
        }
    }

    return (
        <RefreshableList onRefresh={onRefresh} backgroundColor={props.backgroundColor} lazyLoading={true} onLoad={onLoad}>
            {playlists.map((p, i) => (
                <ListItem thumbnail key={i}>
                    <Left>
                        {
                            p.snippet?.thumbnails?.high?.url &&
                            <Thumbnail source={{ uri: p.snippet?.thumbnails?.high?.url }} />
                        }
                    </Left>
                    <Body>
                        <Text style={{ color: "white" }}>{p.snippet?.title}</Text>
                        <Text note numberOfLines={1}>{p.contentDetails?.itemCount} items.</Text>
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
                !loaded && <Spinner color={youtubeTheme.primaryColor} />
            }
        </RefreshableList>
    )
}

export default PlaylistsView
