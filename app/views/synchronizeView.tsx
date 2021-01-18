import React, { useContext, useEffect, useState } from 'react';
import Context from '../store/context';
import { Accordion, Body, Button, Content, H1, Header, Icon, Left, List, ListItem, Right, Spinner, Switch, Text, Title, View } from 'native-base';
import { synchronizeTheme } from './theme';
import { IYoutubeMonthPlaylist } from '../store/state';
import SynchronizePlaylistView from './synchronize/synchronizePlaylistView';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const { state } = useContext(Context);
  const [selectedView, setselectedView] = useState<SynchronizeViewType>(SynchronizeViewType.Synchronize);
  const [myPlaylist, setMyPlaylist] = useState<IYoutubeMonthPlaylist | undefined>(undefined);
  const [yearFilter, setYearFilter] = useState<YearFilter[] | undefined>(undefined);

  const yearFilterKey = "synchronize-year-filter";

  useEffect(() => {
    if (state.myPlaylist.loaded) {
      buildYearsFilter();
    }
  }, [state.myPlaylist.loaded]);

  useEffect(() => {
    if (yearFilter) {
      saveYearsFilter();
    }
  }, [yearFilter]);

  async function buildYearsFilter() {

    let yearsFilter: YearFilter[] = [];

    const years = [...new Set(state.myPlaylist.myPlaylists.map(p => p.year))];

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
    setMyPlaylist(myPlaylist);
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
                <Switch style={{ transform: [{ scale: 1.2 }, { translateX: -40 }] }} thumbColor={"white"} trackColor={{ true: "green", false: "white" }} value={y.active} onValueChange={(v) =>
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
      {
        selectedView === SynchronizeViewType.Synchronize &&
        <>
          {
            state.myPlaylist.loaded && yearFilter &&
            <View style={{ backgroundColor: "black" }}>
              <Accordion style={{ backgroundColor: synchronizeTheme.secondaryBackgroundColor }} dataArray={_buildAccordion()} expanded={-1} renderContent={(item) => <>{item.content}</>} />
            </View>
          }
          <Content style={{ backgroundColor: "black" }}>
            {
              state.myPlaylist.loaded && yearFilter &&
              <>
                <List>
                  {
                    yearFilter.filter(y => y.active).map((y, i) =>
                      <View key={i}>
                        <ListItem itemHeader key={1}>
                          <H1 style={{ color: "white" }}>{y.year}</H1>
                        </ListItem>
                        {
                          state.myPlaylist.myPlaylists.filter(p => p.year === y.year).map((p, j) =>
                            <ListItem key={j + 1} thumbnail>
                              <Left>
                                {/* <Button warning icon transparent>
                                  <Icon name='sync' type='Ionicons' />
                                </Button> */}
                                <Button success icon transparent>
                                  <Icon name='check' type='FontAwesome' />
                                </Button>
                              </Left>
                              <Body>
                                <Left>
                                  <Text style={{ color: "white" }}>{p.title}</Text>
                                  <Text note>{p.favoriteitems.length} favorite items to add</Text>
                                  {
                                    p.youtube &&
                                    <Text note>youtube contains {p.youtube.items.length} videos</Text>
                                  }
                                  {
                                    p.spotify &&
                                    <Text note>spotify contains {p.spotify.items.length} tracks</Text>
                                  }
                                </Left>
                              </Body>
                              <Right>
                                <Button iconRight light onPress={() => onOpenSynchronizePlaylist(p)}>
                                  <Text>Manage</Text>
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
              (!state.myPlaylist.loaded || yearFilter === undefined) && <Spinner color={synchronizeTheme.primaryColor} />
            }

          </Content>
        </>
      }
      {
        selectedView === SynchronizeViewType.SynchronizePlaylist && myPlaylist &&
        <SynchronizePlaylistView selectedView={selectedView} setselectedView={setselectedView} myPlaylist={myPlaylist} />
      }
    </>
  )
};

export default SynchronizeView;
