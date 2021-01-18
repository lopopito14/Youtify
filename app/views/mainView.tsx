import React, { useEffect, useReducer, useRef, useState } from 'react';
import { YoutubeView } from './youtubeView';
import { SpotifyView } from './spotifyView';
import { reducer } from '../store/reducer';
import { InitialState } from '../store/state';
import Context from '../store/context';
import { Button, Footer, FooterTab, Icon, Root, Text } from 'native-base';
import SettingsView from './settingsView';
import { synchronizeTheme, spotifyTheme, youtubeTheme } from './theme';
import BackgroundWorker from './utils/backgroundWorker';
import NotificationToast from './utils/notificationToast';
import { DrawerLayoutAndroid } from 'react-native';
import { NoneView } from './noneView';
import SynchronizeView from './synchronizeView';

interface Props { }

export enum MainViewType {
  None = "NONE",
  Youtube = "YOUTUBE",
  Spotify = "SPOTIFY",
  Synchronize = "SYNCHRONIZED"
}

export const MainView: React.FunctionComponent<Props> = () => {
  const [state, dispatch] = useReducer(reducer, InitialState);
  const [selectedView, setselectedView] = useState<MainViewType>(MainViewType.None);

  useEffect(() => {
    if (state.spotifyState.credential.isLogged && !state.youtubeState.credential.isLogged) {
      setselectedView(MainViewType.Spotify);
    }
    else if (state.youtubeState.credential.isLogged && !state.spotifyState.credential.isLogged) {
      setselectedView(MainViewType.Youtube);
    }
  }, [state.spotifyState.credential.isLogged, state.youtubeState.credential.isLogged])

  function _isSelected(view: MainViewType): boolean {
    return selectedView == view;
  }

  return (
    <Context.Provider value={{ state, dispatch }}>
      <Root>
        <BackgroundWorker />
        <DrawerLayoutAndroid drawerWidth={350} drawerLockMode='unlocked' renderNavigationView={() => <SettingsView />}>

          <NotificationToast notifications={state.notifications.notifications} />
          {
            _isSelected(MainViewType.None) && <NoneView />
          }
          {
            _isSelected(MainViewType.Youtube) && <YoutubeView />
          }
          {
            _isSelected(MainViewType.Spotify) && <SpotifyView />
          }
          {
            _isSelected(MainViewType.Synchronize) && <SynchronizeView />
          }
          {
            !_isSelected(MainViewType.None) &&
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
                {
                  state.youtubeState.credential.isLogged && state.spotifyState.credential.isLogged &&
                  <>
                    <Button vertical={true} onPress={() => setselectedView(MainViewType.Synchronize)}>
                      <Icon name="cog" style={{ color: _isSelected(MainViewType.Synchronize) ? synchronizeTheme.primaryColor : "white" }} />
                      <Text style={{ color: _isSelected(MainViewType.Synchronize) ? synchronizeTheme.primaryColor : "white" }}>Synchronize</Text>
                    </Button>
                  </>
                }
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
          }
        </DrawerLayoutAndroid>
      </Root>
    </Context.Provider>
  );
};

export default MainView;
