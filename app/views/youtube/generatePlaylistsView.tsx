import { Button, Card, Content, H1, H3, Icon, Left, List, ListItem, Right, Spinner } from 'native-base'
import React, { useContext } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import Context from '../../store/context'
import { youtubeTheme } from '../theme'
import { YoutubeViewType } from '../youtubeView'

export interface IProps {
    selectedView: YoutubeViewType;
    setselectedView(view: YoutubeViewType): any;
}

const GeneratePlaylistsView: React.FunctionComponent<IProps> = (props: IProps) => {
    const { state } = useContext(Context);

    function _buildPlaylistName(year: number, month: number): string {
        return `Playlist ${year} - ${pad(month)}`;
    }

    function pad(d: number) {
        return (d < 10) ? '0' + d.toString() : d.toString();
    }

    function _playlistItem(year: number, month: number, exists: boolean | null): JSX.Element {

        return (
            <>
                {
                    exists !== null &&
                    <>
                        <Left>
                            <H3>{_buildPlaylistName(year, month)}</H3>
                        </Left>
                        {
                            !exists &&
                            <Right>
                                <Button success style={{ borderColor: youtubeTheme.secondaryColor }} rounded color={youtubeTheme.secondaryColor} icon>
                                    <Icon name="add" type="MaterialIcons" />
                                </Button>
                            </Right>
                        }
                        {
                            exists &&
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
                    exists === null && <Spinner color={youtubeTheme.primaryColor} />
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
                                    state.youtubeState.playlists.yearPlaylist.map((f, i) =>
                                        <List onLayout={() => console.log(`list layout year= ${f.year}`)} key={i}>
                                            <ListItem itemDivider>
                                                <H1>{f.year}</H1>
                                            </ListItem>
                                            {
                                                f.playlists.map((p, j) =>
                                                    <ListItem key={j}>
                                                        {
                                                            _playlistItem(f.year, p.month, p.exists)
                                                        }
                                                    </ListItem>
                                                )
                                            }
                                        </List>
                                    )
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
