import React from 'react';
import { Accordion, Body, Button, Content, H1, Header, Icon, Left, List, ListItem, Right, Spinner, Switch, Text, Title, View } from 'native-base';
import { spotifyTheme, synchronizeTheme, youtubeTheme } from './theme';
import { IMyPlaylists, ISpotifyPlaylists, IYoutubeMonthPlaylist, IYoutubePlaylists } from '../store/state';
import SynchronizePlaylistView from './synchronize/synchronizePlaylistView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FavoritePlaylistBackgroundWorker from './utils/favoritePlaylistBackgroundWorker';
import PlaylistsBackgroundWorker from './utils/playlistsBackgroundWorker';
import PlaylistsDispatcher from './utils/playlistsDispatcher';
import { Playlists } from '../youtubeApi/youtube-api-playlists';
import Context from '../store/context';
import { pushSpotifyErrorNotification, pushSpotifySuccessNotification, pushYoutubeErrorNotification, pushYoutubeSuccessNotification } from '../store/types/notifications_actions';
import SpotifyApi from 'spotify-web-api-js';

interface Props { }

interface YearFilter {
  year: number;
  active: boolean;
}

export enum SynchronizeViewType {
  SYNCHRONIZE,
  SYNCHRONIZE_PLAYLIST
}

export interface ISynchronizeNavigationProps {
  selectedView: SynchronizeViewType;
  setselectedView(view: SynchronizeViewType): any;
}

