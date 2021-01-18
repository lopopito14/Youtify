import React, { useContext, useState } from 'react';
import Context from '../store/context';
import { Accordion, Body, Button, Content, H1, H3, Header, Icon, Left, List, ListItem, Right, Spinner, Text, Title } from 'native-base';
import { synchronizeTheme, youtubeTheme } from './theme';
import ModalPopup, { ModalType } from './utils/modalPopup';
import { bindYoutubePlaylist, synchronizeYoutubePlaylistItemsSuccess } from '../store/types/my_playlists_actions';
import { pushYoutubeErrorNotification, pushYoutubeSuccessNotification } from '../store/types/notifications_actions';
import { PlaylistItems } from '../youtubeApi/youtube-api-playlistItems';
import { Playlists } from '../youtubeApi/youtube-api-playlists';

interface Props { }

export const SynchronizeView: React.FunctionComponent<Props> = () => {
  const { state, dispatch } = useContext(Context);
  const [createPlaylist, setcreatePlaylist] = useState<{ title: string, year: number, month: number } | undefined>(undefined);
  const [deletePlaylist, setdeletePlaylist] = useState<{ title: string, year: number, month: number, playlistId: string } | undefined>(undefined);
  const [synchronizePlaylist, setsynchronizePlaylist] = useState<{ title: string, year: number, month: number } | undefined>(undefined);

  function _buildAccordion() {
    var array: { title: JSX.Element, content: JSX.Element }[] = [];

    const years = [...new Set(state.myPlaylist.myPlaylists.map(p => p.year))];

    years.map((y) => {
      const title = <H1>{y}</H1>;
      const content =
        <List>
          {
            state.myPlaylist.myPlaylists.filter(p => p.year === y).map((p, j) =>
              <ListItem key={j}>
                <>
                  <Left>
                    <Body>
                      <H3>{p.title}</H3>
                      <Text note>{p.favoriteitems.length} favorite items to add</Text>
                      {
                        p.youtube &&
                        <Text note>youtube contains {p.youtube.items.length} videos</Text>
                      }
                      {
                        p.spotify &&
                        <Text note>spotify contains {p.spotify.items.length} tracks</Text>
                      }
                    </Body>
                  </Left>
                  {
                    p.youtube === undefined &&
                    <Right>
                      <Button success rounded color={youtubeTheme.secondaryColor} icon onPress={() => setcreatePlaylist({ title: p.title, year: y, month: p.month })}>
                        <Icon name="add" type="MaterialIcons" />
                      </Button>
                    </Right>
                  }
                  {
                    p.youtube &&
                    <>
                      <Right>
                        <Button danger rounded icon onPress={() => setdeletePlaylist({ title: p.title, year: y, month: p.month, playlistId: p.youtube?.playlist?.id ? p.youtube.playlist.id : '' })}>
                          <Icon name="delete" type="MaterialCommunityIcons" />
                        </Button>
                      </Right>
                      {
                        p.youtube.items.length !== p.favoriteitems.length &&
                        <Right>
                          <Button success rounded icon onPress={() => setsynchronizePlaylist({ title: p.title, year: y, month: p.month })}>
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
      return `Create playlist "${createPlaylist.title}" ?`;
    } else if (deletePlaylist) {
      return `Delete playlist "${deletePlaylist.title}" ?`;
    } else if (synchronizePlaylist) {
      return `Synchronize playlist "${synchronizePlaylist.title}" ?`;
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
              title: createPlaylist.title
            }
          }
        });
        if (response && response.snippet) {
          dispatch(bindYoutubePlaylist(
            {
              year: createPlaylist.year,
              month: createPlaylist.month,
              playlist: response
            }
          ));
          dispatch(pushYoutubeSuccessNotification(`${createPlaylist.title} created !`));
        }
      } catch (error) {
        dispatch(pushYoutubeErrorNotification(error));
      } finally {
        setcreatePlaylist(undefined);
      }
    } else if (deletePlaylist) {
      try {
        await new Playlists(state.youtubeState.credential.accessToken).delete({
          id: deletePlaylist.playlistId
        });
        dispatch(bindYoutubePlaylist(
          {
            year: deletePlaylist.year,
            month: deletePlaylist.month,
            playlist: undefined
          }
        ));
        dispatch(pushYoutubeSuccessNotification(`${deletePlaylist.title} removed !`));
      } catch (error) {
        dispatch(pushYoutubeErrorNotification(error));
      } finally {
        setdeletePlaylist(undefined);
      }
    } else if (synchronizePlaylist) {
      try {
        const playlist = state.myPlaylist.myPlaylists.find(p => p.year === synchronizePlaylist.year && p.month === synchronizePlaylist.month);
        if (playlist && playlist.youtube) {

          const playlistItemsToRemove = playlist.youtube.items.filter(i => !playlist.favoriteitems.map(i => i.snippet?.resourceId?.videoId).includes(i.snippet?.resourceId?.videoId));
          const playlistItemsToAdd = playlist.favoriteitems.filter(i => !playlist.youtube?.items.map(i => i.snippet?.resourceId?.videoId).includes(i.snippet?.resourceId?.videoId));

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
                    playlistId: playlist.youtube.playlist?.id,
                    resourceId: playlistItemToAdd.snippet?.resourceId
                  }
                }
              });
            }
          }

          dispatch(synchronizeYoutubePlaylistItemsSuccess({ year: synchronizePlaylist.year, month: synchronizePlaylist.month }));
          dispatch(pushYoutubeSuccessNotification(`${synchronizePlaylist.title} synchronized !`));
        }
      } catch (error) {
        dispatch(pushYoutubeErrorNotification(error));
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
      <Header noShadow style={{ backgroundColor: synchronizeTheme.primaryColor }} androidStatusBarColor={synchronizeTheme.secondaryColor}>
        <Left />
        <Body>
          <Title>Synchronize</Title>
        </Body>
      </Header>
      <ModalPopup
        backgroundColor={synchronizeTheme.primaryBackgroundColor}
        cancelCallback={_modalCancelCallback}
        okCallback={_modalOkCallback}
        title={_modalTitle()}
        type={ModalType.OkCancel}
        visible={_modalVisible()}
      />
      {
        state.myPlaylist.loaded &&
        <Accordion style={{ backgroundColor: synchronizeTheme.secondaryBackgroundColor }} dataArray={_buildAccordion()} expanded={0} renderContent={(item) => <>{item.content}</>} />
      }
      {
        !state.myPlaylist.loaded &&
        <Content>
          <Spinner color={synchronizeTheme.primaryColor} />
        </Content>
      }
    </>
  )
};

export default SynchronizeView;
