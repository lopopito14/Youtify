import React, { useContext, useEffect, useState } from 'react';
import Context from '../../store/context';
import { Body, Button, Card, CardItem, Content, H1, H3, Icon, Left, List, Right, Separator, Spinner, Text, Thumbnail } from 'native-base';
import { spotifyTheme, synchronizeTheme, youtubeTheme } from '../theme';
import ModalPopup, { ModalType } from '../utils/modalPopup';
import { pushSpotifyErrorNotification, pushYoutubeErrorNotification, pushYoutubeSuccessNotification } from '../../store/types/notifications_actions';
import { PlaylistItems } from '../../youtubeApi/youtube-api-playlistItems';
import { ILoad, ISpotifyTracks, IYoutubeMonthPlaylist, IYoutubeVideos } from '../../store/state';
import { SynchronizeViewType } from '../synchronizeView';
import SpotifyApi from 'spotify-web-api-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Videos } from '../../youtubeApi/youtube-api-videos';

interface IProps {
  selectedView: SynchronizeViewType;
  setselectedView(view: SynchronizeViewType): any;
  myPlaylist: IYoutubeMonthPlaylist;
}

interface IMyPlaylistSave extends ILoad {
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

  const [save, setsave] = useState<IMyPlaylistSave>({
    loading: false,
    loaded: false,
    items: []
  });

  const [youtubeVideos, setYoutubeVideos] = useState<IYoutubeVideos>({
    loaded: false,
    loading: false,
    videos: []
  });
  const [playlistItemPageToken, setplaylistItemPageToken] = useState<string | undefined>(undefined);

  const [spotifyTracks, setSpotifyTracks] = useState<ISpotifyTracks>({
    loaded: false,
    loading: false,
    tracks: []
  });
  const [spotifyTracksPageOffset, setSpotifyTracksPageOffset] = useState<number | undefined>(undefined);

  const [deleteYoutubePlaylistVideos, setdeleteYoutubePlaylistVideos] = useState<{ title: string, year: number, month: number, playlistId: string } | undefined>(undefined);
  const [synchronizeYoutubePlaylist, setsynchronizeYoutubePlaylist] = useState<{ title: string, year: number, month: number } | undefined>(undefined);
  const [deleteSpotifyPlaylistTracks, setdeleteSpotifyPlaylistItems] = useState<{ title: string, year: number, month: number, playlistId: string } | undefined>(undefined);
  const [synchronizeSpotifyPlaylist, setsynchronizeSpotifyPlaylist] = useState<{ title: string, year: number, month: number } | undefined>(undefined);

  useEffect(() => {
    _getSave();
  }, []);

  useEffect(() => {
    if (props.myPlaylist.youtubePlaylist?.id) {
      _fetchYoutubeVideos();
    } else {
      setYoutubeVideos((prev) => {
        return {
          ...prev,
          loading: false,
          loaded: true
        }
      });
    }
  }, [props.myPlaylist.youtubePlaylist?.id]);

  useEffect(() => {
    if (playlistItemPageToken) {
      _fetchYoutubeVideos(playlistItemPageToken);
    }
  }, [playlistItemPageToken]);

  useEffect(() => {
    if (props.myPlaylist.spotifyPlaylist?.id) {
      _fetchSpotifyTracks();
    } else {
      setSpotifyTracks((prev) => {
        return {
          ...prev,
          loading: false,
          loaded: true
        }
      });
    }
  }, [props.myPlaylist.spotifyPlaylist?.id]);

  useEffect(() => {
    if (spotifyTracksPageOffset) {
      _fetchSpotifyTracks(spotifyTracksPageOffset);
    }
  }, [spotifyTracksPageOffset]);

