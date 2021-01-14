import { Accordion, Body, Button, Content, H1, H3, Icon, Left, List, ListItem, Right, Spinner, Text } from 'native-base'
import React, { useContext, useState } from 'react'
import Context from '../../store/context'
import { youtubePlaylistsExists, youtubePlaylistsItemsSynchronized } from '../../store/types/youtube_playlists_actions'
import { PlaylistItems } from '../../youtubeApi/youtube-api-playlistItems'
import { Playlists } from '../../youtubeApi/youtube-api-playlists'
import { youtubeTheme } from '../theme'
import ModalPopup, { ModalType } from '../utils/modalPopup'
import { YoutubeViewType } from '../youtubeView'

export interface IProps {
    selectedView: YoutubeViewType;
    setselectedView(view: YoutubeViewType): any;
}

const GeneratePlaylistsView: React.FunctionComponent<IProps> = (props: IProps) => {
    const { state, dispatch } = useContext(Context);
    const [createPlaylist, setcreatePlaylist] = useState<{ year: number, month: number } | undefined>(undefined);
    const [deletePlaylist, setdeletePlaylist] = useState<{ year: number, month: number, playlistId: string } | undefined>(undefined);
    const [synchronizePlaylist, setsynchronizePlaylist] = useState<{ year: number, month: number } | undefined>(undefined);

    function _buildPlaylistName(year: number, month: number): string {
        return `Playlist ${year} - ${(month < 10) ? '0' + month.toString() : month.toString()}`;
    }

    function _buildAccordion() {
        var array: { title: JSX.Element, content: JSX.Element }[] = [];

        state.youtubeState.playlists.yearPlaylist.map((f) => {
            const title = <H1>{f.year}</H1>;
            const content =
                <List>
                    {
                        f.playlists.map((p, j) =>
                            <ListItem key={j}>
                                <>
                                    <Left>
                                        <Body>
                                            <H3>{_buildPlaylistName(f.year, p.month)}</H3>
                                            <Text note>{p.itemsFromFavorites.length} items to add</Text>
                                            <Text note>contains {p.items.length} items</Text>
                                        </Body>
                                    </Left>
                                    {
                                        p.playlistId === undefined &&
                                        <Right>
                                            <Button success rounded color={youtubeTheme.secondaryColor} icon onPress={() => setcreatePlaylist({ year: f.year, month: p.month })}>
                                                <Icon name="add" type="MaterialIcons" />
                                            </Button>
                                        </Right>
                                    }
                                    {
                                        p.playlistId &&
                                        <>
                                            <Right>
                                                <Button danger rounded icon onPress={() => setdeletePlaylist({ year: f.year, month: p.month, playlistId: p.playlistId ? p.playlistId : '' })}>
                                                    <Icon name="delete" type="MaterialCommunityIcons" />
                                                </Button>
                                            </Right>
                                            {
                                                p.items.length !== p.itemsFromFavorites.length &&
                                                <Right>
                                                    <Button success rounded icon onPress={() => setsynchronizePlaylist({ year: f.year, month: p.month })}>
                                                        <Icon name="refresh" type="MaterialCommunityIcons" />
                                                    </Button>
                                                </Right>
                                            }
                                            <Right>
                                                <Button info rounded icon>
                                                    <Icon name="arrow-forward" />
                                                </Button>
                                            </Right>
                                        </>
                                    }
                                </>
                            </ListItem>
                        )
                    }
                </List>;
            array.push({ title: title, content: content });
        });

        return array;
    }

    function _modalTitle(): string {
        if (createPlaylist) {
            return `Create playlist "${_buildPlaylistName(createPlaylist.year, createPlaylist.month)}" ?`;
        } else if (deletePlaylist) {
            return `Delete playlist "${_buildPlaylistName(deletePlaylist.year, deletePlaylist.month)}" ?`;
        } else if (synchronizePlaylist) {
            return `Synchronize playlist "${_buildPlaylistName(synchronizePlaylist.year, synchronizePlaylist.month)}" ?`;
        }

        return '';
    }

    function _modalVisible(): boolean {
        if (createPlaylist || deletePlaylist || synchronizePlaylist) {
            return true;
        }

        return false;
    }

    async function _modalOkCallback() {
        if (createPlaylist) {
            try {
                var response = await new Playlists(state.youtubeState.credential.accessToken).insert({
                    part: ['snippet'],
                    requestBody: {
                        snippet: {
                            title: _buildPlaylistName(createPlaylist.year, createPlaylist.month)
                        }
                    }
                });
                if (response && response.snippet) {
                    dispatch(youtubePlaylistsExists(
                        {
                            year: createPlaylist.year,
                            month: createPlaylist.month,
                            playlistId: response.id
                        }
                    ));
                }
            } catch (error) {
                console.error(error);
            } finally {
                setcreatePlaylist(undefined);
            }
        } else if (deletePlaylist) {
            try {
                await new Playlists(state.youtubeState.credential.accessToken).delete({
                    id: deletePlaylist.playlistId
                });
                dispatch(youtubePlaylistsExists(
                    {
                        year: deletePlaylist.year,
                        month: deletePlaylist.month,
                        playlistId: undefined
                    }
                ));
            } catch (error) {
                console.error(error);
            } finally {
                setdeletePlaylist(undefined);
            }
        } else if (synchronizePlaylist) {
            try {
                const yearPlaylist = state.youtubeState.playlists.yearPlaylist.find(y => y.year === synchronizePlaylist.year);
                if (yearPlaylist) {
                    const monthPlaylist = yearPlaylist.playlists.find(m => m.month === synchronizePlaylist.month);
                    if (monthPlaylist) {

                        const playlistItemsToRemove = monthPlaylist.items.filter(i => !monthPlaylist.itemsFromFavorites.map(i => i.snippet?.resourceId?.videoId).includes(i.snippet?.resourceId?.videoId));
                        const playlistItemsToAdd = monthPlaylist.itemsFromFavorites.filter(i => !monthPlaylist.items.map(i => i.snippet?.resourceId?.videoId).includes(i.snippet?.resourceId?.videoId));

                        for (const playlistItemToRemove of playlistItemsToRemove) {
                            if (playlistItemToRemove.id) {
                                await new PlaylistItems(state.youtubeState.credential.accessToken).delete({
                                    id: playlistItemToRemove.id
                                });
                            }
                        }

                        for (const playlistItemToAdd of playlistItemsToAdd) {
                            if (playlistItemToAdd.id) {
                                await new PlaylistItems(state.youtubeState.credential.accessToken).insert({
                                    part: ['snippet'],
                                    requestBody: {
                                        snippet: {
                                            playlistId: monthPlaylist.playlistId,
                                            resourceId: playlistItemToAdd.snippet?.resourceId
                                        }
                                    }
                                });
                            }
                        }

                        dispatch(youtubePlaylistsItemsSynchronized({ year: synchronizePlaylist.year, month: synchronizePlaylist.month }));
                    }
                }
            } catch (error) {
                console.error(error);
            } finally {
                setsynchronizePlaylist(undefined);
            }
        }
    }

    function _modalCancelCallback() {
        if (createPlaylist) {
            setcreatePlaylist(undefined);
        } else if (deletePlaylist) {
            setdeletePlaylist(undefined);
        } else if (synchronizePlaylist) {
            setsynchronizePlaylist(undefined);
        }
    }

    return (
        <>
            {
                props.selectedView === YoutubeViewType.GeneratePlaylists &&
                <>
                    <ModalPopup
                        backgroundColor={youtubeTheme.primaryBackgroundColor}
                        cancelCallback={_modalCancelCallback}
                        okCallback={_modalOkCallback}
                        title={_modalTitle()}
                        type={ModalType.OkCancel}
                        visible={_modalVisible()}
                    />
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
