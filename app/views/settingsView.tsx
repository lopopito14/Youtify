/* eslint-disable no-console */
import React from 'react';
import { Body, Content, Header, Left, Title } from 'native-base';
import { ScrollView, StyleSheet } from 'react-native';
import { AuthConfiguration } from 'react-native-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { settingsTheme } from './theme';
import SpotifyOAuth2 from './auth/spotifyOAuth2';
import YoutubeOAuth2 from './auth/youtubeOAuth2';

const SettingsView: React.VoidFunctionComponent = () => {

	const youtubeAuthorizeConfiguration: AuthConfiguration = {
		clientId: '904141401363-at0un0uitf1igb4d2krdk76ebsq62kmo.apps.googleusercontent.com',
		redirectUrl: 'com.lopopitoconverter:/youtubeoauth2callback',
		scopes: [
			'https://www.googleapis.com/auth/youtube.readonly',
			'https://www.googleapis.com/auth/youtube.force-ssl'
		],
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
			'playlist-modify-private',
			'user-read-private',
			'user-follow-read',
			'user-follow-modify'
		],
		serviceConfiguration: {
			authorizationEndpoint: 'https://accounts.spotify.com/authorize',
			tokenEndpoint: 'https://accounts.spotify.com/api/token',
		},
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const purgeLocalStorage = React.useCallback(async () => {
		try {
			const keys = await AsyncStorage.getAllKeys();

			const promises = keys.map(async key => {
				if (key.startsWith('Playlist ')) {
					await AsyncStorage.removeItem(key);
				}
			});

			await Promise.all(promises);
			console.log("Local playlists purged !");

		} catch (e) {
			console.log(e);
		}
	}, []);

	return (
		<>
			<Header noShadow style={styles.headerStyle} androidStatusBarColor={settingsTheme.secondaryColor}>
				<Left />
				<Body>
					<Title>Settings</Title>
				</Body>
			</Header>
			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				showsVerticalScrollIndicator={false}
				style={styles.contentStyle}>
				<Content>
					<YoutubeOAuth2 authorizeConfiguration={youtubeAuthorizeConfiguration} />
					<SpotifyOAuth2 authorizeConfiguration={spotifyAuthorizeConfiguration} />
					{/* <Button onPress={purgeLocalStorage}>
						<Text>Purge local storage</Text>
					</Button> */}
				</Content>
			</ScrollView>
		</>
	);
};

const styles = StyleSheet.create({
	headerStyle: {
		backgroundColor: settingsTheme.primaryColor
	},
	contentStyle: {
		backgroundColor: settingsTheme.secondaryColor
	}
});

export default SettingsView;
