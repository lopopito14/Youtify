import { Body, Button, Card, CardItem, Content, H3, Icon, Left, List, ListItem, Right, Spinner, Text, Thumbnail } from 'native-base'
import React, { useContext, useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import Context from '../../store/context'
import { ErrorResponseException, Playlist } from '../../youtubeApi/youtube-api-models'
import { Playlists } from '../../youtubeApi/youtube-api-playlists'
import { youtubeTheme } from '../theme'
import { YoutubeViewType } from '../youtubeView'

export interface IProps {
    selectedView: YoutubeViewType;
    setselectedView(view: YoutubeViewType): any;
}

const GeneratePlaylistsView: React.FunctionComponent<IProps> = (props: IProps) => {
    const { state } = useContext(Context);
    const [playlists, setplaylists] = useState<Playlist[] | undefined>(undefined);
    const [playlistspageToken, setplaylistspageToken] = useState<string | undefined>(undefined);
    const [existingmonthlyPlaylist, setexistingmonthlyPlaylist] = useState<Playlist[] | undefined>(undefined);
    const [monthlyPlaylistToCreate, setmonthlyPlaylistToCreate] = useState<string[] | undefined>(undefined)

    useEffect(() => {
        _fetchPlaylists();
    }, []);

    useEffect(() => {
        if (playlistspageToken) {
            _fetchPlaylists(playlistspageToken);
        }
    }, [playlistspageToken]);

    useEffect(() => {
        if (playlists) {
            if (playlistspageToken === undefined) {
                const filteredPlaylists = playlists.filter((p) => p.snippet?.title?.startsWith('Playlist '));
                if (filteredPlaylists) {
                    setexistingmonthlyPlaylist(filteredPlaylists);
                }
            }
        }
    }, [playlists]);

    useEffect(() => {
        if (existingmonthlyPlaylist && state.youtubeState.favorite.favoritePlaylistItems.loaded) {
            _computeAllMonthlyPlaylists();
        }
    }, [existingmonthlyPlaylist, state.youtubeState.favorite.favoritePlaylistItems.loaded]);

    function _buildPlaylistName(year: number, month: number): string {
        return `Playlist ${year} - ${pad(month)}`;
    }

    async function _fetchPlaylists(pageToken: string | undefined = undefined) {
        try {
            var response = await new Playlists(state.youtubeState.credential.accessToken).list({
                channelId: state.youtubeState.userProfile.channelId,
                part: ['snippet', 'contentDetails'],
                maxResults: 50,
                pageToken: pageToken
            });
            if (response && response.items && response.pageInfo?.totalResults) {
                if (pageToken && playlists) {
                    setplaylists([...playlists, ...response.items]);
                }
                else {
                    setplaylists(response.items);
                }

                if (response.nextPageToken) {
                    setplaylistspageToken(response.nextPageToken);
                } else {
                    setplaylistspageToken(undefined);
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

    function pad(d: number) {
        return (d < 10) ? '0' + d.toString() : d.toString();
    }

    function _computeAllMonthlyPlaylists() {
        if (existingmonthlyPlaylist) {
            var createdPlaylist: string[] = [];

            state.youtubeState.favorite.favoritePlaylistItems.playlistItems.map(p => {
                if (p.snippet?.publishedAt) {

                    const date = new Date(p.snippet?.publishedAt);
                    const playlistName = _buildPlaylistName(date.getFullYear(), date.getMonth() + 1);

                    const existingPlaylist = existingmonthlyPlaylist.filter(p => p.snippet?.title === playlistName);
                    if (existingPlaylist.length === 0) {

                        const playlistToCreate = createdPlaylist.filter(p => p === playlistName);
                        if (playlistToCreate.length === 0) {
                            createdPlaylist.push(playlistName);
                            console.log("create " + playlistName);
                        } else {
                            console.log("will be created " + playlistName);
                        }
                    } else {
                        console.log("already exist " + playlistName);
                    }
                }
            });

            setmonthlyPlaylistToCreate(createdPlaylist);
        }
    }

    return (
        <>
            {
                props.selectedView === YoutubeViewType.GeneratePlaylists &&
                <ScrollView style={{ backgroundColor: youtubeTheme.primaryBackgroundColor }}>
                    <Content>
                        {
                            <Card>
                                <CardItem>
                                    <Body>
                                        <H3>{`Existing monthly playlist (${existingmonthlyPlaylist ? existingmonthlyPlaylist.length : 0}).`}</H3>
                                    </Body>
                                </CardItem>
                                {
                                    !existingmonthlyPlaylist &&
                                    <Spinner color={youtubeTheme.primaryColor} />
                                }
                                {
                                    existingmonthlyPlaylist &&
                                    <>
                                        <List>
                                            {
                                                existingmonthlyPlaylist.map((f, i) =>
                                                    <ListItem key={i} thumbnail>
                                                        <Left>
                                                            {
                                                                f.snippet?.thumbnails?.default?.url &&
                                                                <Thumbnail source={{ uri: f.snippet?.thumbnails?.default?.url }} />
                                                            }
                                                        </Left>
                                                        <Body>
                                                            <Text>{f.snippet?.title}</Text>
                                                        </Body>
                                                        <Right>
                                                            <Button icon light transparent rounded>
                                                                <Icon name="sync" type="MaterialIcons" style={{ color: "blue" }} />
                                                            </Button>
                                                        </Right>
                                                        <Right>
                                                            <Button icon light transparent rounded>
                                                                <Icon name="delete" type="MaterialCommunityIcons" style={{ color: "red" }} />
                                                            </Button>
                                                        </Right>
                                                    </ListItem>
                                                )
                                            }
                                        </List>
                                    </>
                                }
                                <CardItem>
                                    <Body>
                                        <H3>{`Monthly playlist to create (${monthlyPlaylistToCreate ? monthlyPlaylistToCreate.length : 0}).`}</H3>
                                    </Body>
                                </CardItem>
                                {
                                    !monthlyPlaylistToCreate &&
                                    <Spinner color={youtubeTheme.primaryColor} />
                                }
                                {
                                    monthlyPlaylistToCreate &&
                                    <>
                                        <List>
                                            {
                                                monthlyPlaylistToCreate.map((f, i) =>
                                                    <ListItem key={i} thumbnail>
                                                        <Left />
                                                        <Body>
                                                            <Text>{f}</Text>
                                                        </Body>
                                                        <Right>
                                                            <Button icon light transparent rounded>
                                                                <Icon name="add" type="MaterialIcons" style={{ color: "green" }} />
                                                            </Button>
                                                        </Right>
                                                    </ListItem>
                                                )
                                            }
                                        </List>
                                    </>
                                }
                            </Card>
                        }

                    </Content>
                </ScrollView>
            }
        </>
    )
}

export default GeneratePlaylistsView
