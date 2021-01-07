import { Body, Button, Card, CardItem, Container, Content, Header, Icon, Label, Left, Text, Thumbnail } from "native-base";
import React, { useEffect, useState } from "react";
import { Image, ImageSourcePropType } from "react-native";
import { ICredential } from "../../store/state";

interface Props {
  title: string;
  logo: ImageSourcePropType;
  credential: ICredential
  authorizeDelegate(): any;
  refreshDelegate: () => any;
}

export const CredentialView: React.FunctionComponent<Props> = (props: Props) => {
  const [login, setlogin] = useState<boolean>(false);

  useEffect(() => {
    if (login) {
      props.authorizeDelegate();
    }
    return () => {
      // do nothing
    };
  }, [login]);

  return (
    <>
      <Content>
        <Card style={{ flex: 0 }}>
          <CardItem>
            <Body>
              <Image source={props.logo} style={{ height: 55, width: 185, flex: 1 }} />
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Button
                onPress={() => setlogin(!login)}
                color={login ? 'red' : 'green'}>
                <Text>{login ? 'Logged' : 'Login'} {props.title}</Text>
              </Button>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Label>Access Token:</Label>
              <Text>{props.credential.accessToken}</Text>
              <Label>Refresh Token:</Label>
              <Text>{props.credential.refreshToken}</Text>
              <Label>Expiration Date:</Label>
              <Text>{props.credential.accessTokenExpirationDate}</Text>
            </Body>
          </CardItem>
        </Card>
      </Content>
    </>
  );
};