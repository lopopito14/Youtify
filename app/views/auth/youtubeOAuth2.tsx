import React, { useContext } from "react";
import { AuthConfiguration, authorize, AuthorizeResult, refresh, RefreshResult } from "react-native-app-auth";
import Context from "../../store/context";
import { youtubeApiAuthorizeError, youtubeApiAuthorizeRequest, youtubeApiAuthorizeSucess, youtubeApiRefreshError, youtubeApiRefreshSucess } from "../../store/types/youtube_credential_actions";
import { CredentialView } from "./credentialView";

interface Props { }

export const YoutubeOAuth2: React.FunctionComponent<Props> = () => {
  const { state, dispatch } = useContext(Context);

  function authorizeConfiguration(): AuthConfiguration {
    var conf: AuthConfiguration = {
      clientId:
        '904141401363-at0un0uitf1igb4d2krdk76ebsq62kmo.apps.googleusercontent.com',
      redirectUrl: 'com.lopopitoconverter:/youtubeoauth2callback',
      scopes: ['https://www.googleapis.com/auth/youtube.readonly'],
      serviceConfiguration: {
        authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
        tokenEndpoint: 'https://oauth2.googleapis.com/token',
      },
    };

    return conf;
  }

  async function authorizeYoutube() {
    try {
      dispatch(youtubeApiAuthorizeRequest());
      var authorizeResult: AuthorizeResult = await authorize(authorizeConfiguration());
      if (authorizeResult) {
        dispatch(youtubeApiAuthorizeSucess(authorizeResult));
      }
    } catch (error) {
      dispatch(youtubeApiAuthorizeError(error));
    }
  }

  async function refreshYoutube() {
    try {
      dispatch(youtubeApiAuthorizeRequest());
      var refreshResult: RefreshResult = await refresh(authorizeConfiguration(), { refreshToken: state.youtubeState.credential.refreshToken });
      if (refreshResult) {
        dispatch(youtubeApiRefreshSucess(refreshResult));
      }
    } catch (error) {
      dispatch(youtubeApiRefreshError(error));
    }
  }

  return (
    <>
      <CredentialView
        title='Youtube'
        logo={require(`../../images/youtube-logo.png`)}
        credential={state.youtubeState.credential}
        authorizeDelegate={authorizeYoutube}
        refreshDelegate={refreshYoutube} />
    </>
  );
};