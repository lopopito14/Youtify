/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useReducer, useState } from 'react';
import { StyleSheet, ScrollView, View, StatusBar } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { YoutubeOAuth2 } from './auth/youtubeOAuth2';
import { SpotifyOAuth2 } from './auth/spotifyOAuth2';
import { YoutubeActivities } from './draft/youtubeActivities';
import { SpotifyPlaylists } from './draft/spotifyPlaylists';
import { reducer } from '../store/reducer';
import { InitialState } from '../store/state';
import Context from '../store/context';
import { Badge, Button, Footer, FooterTab, Icon, Text } from 'native-base';

interface Props { }

export enum MainView {
  Home = "HOME",
  Youtube = "YOUTUBE",
  Spotify = "SPOTIFY",
}

export const Main: React.FunctionComponent<Props> = () => {
  const [state, dispatch] = useReducer(reducer, InitialState);
  const [mainView, setmainView] = useState<MainView>(MainView.Home)

  function homeView(): JSX.Element {
    return (
      <>
        {
          mainView === MainView.Home &&
          <>
            <YoutubeOAuth2 />
            <SpotifyOAuth2 />
          </>
        }
      </>
    );
  }

  function youtubeView(): JSX.Element {
    return (
      <>
        {
          mainView === MainView.Youtube &&
          <>
            <YoutubeActivities />
          </>
        }
      </>
    );
  }

  function spotifyView(): JSX.Element {
    return (
      <>
        {
          mainView === MainView.Spotify &&
          <>
            <SpotifyPlaylists />
          </>
        }
      </>
    );
  }

  function footer(): JSX.Element {

    const youtubeLoggedIn = state.youtubeState.credential.accessToken !== '';
    const spotifyLoggedIn = state.spotifyState.credential.accessToken !== '';
    const isFullLogged = youtubeLoggedIn && spotifyLoggedIn;

    return (
      <Footer>
        <FooterTab style={{ backgroundColor: "black" }}>
          {
            youtubeLoggedIn &&
            <Button onPress={() => setmainView(MainView.Youtube)}>
              <Icon name="youtube-square" type='FontAwesome' style={{ color: "red" }} />
            </Button>
          }
          <Button badge={isFullLogged} vertical={true} onPress={() => setmainView(MainView.Home)}>
            {isFullLogged && <Badge style={{ backgroundColor: "green" }}><Text>ok</Text></Badge>}
            <Icon name="home" style={{ color: "white" }} />
          </Button>
          {
            spotifyLoggedIn &&
            <Button onPress={() => setmainView(MainView.Spotify)}>
              <Icon name="spotify" type='FontAwesome' style={{ color: "green" }} />
            </Button>
          }
        </FooterTab>
      </Footer>
    );
  }

  return (
    <Context.Provider value={{ state, dispatch }}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <View>
          {homeView()}
          {youtubeView()}
          {spotifyView()}
        </View>
      </ScrollView>
      {footer()}
    </Context.Provider>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default Main;
