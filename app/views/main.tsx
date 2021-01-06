/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useReducer } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, StatusBar } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { YoutubeOAuth2 } from './auth/youtubeOAuth2';
import { SpotifyOAuth2 } from './auth/spotifyOAuth2';
import { YoutubeActivities } from './draft/youtubeActivities';
import { SpotifyPlaylists } from './draft/spotifyPlaylists';
import { reducer } from '../store/reducer';
import { InitialState } from '../store/state';
import Context from '../store/context';

interface Props { }

export const Main: React.FunctionComponent<Props> = () => {
  const [state, dispatch] = useReducer(reducer, InitialState);

  return (
    <Context.Provider value={{ state, dispatch }}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View>
            <YoutubeOAuth2 />
            <SpotifyOAuth2 />
            <YoutubeActivities />
            <SpotifyPlaylists />
          </View>
        </ScrollView>
      </SafeAreaView>
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
