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
import { StatusBar } from 'react-native';
import { YoutubeActivities } from './draft/youtubeActivities';
import { SpotifyPlaylists } from './draft/spotifyPlaylists';
import { reducer } from '../store/reducer';
import { InitialState } from '../store/state';
import Context from '../store/context';
import { Badge, Button, Footer, FooterTab, Icon, Text } from 'native-base';
import Home from './home';

interface Props { }

export enum MainView {
  Home = "HOME",
  Youtube = "YOUTUBE",
  Spotify = "SPOTIFY",
}

export const Main: React.FunctionComponent<Props> = () => {
  const [state, dispatch] = useReducer(reducer, InitialState);
  const [mainView, setmainView] = useState<MainView>(MainView.Home)

  const youtubeLoggedIn = state.youtubeState.credential.accessToken !== '';
  const spotifyLoggedIn = state.spotifyState.credential.accessToken !== '';
  const isFullLogged = youtubeLoggedIn && spotifyLoggedIn;

  return (
    <Context.Provider value={{ state, dispatch }}>
      <StatusBar barStyle="light-content" />
      {
        mainView === MainView.Home && <Home />
      }
      {
        mainView === MainView.Youtube && <YoutubeActivities />
      }
      {
        mainView === MainView.Spotify && <SpotifyPlaylists />
      }
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
    </Context.Provider>
  );
};

export default Main;
