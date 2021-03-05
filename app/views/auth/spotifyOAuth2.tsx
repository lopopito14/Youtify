import React from "react";
import { AuthConfiguration, authorize, refresh, revoke } from "react-native-app-auth";
import Context from "../../store/context";
import { spotifyApiAuthorizeError, spotifyApiAuthorizeRequest, spotifyApiAuthorizeSucess as spotifyApiAuthorizeSuccess, spotifyApiRefreshError, spotifyApiRefreshRequest, spotifyApiRefreshSucess as spotifyApiRefreshSuccess, spotifyApiRevokeError, spotifyApiRevokeRequest, spotifyApiRevokeSuccess } from "../../store/types/spotify_credential_actions";
import { spotifyCurrentProfileError, spotifyCurrentProfileRequest, spotifyCurrentProfileSucess } from "../../store/types/spotify_userProfile_actions";
import CredentialView from "./credentialView";
import SpotifyApi from 'spotify-web-api-js';
import { Body, Card, CardItem, Spinner } from "native-base";
import { Image, StyleSheet } from "react-native";
import UserProfileItem from "./userProfileItem";
import { settingsTheme } from "../theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Props {
	authorizeConfiguration: AuthConfiguration;
}

const SpotifyOAuth2: React.FunctionComponent<Props> = (props: Props) => {
	const { state, dispatch } = React.useContext(Context);

	const storageKey = "spotify_refresh_token";

	React.useEffect(() => {
		if (state.spotifyState.credential.isLogged) {
			if (state.spotifyState.userProfile.id == '') {
				getSpotifyUserId();
			}
		} else {
			tryRefreshSpotify();
		}
	}, [state.spotifyState.credential.isLogged]);

	const tryRefreshSpotify = async () => {
		try {
			const value = await AsyncStorage.getItem(storageKey);
			if (value !== null) {
				try {
					dispatch(spotifyApiRefreshRequest());
					var refreshResult = await refresh(props.authorizeConfiguration, { refreshToken: value });
					if (refreshResult) {
						dispatch(spotifyApiRefreshSuccess(refreshResult));

						if (refreshResult.refreshToken) {
							await storeRefreshToken(refreshResult.refreshToken);
						}
					}
				} catch (error) {
					dispatch(spotifyApiRefreshError(error));
				}
			}
		} catch (e) {
			console.error(e);
		}
	}

	const authorizeSpotify = async () => {
		try {
			dispatch(spotifyApiAuthorizeRequest());
			var authorizeResult = await authorize(props.authorizeConfiguration);
			if (authorizeResult) {
				dispatch(spotifyApiAuthorizeSuccess(authorizeResult));
				await storeRefreshToken(authorizeResult.refreshToken);
			}
		} catch (error) {
			dispatch(spotifyApiAuthorizeError(error));
		}
	}

	const refreshSpotify = async () => {
		try {
			dispatch(spotifyApiRefreshRequest());
			var refreshResult = await refresh(props.authorizeConfiguration, { refreshToken: state.spotifyState.credential.refreshToken });
			if (refreshResult) {
				dispatch(spotifyApiRefreshSuccess(refreshResult));

				if (refreshResult.refreshToken) {
					await storeRefreshToken(refreshResult.refreshToken);
				}
			}
		} catch (error) {
			dispatch(spotifyApiRefreshError(error));
		}
	}

	const revokeSpotify = async () => {
		try {
			dispatch(spotifyApiRevokeRequest());
			await revoke(props.authorizeConfiguration, { tokenToRevoke: state.youtubeState.credential.refreshToken });

			dispatch(spotifyApiRevokeSuccess());
			await storeRefreshToken('');
		} catch (error) {
			dispatch(spotifyApiRevokeError(error));
		}
	}

	const getSpotifyUserId = async () => {
		try {
			dispatch(spotifyCurrentProfileRequest());
			var spotifyApi = new SpotifyApi();
			spotifyApi.setAccessToken(state.spotifyState.credential.accessToken);
			var getMeResult = await spotifyApi.getMe(props.authorizeConfiguration);
			if (getMeResult) {
				dispatch(spotifyCurrentProfileSucess(getMeResult));
			}
		} catch (error) {
			dispatch(spotifyCurrentProfileError(error));
		}
	}

	const storeRefreshToken = async (token: string) => {
		try {
			await AsyncStorage.setItem(storageKey, token);
		} catch (e) {
			console.error(e);
		}
	}

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