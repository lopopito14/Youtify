import { Button, Card, Content, H1, H3, Icon, Left, List, ListItem, Right, View } from 'native-base'
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

                    const existingPlaylist = existingmonthlyPlaylist.find(p => p.snippet?.title === playlistName);
                    if (!existingPlaylist) {
                        const playlistToCreate = createdPlaylist.find(p => p === playlistName);
                        if (!playlistToCreate) {
                            createdPlaylist.push(playlistName);
                            console.log("create " + playlistName);
                        } else {
                            console.log("will be created " + playlistToCreate);
                        }
                    } else {
                        console.log("already exist " + playlistName);
                    }
                }
            });

            setmonthlyPlaylistToCreate(createdPlaylist);
        }
    }

    function _playlistItem(year: number, month: number, index: number): JSX.Element {

        const existingPlaylist = existingmonthlyPlaylist?.find(e => e.snippet?.title === _buildPlaylistName(year, month));
        const toBeCreatedPlaylist = monthlyPlaylistToCreate?.find(e => e === _buildPlaylistName(year, month));

        return (
            <>
                {
                    existingPlaylist &&
                    <ListItem key={index}>
                        <Left>
                            <H3>{existingPlaylist.snippet?.title}</H3>
                        </Left>
                        <Right>
                            <Button danger rounded color={youtubeTheme.secondaryColor}>
                                <Icon name="delete" type="MaterialCommunityIcons" />
                            </Button>
                        </Right>
                        <Right>
                            <Button info rounded color={youtubeTheme.secondaryColor}>
                                <Icon name="arrow-forward" />
                            </Button>
                        </Right>
                    </ListItem>
                }
                {
                    toBeCreatedPlaylist &&
                    <ListItem key={index}>
                        <Left>
                            <H3>{toBeCreatedPlaylist}</H3>
                        </Left>

                        <Right>
                            <Button success style={{ borderColor: youtubeTheme.secondaryColor }} rounded color={youtubeTheme.secondaryColor} icon>
                                <Icon name="add" type="MaterialIcons" />
                            </Button>
                        </Right>
                    </ListItem>
                }
            </>
        );
    }

    return (
        <>
            {
                props.selectedView === YoutubeViewType.GeneratePlaylists &&
                <ScrollView style={{ backgroundColor: youtubeTheme.secondaryColor }}>
                    <Content>
                        {
                            <Card>
                                {
                                    state.youtubeState.favorite.favoritePlaylistItems.loaded &&
                                    <List>
                                        {
                                            state.youtubeState.playlists.yearPlaylist.map((f, i) =>
                                                <View key={i}>
                                                    <ListItem itemDivider>
                                                        <H1>{f.year}</H1>
                                                    </ListItem>
                                                    {
                                                        f.playlists.map((p, j) => _playlistItem(f.year, p.month, j))
                                                    }
                                                </View>
                                            )
                                        }
                                    </List>
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