  async function _getSave() {

    let items: ISaveItem[] = [];

    try {

      setsave((prev) => {
        return {
          ...prev,
          loading: true,
          loaded: false
        }
      });

      const value = await AsyncStorage.getItem(props.myPlaylist.title);
      if (value !== null) {
        const myPlaylistSave = JSON.parse(value) as IMyPlaylistSave;
        if (myPlaylistSave) {

          items = [...myPlaylistSave.items];

          if (props.myPlaylist.favoriteitems) {

            [...props.myPlaylist.favoriteitems].reverse().forEach(playlistItem => {

              let existingSaveItem = items.find(i => i.favorite?.videoId === playlistItem.contentDetails?.videoId);

              if (existingSaveItem) { // favorite item already in the save

                const index = items.indexOf(existingSaveItem);

                if (playlistItem.snippet?.title === 'Deleted video') { // video removed
                  items = [
                    ...items.slice(0, index),
                    {
                      ...existingSaveItem,
                      favorite: {
                        exists: false,
                        videoId: existingSaveItem.favorite.videoId,
                        title: existingSaveItem.favorite.title
                      }
                    },
                    ...items.slice(index + 1),
                  ];
                }
              } else {
                if (playlistItem.snippet?.title === 'Deleted video') { // video removed
                  items = [
                    {
                      favorite: {
                        exists: false,
                        videoId: playlistItem.contentDetails?.videoId ? playlistItem.contentDetails?.videoId : '',
                        title: 'Deleted video'
                      }
                    },
                    ...items
                  ];
                } else {
                  items = [
                    {
                      favorite: {
                        exists: true,
                        videoId: playlistItem.contentDetails?.videoId ? playlistItem.contentDetails?.videoId : '',
                        title: playlistItem.snippet?.title ? playlistItem.snippet?.title : 'Unknown'
                      }
                    },
                    ...items
                  ];
                }
              }
            });
          } else {
            console.log("No favorite items.");
          }

        }
      } else {
        if (props.myPlaylist.favoriteitems) {

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

        } else {
          console.log("No favorite items.");
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setsave((prev) => {
        return {
          ...prev,
          loading: false,
          loaded: true,
          items: items
        }
      });
    }
  }

  async function _setSave() {
    if (save) {
      try {
        console.log(`save ${props.myPlaylist.title} => `);
        console.log(save.items);

        const jsonValue = JSON.stringify(save);
        //await AsyncStorage.removeItem(props.myPlaylist.title);
        await AsyncStorage.setItem(props.myPlaylist.title, jsonValue);
      } catch (e) {
        console.error(e);
      }
    }
  }

  async function _fetchYoutubeVideos(pageToken: string | undefined = undefined) {
    if (props.myPlaylist.youtubePlaylist?.id) {
      try {
        setYoutubeVideos((prev) => {
          return {
            ...prev,
            loading: true,
            loaded: false,
            videos: pageToken ? [...prev.videos] : []
          }
        });

        var playlistItemsResponse = await new PlaylistItems(state.youtubeState.credential.accessToken).list({
          playlistId: props.myPlaylist.youtubePlaylist?.id,
          part: ['contentDetails'],
          maxResults: 50,
          pageToken: pageToken
        });

        if (playlistItemsResponse) {

          if (playlistItemsResponse.items) {
            let videosIds: string[] = [];

            playlistItemsResponse.items.forEach(i => {
              if (i.contentDetails?.videoId) {
                videosIds.push(i.contentDetails?.videoId);
              }
            });

            var videosResponse = await new Videos(state.youtubeState.credential.accessToken).list({
              id: videosIds,
              part: ['snippet', 'contentDetails', 'statistics'],
              maxResults: 50,
            });

            if (videosResponse && videosResponse.items) {
              const items = videosResponse.items;
              setYoutubeVideos((prev) => {
                return {
                  ...prev,
                  videos: [
                    ...prev.videos,
                    ...items
                  ]
                }
              });
            }
          }

          if (playlistItemsResponse.nextPageToken) {
            setplaylistItemPageToken(playlistItemsResponse.nextPageToken);
          } else {
            setYoutubeVideos((prev) => {
              return {
                ...prev,
                loading: false,
                loaded: true
              }
            });
            setplaylistItemPageToken(undefined);
          }
        }
      } catch (error) {
        setYoutubeVideos((prev) => {
          return {
            ...prev,
            loading: false,
            loaded: false
          }
        });
        dispatch(pushYoutubeErrorNotification(error));
      }
    }
  }

  async function _fetchSpotifyTracks(offset: number | undefined = undefined) {
    if (props.myPlaylist.spotifyPlaylist?.id) {
      try {
        setSpotifyTracks((prev) => {
          return {
            ...prev,
            loading: true,
            loaded: false,
            tracks: offset ? [...prev.tracks] : []
          }
        });

        const spotifyApi = new SpotifyApi();
        spotifyApi.setAccessToken(state.spotifyState.credential.accessToken);

        const limit = 50;
        var options: Object;
        if (offset) {
          options = {
            "market": state.spotifyState.userProfile.country,
            "limit": limit,
            "offset": offset,
          }
        }
        else {
          options = {
            "market": state.spotifyState.userProfile.country,
            "limit": limit
          }
        }

        var response = await spotifyApi.getPlaylistTracks(props.myPlaylist.spotifyPlaylist.id, options);
        if (response) {

          var filteredTracks: globalThis.SpotifyApi.TrackObjectFull[] = [];
          response.items.forEach(t => {
            if (t.track.type === 'track') {
              filteredTracks.push(t.track);
            }
          });

          setSpotifyTracks((prev) => {
            return {
              ...prev,
              tracks: [
                ...prev.tracks,
                ...filteredTracks
              ]
            }
          });

          if (response.next === null) {
            setSpotifyTracksPageOffset(undefined);
            setSpotifyTracks((prev) => {
              return {
                ...prev,
                loading: false,
                loaded: true
              }
            });
          } else {
            setSpotifyTracksPageOffset(response.offset + limit);
          }
        }
      } catch (error) {
        setSpotifyTracks((prev) => {
          return {
            ...prev,
            loading: false,
            loaded: false
          }
        });
        dispatch(pushSpotifyErrorNotification(error));
      }
    }
  }

  function _modalTitle(): string {
    if (deleteYoutubePlaylistVideos) {
      return `Delete youtube playlist "${deleteYoutubePlaylistVideos.title}" ?`;
    } else if (synchronizeYoutubePlaylist) {
      return `Synchronize youtube playlist "${synchronizeYoutubePlaylist.title}" ?`;
    } else if (deleteSpotifyPlaylistTracks) {
      return `Delete spotify playlist "${deleteSpotifyPlaylistTracks.title}" items ?`;
    } else if (synchronizeSpotifyPlaylist) {
      return `Synchronize spotify playlist "${synchronizeSpotifyPlaylist.title}" ?`;
    }

    return '';
  }

  function _modalVisible(): boolean {
    if (deleteYoutubePlaylistVideos || synchronizeYoutubePlaylist || deleteSpotifyPlaylistTracks || synchronizeSpotifyPlaylist) {
      return true;
    }

    return false;
  }

  async function _modalOkCallback() {
    if (deleteYoutubePlaylistVideos) {
      _deleteYoutubePlaylistVideos();
    } else if (synchronizeYoutubePlaylist) {
      _synchronizeYoutubePlaylist();
    } else if (deleteSpotifyPlaylistTracks) {
      _deleteSpotifyPlaylistTracks();
    } else if (synchronizeSpotifyPlaylist) {
      _synchronizeSpotifyPlaylist();
    }
  }

  async function _deleteYoutubePlaylistVideos() {
    if (deleteYoutubePlaylistVideos) {

      setdeleteYoutubePlaylistVideos(undefined);

      try {

        const playlistItemsResponse = await new PlaylistItems(state.youtubeState.credential.accessToken).list({
          playlistId: props.myPlaylist.youtubePlaylist?.id ? props.myPlaylist.youtubePlaylist?.id : '',
          part: ['id'],
          maxResults: 50
        });

        if (playlistItemsResponse && playlistItemsResponse.items) {

          let promises = playlistItemsResponse.items.map(async playlistItem => {
            if (playlistItem.id) {
              await new PlaylistItems(state.youtubeState.credential.accessToken).delete({
                id: playlistItem.id
              });
            }
          });

          await Promise.all(promises);

          setYoutubeVideos((prev) => {
            return {
              ...prev,
              videos: []
            }
          });

          setsave((prev) => {
            return {
              ...prev,
              items: prev.items.map(i => {
                return {
                  ...i,
                  youtube: undefined
                }
              })
            }
          });

          dispatch(pushYoutubeSuccessNotification(`${deleteYoutubePlaylistVideos.title} cleaned !`));
        }
      } catch (error) {
        dispatch(pushYoutubeErrorNotification(error));
      }
    }
  }

  async function _synchronizeYoutubePlaylist() {
    if (synchronizeYoutubePlaylist) {

      setsynchronizeYoutubePlaylist(undefined);

      try {
        if (props.myPlaylist.youtubePlaylist) {

          const playlistItemsToRemove = youtubeVideos.videos.filter(i => !props.myPlaylist.favoriteitems.map(i => i.snippet?.resourceId?.videoId).includes(i.id));
          const playlistItemsToAdd = props.myPlaylist.favoriteitems.filter(i => !youtubeVideos.videos.map(i => i.id).includes(i.snippet?.resourceId?.videoId));

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
                    playlistId: props.myPlaylist.youtubePlaylist.id,
                    resourceId: playlistItemToAdd.snippet?.resourceId
                  }
                }
              });
            }
          }

