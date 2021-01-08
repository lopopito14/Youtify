import React, { useContext, useEffect } from "react";
import { AuthConfiguration, authorize, refresh } from "react-native-app-auth";
import Context from "../../store/context";
import { spotifyApiAuthorizeError, spotifyApiAuthorizeRequest, spotifyApiAuthorizeSucess, spotifyApiRefreshError, spotifyApiRefreshRequest, spotifyApiRefreshSucess } from "../../store/types/spotify_credential_actions";
import { spotifyCurrentProfileError, spotifyCurrentProfileRequest, spotifyCurrentProfileSucess } from "../../store/types/spotify_userProfile_actions";
import { CredentialView } from "./credentialView";
import SpotifyApi from 'spotify-web-api-js';
import { Body, Card, CardItem, Spinner } from "native-base";
import { Image } from "react-native";
import UserProfileItem from "./userProfileItem";
import { settingsTheme } from "../theme";

interface Props {
  authorizeConfiguration: AuthConfiguration;
}

export const SpotifyOAuth2: React.FunctionComponent<Props> = (props: Props) => {
  const { state, dispatch } = useContext(Context);

  useEffect(() => {
    if (state.spotifyState.credential.isLogged && state.spotifyState.userProfile.id == '') {
      getSpotifyUserId();
    }
  }, [state.spotifyState.credential.isLogged])

  async function authorizeSpotify() {
    try {
      dispatch(spotifyApiAuthorizeRequest());
      var authorizeResult = await authorize(props.authorizeConfiguration);
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
      var refreshResult = await refresh(props.authorizeConfiguration, { refreshToken: state.spotifyState.credential.refreshToken });
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
      var getMeResult = await spotifyApi.getMe(props.authorizeConfiguration);
      if (getMeResult) {
        dispatch(spotifyCurrentProfileSucess(getMeResult));
      }
    } catch (error) {
      dispatch(spotifyCurrentProfileError(error));
    }
  }

  return (
    <Card style={{ flex: 0 }}>
      <CardItem header bordered>
        <Body>
          <Image source={require(`../../images/spotify-logo.png`)} style={{ height: 65, width: 220, flex: 1, alignSelf: "center" }} />
        </Body>
      </CardItem>
      <CardItem>
        <CredentialView
          credential={state.spotifyState.credential}
          authorizeDelegate={authorizeSpotify}
          refreshDelegate={refreshSpotify} />
      </CardItem >
      {state.spotifyState.userProfile.isLoading &&
        <CardItem bordered>
          <Body>
            <Spinner color={settingsTheme.primaryColor} />
          </Body>
        </CardItem>
      }
      {state.spotifyState.credential.isLogged && !state.spotifyState.userProfile.isLoading &&
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