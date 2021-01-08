import { Body, Card, CardItem, Spinner } from "native-base";
import React, { useContext, useEffect } from "react";
import { Image } from "react-native";
import { AuthConfiguration, authorize, AuthorizeResult, refresh, RefreshResult } from "react-native-app-auth";
import Context from "../../store/context";
import { youtubeApiAuthorizeError, youtubeApiAuthorizeRequest, youtubeApiAuthorizeSucess, youtubeApiRefreshError, youtubeApiRefreshSucess } from "../../store/types/youtube_credential_actions";
import { youtubeCurrentProfileError, youtubeCurrentProfileRequest, youtubeCurrentProfileSucess } from "../../store/types/youtube_userProfile_actions";
import { Channels } from "../../youtubeApi/youtube-api-channels";
import { settingsTheme } from "../theme";
import { CredentialView } from "./credentialView";
import UserProfileItem from "./userProfileItem";

interface Props {
  authorizeConfiguration: AuthConfiguration;
}

export const YoutubeOAuth2: React.FunctionComponent<Props> = (props: Props) => {
  const { state, dispatch } = useContext(Context);

  useEffect(() => {
    if (state.youtubeState.credential.isLogged && state.youtubeState.userProfile.channelId == '') {
      getYoutubeChannelId();
    }
  }, [state.youtubeState.credential.isLogged])

  async function authorizeYoutube() {
    try {
      dispatch(youtubeApiAuthorizeRequest());
      var authorizeResult: AuthorizeResult = await authorize(props.authorizeConfiguration);
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
      var refreshResult: RefreshResult = await refresh(props.authorizeConfiguration, { refreshToken: state.youtubeState.credential.refreshToken });
      if (refreshResult) {
        dispatch(youtubeApiRefreshSucess(refreshResult));
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
      {state.youtubeState.userProfile.isLoading &&
        <CardItem bordered>
          <Body>
            <Spinner color={settingsTheme.primaryColor} />
          </Body>
        </CardItem>
      }
      {state.youtubeState.credential.isLogged && !state.youtubeState.userProfile.isLoading &&
        <>
          <UserProfileItem title="Name" description={state.youtubeState.userProfile.title} />
          <UserProfileItem title="Channel ID" description={state.youtubeState.userProfile.channelId} />
        </>
      }
    </Card>
  );
};