          await _fetchYoutubeVideos();

          dispatch(pushYoutubeSuccessNotification(`${synchronizeYoutubePlaylist.title} synchronized !`));

          setsave((prev) => {

            return {
              ...prev,
              items: [...prev.items].map(f => {
                return {
                  ...f,
                  youtube: {
                    videoId: f.favorite.videoId,
                    title: f.favorite.title
                  }
                }
              })
            }
          });
        }
      } catch (error) {
        dispatch(pushYoutubeErrorNotification(error));
      }
    }
  }

  async function _deleteSpotifyPlaylistTracks() {
    if (deleteSpotifyPlaylistTracks) {

      setdeleteSpotifyPlaylistItems(undefined);

      try {
        const spotifyApi = new SpotifyApi();
        spotifyApi.setAccessToken(state.spotifyState.credential.accessToken);

        let uris: Object[] = [];

        spotifyTracks.tracks.forEach((t, i) => {
          uris.push({
            uri: t.uri,
            positions: [i]
          });
        });

        var removeTrackResponse = await spotifyApi.removeTracksFromPlaylist(deleteSpotifyPlaylistTracks.playlistId, uris);
        if (removeTrackResponse) {

          setSpotifyTracks((prev) => {
            return {
              ...prev,
              tracks: []
            }
          });

          setsave((prev) => {
            return {
              ...prev,
              items: prev.items.map(i => {
                return {
                  ...i,
                  spotify: undefined
                }
              })
            }
          });
        }
      } catch (error) {
        dispatch(pushSpotifyErrorNotification(error));
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
    if (synchronizeSpotifyPlaylist) {

      setsynchronizeSpotifyPlaylist(undefined);

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

        if (props.myPlaylist.spotifyPlaylist?.id) {

          let uris: string[] = [];

          sync.forEach(s => {
            if (s.spotify) {
              uris.push(s.spotify.uri);
            }
          });

          var respons = await spotifyApi.addTracksToPlaylist(props.myPlaylist.spotifyPlaylist.id, uris);
          if (respons) {

            await _fetchSpotifyTracks();

            setsave((prev) => {

              let copy: ISaveItem[] = [...prev.items];

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

              return {
                ...prev,
                items: copy
              }
            });
          }
        }
      } catch (error) {
        dispatch(pushSpotifyErrorNotification(error));
      }
    }
  }

  function _modalCancelCallback() {
    if (deleteYoutubePlaylistVideos) {
      setdeleteYoutubePlaylistVideos(undefined);
    } else if (synchronizeYoutubePlaylist) {
      setsynchronizeYoutubePlaylist(undefined);
    } else if (deleteSpotifyPlaylistTracks) {
      setdeleteSpotifyPlaylistItems(undefined);
    } else if (synchronizeSpotifyPlaylist) {
      setsynchronizeSpotifyPlaylist(undefined);
    }
  }

  function _getYoutubeThumbnail(saveYoutube: ISaveYoutube | undefined): string {

    if (saveYoutube) {
      const item = youtubeVideos.videos.find(i => i.id === saveYoutube.videoId);
      if (item && item.snippet?.thumbnails?.medium?.url) {
        return item.snippet.thumbnails.medium.url;
      }
    }

    return "https://2.bp.blogspot.com/-muVbmju-gkA/Vir94NirTeI/AAAAAAAAT9c/VoHzHZzQmR4/s1600/placeholder-image.jpg";
    //return "https://i.ytimg.com/img/no_thumbnail.jpg";
  }

  function _getYoutubeChannel(saveYoutube: ISaveYoutube): string {

    const item = youtubeVideos.videos.find(i => i.id === saveYoutube.videoId);
    if (item && item.snippet?.channelTitle) {
      return item.snippet.channelTitle;
    }

    return 'No channel';
  }

  function _getYoutubeViewCount(saveYoutube: ISaveYoutube): string {

    const item = youtubeVideos.videos.find(i => i.id === saveYoutube.videoId);
    if (item && item.statistics?.viewCount) {
      return `${item.statistics.viewCount} views`;
    }

    return '';
  }

  function _getYoutubeDuration(saveYoutube: ISaveYoutube): string {

    const item = youtubeVideos.videos.find(i => i.id === saveYoutube.videoId);
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
      const item = spotifyTracks.tracks.find(i => i.id === saveSpotify.id);
      if (item && item.album.images.length > 0) {
        return item.album.images[0].url;
      }
    }

    return "https://2.bp.blogspot.com/-muVbmju-gkA/Vir94NirTeI/AAAAAAAAT9c/VoHzHZzQmR4/s1600/placeholder-image.jpg";
    // return 'https://i.ytimg.com/img/no_thumbnail.jpg';
  }

  function _getSpotifyArtist(saveSpotify: ISaveSpotify) {

    const item = spotifyTracks.tracks.find(i => i.id === saveSpotify.id);
    if (item && item.artists.length > 0) {
      return item.artists.map(a => a.name).join(', ');
    }

    return 'No artist';
  }

  function _getSpotifyDuration(saveSpotify: ISaveSpotify): string {

    const item = spotifyTracks.tracks.find(i => i.id === saveSpotify.id);
    if (item) {
      const durationDate = new Date(item.duration_ms);
      return `${durationDate.getMinutes()}:${durationDate.getSeconds()}`;
    }

    return '';
  }

  function _getSpotifyPopularity(saveSpotify: ISaveSpotify): string {

    const item = spotifyTracks.tracks.find(i => i.id === saveSpotify.id);
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
                props.myPlaylist.youtubePlaylist &&
                <Body style={{ display: 'flex', flexDirection: 'row' }}>
                  <Button style={{ marginRight: 10, borderColor: synchronizeTheme.secondaryColor, borderWidth: 1 }} light icon rounded onPress={() => setdeleteYoutubePlaylistVideos({ title: props.myPlaylist.title, year: props.myPlaylist.year, month: props.myPlaylist.month, playlistId: props.myPlaylist.youtubePlaylist?.id ? props.myPlaylist.youtubePlaylist.id : '' })} >
                    <Icon name="cross" type="Entypo" />
                  </Button>
                  <Button style={{ marginRight: 10, borderColor: synchronizeTheme.secondaryColor, borderWidth: 1 }} light icon rounded onPress={() => setsynchronizeYoutubePlaylist({ title: props.myPlaylist.title, year: props.myPlaylist.year, month: props.myPlaylist.month })}>
                    <Icon name="refresh" type="MaterialCommunityIcons" />
                  </Button>
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
                props.myPlaylist.spotifyPlaylist &&
                <Body style={{ display: 'flex', flexDirection: 'row' }}>
                  <Button style={{ marginRight: 10, borderColor: synchronizeTheme.secondaryColor, borderWidth: 1 }} light rounded icon onPress={() => setdeleteSpotifyPlaylistItems({ title: props.myPlaylist.title, year: props.myPlaylist.year, month: props.myPlaylist.month, playlistId: props.myPlaylist.spotifyPlaylist?.id ? props.myPlaylist.spotifyPlaylist.id : '' })}>
                    <Icon name="cross" type="Entypo" />
                  </Button>
                  <Button style={{ marginRight: 10, borderColor: synchronizeTheme.secondaryColor, borderWidth: 1 }} light rounded icon onPress={() => setsynchronizeSpotifyPlaylist({ title: props.myPlaylist.title, year: props.myPlaylist.year, month: props.myPlaylist.month })}>
                    <Icon name="refresh" type="MaterialCommunityIcons" />
                  </Button>
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
                {
                  spotifyTracks.loaded && youtubeVideos.loaded &&
                  <>
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
                  </>
                }
                {
                  (spotifyTracks.loading || youtubeVideos.loading) &&
                  <Spinner color={synchronizeTheme.primaryColor} />
                }
              </Card>
            )
          }
        </List>
      </Content>
    </>
  )
};

export default SynchronizePlaylistView;
