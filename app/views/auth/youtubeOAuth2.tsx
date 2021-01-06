import React, { useContext, useEffect, useState } from "react";
import { Button, Text, View } from "react-native"
import { AuthConfiguration, authorize, AuthorizeResult } from "react-native-app-auth";
import Context from "../../store/context";
import { youtubeApiAuthorizeError, youtubeApiAuthorizeRequest, youtubeApiAuthorizeSucess } from "../../store/types/youtube_credential_actions";

interface Props { }

export const YoutubeOAuth2: React.FunctionComponent<Props> = () => {
  const { state, dispatch } = useContext(Context);
  const [loginYoutube, setloginYoutube] = useState<boolean>(false);

  useEffect(() => {
    if (loginYoutube) {
      authenticationYoutube();
    }
    return () => {
      // do nothing
    };
  }, [loginYoutube]);

  async function authenticationYoutube() {
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

    try {
      dispatch(youtubeApiAuthorizeRequest());
      var authorizeResult: AuthorizeResult = await authorize(conf);
      if (authorizeResult) {
        dispatch(youtubeApiAuthorizeSucess(authorizeResult));
      }
    } catch (error) {
      dispatch(youtubeApiAuthorizeError(error));
    }
  }

  return (
    <View>
      <Button
        title={loginYoutube ? 'Logged Youtube' : 'Login Youtube'}
        onPress={() => setloginYoutube(!loginYoutube)}
        color={loginYoutube ? 'red' : 'green'} />
      <Text>{state.youtubeState.credential.accessToken}</Text>
    </View>
  );
};