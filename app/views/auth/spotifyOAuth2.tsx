import React, { useContext } from "react";
import { AuthConfiguration, authorize, AuthorizeResult, refresh, RefreshResult } from "react-native-app-auth";
import Context from "../../store/context";
import { spotifyApiAuthorizeError, spotifyApiAuthorizeRequest, spotifyApiAuthorizeSucess, spotifyApiRefreshError, spotifyApiRefreshRequest, spotifyApiRefreshSucess } from "../../store/types/spotify_credential_actions";
import { CredentialView } from "./credentialView";

interface Props { }

export const SpotifyOAuth2: React.FunctionComponent<Props> = () => {
  const { state, dispatch } = useContext(Context);

  function authorizeConfiguration(): AuthConfiguration {
    var conf: AuthConfiguration = {
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
    };

    return conf;
  }

  async function authorizeSpotify() {
    try {
      dispatch(spotifyApiAuthorizeRequest());
      var authorizeResult: AuthorizeResult = await authorize(authorizeConfiguration());
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
      var refreshResult: RefreshResult = await refresh(authorizeConfiguration(), { refreshToken: state.spotifyState.credential.refreshToken });
      if (refreshResult) {
        dispatch(spotifyApiRefreshSucess(refreshResult));
      }
    } catch (error) {
      dispatch(spotifyApiRefreshError(error));
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
    </>
  );
};