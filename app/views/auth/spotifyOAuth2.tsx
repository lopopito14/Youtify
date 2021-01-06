import React, { useContext, useEffect, useState } from "react";
import { Button, Text, View } from "react-native"
import { AuthConfiguration, authorize, AuthorizeResult } from "react-native-app-auth";
import Context from "../../store/context";
import { spotifyApiAuthorizeError, spotifyApiAuthorizeRequest, spotifyApiAuthorizeSucess } from "../../store/types/spotify_credential_actions";

interface Props { }

export const SpotifyOAuth2: React.FunctionComponent<Props> = () => {
  const { state, dispatch } = useContext(Context);
  const [loginSpotify, setloginSpotify] = useState<boolean>(false);

  useEffect(() => {
    if (loginSpotify) {
      authenticationSpotify();
    }
    return () => {
      // do nothing
    };
  }, [loginSpotify]);

  async function authenticationSpotify() {
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

  return (
    <View>
      <Button
        title={loginSpotify ? 'Logged Spotify' : 'Login Spotify'}
        onPress={() => setloginSpotify(!loginSpotify)}
        color={loginSpotify ? 'red' : 'green'} />
      <Text>{state.spotifyState.credential.accessToken}</Text>
    </View>
  );
};