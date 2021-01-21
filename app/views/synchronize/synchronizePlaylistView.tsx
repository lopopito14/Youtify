import React, { useContext, useEffect, useState } from 'react';
import Context from '../../store/context';
import { Body, Button, Card, CardItem, Content, H1, H3, Icon, Left, List, Right, Separator, Text, Thumbnail } from 'native-base';
import { spotifyTheme, synchronizeTheme, youtubeTheme } from '../theme';
import ModalPopup, { ModalType } from '../utils/modalPopup';
import { bindSpotifyPlaylist, bindSpotifyPlaylistItemsSuccess, bindYoutubePlaylist, synchronizeYoutubePlaylistVideosSuccess } from '../../store/types/my_playlists_actions';
import { pushSpotifyErrorNotification, pushYoutubeErrorNotification, pushYoutubeSuccessNotification } from '../../store/types/notifications_actions';
import { PlaylistItems } from '../../youtubeApi/youtube-api-playlistItems';
import { Playlists } from '../../youtubeApi/youtube-api-playlists';
import { IYoutubeMonthPlaylist } from '../../store/state';
import { SynchronizeViewType } from '../synchronizeView';
import SpotifyApi from 'spotify-web-api-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IProps {
  selectedView: SynchronizeViewType;
  setselectedView(view: SynchronizeViewType): any;
  myPlaylist: IYoutubeMonthPlaylist;
}

interface IMyPlaylistSave {
  items: ISaveItem[]
}

interface ISaveItem {
  favorite: {
    videoId: string,
    title: string,
    exists: boolean
  },
  youtube?: ISaveYoutube,
  spotify?: ISaveSpotify
}

interface ISaveSpotify {
  id: string,
  title: string
}

interface ISaveYoutube {
  videoId: string,
  title: string
}

interface ISynchro {
  favoriteVideoId: string,
  spotify?: {
    id: string,
    title: string,
    uri: string
  }
}

