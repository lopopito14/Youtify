import React, { } from 'react';
import { YoutubeOAuth2 } from './auth/youtubeOAuth2';
import { SpotifyOAuth2 } from './auth/spotifyOAuth2';
import { Body, Content, Header, Left, Right, Title } from 'native-base';
import { ScrollView } from 'react-native';

interface Props { }

export const Home: React.FunctionComponent<Props> = () => {
  return (
    <>
      <Header style={{ backgroundColor: "black" }}>
        <Left />
        <Body>
          <Title>Home</Title>
        </Body>
        <Right />
      </Header>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}>
        <Content>
          <YoutubeOAuth2 />
          <SpotifyOAuth2 />
        </Content>
      </ScrollView>

    </>
  );
};

export default Home;
