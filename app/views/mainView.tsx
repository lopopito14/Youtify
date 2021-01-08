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
import { YoutubeView } from './youtubeView';
import { SpotifyView } from './spotifyView';
import { reducer } from '../store/reducer';
import { InitialState } from '../store/state';
import Context from '../store/context';
import { Button, Footer, FooterTab, Icon, Text } from 'native-base';
import SettingsView from './settingsView';

interface Props { }

export enum MainViewType {
  Settings = "SETTINGS",
  Youtube = "YOUTUBE",
  Spotify = "SPOTIFY",
}

export const MainView: React.FunctionComponent<Props> = () => {
  const [state, dispatch] = useReducer(reducer, InitialState);
  const [selectedView, setselectedView] = useState<MainViewType>(MainViewType.Settings)

  const youtubeLoggedIn = state.youtubeState.credential.accessToken !== '';
  const spotifyLoggedIn = state.spotifyState.credential.accessToken !== '';

  function _isSelected(view: MainViewType): boolean {
    return selectedView == view;
  }

  return (
    <Context.Provider value={{ state, dispatch }}>
      <StatusBar barStyle="light-content" />
      {
        _isSelected(MainViewType.Settings) && <SettingsView />
      }
      {
        _isSelected(MainViewType.Youtube) && <YoutubeView />
      }
      {
        _isSelected(MainViewType.Spotify) && <SpotifyView />
      }
      <Footer>
        <FooterTab style={{ backgroundColor: "white" }}>
          {
            youtubeLoggedIn &&
            <Button vertical={true} onPress={() => setselectedView(MainViewType.Youtube)}>
              <Icon android="md-logo-youtube" ios="ios-logo-youtube" style={{ color: _isSelected(MainViewType.Youtube) ? "red" : "black" }} />
              <Text style={{ color: _isSelected(MainViewType.Youtube) ? "red" : "black" }}>Youtube</Text>
            </Button>
          }
          <Button vertical={true} onPress={() => setselectedView(MainViewType.Settings)}>
            <Icon name="cog" style={{ color: _isSelected(MainViewType.Settings) ? "#70D6FF" : "black" }} />
            <Text style={{ color: _isSelected(MainViewType.Settings) ? "#70D6FF" : "black" }}>Settings</Text>
          </Button>
          {
            spotifyLoggedIn &&
            <Button vertical={true} onPress={() => setselectedView(MainViewType.Spotify)}>
              <Icon name="spotify" type='FontAwesome' style={{ color: _isSelected(MainViewType.Spotify) ? "#1DB954" : "black" }} />
              <Text style={{ color: _isSelected(MainViewType.Spotify) ? "#1DB954" : "black" }}>Spotify</Text>
            </Button>
          }
        </FooterTab>
      </Footer>
    </Context.Provider>
  );
};

export default MainView;