export const SynchronizePlaylistView: React.FunctionComponent<IProps> = (props: IProps) => {
  const { state, dispatch } = useContext(Context);
  const [save, setsave] = useState<IMyPlaylistSave | undefined>(undefined);
  const [createYoutubePlaylist, setcreateYoutubePlaylist] = useState<{ title: string, year: number, month: number } | undefined>(undefined);
  const [deleteYoutubePlaylist, setdeleteYoutubePlaylist] = useState<{ title: string, year: number, month: number, playlistId: string } | undefined>(undefined);
  const [synchronizeYoutubePlaylist, setsynchronizeYoutubePlaylist] = useState<{ title: string, year: number, month: number } | undefined>(undefined);
  const [createSpotifyPlaylist, setcreateSpotifyPlaylist] = useState<{ title: string, year: number, month: number } | undefined>(undefined);
  const [deleteSpotifyPlaylistItems, setdeleteSpotifyPlaylistItems] = useState<{ title: string, year: number, month: number, playlistId: string } | undefined>(undefined);
  const [synchronizeSpotifyPlaylist, setsynchronizeSpotifyPlaylist] = useState<{ title: string, year: number, month: number } | undefined>(undefined);

  useEffect(() => {
    if (save === undefined) {
      _getSave();
    }

    return () => {
      _setSave();
    }
  }, []);

  async function _getSave() {
    try {
      const value = await AsyncStorage.getItem(props.myPlaylist.title);
      if (value !== null) {
        const myPlaylistSave = JSON.parse(value) as IMyPlaylistSave;
        if (myPlaylistSave) {

          let copySaveItems = [...myPlaylistSave.items];

          if (props.myPlaylist.favoriteitems) {

            [...props.myPlaylist.favoriteitems].reverse().forEach(playlistItem => {

              let existingSaveItem = copySaveItems.find(i => i.favorite?.videoId === playlistItem.contentDetails?.videoId);

              if (existingSaveItem) { // favorite item already in the save

                const index = copySaveItems.indexOf(existingSaveItem);

                if (playlistItem.snippet?.title === 'Deleted video') { // video removed
                  copySaveItems = [
                    ...copySaveItems.slice(0, index),
                    {
                      ...existingSaveItem,
                      favorite: {
                        exists: false,
                        videoId: existingSaveItem.favorite.videoId,
                        title: existingSaveItem.favorite.title
                      }
                    },
                    ...copySaveItems.slice(index + 1),
                  ];
                }
              } else {
                if (playlistItem.snippet?.title === 'Deleted video') { // video removed
                  copySaveItems = [
                    {
                      favorite: {
                        exists: false,
                        videoId: playlistItem.contentDetails?.videoId ? playlistItem.contentDetails?.videoId : '',
                        title: 'Deleted video'
                      }
                    },
                    ...copySaveItems
                  ];
                } else {
                  copySaveItems = [
                    {
                      favorite: {
                        exists: true,
                        videoId: playlistItem.contentDetails?.videoId ? playlistItem.contentDetails?.videoId : '',
                        title: playlistItem.snippet?.title ? playlistItem.snippet?.title : 'Unknown'
                      }
                    },
                    ...copySaveItems
                  ];
                }
              }
            });

            setsave({ items: copySaveItems });

          } else {
            console.log("No favorite items.");
          }
        }
      } else {
        if (props.myPlaylist.favoriteitems) {
          let items: ISaveItem[] = [];

          props.myPlaylist.favoriteitems.map((favoriteItem) => {
            const videoId = favoriteItem.contentDetails?.videoId ? favoriteItem.contentDetails?.videoId : '';
            const title = favoriteItem.snippet?.title ? favoriteItem.snippet?.title : '';

            items.push({
              favorite: {
                exists: favoriteItem.snippet?.title !== 'Deleted video',
                videoId: videoId,
                title: title
              }
            });
          });

          setsave({ items: items });
        } else {
          console.log("No favorite items.");
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function _setSave() {
    if (save) {
      try {
        console.log("save");
        const jsonValue = JSON.stringify(save);
        //await AsyncStorage.removeItem(props.myPlaylist.title);
        await AsyncStorage.setItem(props.myPlaylist.title, jsonValue);
      } catch (e) {
        console.error(e);
      }
    }
  }

  function _modalTitle(): string {
    if (createYoutubePlaylist) {
      return `Create youtube playlist "${createYoutubePlaylist.title}" ?`;
    } else if (deleteYoutubePlaylist) {
      return `Delete youtube playlist "${deleteYoutubePlaylist.title}" ?`;
    } else if (synchronizeYoutubePlaylist) {
      return `Synchronize youtube playlist "${synchronizeYoutubePlaylist.title}" ?`;
    } else if (createSpotifyPlaylist) {
      return `Create spotify playlist "${createSpotifyPlaylist.title}" ?`;
    } else if (deleteSpotifyPlaylistItems) {
      return `Delete spotify playlist "${deleteSpotifyPlaylistItems.title}" items ?`;
    } else if (synchronizeSpotifyPlaylist) {
      return `Synchronize spotify playlist "${synchronizeSpotifyPlaylist.title}" ?`;
    }

    return '';
  }

  function _modalVisible(): boolean {
    if (createYoutubePlaylist || deleteYoutubePlaylist || synchronizeYoutubePlaylist || createSpotifyPlaylist || deleteSpotifyPlaylistItems || synchronizeSpotifyPlaylist) {
      return true;
    }

    return false;
  }

  async function _modalOkCallback() {
    if (createYoutubePlaylist) {
      _createYoutubePlaylist();
    } else if (deleteYoutubePlaylist) {
      _deleteYoutubePlaylist();
    } else if (synchronizeYoutubePlaylist) {
      _synchronizeYoutubePlaylist();
    } else if (createSpotifyPlaylist) {
      _createSpotifyPlaylist();
    } else if (deleteSpotifyPlaylistItems) {
      _deleteSpotifyPlaylistItems();
    } else if (synchronizeSpotifyPlaylist) {
      _synchronizeSpotifyPlaylist();
    }
  }

  async function _createYoutubePlaylist() {
    if (createYoutubePlaylist) {
      try {
        var response = await new Playlists(state.youtubeState.credential.accessToken).insert({
          part: ['snippet'],
          requestBody: {
            snippet: {
              title: createYoutubePlaylist.title
            }
          }
        });
        if (response && response.snippet) {
          dispatch(bindYoutubePlaylist(
            {
              year: createYoutubePlaylist.year,
              month: createYoutubePlaylist.month,
              playlist: response
            }
          ));
          dispatch(pushYoutubeSuccessNotification(`${createYoutubePlaylist.title} created !`));
        }
      } catch (error) {
        dispatch(pushYoutubeErrorNotification(error));
      } finally {
        setcreateYoutubePlaylist(undefined);
      }
    }
  }

  async function _deleteYoutubePlaylist() {
    if (deleteYoutubePlaylist) {
      try {
        await new Playlists(state.youtubeState.credential.accessToken).delete({
          id: deleteYoutubePlaylist.playlistId
        });
        dispatch(bindYoutubePlaylist(
          {
            year: deleteYoutubePlaylist.year,
            month: deleteYoutubePlaylist.month,
            playlist: undefined
          }
        ));
        dispatch(pushYoutubeSuccessNotification(`${deleteYoutubePlaylist.title} removed !`));

        let items: ISaveItem[] = [];

        save?.items.forEach(f => {
          items.push({
            ...f,
            youtube: undefined
          })
        });

      } catch (error) {
        dispatch(pushYoutubeErrorNotification(error));
      } finally {
        setdeleteYoutubePlaylist(undefined);
      }
    }
  }

  async function _synchronizeYoutubePlaylist() {
    if (synchronizeYoutubePlaylist) {
      try {
        const playlist = state.myPlaylist.myPlaylists.find(p => p.year === synchronizeYoutubePlaylist.year && p.month === synchronizeYoutubePlaylist.month);
        if (playlist && playlist.youtube) {

          const playlistItemsToRemove = playlist.youtube.videos.filter(i => !playlist.favoriteitems.map(i => i.snippet?.resourceId?.videoId).includes(i.id));
          const playlistItemsToAdd = playlist.favoriteitems.filter(i => !playlist.youtube?.videos.map(i => i.id).includes(i.snippet?.resourceId?.videoId));

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

          dispatch(synchronizeYoutubePlaylistVideosSuccess({ year: synchronizeYoutubePlaylist.year, month: synchronizeYoutubePlaylist.month }));
          dispatch(pushYoutubeSuccessNotification(`${synchronizeYoutubePlaylist.title} synchronized !`));

          let items: ISaveItem[] = [];

          save?.items.forEach(f => {
            items.push({
              ...f,
              youtube: {
                videoId: f.favorite.videoId,
                title: f.favorite.title
              }
            })
          });

          setsave({ items: items });
        }
      } catch (error) {
        dispatch(pushYoutubeErrorNotification(error));
      } finally {
        setsynchronizeYoutubePlaylist(undefined);
      }
    }
  }

  async function _createSpotifyPlaylist() {
    if (createSpotifyPlaylist) {
      try {
        const spotifyApi = new SpotifyApi();
        spotifyApi.setAccessToken(state.spotifyState.credential.accessToken);

        const options = {
          "name": props.myPlaylist.title,
          "description": "",
          "public": true,
        };

        var response = await spotifyApi.createPlaylist(state.spotifyState.userProfile.id, options);
        if (response) {

          dispatch(bindSpotifyPlaylist({
            year: createSpotifyPlaylist.year,
            month: createSpotifyPlaylist.month,
            playlist: response
          }));
        }
      } catch (error) {
        dispatch(pushSpotifyErrorNotification(error));
      } finally {
        setcreateSpotifyPlaylist(undefined);
      }
    }
  }

  async function _deleteSpotifyPlaylistItems() {
    if (deleteSpotifyPlaylistItems) {
      try {
        const spotifyApi = new SpotifyApi();
        spotifyApi.setAccessToken(state.spotifyState.credential.accessToken);

        let uris: Object[] = [];

        props.myPlaylist.spotify?.tracks.forEach((t, i) => {
          uris.push({
            uri: t.uri,
            positions: [i]
          });
        });

        var response = await spotifyApi.removeTracksFromPlaylist(deleteSpotifyPlaylistItems.playlistId, uris);
        if (response) {

          dispatch(bindSpotifyPlaylistItemsSuccess({
            year: deleteSpotifyPlaylistItems.year,
            month: deleteSpotifyPlaylistItems.month,
            items: []
          }));
        }

        let items: ISaveItem[] = [];

        save?.items.forEach(f => {
          items.push({
            ...f,
            spotify: undefined
          })
        });
      } catch (error) {
        dispatch(pushSpotifyErrorNotification(error));
      } finally {
        setdeleteSpotifyPlaylistItems(undefined);
      }
    }
  }

  const ArtistsName = "Artists";
  const SeparatorName = "Separator";
  const TitleName = "Title";
  const _artists = `(?<${ArtistsName}>[A-Za-z0-9_\\s\\.\\&\\-\\'\\,\\²\\#\\\"]*)`;

  const SpaceDelimiter = "(\\s{2,3})";
  const DashDelimiter = "(\\s*(-|–)\\s+)|(\\s+(-|–)\\s*)";
  const ColonDelimiter = "(\\s*(:)\\s+)|(\\s+(:)\\s*)";

  const _separator = `(?<${SeparatorName}>${SpaceDelimiter}|${DashDelimiter}|${ColonDelimiter})`;
  const _title = `(?<${TitleName}>[A-Za-z0-9_\\s\\.\\&\\-\\'\\,\\²\\#\\\"]*)`;

  const _artistsSeparator: string[] = [
    " - ",
    " & ",
    " ft. ",
    " ft ",
    " Ft. ",
    " Ft ",
    " feat. ",
    " feat ",
    " Feat. ",
    " Feat ",
    " featuring ",
    " vs. ",
    " vs ",
    " Vs. ",
    " Vs ",
    ", ",
    " x ",
    " X ",
    " and ",
    " with ",
    " With "
  ];

  const _titleUpdates: Record<string, string> =
  {
    "²": "2",
    " | ": " ",
    "F.": "F. ",
    "Mc Tha Watcher": "Tha Watcher",
    " HQ ": " ",
    " Rip ": " ",
    "Preview": " ",
    "Q-dance": " ",
    "Q-Base": " ",
    "Official": " ",
    " Video": " ",
    " Out Now": " ",
    "Soundtrack": " ",
    "Aftermovie": " ",
    "Dj Anime": "Anime",
    " anthem ": " ",
    " by ": " "
  };

  const _pattern = `${_artists}${_separator}${_title}`;

  const _titleRegex: RegExp = new RegExp(_pattern);

  function _updateRawTitle(title: string): string {
    let updatedTitle = title;

    for (const [key, value] of Object.entries(_titleUpdates)) {
      updatedTitle = updatedTitle.replace(key, value);
    }

    if (updatedTitle.includes('(')) {
      updatedTitle = updatedTitle.substring(0, updatedTitle.indexOf('('));
    }

    return updatedTitle;
  }

  async function _synchronizeSpotifyPlaylist() {
    if (synchronizeSpotifyPlaylist && save) {
      try {

        const spotifyApi = new SpotifyApi();
        spotifyApi.setAccessToken(state.spotifyState.credential.accessToken);

        let promises = save.items.map(async item => {

          let result: ISynchro = {
            favoriteVideoId: item.favorite.videoId,
          };

          if (item.spotify === undefined) {

            const title = item.favorite.title;
            const updatedTitle = _updateRawTitle(title);

            const matchArray = updatedTitle.match(_titleRegex);
            if (matchArray && matchArray.groups) {

              const artistsName = matchArray.groups[ArtistsName];
              const titleName = matchArray.groups[TitleName];

              const artists = artistsName.trim().split(new RegExp(`(${_artistsSeparator.join('|')})`)).filter(r => !_artistsSeparator.includes(r));

              const search = `${titleName} ${artists.join(" ")}`;

              const options: globalThis.SpotifyApi.SearchForItemParameterObject = {
                limit: 1
              };

              var response = await spotifyApi.searchTracks(search, options);
              if (response && response.tracks.total > 0) {
                const res = response.tracks.items[0];

                result.spotify = {
                  id: res.id,
                  title: res.name,
                  uri: res.uri
                }
              }
            }
          }

          return result;
        });

        const sync: ISynchro[] = await Promise.all(promises);

        if (props.myPlaylist.spotify?.playlist.id) {

          let uris: string[] = [];

          sync.forEach(s => {
            if (s.spotify) {
              uris.push(s.spotify.uri);
            }
          });

          var respons = await spotifyApi.addTracksToPlaylist(props.myPlaylist.spotify?.playlist.id, uris);
          if (respons) {

            let copy: ISaveItem[] = [...save.items];

            sync.forEach(element => {

              if (element.spotify) {
                let existingSaveItem = copy.find(i => i.favorite?.videoId === element.favoriteVideoId);
                if (existingSaveItem) {

                  const index = copy.indexOf(existingSaveItem);

                  copy = [
                    ...copy.slice(0, index),
                    {
                      ...existingSaveItem,
                      spotify: {
                        id: element.spotify.id,
                        title: element.spotify.title
                      }
                    },
                    ...copy.slice(index + 1),
                  ];

                }
              }
            });


            setsave({ items: copy });
          }
        }
      } catch (error) {
        dispatch(pushSpotifyErrorNotification(error));
      } finally {
        setsynchronizeSpotifyPlaylist(undefined);
      }
    }
  }

  function _modalCancelCallback() {
    if (createYoutubePlaylist) {
      setcreateYoutubePlaylist(undefined);
    } else if (deleteYoutubePlaylist) {
      setdeleteYoutubePlaylist(undefined);
    } else if (synchronizeYoutubePlaylist) {
      setsynchronizeYoutubePlaylist(undefined);
    } else if (createSpotifyPlaylist) {
      setcreateSpotifyPlaylist(undefined);
    } else if (deleteSpotifyPlaylistItems) {
      setdeleteSpotifyPlaylistItems(undefined);
    } else if (synchronizeSpotifyPlaylist) {
      setsynchronizeSpotifyPlaylist(undefined);
    }
  }

  function _getYoutubeThumbnail(saveYoutube: ISaveYoutube | undefined): string {

    if (saveYoutube) {
      const item = props.myPlaylist.youtube?.videos.find(i => i.id === saveYoutube.videoId);
      if (item && item.snippet?.thumbnails?.medium?.url) {
        return item.snippet.thumbnails.medium.url;
      }
    }

    return "https://2.bp.blogspot.com/-muVbmju-gkA/Vir94NirTeI/AAAAAAAAT9c/VoHzHZzQmR4/s1600/placeholder-image.jpg";
    //return "https://i.ytimg.com/img/no_thumbnail.jpg";
  }

  function _getYoutubeChannel(saveYoutube: ISaveYoutube): string {

    const item = props.myPlaylist.youtube?.videos.find(i => i.id === saveYoutube.videoId);
    if (item && item.snippet?.channelTitle) {
      return item.snippet.channelTitle;
    }

    return 'No channel';
  }

  function _getYoutubeViewCount(saveYoutube: ISaveYoutube): string {

    const item = props.myPlaylist.youtube?.videos.find(i => i.id === saveYoutube.videoId);
    if (item && item.statistics?.viewCount) {
      return `${item.statistics.viewCount} views`;
    }

    return '';
  }

  function _getYoutubeDuration(saveYoutube: ISaveYoutube): string {

    const item = props.myPlaylist.youtube?.videos.find(i => i.id === saveYoutube.videoId);
    if (item && item.contentDetails?.duration) {

      var regexPtms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
      var hours = 0, minutes = 0, seconds = 0, totalMilliSeconds;

      if (regexPtms.test(item.contentDetails.duration)) {
        var matches = regexPtms.exec(item.contentDetails.duration);
        if (matches) {
          if (matches[1]) hours = Number(matches[1]);
          if (matches[2]) minutes = Number(matches[2]);
          if (matches[3]) seconds = Number(matches[3]);
          totalMilliSeconds = (hours * 3600 + minutes * 60 + seconds) * 1000;

          const durationDate = new Date(totalMilliSeconds);
          return `${durationDate.getMinutes()}:${durationDate.getSeconds()}`;
        }

      }

      return item.contentDetails.duration;
    }

    return '';
  }

  function _getSpotifyThumbnail(saveSpotify: ISaveSpotify | undefined): string {

    if (saveSpotify) {
      const item = props.myPlaylist.spotify?.tracks.find(i => i.id === saveSpotify.id);
      if (item && item.album.images.length > 0) {
        return item.album.images[0].url;
      }
    }

    return "https://2.bp.blogspot.com/-muVbmju-gkA/Vir94NirTeI/AAAAAAAAT9c/VoHzHZzQmR4/s1600/placeholder-image.jpg";
    // return 'https://i.ytimg.com/img/no_thumbnail.jpg';
  }

  function _getSpotifyArtist(saveSpotify: ISaveSpotify) {

    const item = props.myPlaylist.spotify?.tracks.find(i => i.id === saveSpotify.id);
    if (item && item.artists.length > 0) {
      return item.artists.map(a => a.name).join(', ');
    }

    return 'No artist';
  }

  function _getSpotifyDuration(saveSpotify: ISaveSpotify): string {

    const item = props.myPlaylist.spotify?.tracks.find(i => i.id === saveSpotify.id);
    if (item) {
      const durationDate = new Date(item.duration_ms);
      return `${durationDate.getMinutes()}:${durationDate.getSeconds()}`;
    }

    return '';
  }

  function _getSpotifyPopularity(saveSpotify: ISaveSpotify): string {

    const item = props.myPlaylist.spotify?.tracks.find(i => i.id === saveSpotify.id);
    if (item) {
      return `${item.popularity} (popularity)`;
    }

    return '';
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
      <Content style={{ backgroundColor: synchronizeTheme.secondaryColor }}>
        <Card noShadow transparent style={{ backgroundColor: synchronizeTheme.secondaryColor }}>
          <CardItem header style={{ backgroundColor: synchronizeTheme.secondaryColor }}>
            <Left>
              <H1 style={{ color: "white" }}>{props.myPlaylist.title}</H1>
            </Left>
            <Right>
              <Button light rounded icon onPress={() => _setSave()} style={{ borderColor: synchronizeTheme.secondaryColor, borderWidth: 1 }}>
                <Icon name="save" type="FontAwesome" />
              </Button>
            </Right>
          </CardItem>
          <CardItem cardBody style={{ backgroundColor: synchronizeTheme.secondaryColor }}>
            <Body>
              <Text note style={{ marginLeft: 30 }} >Favorites playlist contains {props.myPlaylist.favoriteitems.length} items.</Text>
            </Body>
          </CardItem>
          <CardItem style={{ backgroundColor: synchronizeTheme.secondaryColor }}>
            <Left>
              <Icon android="md-logo-youtube" ios="ios-logo-youtube" style={{ color: youtubeTheme.primaryColor, fontSize: 50 }} />
            </Left>
            <Right>
              {
                props.myPlaylist.youtube === undefined &&
                <Button light icon rounded onPress={() => setcreateYoutubePlaylist({ title: props.myPlaylist.title, year: props.myPlaylist.year, month: props.myPlaylist.month })} style={{ borderColor: synchronizeTheme.secondaryColor, borderWidth: 1 }}>
                  <Icon name="add" type="MaterialIcons" />
                </Button>
              }
              {
                props.myPlaylist.youtube &&
                <Body style={{ display: 'flex', flexDirection: 'row' }}>
                  <Button style={{ marginRight: 10, borderColor: synchronizeTheme.secondaryColor, borderWidth: 1 }} light icon rounded onPress={() => setdeleteYoutubePlaylist({ title: props.myPlaylist.title, year: props.myPlaylist.year, month: props.myPlaylist.month, playlistId: props.myPlaylist.youtube?.playlist?.id ? props.myPlaylist.youtube.playlist.id : '' })} >
                    <Icon name="cross" type="Entypo" />
                  </Button>
                  {
                    true && //props.myPlaylist.youtube.items.length !== props.myPlaylist.favoriteitems.length &&
                    <Button style={{ marginRight: 10, borderColor: synchronizeTheme.secondaryColor, borderWidth: 1 }} light icon rounded onPress={() => setsynchronizeYoutubePlaylist({ title: props.myPlaylist.title, year: props.myPlaylist.year, month: props.myPlaylist.month })}>
                      <Icon name="refresh" type="MaterialCommunityIcons" />
                    </Button>
                  }
                </Body>
              }
            </Right>
          </CardItem>
          <CardItem last style={{ backgroundColor: synchronizeTheme.secondaryColor }}>
            <Left>
              <Icon name="spotify" type='FontAwesome' style={{ color: spotifyTheme.primaryColor, fontSize: 50 }} />
            </Left>
            <Right>
              {
                props.myPlaylist.spotify === undefined &&
                <Button light icon rounded onPress={() => setcreateSpotifyPlaylist({ title: props.myPlaylist.title, year: props.myPlaylist.year, month: props.myPlaylist.month })} style={{ borderColor: synchronizeTheme.secondaryColor, borderWidth: 1 }}>
                  <Icon name="add" type="MaterialIcons" />
                </Button>
              }
              {
                props.myPlaylist.spotify &&
                <Body style={{ display: 'flex', flexDirection: 'row' }}>
                  <Button style={{ marginRight: 10, borderColor: synchronizeTheme.secondaryColor, borderWidth: 1 }} light rounded icon onPress={() => setdeleteSpotifyPlaylistItems({ title: props.myPlaylist.title, year: props.myPlaylist.year, month: props.myPlaylist.month, playlistId: props.myPlaylist.spotify?.playlist?.id ? props.myPlaylist.spotify.playlist.id : '' })}>
                    <Icon name="cross" type="Entypo" />
                  </Button>
                  {
                    true && //props.myPlaylist.spotify.items.length !== props.myPlaylist.favoriteitems.length &&
                    <Button style={{ marginRight: 10, borderColor: synchronizeTheme.secondaryColor, borderWidth: 1 }} light rounded icon onPress={() => setsynchronizeSpotifyPlaylist({ title: props.myPlaylist.title, year: props.myPlaylist.year, month: props.myPlaylist.month })}>
                      <Icon name="refresh" type="MaterialCommunityIcons" />
                    </Button>
                  }
                </Body>
              }
            </Right>
          </CardItem>
        </Card>
        <Separator style={{ height: 5, backgroundColor: synchronizeTheme.secondaryBackgroundColor }} />
        <List style={{ backgroundColor: synchronizeTheme.secondaryColor }}>
          {
            save &&
            save.items.map((saveItem: ISaveItem, i) =>
              <Card key={i} noShadow={true} style={{ borderColor: synchronizeTheme.primaryColor, borderBottomColor: "transparent", borderLeftWidth: 5, borderTopWidth: 5, borderRightWidth: 0, borderBottomWidth: 0, backgroundColor: synchronizeTheme.secondaryColor }}>
                <CardItem cardBody header style={{ backgroundColor: synchronizeTheme.secondaryColor, borderRadius: 0 }}>
                  <Left style={{ maxWidth: 50 }}>
                    <Text style={{ color: "white" }}>#{i + 1}</Text>
                  </Left>
                  <Body>
                    <H3 style={{ color: "white", overflow: 'hidden' }} numberOfLines={2}>{saveItem.favorite.title}</H3>
                  </Body>
                </CardItem>
                <CardItem style={{ backgroundColor: synchronizeTheme.secondaryColor, borderRadius: 0 }}>
                  <Left style={{ maxWidth: 90 }}>
                    <Thumbnail source={{ uri: _getYoutubeThumbnail(saveItem.youtube) }} style={{ borderRadius: 20, borderColor: youtubeTheme.primaryColor, borderWidth: 2, width: 80, height: 80 }} />
                  </Left>
                  {
                    saveItem.youtube &&
                    <Body>
                      <Text style={{ fontSize: 18, color: "white" }} numberOfLines={2}>{saveItem.youtube.title}</Text>
                      <Text note numberOfLines={1}>{_getYoutubeChannel(saveItem.youtube)}</Text>
                      <Text note numberOfLines={1}>{_getYoutubeViewCount(saveItem.youtube)}</Text>
                      <Text note numberOfLines={1}>{_getYoutubeDuration(saveItem.youtube)}</Text>
                    </Body>
                  }
                </CardItem>
                <CardItem style={{ backgroundColor: synchronizeTheme.secondaryColor, borderRadius: 0 }}>
                  <Left style={{ maxWidth: 90 }}>
                    <Thumbnail source={{ uri: _getSpotifyThumbnail(saveItem.spotify) }} style={{ borderRadius: 20, borderColor: spotifyTheme.primaryColor, borderWidth: 2, width: 80, height: 80 }} />
                  </Left>
                  {
                    saveItem.spotify &&
                    <>
                      <Body>
                        <Text style={{ fontSize: 18, color: "white" }}>{saveItem.spotify.title}</Text>
                        <Text note>{_getSpotifyArtist(saveItem.spotify)}</Text>
                        <Text note>{_getSpotifyPopularity(saveItem.spotify)}</Text>
                        <Text note>{_getSpotifyDuration(saveItem.spotify)}</Text>
                      </Body>
                    </>
                  }
                </CardItem>
              </Card>
            )
          }
        </List>
      </Content>
    </>
  )
};

export default SynchronizePlaylistView;
