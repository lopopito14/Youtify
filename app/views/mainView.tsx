import React, { useEffect, useReducer, useState } from 'react';
import { YoutubeView } from './youtubeView';
import { SpotifyView } from './spotifyView';
import { reducer } from '../store/reducer';
import { InitialState } from '../store/state';
import Context from '../store/context';
import { Button, Footer, FooterTab, Icon, Root, Text } from 'native-base';
import SettingsView from './settingsView';
import { synchronizeTheme, spotifyTheme, youtubeTheme } from './theme';
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
    } else if (state.youtubeState.credential.isLogged && !state.spotifyState.credential.isLogged) {
      setselectedView(MainViewType.Youtube);
    } else if (state.youtubeState.credential.isLogged && state.spotifyState.credential.isLogged) {
      setselectedView(MainViewType.Synchronize);
    } else {
      setselectedView(MainViewType.None);
    }
  }, [state.spotifyState.credential.isLogged, state.youtubeState.credential.isLogged])

  function _isSelected(view: MainViewType): boolean {
    return selectedView == view;
  }

  function _footerOpacity(view: MainViewType): number {
    return _isSelected(view) ? 1 : 0.5;
  }

  function _footerBackgroundColor(): string {
    if (_isSelected(MainViewType.Youtube)) {
      return youtubeTheme.primaryColor;
    } else if (_isSelected(MainViewType.Synchronize)) {
      return synchronizeTheme.primaryColor;
    } else if (_isSelected(MainViewType.Spotify)) {
      return spotifyTheme.primaryColor;
    }

    return "black";
  }

  return (
    <Context.Provider value={{ state, dispatch }}>
      <Root>

        <DrawerLayoutAndroid drawerWidth={350} drawerLockMode='unlocked' renderNavigationView={() => <SettingsView />}>
          <>
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
                <FooterTab style={{ backgroundColor: _footerBackgroundColor() }}>
                  {
                    state.youtubeState.credential.isLogged &&
                    <>
                      <Button vertical={true} onPress={() => setselectedView(MainViewType.Youtube)}>
                        <Icon android="md-logo-youtube" ios="ios-logo-youtube" style={{ color: "white", opacity: _footerOpacity(MainViewType.Youtube) }} fontSize={1} />
                        <Text style={{ color: "white", opacity: _footerOpacity(MainViewType.Youtube), fontWeight: 'bold' }}>Youtube</Text>
                      </Button>
                    </>
                  }
                  {
                    state.youtubeState.credential.isLogged && state.spotifyState.credential.isLogged &&
                    <>
                      <Button vertical={true} onPress={() => setselectedView(MainViewType.Synchronize)}>
                        <Icon name="md-sync-circle" type='Ionicons' style={{ color: "white", opacity: _footerOpacity(MainViewType.Synchronize) }} fontSize={1} />
                        <Text style={{ color: "white", opacity: _footerOpacity(MainViewType.Synchronize), fontWeight: 'bold' }}>Synchronize</Text>
                      </Button>
                    </>
                  }
                  {
                    state.spotifyState.credential.isLogged &&
                    <>
                      <Button vertical={true} onPress={() => setselectedView(MainViewType.Spotify)}>
                        <Icon name="spotify" fontSize={50} type='FontAwesome' style={{ color: "white", opacity: _footerOpacity(MainViewType.Spotify) }} />
                        <Text style={{ color: "white", opacity: _footerOpacity(MainViewType.Spotify), fontWeight: 'bold' }}>Spotify</Text>
                      </Button>
                    </>
                  }
                </FooterTab>
              </Footer>
            }
          </>
        </DrawerLayoutAndroid>
      </Root>
    </Context.Provider>
  );
};

export default MainView;
