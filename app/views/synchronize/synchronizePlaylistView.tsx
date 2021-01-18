import React, { useContext, useState } from 'react';
import Context from '../../store/context';
import { Body, Button, Content, Icon, Left, List, ListItem, Right, Text } from 'native-base';
import { synchronizeTheme, youtubeTheme } from '../theme';
import ModalPopup, { ModalType } from '../utils/modalPopup';
import { bindYoutubePlaylist, synchronizeYoutubePlaylistItemsSuccess } from '../../store/types/my_playlists_actions';
import { pushYoutubeErrorNotification, pushYoutubeSuccessNotification } from '../../store/types/notifications_actions';
import { PlaylistItems } from '../../youtubeApi/youtube-api-playlistItems';
import { Playlists } from '../../youtubeApi/youtube-api-playlists';
import { IYoutubeMonthPlaylist } from '../../store/state';
import { SynchronizeViewType } from '../synchronizeView';

interface IProps {
  selectedView: SynchronizeViewType;
  setselectedView(view: SynchronizeViewType): any;
  myPlaylist: IYoutubeMonthPlaylist;
}

export const SynchronizePlaylistView: React.FunctionComponent<IProps> = (props: IProps) => {
  const { state, dispatch } = useContext(Context);
  const [createPlaylist, setcreatePlaylist] = useState<{ title: string, year: number, month: number } | undefined>(undefined);
  const [deletePlaylist, setdeletePlaylist] = useState<{ title: string, year: number, month: number, playlistId: string } | undefined>(undefined);
  const [synchronizePlaylist, setsynchronizePlaylist] = useState<{ title: string, year: number, month: number } | undefined>(undefined);

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
      <ModalPopup
        backgroundColor={synchronizeTheme.primaryBackgroundColor}
        cancelCallback={_modalCancelCallback}
        okCallback={_modalOkCallback}
        title={_modalTitle()}
        type={ModalType.OkCancel}
        visible={_modalVisible()}
      />
      <Content>
        <List style={{ backgroundColor: "black" }}>
          <ListItem itemDivider={false}>
            <>
              <Left>
                <Body>
                  <Text style={{ color: "white" }}>{props.myPlaylist.title}</Text>
                  <Text note>{props.myPlaylist.favoriteitems.length} favorite items to add</Text>
                  {
                    props.myPlaylist.youtube &&
                    <Text note>youtube contains {props.myPlaylist.youtube.items.length} videos</Text>
                  }
                  {
                    props.myPlaylist.spotify &&
                    <Text note>spotify contains {props.myPlaylist.spotify.items.length} tracks</Text>
                  }
                </Body>
              </Left>
              {
                props.myPlaylist.youtube === undefined &&
                <Right>
                  <Button success rounded color={youtubeTheme.secondaryColor} icon onPress={() => setcreatePlaylist({ title: props.myPlaylist.title, year: props.myPlaylist.year, month: props.myPlaylist.month })}>
                    <Icon name="add" type="MaterialIcons" />
                  </Button>
                </Right>
              }
              {
                props.myPlaylist.youtube &&
                <>
                  <Right>
                    <Button danger rounded icon onPress={() => setdeletePlaylist({ title: props.myPlaylist.title, year: props.myPlaylist.year, month: props.myPlaylist.month, playlistId: props.myPlaylist.youtube?.playlist?.id ? props.myPlaylist.youtube.playlist.id : '' })}>
                      <Icon name="delete" type="MaterialCommunityIcons" />
                    </Button>
                  </Right>
                  {
                    props.myPlaylist.youtube.items.length !== props.myPlaylist.favoriteitems.length &&
                    <Right>
                      <Button success rounded icon onPress={() => setsynchronizePlaylist({ title: props.myPlaylist.title, year: props.myPlaylist.year, month: props.myPlaylist.month })}>
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
        </List>
      </Content>
    </>
  )
};

export default SynchronizePlaylistView;
