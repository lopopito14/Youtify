import React, { useContext, useEffect } from "react";
import { AuthConfiguration, authorize, refresh } from "react-native-app-auth";
import Context from "../../store/context";
import { spotifyApiAuthorizeError, spotifyApiAuthorizeRequest, spotifyApiAuthorizeSucess, spotifyApiRefreshError, spotifyApiRefreshRequest, spotifyApiRefreshSucess } from "../../store/types/spotify_credential_actions";
import { spotifyCurrentProfileError, spotifyCurrentProfileRequest, spotifyCurrentProfileSucess } from "../../store/types/spotify_userProfile_actions";
import { CredentialView } from "./credentialView";
import SpotifyApi from 'spotify-web-api-js';
import { Text } from "native-base";

interface Props { }

export const SpotifyOAuth2: React.FunctionComponent<Props> = () => {
  const { state, dispatch } = useContext(Context);

  useEffect(() => {
    if (state.spotifyState.credential.isLogged && state.spotifyState.userProfile.id == '') {
      getSpotifyUserId();
    }
  }, [state.spotifyState.credential.isLogged])

  const authorizeConfiguration: AuthConfiguration = {
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

  async function authorizeSpotify() {
    try {
      dispatch(spotifyApiAuthorizeRequest());
      var authorizeResult = await authorize(authorizeConfiguration);
      if (authorizeResult) {
        dispatch(spotifyApiAuthorizeSucess(authorizeResult))
      }
    } catch (error) {
      dispatch(spotifyApiAuthorizeError(error));
    }
  }

  async function refreshSpotify() {
    try {
      dispatch(spotifyApiRefreshRequest());
      var refreshResult = await refresh(authorizeConfiguration, { refreshToken: state.spotifyState.credential.refreshToken });
      if (refreshResult) {
        dispatch(spotifyApiRefreshSucess(refreshResult));
      }
    } catch (error) {
      dispatch(spotifyApiRefreshError(error));
    }
  }

  async function getSpotifyUserId() {
    try {
      dispatch(spotifyCurrentProfileRequest());
      var spotifyApi = new SpotifyApi();
      spotifyApi.setAccessToken(state.spotifyState.credential.accessToken);
      var getMeResult = await spotifyApi.getMe(authorizeConfiguration);
      if (getMeResult) {
        dispatch(spotifyCurrentProfileSucess(getMeResult));
      }
    } catch (error) {
      dispatch(spotifyCurrentProfileError(error));
    }
  }

  return (
    <>
      <CredentialView
        title='Spotify'
        logo={require(`../../images/spotify-logo.png`)}
        credential={state.spotifyState.credential}
        authorizeDelegate={authorizeSpotify}
        refreshDelegate={refreshSpotify} />
      <Text>{state.spotifyState.userProfile.country}</Text>
      <Text>{state.spotifyState.userProfile.displayName}</Text>
      <Text>{state.spotifyState.userProfile.email}</Text>
      <Text>{state.spotifyState.userProfile.id}</Text>
    </>
  );
};