/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { authorize, AuthConfiguration } from 'react-native-app-auth';
import SpotifyApi from "spotify-web-api-js";
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, StatusBar, Button, Text } from 'react-native';

import {
  Header,
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { Activity, ErrorResponseException } from './app/youtubeApi/youtube-api-models';
import { Activities } from './app/youtubeApi/youtube-api-activities';

const App = () => {
  const [loginYoutube, setloginYoutube] = useState<boolean>(false);
  const [loginSpotify, setloginSpotify] = useState<boolean>(false);
  const [tokenYoutube, settokenYoutube] = useState<string>('');
  const [tokenSpotify, settokenSpotify] = useState<string>('');
  const [loadSpotifyPlaylists, setloadSpotifyPlaylists] = useState<boolean>(false);
  const [spotifyPlaylists, setspotifyPlaylists] = useState<globalThis.SpotifyApi.PlaylistObjectSimplified[]>([]);
  const [loadYoutubeActivities, setloadYoutubeActivities] = useState<boolean>(false);
  const [youtubeActivities, setyoutubeActivities] = useState<Activity[]>([]);

  useEffect(() => {
    if (loginYoutube) {
      authenticationYoutube();
    }
    return () => {
      // do nothing
    }
  }, [loginYoutube])

  useEffect(() => {
    if (loginSpotify) {
      authenticationSpotify();
    }
    return () => {
      // do nothing
    }
  }, [loginSpotify])

  useEffect(() => {
    if (loadSpotifyPlaylists) {
      fetchSpotifyPlaylists();
    } else {
      setspotifyPlaylists([]);
    }

    return () => {
      // do nothing
    }
  }, [loadSpotifyPlaylists])

  useEffect(() => {
    if (loadYoutubeActivities) {
      fetchActivities();
    } else {
      setyoutubeActivities([]);
    }
    return () => {
      // do nothing
    }
  }, [loadYoutubeActivities])

  async function authenticationYoutube() {
    var conf: AuthConfiguration = {
      clientId: '904141401363-at0un0uitf1igb4d2krdk76ebsq62kmo.apps.googleusercontent.com',
      redirectUrl: 'com.lopopitoconverter:/youtubeoauth2callback',
      scopes: ['https://www.googleapis.com/auth/youtube.readonly'],
      serviceConfiguration: {
        authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
        tokenEndpoint: 'https://oauth2.googleapis.com/token',
      },
    };

    try {
      var authorizeResult = await authorize(conf);
      if (authorizeResult) {
        settokenYoutube(authorizeResult.accessToken);
      }
    } catch (error) {
      console.log('Error => ' + error);
    }
  }

  async function authenticationSpotify() {
    var conf: AuthConfiguration = {
      clientId: 'f215a46cd2624bdf93203ab0e584350a',
      redirectUrl: 'com.lopopitoconverter:/spotifyoauth2callback',
      scopes: ['user-read-email', 'playlist-modify-public', 'user-read-private'],
      serviceConfiguration: {
        authorizationEndpoint: 'https://accounts.spotify.com/authorize',
        tokenEndpoint: 'https://accounts.spotify.com/api/token',
      },
    };

    try {
      var authorizeResult = await authorize(conf);
      if (authorizeResult) {
        settokenSpotify(authorizeResult.accessToken);
      }
    } catch (error) {
      console.log('Error => ' + error);
    }
  }

  async function fetchSpotifyPlaylists() {
    try {
      var spotifyApi = new SpotifyApi();
      spotifyApi.setAccessToken(tokenSpotify);

      var response = await spotifyApi.getUserPlaylists('gb2dbwss2vvumq0rw8o64zgbc');
      if (response) {
        setspotifyPlaylists(response.items);
      }
    } catch (error) {
      console.log('Error => ' + error);
    }
  }

  async function fetchActivities() {
    try {
      var response = await new Activities(tokenYoutube).list({ mine: true, part: ['snippet', 'contentDetails', 'id'] });
      if (response && response.items) {
        setyoutubeActivities(response.items);
      }
    } catch (error) {
      if (error instanceof ErrorResponseException) {
        console.log(error.errorResponse.error.message);
      }
      else {
        console.log('Error => ' + error);
      }
    }
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          <View>
            <Button title={loginYoutube ? 'Logged Youtube' : 'Login Youtube'} onPress={() => setloginYoutube(!loginYoutube)} color={loginYoutube ? 'red' : 'green'} />
            <Text>{tokenYoutube}</Text>
            <Button title={loginSpotify ? 'Logged Spotify' : 'Login Spotify'} onPress={() => setloginSpotify(!loginSpotify)} color={loginSpotify ? 'red' : 'green'} />
            <Text>{tokenSpotify}</Text>
            <Button title={loadSpotifyPlaylists ? 'Unload Spotify playlists' : 'Load Spotify playlists'} onPress={() => setloadSpotifyPlaylists(!loadSpotifyPlaylists)} color={loadSpotifyPlaylists ? 'red' : 'green'} />
            <>
              {
                spotifyPlaylists.map((p) => (
                  <Text key={p.name}>{p.name}</Text>
                ))
              }
            </>
            <Button title={loadYoutubeActivities ? 'Unload Youtube activities' : 'Load Youtube activities'} onPress={() => setloadYoutubeActivities(!loadYoutubeActivities)} color={loadYoutubeActivities ? 'red' : 'green'} />
            <>
              {
                youtubeActivities.map((p) => (
                  <Text key={p.id}>{p.snippet?.channelTitle}</Text>
                ))
              }
            </>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
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

export default App;
