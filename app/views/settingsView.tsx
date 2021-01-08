import React, { } from 'react';
import { YoutubeOAuth2 } from './auth/youtubeOAuth2';
import { SpotifyOAuth2 } from './auth/spotifyOAuth2';
import { Body, Content, Header, Left, Right, Title } from 'native-base';
import { ScrollView } from 'react-native';
import { AuthConfiguration } from 'react-native-app-auth';
import { settingsTheme } from './theme';

interface Props { }

export const SettingsView: React.FunctionComponent<Props> = () => {

  const youtubeAuthorizeConfiguration: AuthConfiguration = {
    clientId:
      '904141401363-at0un0uitf1igb4d2krdk76ebsq62kmo.apps.googleusercontent.com',
    redirectUrl: 'com.lopopitoconverter:/youtubeoauth2callback',
    scopes: ['https://www.googleapis.com/auth/youtube.readonly'],
    serviceConfiguration: {
      authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
      tokenEndpoint: 'https://oauth2.googleapis.com/token',
    },
  }

  const spotifyAuthorizeConfiguration: AuthConfiguration = {
    clientId: 'f215a46cd2624bdf93203ab0e584350a',
    redirectUrl: 'com.lopopitoconverter:/spotifyoauth2callback',
    scopes: [
      'user-read-email',
      'playlist-modify-public',
      'user-read-private',
    ],
    serviceConfiguration: {
      authorizationEndpoint: 'https://accounts.spotify.com/authorize',
      tokenEndpoint: 'https://accounts.spotify.com/api/token',
    },
  }

  return (
    <>
      <Header noShadow style={{ backgroundColor: settingsTheme.primaryColor }} androidStatusBarColor={settingsTheme.secondaryColor}>
        <Left />
        <Body>
          <Title>Settings</Title>
        </Body>
        <Right />
      </Header>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: settingsTheme.secondaryColor }}>
        <Content>
          <YoutubeOAuth2 authorizeConfiguration={youtubeAuthorizeConfiguration} />
          <SpotifyOAuth2 authorizeConfiguration={spotifyAuthorizeConfiguration} />
        </Content>
      </ScrollView>
    </>
  );
};

export default SettingsView;
