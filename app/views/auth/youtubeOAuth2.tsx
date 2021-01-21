import AsyncStorage from "@react-native-async-storage/async-storage";
import { Body, Card, CardItem, Spinner } from "native-base";
import React, { useContext, useEffect } from "react";
import { Image } from "react-native";
import { AuthConfiguration, authorize, AuthorizeResult, refresh, RefreshResult } from "react-native-app-auth";
import Context from "../../store/context";
import { youtubeApiAuthorizeError, youtubeApiAuthorizeRequest, youtubeApiAuthorizeSucess, youtubeApiRefreshError, youtubeApiRefreshRequest, youtubeApiRefreshSucess } from "../../store/types/youtube_credential_actions";
import { youtubeCurrentProfileError, youtubeCurrentProfileRequest, youtubeCurrentProfileSucess } from "../../store/types/youtube_userProfile_actions";
import { Channels } from "../../youtubeApi/youtube-api-channels";
import { settingsTheme } from "../theme";
import { CredentialView } from "./credentialView";
import UserProfileItem from "./userProfileItem";

interface IProps {
  authorizeConfiguration: AuthConfiguration;
}

export const YoutubeOAuth2: React.FunctionComponent<IProps> = (props: IProps) => {
  const { state, dispatch } = useContext(Context);
  const storageKey = "youtube_refresh_token";

  useEffect(() => {
    if (state.youtubeState.credential.isLogged) {
      if (!state.youtubeState.userProfile.loaded) {
        getYoutubeChannelId();
      }
    } else {
      tryRefreshYoutube();
    }
  }, [state.youtubeState.credential.isLogged]);

  async function tryRefreshYoutube() {
    try {
      const value = await AsyncStorage.getItem(storageKey);
      if (value !== null) {
        try {
          dispatch(youtubeApiRefreshRequest());
          var refreshResult: RefreshResult = await refresh(props.authorizeConfiguration, { refreshToken: value });
          if (refreshResult) {
            dispatch(youtubeApiRefreshSucess(refreshResult));

            if (refreshResult.refreshToken) {
              storeRefreshToken(refreshResult.refreshToken);
            }
          }
        } catch (error) {
          dispatch(youtubeApiRefreshError(error));
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function authorizeYoutube() {
    try {
      dispatch(youtubeApiAuthorizeRequest());
      var authorizeResult: AuthorizeResult = await authorize(props.authorizeConfiguration);
      if (authorizeResult) {
        dispatch(youtubeApiAuthorizeSucess(authorizeResult));
        storeRefreshToken(authorizeResult.refreshToken);
      }
    } catch (error) {
      dispatch(youtubeApiAuthorizeError(error));
    }
  }

  async function refreshYoutube() {
    try {
      dispatch(youtubeApiAuthorizeRequest());
      var refreshResult: RefreshResult = await refresh(props.authorizeConfiguration, { refreshToken: state.youtubeState.credential.refreshToken });
      if (refreshResult) {
        dispatch(youtubeApiRefreshSucess(refreshResult));

        if (refreshResult.refreshToken) {
          storeRefreshToken(refreshResult.refreshToken);
        }
      }
    } catch (error) {
      dispatch(youtubeApiRefreshError(error));
    }
  }

  async function getYoutubeChannelId() {
    try {
      dispatch(youtubeCurrentProfileRequest());
      var response = await new Channels(state.youtubeState.credential.accessToken).list(
        {
          mine: true,
          part: ['snippet'],
        }
      )
      if (response) {
        dispatch(youtubeCurrentProfileSucess(response));
      }
    } catch (error) {
      dispatch(youtubeCurrentProfileError(error));
    }
  }

  async function storeRefreshToken(token: string) {
    try {
      await AsyncStorage.setItem(storageKey, token);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Card style={{ flex: 0 }}>
      <CardItem header>
        <Body>
          <Image source={require(`../../images/youtube-logo.png`)} style={{ height: 65, width: 220, flex: 1, alignSelf: "center" }} />
        </Body>
      </CardItem>
      <CardItem>
        <CredentialView
          credential={state.youtubeState.credential}
          authorizeDelegate={authorizeYoutube}
          refreshDelegate={refreshYoutube} />
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
        </>
      }
    </Card>
  );
};