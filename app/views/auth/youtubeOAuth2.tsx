import AsyncStorage from "@react-native-async-storage/async-storage";
import { Body, Card, CardItem, Spinner } from "native-base";
import React from "react";
import { Image, StyleSheet } from "react-native";
import { AuthConfiguration, authorize, AuthorizeResult, refresh, RefreshResult, revoke } from "react-native-app-auth";
import Context from "../../store/context";
import { youtubeApiAuthorizeError, youtubeApiAuthorizeRequest, youtubeApiAuthorizeSuccess, youtubeApiRefreshError, youtubeApiRefreshRequest, youtubeApiRefreshSuccess, youtubeApiRevokeError, youtubeApiRevokeRequest, youtubeApiRevokeSuccess } from "../../store/types/youtube_credential_actions";
import { youtubeCurrentProfileError, youtubeCurrentProfileRequest, youtubeCurrentProfileSucess } from "../../store/types/youtube_userProfile_actions";
import { Channels } from "../../youtubeApi/youtube-api-channels";
import { settingsTheme } from "../theme";
import logger from "../utils/logger";
import CredentialView from "./credentialView";
import UserProfileItem from "./userProfileItem";

interface IProps {
	authorizeConfiguration: AuthConfiguration;
}

const YoutubeOAuth2: React.FunctionComponent<IProps> = (props: IProps) => {
	const { authorizeConfiguration } = props;

	const { error } = logger();

	const { state, dispatch } = React.useContext(Context);

	const storageKey = "youtube_refresh_token";

	const storeRefreshToken = React.useCallback(async (token: string) => {
		try {
			await AsyncStorage.setItem(storageKey, token);
		} catch (e) {
			error(e);
		}
	}, [error]);

	React.useEffect(() => {

		const tryRefreshYoutube = async () => {
			try {
				const value = await AsyncStorage.getItem(storageKey);
				if (value !== null) {
					try {
						dispatch(youtubeApiRefreshRequest());
						const refreshResult: RefreshResult = await refresh(authorizeConfiguration, { refreshToken: value });
						if (refreshResult) {
							dispatch(youtubeApiRefreshSuccess(refreshResult));

							if (refreshResult.refreshToken) {
								await storeRefreshToken(refreshResult.refreshToken);
							}
						}
					} catch (e) {
						dispatch(youtubeApiRefreshError(e));
					}
				}
			} catch (e) {
				error(e);
			}
		}

		const getYoutubeChannelId = async () => {
			try {
				dispatch(youtubeCurrentProfileRequest());
				const response = await new Channels(state.youtubeState.credential.accessToken).list(
					{
						mine: true,
						part: ['snippet', 'contentDetails'],
					}
				)
				if (response) {
					dispatch(youtubeCurrentProfileSucess(response));
				}
			} catch (e) {
				dispatch(youtubeCurrentProfileError(e));
			}
		}

		if (state.youtubeState.credential.isLogged) {
			if (!state.youtubeState.userProfile.loaded) {
				getYoutubeChannelId();
			}
		} else {
			tryRefreshYoutube();
		}
	}, [authorizeConfiguration, dispatch, error, state.youtubeState.credential.accessToken, state.youtubeState.credential.isLogged, state.youtubeState.userProfile.loaded, storeRefreshToken]);

	const authorizeYoutube = React.useCallback(async () => {
		try {
			dispatch(youtubeApiAuthorizeRequest());
			const authorizeResult: AuthorizeResult = await authorize(authorizeConfiguration);
			if (authorizeResult) {
				dispatch(youtubeApiAuthorizeSuccess(authorizeResult));
				await storeRefreshToken(authorizeResult.refreshToken);
			}
		} catch (e) {
			dispatch(youtubeApiAuthorizeError(e));
		}
	}, [authorizeConfiguration, dispatch, storeRefreshToken]);

	const refreshYoutube = React.useCallback(async () => {
		try {
			dispatch(youtubeApiRefreshRequest());
			const refreshResult: RefreshResult = await refresh(authorizeConfiguration, { refreshToken: state.youtubeState.credential.refreshToken });
			if (refreshResult) {
				dispatch(youtubeApiRefreshSuccess(refreshResult));

				if (refreshResult.refreshToken) {
					await storeRefreshToken(refreshResult.refreshToken);
				}
			}
		} catch (e) {
			dispatch(youtubeApiRefreshError(e));
		}
	}, [authorizeConfiguration, dispatch, state.youtubeState.credential.refreshToken, storeRefreshToken]);

	const revokeYoutube = React.useCallback(async () => {
		try {
			dispatch(youtubeApiRevokeRequest());
			await revoke(authorizeConfiguration, { tokenToRevoke: state.youtubeState.credential.refreshToken });

			dispatch(youtubeApiRevokeSuccess());
			await storeRefreshToken('');
		} catch (e) {
			dispatch(youtubeApiRevokeError(e));
		}
	}, [authorizeConfiguration, dispatch, state.youtubeState.credential.refreshToken, storeRefreshToken]);

	return (
		<Card>
			<CardItem header>
				<Body>
					<Image source={require(`../../images/youtube-logo.png`)} style={styles.imageStyle} />
				</Body>
			</CardItem>
			<CardItem>
				<CredentialView
					credential={state.youtubeState.credential}
					authorizeDelegate={authorizeYoutube}
					refreshDelegate={refreshYoutube}
					revokeDelegate={revokeYoutube} />
			</CardItem>
			{
				state.youtubeState.userProfile.loading &&
				<CardItem bordered>
					<Body>
						<Spinner color={settingsTheme.primaryColor} />
					</Body>
				</CardItem>
			}
			{
				state.youtubeState.credential.isLogged && !state.youtubeState.userProfile.loading &&
				<>
					<UserProfileItem title="Name" description={state.youtubeState.userProfile.title} />
					<UserProfileItem title="Channel ID" description={state.youtubeState.userProfile.channelId} />
					<UserProfileItem title="Favorite Playlist ID" description={state.youtubeState.userProfile.favoritePlaylistId} />
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

export default YoutubeOAuth2;