export const SynchronizeView: React.FunctionComponent<Props> = () => {
  const { state, dispatch } = React.useContext(Context);

  const [myPlaylist, setMyPlaylist] = React.useState<IMyPlaylists>({
    loaded: false,
    loading: false,
    playlists: []
  })
  const [youtubePlaylists, setYoutubePlaylists] = React.useState<IYoutubePlaylists>({
    loaded: false,
    loading: false,
    playlists: []
  });
  const [spotifyPlaylists, setSpotifyPlaylists] = React.useState<ISpotifyPlaylists>({
    loaded: false,
    loading: false,
    playlists: []
  });
  const [selectedView, setselectedView] = React.useState<SynchronizeViewType>(SynchronizeViewType.SYNCHRONIZE);
  const [selectedPlaylist, setSelectedPlaylist] = React.useState<IYoutubeMonthPlaylist | undefined>(undefined);
  const [yearFilter, setYearFilter] = React.useState<YearFilter[] | undefined>(undefined);
  const [createPlaylists, setCreatePlaylists] = React.useState<IYoutubeMonthPlaylist | undefined>(undefined);

  const yearFilterKey = "synchronize-year-filter";

  React.useEffect(() => {
    if (myPlaylist.loaded) {
      _buildYearsFilter();
    }
  }, [myPlaylist.loaded]);

  React.useEffect(() => {
    if (yearFilter) {
      _saveYearsFilter();
    }
  }, [yearFilter]);

  React.useEffect(() => {
    if (createPlaylists) {
      _createPlaylist(createPlaylists);
    }
  }, [createPlaylists]);

  async function _buildYearsFilter() {

    let yearsFilter: YearFilter[] = [];

    const years = [...new Set(myPlaylist.playlists.map(p => p.year))];

    years.forEach(y => {
      yearsFilter.push({ year: y, active: true });
    });

    try {
      const value = await AsyncStorage.getItem(yearFilterKey);
      if (value) {
        const parsedYearsFilter = JSON.parse(value) as YearFilter[];
        if (parsedYearsFilter) {
          parsedYearsFilter.filter(y => !y.active).forEach(p => {
            let existingItem = yearsFilter.find(y => y.year === p.year);
            if (existingItem) {
              const index = yearsFilter.indexOf(existingItem);
              yearsFilter[index].active = false;
            }
          });
        }
      }
    } catch (e) {
      console.error(e);
    }

    setYearFilter(yearsFilter);
  }

  async function _saveYearsFilter() {
    try {
      const jsonValue = JSON.stringify(yearFilter);
      await AsyncStorage.setItem(yearFilterKey, jsonValue);
    } catch (e) {
      console.error(e);
    }
  }

  function _isSelectedView(view: SynchronizeViewType) {
    return selectedView === view;
  }

  function _headerTitle() {
    if (_isSelectedView(SynchronizeViewType.SYNCHRONIZE_PLAYLIST)) {
      return "Synchronize Playlist";
    }

    return 'Synchronize';
  }

  function _onBackButtonPressed() {
    if (_isSelectedView(SynchronizeViewType.SYNCHRONIZE_PLAYLIST)) {
      setselectedView(SynchronizeViewType.SYNCHRONIZE);
    }
  }

  async function _createPlaylist(myPlaylist: IYoutubeMonthPlaylist) {

    let youtubePlaylist = myPlaylist.youtubePlaylist;
    let spotifyPlaylist = myPlaylist.spotifyPlaylist;

    try {
      if (myPlaylist.spotifyPlaylist === undefined) {
        try {
          const spotifyApi = new SpotifyApi();
          spotifyApi.setAccessToken(state.spotifyState.credential.accessToken);

          const options = {
            "name": myPlaylist.title,
            "description": "",
            "public": true,
          };

          var createSpotifyPlaylistResponse = await spotifyApi.createPlaylist(state.spotifyState.userProfile.id, options);
          if (createSpotifyPlaylistResponse) {

            setSpotifyPlaylists((prev) => {
              return {
                ...prev,
                playlists: [
                  ...prev.playlists,
                  {
                    ...createSpotifyPlaylistResponse,
                    tracks: {
                      href: '',
                      total: 0
                    }
                  }
                ]
              }
            });

            spotifyPlaylist = {
              ...createSpotifyPlaylistResponse,
              tracks: {
                href: '',
                total: 0
              }
            };

            dispatch(pushSpotifySuccessNotification(`Spotify playlist '${myPlaylist.title}' created !`));
          }
        } catch (error) {
          dispatch(pushSpotifyErrorNotification(error));
        }
      }
      if (myPlaylist.youtubePlaylist === undefined) {
        try {
          var createYoutubePlaylistResponse = await new Playlists(state.youtubeState.credential.accessToken).insert({
            part: ['snippet', 'contentDetails'],
            requestBody: {
              snippet: {
                title: myPlaylist.title
              }
            }
          });
          if (createYoutubePlaylistResponse && createYoutubePlaylistResponse.snippet) {

            setYoutubePlaylists((prev) => {
              return {
                ...prev,
                playlists: [
                  ...prev.playlists,
                  createYoutubePlaylistResponse
                ]
              }
            });

            youtubePlaylist = createYoutubePlaylistResponse;

            dispatch(pushYoutubeSuccessNotification(`Youtube playlist '${myPlaylist.title}' created !`));
          }
        } catch (error) {
          dispatch(pushYoutubeErrorNotification(error));
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setMyPlaylist((prev) => {

        const index = prev.playlists.indexOf(myPlaylist);

        return {
          ...prev,
          playlists: [
            ...prev.playlists.slice(0, index),
            {
              ...myPlaylist,
              spotifyPlaylist: spotifyPlaylist,
              youtubePlaylist: youtubePlaylist
            },
            ...prev.playlists.slice(index + 1),
          ]
        }
      });

      setCreatePlaylists(undefined);
    }
  }

  function _onOpenSynchronizePlaylist(myPlaylist: IYoutubeMonthPlaylist) {
    setSelectedPlaylist(myPlaylist);
    setselectedView(SynchronizeViewType.SYNCHRONIZE_PLAYLIST);
  }

  function _buildAccordion() {
    var array: { title: JSX.Element, content: JSX.Element }[] = [];

    const title = <H1>Filtre</H1>;
    const content =
      <List>
        {
          yearFilter?.map((y, i) =>
            <ListItem key={i}>
              <Left>
                <Text style={{ color: "white" }}>{y.year}</Text>
              </Left>
              <Right>
                <Switch style={{ transform: [{ scale: 1.2 }, { translateX: -40 }] }} thumbColor={"white"} trackColor={{ true: "green", false: "white" }} value={y.active} onValueChange={() =>
                  setYearFilter(
                    [
                      ...yearFilter.slice(0, i),
                      {
                        active: !yearFilter[i].active,
                        year: yearFilter[i].year
                      },
                      ...yearFilter.slice(i + 1)
                    ])
                } />
              </Right>
            </ListItem>
          )
        }
      </List>;
    array.push({ title: title, content: content });

    return array;
  }

  return (
    <>
      <Header noShadow style={{ backgroundColor: synchronizeTheme.primaryColor }} androidStatusBarColor={synchronizeTheme.secondaryColor}>
        <Left>
          {
            !_isSelectedView(SynchronizeViewType.SYNCHRONIZE) &&
            <Button transparent onPress={_onBackButtonPressed}>
              <Icon name='arrow-back' />
            </Button>
          }
        </Left>
        <Body>
          <Title>{_headerTitle()}</Title>
        </Body>
      </Header>
      <FavoritePlaylistBackgroundWorker myPlaylist={myPlaylist} setMyPlaylist={setMyPlaylist} />
      <PlaylistsBackgroundWorker youtubePlaylists={youtubePlaylists} setYoutubePlaylists={setYoutubePlaylists} spotifyPlaylists={spotifyPlaylists} setSpotifyPlaylists={setSpotifyPlaylists} />
      <PlaylistsDispatcher myPlaylist={myPlaylist} setMyPlaylist={setMyPlaylist} youtubePlaylists={youtubePlaylists} spotifyPlaylists={spotifyPlaylists} />
      {
        selectedView === SynchronizeViewType.SYNCHRONIZE &&
        <>
          {
            myPlaylist.loaded && yearFilter &&
            <View style={{ backgroundColor: "black" }}>
              <Accordion style={{ backgroundColor: synchronizeTheme.secondaryBackgroundColor }} dataArray={_buildAccordion()} expanded={-1} renderContent={(item) => <>{item.content}</>} />
            </View>
          }
          <Content style={{ backgroundColor: "black" }}>
            {
              myPlaylist.loaded && yearFilter &&
              <>
                <List>
                  {
                    yearFilter.filter(y => y.active).map((y, i) =>
                      <View key={i}>
                        <ListItem itemHeader key={1}>
                          <H1 style={{ color: "white" }}>{y.year}</H1>
                        </ListItem>
                        {
                          myPlaylist.playlists.filter(p => p.year === y.year).map((p, j) =>
                            <ListItem key={j + 1} thumbnail>
                              <Left>
                                {
                                  (p.youtubePlaylist === undefined || p.spotifyPlaylist === undefined) &&
                                  <Button warning icon transparent>
                                    <Icon name='sync' type='FontAwesome5' />
                                  </Button>
                                }
                                {
                                  p.youtubePlaylist && p.spotifyPlaylist &&
                                  <Button success icon transparent>
                                    <Icon name='check' type='FontAwesome' />
                                  </Button>
                                }
                              </Left>
                              <Body>
                                <Text style={{ color: "white" }}>{p.title}</Text>
                                <Text note>{p.favoriteitems.length} favorite items</Text>
                                {
                                  p.youtubePlaylist &&
                                  <Text note style={{ color: youtubeTheme.primaryColor }}>youtube contains {p.youtubePlaylist.contentDetails?.itemCount} videos</Text>
                                }
                                {
                                  p.spotifyPlaylist &&
                                  <Text note style={{ color: spotifyTheme.primaryColor }}>spotify contains {p.spotifyPlaylist.tracks.total} tracks</Text>
                                }
                              </Body>
                              <Right>
                                {
                                  (p.spotifyPlaylist === undefined || p.youtubePlaylist === undefined) &&
                                  <Button icon light onPress={() => setCreatePlaylists(p)}>
                                    <Icon name='create' type='MaterialIcons' />
                                  </Button>
                                }
                                {
                                  p.spotifyPlaylist && p.youtubePlaylist &&
                                  <Button icon light onPress={() => _onOpenSynchronizePlaylist(p)}>
                                    <Icon name='arrow-forward' />
                                  </Button>
                                }
                              </Right>
                            </ListItem>
                          )
                        }
                      </View>
                    )
                  }
                </List>
              </>
            }
            {
              (!myPlaylist.loaded || yearFilter === undefined) && <Spinner color={synchronizeTheme.primaryColor} />
            }

          </Content>
        </>
      }
      {
        selectedView === SynchronizeViewType.SYNCHRONIZE_PLAYLIST && selectedPlaylist &&
        <SynchronizePlaylistView selectedView={selectedView} setselectedView={setselectedView} myPlaylist={selectedPlaylist} />
      }
    </>
  )
};

export default SynchronizeView;
