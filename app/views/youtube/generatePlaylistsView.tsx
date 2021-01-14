import { Accordion, Body, Button, Content, H1, H3, Icon, Left, List, ListItem, Right, Spinner, Text } from 'native-base'
import React, { useContext, useEffect, useState } from 'react'
import Context from '../../store/context'
import { youtubeTheme } from '../theme'
import { YoutubeViewType } from '../youtubeView'

export interface IProps {
    selectedView: YoutubeViewType;
    setselectedView(view: YoutubeViewType): any;
}

const GeneratePlaylistsView: React.FunctionComponent<IProps> = (props: IProps) => {
    const { state } = useContext(Context);
    const [createPlaylistName, setcreatePlaylistName] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (createPlaylistName) {
            console.log("show modal");

        }
    }, [createPlaylistName])

    function _buildPlaylistName(year: number, month: number): string {
        return `Playlist ${year} - ${pad(month)}`;
    }

    function pad(d: number) {
        return (d < 10) ? '0' + d.toString() : d.toString();
    }

    function _onCreatePlaylist(playlistName: string) {
        setcreatePlaylistName(playlistName);
    }

    function _buildAccordion() {
        var array: { title: JSX.Element, content: JSX.Element }[] = [];

        state.youtubeState.playlists.yearPlaylist.map((f) => {
            const title = <H1>{f.year}</H1>;
            const content =
                <List>
                    {
                        f.playlists.every(p => p.exists !== null) &&
                        f.playlists.map((p, j) =>
                            <ListItem key={j}>
                                {
                                    p.exists !== null &&
                                    <>
                                        <Left>
                                            <Body>
                                                <H3>{_buildPlaylistName(f.year, p.month)}</H3>
                                                <Text note>{p.itemsFromFavorites.length} items to add</Text>
                                            </Body>
                                        </Left>
                                        {
                                            !p.exists &&
                                            <Right>
                                                <Button success style={{ borderColor: youtubeTheme.secondaryColor }} rounded color={youtubeTheme.secondaryColor} icon onPress={() => _onCreatePlaylist(_buildPlaylistName(f.year, p.month))}>
                                                    <Icon name="add" type="MaterialIcons" />
                                                </Button>
                                            </Right>
                                        }
                                        {
                                            p.exists &&
                                            <>
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
                                            </>
                                        }
                                    </>
                                }
                                {
                                    p.exists === null && <Spinner color={youtubeTheme.primaryColor} />
                                }
                            </ListItem>
                        )
                    }
                    {
                        !f.playlists.every(p => p.exists !== null) && <Spinner color={youtubeTheme.primaryColor} />
                    }
                </List>;
            array.push({ title: title, content: content });
        });

        return array;
    }

    return (
        <>
            {
                props.selectedView === YoutubeViewType.GeneratePlaylists &&
                <>
                    {
                        state.youtubeState.playlists.loaded &&
                        <Accordion dataArray={_buildAccordion()} expanded={0} renderContent={(item) => <>{item.content}</>} />
                    }
                    {
                        !state.youtubeState.playlists.loaded &&
                        <Content>
                            <Spinner color={youtubeTheme.primaryColor} />
                        </Content>
                    }
                </>
            }
        </>
    )
}

export default GeneratePlaylistsView
