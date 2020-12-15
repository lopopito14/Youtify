/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { authorize, refresh, revoke, prefetchConfiguration, AuthConfiguration, AuthorizeResult } from 'react-native-app-auth';
import SpotifyApi from "spotify-web-api-js";
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  Button,
  Text,
} from 'react-native';

import {
  Header,
  Colors,
} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  const [loginYoutube, setloginYoutube] = useState<boolean>(false);
  const [loginSpotify, setloginSpotify] = useState<boolean>(false);
  const [tokenYoutube, settokenYoutube] = useState<string>('');
  const [tokenSpotify, settokenSpotify] = useState<string>('');
  const [loadSpotifyPlaylists, setloadSpotifyPlaylists] = useState<boolean>(false);
  const [spotifyPlaylists, setspotifyPlaylists] = useState<globalThis.SpotifyApi.PlaylistObjectSimplified[]>([]);

  useEffect(() => {
    if (loginYoutube) {
      var promise: Promise<AuthorizeResult> = testAuthenticationYoutube();
      promise
        .then((res) => {
          if (res) {
            settokenYoutube(res.accessToken);
            console.log('Youtube accessToken => ' + tokenYoutube);
          } else {
            console.log('AuthorizeResult is null');
          }
        })
        .catch((err) => {
          console.log('Error => ' + err);
        });
    }
    return () => {
      // do nothing
    }
  }, [loginYoutube])

  useEffect(() => {
    if (loginSpotify) {
      var promise: Promise<AuthorizeResult> = testAuthenticationSpotify();
      promise
        .then((res) => {
          if (res) {
            settokenSpotify(res.accessToken);
            console.log('Spotify accessToken => ' + tokenSpotify);
          } else {
            console.log('AuthorizeResult is null');
          }
        })
        .catch((err) => {
          console.log('Error => ' + err);
        });
    }
    return () => {
      // do nothing
    }
  }, [loginSpotify])

  useEffect(() => {
    if (loadSpotifyPlaylists) {
      var spotifyApi = new SpotifyApi();
      spotifyApi.setAccessToken(tokenSpotify);

      spotifyApi.getUserPlaylists('gb2dbwss2vvumq0rw8o64zgbc')
        .then((res) => {
          if (res.items) {
            setspotifyPlaylists(res.items);
            console.log('Playlists loaded ' + res.items.length);
          } else {
            console.log('getArtists is null');
          }
        })
        .catch((err) => {
          console.log('Error => ' + err);
        });
    } else {
      setspotifyPlaylists([]);
    }
    return () => {
      // do nothing
    }
  }, [loadSpotifyPlaylists])

  async function testAuthenticationYoutube(): Promise<AuthorizeResult> {
    var conf: AuthConfiguration = {
      clientId: '435243970579-9ehmgu86hc33d883tot5ofgtblt5sg44.apps.googleusercontent.com',
      //clientSecret: 'Jg7JzzLgdjl0fCy6b5xKvgc-',
      redirectUrl: 'com.lopopitoconverter:/youtubeoauth2callback',
      scopes: ['https://www.googleapis.com/auth/youtube'],
      serviceConfiguration: {
        authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
        tokenEndpoint: 'https://oauth2.googleapis.com/token',
      },
    };
    return await authorize(conf);
  }

  async function testAuthenticationSpotify(): Promise<AuthorizeResult> {
    var conf: AuthConfiguration = {
      clientId: 'f215a46cd2624bdf93203ab0e584350a', // available on the app page
      clientSecret: '69eae4663c9948a8990bcf600b3de526', // click "show client secret" to see this
      redirectUrl: 'com.lopopitoconverter:/spotifyoauth2callback', // the redirect you defined after creating the app
      scopes: ['user-read-email', 'playlist-modify-public', 'user-read-private'], // the scopes you need to access
      serviceConfiguration: {
        authorizationEndpoint: 'https://accounts.spotify.com/authorize',
        tokenEndpoint: 'https://accounts.spotify.com/api/token',
      },
    };
    return await authorize(conf);
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
