import { Body, Button, Card, CardItem, Content, H1, Icon, Left, Right, Text, Thumbnail, Title, View } from 'native-base'
import React, { useContext, useEffect, useState } from 'react'
import { Image } from 'react-native';
import Context from '../../store/context';
import { ErrorResponseException, Playlist } from '../../youtubeApi/youtube-api-models';
import { Playlists } from '../../youtubeApi/youtube-api-playlists';

export interface IProps { }

const PlaylistsView: React.FunctionComponent<IProps> = () => {
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
                maxResults: 25
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
        <>
            <H1>Playlists</H1>
            <>
                <Content>
                    {youtubePlaylists.map((p) => (
                        <Card key={p.id}>
                            <CardItem>
                                <Left>
                                    <Body>
                                        <Text style={{ fontWeight: "bold", fontSize: 40 }}>{p.snippet?.title}</Text>
                                        <Text note>{p.snippet?.description}</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                            <CardItem cardBody>
                                {
                                    p.snippet?.thumbnails?.high?.url &&
                                    p.snippet?.thumbnails?.high?.width &&
                                    p.snippet?.thumbnails?.high?.height &&
                                    <Image source={{ uri: p.snippet?.thumbnails?.high?.url }} style={{ height: 200, width: p.snippet?.thumbnails?.high?.width, flex: 1 }} />
                                }
                            </CardItem>
                            <CardItem>
                                <Left>
                                    <Button transparent>
                                        <Icon active name="thumbs-up" />
                                        <Text>12 Likes</Text>
                                    </Button>
                                </Left>
                                <Body>
                                    <Button transparent>
                                        <Icon active name="chatbubbles" />
                                        <Text>4 Comments</Text>
                                    </Button>
                                </Body>
                                <Right>
                                    <Text>{p.contentDetails?.itemCount} items.</Text>
                                </Right>
                            </CardItem>
                        </Card>
                    ))}
                </Content>
            </>
        </>
    )
}

export default PlaylistsView
