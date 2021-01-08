import { Body, Button, Icon, Left, ListItem, Right, Text, Thumbnail } from 'native-base'
import React, { useContext, useEffect, useState } from 'react';
import Context from '../../store/context';
import { ErrorResponseException, Playlist } from '../../youtubeApi/youtube-api-models';
import { Playlists } from '../../youtubeApi/youtube-api-playlists';
import RefreshableList from '../utils/refreshableList';

export interface IProps {
    backgroundColor: string;
}

const PlaylistsView: React.FunctionComponent<IProps> = (props: IProps) => {
    const [youtubePlaylists, setyoutubePlaylists] = useState<Playlist[]>([]);
    const { state } = useContext(Context);

    useEffect(() => {
        fetchPlaylists();
    }, [])

    async function fetchPlaylists() {
        try {
            var response = await new Playlists(state.youtubeState.credential.accessToken).list({
                mine: true,
                part: ['snippet', 'contentDetails', 'id'],
                maxResults: 10
            });
            if (response && response.items) {
                setyoutubePlaylists(response.items);
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
        <RefreshableList onRefresh={() => console.log('refresh')} backgroundColor={props.backgroundColor} lazyLoading={true} onLoad={() => console.log('lazy loading')}>
            {youtubePlaylists.map((p) => (
                <ListItem thumbnail key={p.id}>
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
            {youtubePlaylists.map((p) => (
                <ListItem thumbnail key={p.id}>
                    <Left>
                        {
                            p.snippet?.thumbnails?.high?.url &&
                            <Thumbnail source={{ uri: p.snippet?.thumbnails?.high?.url }} />
                        }
                    </Left>
                    <Body>
                        <Text style={{ color: "white" }}>{p.snippet?.title}</Text>
                        <Text note numberOfLines={1}>{p.contentDetails?.itemCount} videos</Text>
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
