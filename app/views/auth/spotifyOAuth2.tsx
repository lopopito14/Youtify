import React from "react";
import { AuthConfiguration, authorize, refresh, revoke } from "react-native-app-auth";
import SpotifyApi from 'spotify-web-api-js';
import { Body, Card, CardItem, Spinner } from "native-base";
import { Image, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Context from "../../store/context";
import { spotifyApiAuthorizeError, spotifyApiAuthorizeRequest, spotifyApiAuthorizeSucess as spotifyApiAuthorizeSuccess, spotifyApiRefreshError, spotifyApiRefreshRequest, spotifyApiRefreshSucess as spotifyApiRefreshSuccess, spotifyApiRevokeError, spotifyApiRevokeRequest, spotifyApiRevokeSuccess } from "../../store/types/spotify_credential_actions";
import { spotifyCurrentProfileError, spotifyCurrentProfileRequest, spotifyCurrentProfileSucess } from "../../store/types/spotify_userProfile_actions";
import CredentialView from "./credentialView";
import UserProfileItem from "./userProfileItem";
import { settingsTheme } from "../theme";
import logger from "../utils/logger";

interface Props {
	authorizeConfiguration: AuthConfiguration;
}

const SpotifyOAuth2: React.FunctionComponent<Props> = (props: Props) => {
	const { authorizeConfiguration } = props;

	const { error } = logger();

	const { state, dispatch } = React.useContext(Context);

	const storageKey = "spotify_refresh_token";

	const storeRefreshToken = React.useCallback(async (token: string) => {
		try {
			await AsyncStorage.setItem(storageKey, token);
		} catch (e) {
			error(e);
		}
	}, [error]);

	React.useEffect(() => {

		const tryRefreshSpotify = async () => {
			try {
				const value = await AsyncStorage.getItem(storageKey);
				if (value !== null) {
					try {
						dispatch(spotifyApiRefreshRequest());
						const refreshResult = await refresh(authorizeConfiguration, { refreshToken: value });
						if (refreshResult) {
							dispatch(spotifyApiRefreshSuccess(refreshResult));

							if (refreshResult.refreshToken) {
								await storeRefreshToken(refreshResult.refreshToken);
							}
						}
					} catch (e) {
						dispatch(spotifyApiRefreshError(e));
					}
				}
			} catch (e) {
				error(e);
			}
		}

		const getSpotifyUserId = async () => {
			try {
				dispatch(spotifyCurrentProfileRequest());
				const spotifyApi = new SpotifyApi();
				spotifyApi.setAccessToken(state.spotifyState.credential.accessToken);
				const getMeResult = await spotifyApi.getMe(authorizeConfiguration);
				if (getMeResult) {
					dispatch(spotifyCurrentProfileSucess(getMeResult));
				}
			} catch (e) {
				dispatch(spotifyCurrentProfileError(e));
			}
		}

		if (state.spotifyState.credential.isLogged) {
			if (state.spotifyState.userProfile.id === '') {
				getSpotifyUserId();
			}
		} else {
			tryRefreshSpotify();
		}
	}, [authorizeConfiguration, dispatch, error, state.spotifyState.credential.accessToken, state.spotifyState.credential.isLogged, state.spotifyState.userProfile.id, storeRefreshToken]);

	const authorizeSpotify = React.useCallback(async () => {
		try {
			dispatch(spotifyApiAuthorizeRequest());
			const authorizeResult = await authorize(authorizeConfiguration);
			if (authorizeResult) {
				dispatch(spotifyApiAuthorizeSuccess(authorizeResult));
				await storeRefreshToken(authorizeResult.refreshToken);
			}
		} catch (e) {
			dispatch(spotifyApiAuthorizeError(e));
		}
	}, [dispatch, authorizeConfiguration, storeRefreshToken]);

	const refreshSpotify = React.useCallback(async () => {
		try {
			dispatch(spotifyApiRefreshRequest());
			const refreshResult = await refresh(authorizeConfiguration, { refreshToken: state.spotifyState.credential.refreshToken });
			if (refreshResult) {
				dispatch(spotifyApiRefreshSuccess(refreshResult));

				if (refreshResult.refreshToken) {
					await storeRefreshToken(refreshResult.refreshToken);
				}
			}
		} catch (e) {
			dispatch(spotifyApiRefreshError(e));
		}
	}, [authorizeConfiguration, dispatch, state.spotifyState.credential.refreshToken, storeRefreshToken]);

	const revokeSpotify = React.useCallback(async () => {
		try {
			dispatch(spotifyApiRevokeRequest());
			await revoke(authorizeConfiguration, { tokenToRevoke: state.youtubeState.credential.refreshToken });

			dispatch(spotifyApiRevokeSuccess());
			await storeRefreshToken('');
		} catch (e) {
			dispatch(spotifyApiRevokeError(e));
		}
	}, [authorizeConfiguration, dispatch, state.youtubeState.credential.refreshToken, storeRefreshToken]);

	return (
		<Card>
			<CardItem header bordered>
				<Body>
					<Image source={require(`../../images/spotify-logo.png`)} style={styles.imageStyle} />
				</Body>
			</CardItem>
			<CardItem>
				<CredentialView
					credential={state.spotifyState.credential}
					authorizeDelegate={authorizeSpotify}
					refreshDelegate={refreshSpotify}
					revokeDelegate={revokeSpotify} />
			</CardItem >
			{
				state.spotifyState.userProfile.loading &&
				<CardItem bordered>
					<Body>
						<Spinner color={settingsTheme.primaryColor} />
					</Body>
				</CardItem>
			}
			{
				state.spotifyState.credential.isLogged && !state.spotifyState.userProfile.loading &&
				<>
					<UserProfileItem title="Country" description={state.spotifyState.userProfile.country} />
					<UserProfileItem title="Name" description={state.spotifyState.userProfile.displayName} />
					<UserProfileItem title="Email" description={state.spotifyState.userProfile.email} />
					<UserProfileItem title="User ID" description={state.spotifyState.userProfile.id} />
				</>
			}
		</Card>
	);
};

const styles = StyleSheet.create({
	imageStyle: {
		height: 65,
		width: 220,
		flex: 1,
		alignSelf: "center"
	}
});

export default SpotifyOAuth2;