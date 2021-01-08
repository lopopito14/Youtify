import React, { useReducer, useState } from 'react';
import { StatusBar } from 'react-native';
import { YoutubeView } from './youtubeView';
import { SpotifyView } from './spotifyView';
import { reducer } from '../store/reducer';
import { InitialState } from '../store/state';
import Context from '../store/context';
import { Button, Footer, FooterTab, Icon, Text } from 'native-base';
import SettingsView from './settingsView';
import { settingsTheme, spotifyTheme, youtubeTheme } from './theme';

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
        <FooterTab style={{ backgroundColor: "black" }}>
          {
            youtubeLoggedIn &&
            <Button vertical={true} onPress={() => setselectedView(MainViewType.Youtube)}>
              <Icon android="md-logo-youtube" ios="ios-logo-youtube" style={{ color: _isSelected(MainViewType.Youtube) ? youtubeTheme.primaryColor : "white" }} />
              <Text style={{ color: _isSelected(MainViewType.Youtube) ? youtubeTheme.primaryColor : "white" }}>Youtube</Text>
            </Button>
          }
          <Button vertical={true} onPress={() => setselectedView(MainViewType.Settings)}>
            <Icon name="cog" style={{ color: _isSelected(MainViewType.Settings) ? settingsTheme.primaryColor : "white" }} />
            <Text style={{ color: _isSelected(MainViewType.Settings) ? settingsTheme.primaryColor : "white" }}>Settings</Text>
          </Button>
          {
            spotifyLoggedIn &&
            <Button vertical={true} onPress={() => setselectedView(MainViewType.Spotify)}>
              <Icon name="spotify" type='FontAwesome' style={{ color: _isSelected(MainViewType.Spotify) ? spotifyTheme.primaryColor : "white" }} />
              <Text style={{ color: _isSelected(MainViewType.Spotify) ? spotifyTheme.primaryColor : "white" }}>Spotify</Text>
            </Button>
          }
        </FooterTab>
      </Footer>
    </Context.Provider>
  );
};

export default MainView;
