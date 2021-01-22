import React, { useEffect, useState } from 'react';
import { Accordion, Body, Button, Content, H1, Header, Icon, Left, List, ListItem, Right, Spinner, Switch, Text, Title, View } from 'native-base';
import { spotifyTheme, synchronizeTheme, youtubeTheme } from './theme';
import { IMyPlaylists, ISpotifyPlaylists, IYoutubeMonthPlaylist, IYoutubePlaylists } from '../store/state';
import SynchronizePlaylistView from './synchronize/synchronizePlaylistView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FavoritePlaylistBackgroundWorker from './utils/favoritePlaylistBackgroundWorker';
import PlaylistsBackgroundWorker from './utils/playlistsBackgroundWorker';
import PlaylistsDispatcher from './utils/playlistsDispatcher';

interface Props { }

interface YearFilter {
  year: number;
  active: boolean;
}

export enum SynchronizeViewType {
  Synchronize,
  SynchronizePlaylist
}

export const SynchronizeView: React.FunctionComponent<Props> = () => {
  const [myPlaylist, setMyPlaylist] = useState<IMyPlaylists>({
    loaded: false,
    loading: false,
    playlists: []
  })
  const [youtubePlaylists, setYoutubePlaylists] = useState<IYoutubePlaylists>({
    loaded: false,
    loading: false,
    playlists: []
  });
  const [spotifyPlaylists, setSpotifyPlaylists] = useState<ISpotifyPlaylists>({
    loaded: false,
    loading: false,
    playlists: []
  });
  const [selectedView, setselectedView] = useState<SynchronizeViewType>(SynchronizeViewType.Synchronize);
  const [selectedPlaylist, setSelectedPlaylist] = useState<IYoutubeMonthPlaylist | undefined>(undefined);
  const [yearFilter, setYearFilter] = useState<YearFilter[] | undefined>(undefined);

  const yearFilterKey = "synchronize-year-filter";

  useEffect(() => {
    if (myPlaylist.loaded) {
      buildYearsFilter();
    }
  }, [myPlaylist.loaded]);

  useEffect(() => {
    if (yearFilter) {
      saveYearsFilter();
    }
  }, [yearFilter]);

  async function buildYearsFilter() {

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

  async function saveYearsFilter() {
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
    if (_isSelectedView(SynchronizeViewType.SynchronizePlaylist)) {
      return "Synchronize Playlist";
    }

    return 'Synchronize';
  }

  function onBackButtonPressed() {
    if (_isSelectedView(SynchronizeViewType.SynchronizePlaylist)) {
      setselectedView(SynchronizeViewType.Synchronize);
    }
  }

  function onOpenSynchronizePlaylist(myPlaylist: IYoutubeMonthPlaylist) {
    setSelectedPlaylist(myPlaylist);
    setselectedView(SynchronizeViewType.SynchronizePlaylist);
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
            !_isSelectedView(SynchronizeViewType.Synchronize) &&
            <Button transparent onPress={onBackButtonPressed}>
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
        selectedView === SynchronizeViewType.Synchronize &&
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
                                <Button icon light onPress={() => onOpenSynchronizePlaylist(p)}>
                                  <Icon name='arrow-forward' />
                                </Button>
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
        selectedView === SynchronizeViewType.SynchronizePlaylist && selectedPlaylist &&
        <SynchronizePlaylistView selectedView={selectedView} setselectedView={setselectedView} myPlaylist={selectedPlaylist} />
      }
    </>
  )
};

export default SynchronizeView;
