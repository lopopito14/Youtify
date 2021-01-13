import React, { useReducer, useState } from 'react';
import { YoutubeView } from './youtubeView';
import { SpotifyView } from './spotifyView';
import { reducer } from '../store/reducer';
import { InitialState } from '../store/state';
import Context from '../store/context';
import { Button, Footer, FooterTab, Icon, Text } from 'native-base';
import SettingsView from './settingsView';
import { settingsTheme, spotifyTheme, youtubeTheme } from './theme';
import BackgroundWorker from './utils/backgroundWorker';

interface Props { }

export enum MainViewType {
  Settings = "SETTINGS",
  Youtube = "YOUTUBE",
  Spotify = "SPOTIFY",
}

export const MainView: React.FunctionComponent<Props> = () => {
  const [state, dispatch] = useReducer(reducer, InitialState);
  const [selectedView, setselectedView] = useState<MainViewType>(MainViewType.Settings);

  function _isSelected(view: MainViewType): boolean {
    return selectedView == view;
  }

  return (
    <Context.Provider value={{ state, dispatch }}>
      <BackgroundWorker />
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
            state.youtubeState.credential.isLogged &&
            <>
              <Button vertical={true} onPress={() => setselectedView(MainViewType.Youtube)}>
                <Icon android="md-logo-youtube" ios="ios-logo-youtube" style={{ color: _isSelected(MainViewType.Youtube) ? youtubeTheme.primaryColor : "white" }} />
                <Text style={{ color: _isSelected(MainViewType.Youtube) ? youtubeTheme.primaryColor : "white" }}>Youtube</Text>
              </Button>
            </>
          }
          <Button vertical={true} onPress={() => setselectedView(MainViewType.Settings)}>
            <Icon name="cog" style={{ color: _isSelected(MainViewType.Settings) ? settingsTheme.primaryColor : "white" }} />
            <Text style={{ color: _isSelected(MainViewType.Settings) ? settingsTheme.primaryColor : "white" }}>Settings</Text>
          </Button>
          {
            state.spotifyState.credential.isLogged &&
            <>
              <Button vertical={true} onPress={() => setselectedView(MainViewType.Spotify)}>
                <Icon name="spotify" type='FontAwesome' style={{ color: _isSelected(MainViewType.Spotify) ? spotifyTheme.primaryColor : "white" }} />
                <Text style={{ color: _isSelected(MainViewType.Spotify) ? spotifyTheme.primaryColor : "white" }}>Spotify</Text>
              </Button>
            </>
          }
        </FooterTab>
      </Footer>
    </Context.Provider>
  );
};

export default MainView;
