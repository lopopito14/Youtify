import React, { useContext } from "react";
import { AuthConfiguration, authorize, AuthorizeResult } from "react-native-app-auth";
import Context from "../../store/context";
import { spotifyApiAuthorizeError, spotifyApiAuthorizeRequest, spotifyApiAuthorizeSucess } from "../../store/types/spotify_credential_actions";
import { CredentialView } from "./credentialView";

interface Props { }

export const SpotifyOAuth2: React.FunctionComponent<Props> = () => {
  const { state, dispatch } = useContext(Context);

  async function authorizeSpotify() {
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

    try {
      dispatch(spotifyApiAuthorizeRequest());
      var authorizeResult: AuthorizeResult = await authorize(conf);
      if (authorizeResult) {
        dispatch(spotifyApiAuthorizeSucess(authorizeResult))
      }
    } catch (error) {
      dispatch(spotifyApiAuthorizeError(error));
    }
  }

  function refreshSpotify() {

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