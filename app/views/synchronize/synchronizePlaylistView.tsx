import React from 'react';
import { Body, Button, Card, CardItem, Content, H1, H3, Icon, Left, List, Right, Separator, Spinner, Text, Thumbnail } from 'native-base';
import { spotifyTheme, synchronizeTheme, youtubeTheme } from '../theme';
import ModalPopup, { ModalType } from '../utils/modalPopup';
import { ISynchronizeNavigationProps, IYoutubeMonthPlaylist } from '../synchronizeView';
import { defaultThumbnail } from '../utils/helpers';
import useSynchronizePlaylists, { IMySpotify, IMyYoutube } from './useSynchronizePlaylists';

interface IProps extends ISynchronizeNavigationProps {
  myPlaylist: IYoutubeMonthPlaylist;
}

enum ActionMode {
  None,
  DeleteYoutubeVideos,
  SynchronizeYoutube,
  DeleteSpotifyTracks,
  SynchronizeSpotify,
}

const SynchronizePlaylistView: React.FunctionComponent<IProps> = (props: IProps) => {

  const { save, saveLocal, youtubeVideos, spotifyTracks, deleteYoutubePlaylistVideos, deleteSpotifyPlaylistTracks, synchronizeYoutubePlaylist, synchronizeSpotifyPlaylist } = useSynchronizePlaylists(props.myPlaylist);
  const [mode, setMode] = React.useState<ActionMode>(ActionMode.None);
  const [title, setTitle] = React.useState<string>('');

  React.useEffect(() => {
    switch (mode) {
      case ActionMode.DeleteYoutubeVideos:
        setTitle(`Delete youtube playlist "${props.myPlaylist.title}" ?`);
        break;

      case ActionMode.SynchronizeYoutube:
        setTitle(`Synchronize youtube playlist "${props.myPlaylist.title}" ?`);
        break;

      case ActionMode.DeleteSpotifyTracks:
        setTitle(`Delete spotify playlist "${props.myPlaylist.title}" items ?`);
        break;

      case ActionMode.SynchronizeSpotify:
        setTitle(`Synchronize spotify playlist "${props.myPlaylist.title}" ?`);
        break;

      default:
        setTitle('');
        break;
    }
  }, [mode]);

  const modalOkCallback = React.useCallback(async () => {

    const selectedMode = mode;

    setMode(ActionMode.None);

    switch (selectedMode) {
      case ActionMode.DeleteYoutubeVideos:
        await deleteYoutubePlaylistVideos();
        break;

      case ActionMode.SynchronizeYoutube:
        await synchronizeYoutubePlaylist();
        break;

      case ActionMode.DeleteSpotifyTracks:
        await deleteSpotifyPlaylistTracks();
        break;

      case ActionMode.SynchronizeSpotify:
        await synchronizeSpotifyPlaylist();
        break;
    }


  }, [mode]);

  const getYoutubeThumbnail = (saveYoutube: IMyYoutube | undefined) => {

    if (saveYoutube) {
      const item = youtubeVideos.videos.find(i => i.id === saveYoutube.videoId);
      if (item && item.snippet?.thumbnails?.medium?.url) {
        return item.snippet.thumbnails.medium.url;
      }
    }

    return defaultThumbnail();
  }

  const getYoutubeChannel = (saveYoutube: IMyYoutube) => {

    const item = youtubeVideos.videos.find(i => i.id === saveYoutube.videoId);
    if (item && item.snippet?.channelTitle) {
      return item.snippet.channelTitle;
    }

    return 'No channel';
  }

  const getYoutubeViewCount = (saveYoutube: IMyYoutube) => {

    const item = youtubeVideos.videos.find(i => i.id === saveYoutube.videoId);
    if (item && item.statistics?.viewCount) {
      return `${item.statistics.viewCount} views`;
    }

    return '';
  }

  const getYoutubeDuration = (saveYoutube: IMyYoutube) => {

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

  const getSpotifyThumbnail = (saveSpotify: IMySpotify | undefined) => {

    if (saveSpotify) {
      const item = spotifyTracks.tracks.find(i => i.id === saveSpotify.id);
      if (item && item.album.images.length > 0) {
        return item.album.images[0].url;
      }
    }

    return defaultThumbnail();
  }

  const getSpotifyArtist = (saveSpotify: IMySpotify) => {

    const item = spotifyTracks.tracks.find(i => i.id === saveSpotify.id);
    if (item && item.artists.length > 0) {
      return item.artists.map(a => a.name).join(', ');
    }

    return 'No artist';
  }

  const getSpotifyDuration = (saveSpotify: IMySpotify) => {

    const item = spotifyTracks.tracks.find(i => i.id === saveSpotify.id);
    if (item) {
      const durationDate = new Date(item.duration_ms);
      return `${durationDate.getMinutes()}:${durationDate.getSeconds()}`;
    }

    return '';
  }

  const getSpotifyPopularity = (saveSpotify: IMySpotify) => {

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
        cancelCallback={() => setMode(ActionMode.None)}
        okCallback={modalOkCallback}
        title={title}
        type={ModalType.OK_CANCEL}
        visible={mode !== ActionMode.None}
      />
      <Content style={{ backgroundColor: synchronizeTheme.secondaryColor }}>
        <Card noShadow transparent style={{ backgroundColor: synchronizeTheme.secondaryColor }}>
          <CardItem header style={{ backgroundColor: synchronizeTheme.secondaryColor }}>
            <Left>
              <H1 style={{ color: "white" }}>{props.myPlaylist.title}</H1>
            </Left>
            <Right>
              <Button light rounded icon onPress={() => saveLocal()} style={{ borderColor: synchronizeTheme.secondaryColor, borderWidth: 1 }}>
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
                  <Button style={{ marginRight: 10, borderColor: synchronizeTheme.secondaryColor, borderWidth: 1 }} light icon rounded onPress={() => setMode(ActionMode.DeleteYoutubeVideos)} >
                    <Icon name="cross" type="Entypo" />
                  </Button>
                  <Button style={{ marginRight: 10, borderColor: synchronizeTheme.secondaryColor, borderWidth: 1 }} light icon rounded onPress={() => setMode(ActionMode.SynchronizeYoutube)}>
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
                  <Button style={{ marginRight: 10, borderColor: synchronizeTheme.secondaryColor, borderWidth: 1 }} light rounded icon onPress={() => setMode(ActionMode.DeleteSpotifyTracks)}>
                    <Icon name="cross" type="Entypo" />
                  </Button>
                  <Button style={{ marginRight: 10, borderColor: synchronizeTheme.secondaryColor, borderWidth: 1 }} light rounded icon onPress={() => setMode(ActionMode.SynchronizeSpotify)}>
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
            save.items.map((saveItem, i) =>
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
                        <Thumbnail source={{ uri: getYoutubeThumbnail(saveItem.youtube) }} style={{ borderRadius: 20, borderColor: youtubeTheme.primaryColor, borderWidth: 2, width: 80, height: 80 }} />
                      </Left>
                      {
                        saveItem.youtube &&
                        <Body>
                          <Text style={{ fontSize: 18, color: "white" }} numberOfLines={2}>{saveItem.youtube.title}</Text>
                          <Text note numberOfLines={1}>{getYoutubeChannel(saveItem.youtube)}</Text>
                          <Text note numberOfLines={1}>{getYoutubeViewCount(saveItem.youtube)}</Text>
                          <Text note numberOfLines={1}>{getYoutubeDuration(saveItem.youtube)}</Text>
                        </Body>
                      }
                    </CardItem>
                    <CardItem style={{ backgroundColor: synchronizeTheme.secondaryColor, borderRadius: 0 }}>
                      <Left style={{ maxWidth: 90 }}>
                        <Thumbnail source={{ uri: getSpotifyThumbnail(saveItem.spotify) }} style={{ borderRadius: 20, borderColor: spotifyTheme.primaryColor, borderWidth: 2, width: 80, height: 80 }} />
                      </Left>
                      {
                        saveItem.spotify &&
                        <>
                          <Body>
                            <Text style={{ fontSize: 18, color: "white" }}>{saveItem.spotify.title}</Text>
                            <Text note>{getSpotifyArtist(saveItem.spotify)}</Text>
                            <Text note>{getSpotifyPopularity(saveItem.spotify)}</Text>
                            <Text note>{getSpotifyDuration(saveItem.spotify)}</Text>
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
