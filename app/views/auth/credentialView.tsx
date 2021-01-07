import { Body, Button, Card, CardItem, Content, Icon, Left, Right, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { Image, ImageSourcePropType } from "react-native";
import { ICredential } from "../../store/state";

interface Props {
  title: string;
  logo: ImageSourcePropType;
  credential: ICredential
  authorizeDelegate(): any;
  refreshDelegate(): any;
}

export const CredentialView: React.FunctionComponent<Props> = (props: Props) => {
  const [canLogOn, setcanLogOn] = useState(true)
  const [remainingTime, setremainingTime] = useState('');
  const [interval, setinterval] = useState(0)

  useEffect(() => {
    const counterInterval = setInterval(function () {
      setinterval((prev) => prev + 1);
    }, 500);
    return () => clearInterval(counterInterval);
  }, []);

  useEffect(() => {
    if (props.credential.accessTokenExpirationDate !== '') {

      const currentDate = new Date(Date.now());
      const expirationDate = new Date(props.credential.accessTokenExpirationDate);

      const remainingMilliSeconds = expirationDate.getTime() - currentDate.getTime();
      if (remainingMilliSeconds > 0) {
        setcanLogOn(false);
        const remainingDate = new Date(remainingMilliSeconds);
        setremainingTime(`${remainingDate.getHours()}h ${remainingDate.getMinutes()}min ${remainingDate.getSeconds()}s`);
      }
      else {
        setcanLogOn(true);
        setremainingTime('Session expired, please log on again !');
      }
    }
    else {
      setcanLogOn(true);
      setremainingTime('Please log on !');
    }
  }, [interval, canLogOn]);

  function logOn() {
    if (props.credential.refreshToken === '') {
      props.authorizeDelegate();
    }
    else {
      props.refreshDelegate();
    }
  }

  return (
    <>
      <Content>
        <Card style={{ flex: 0 }}>
          <CardItem first>
            <Body>
              <Image source={props.logo} style={{ height: 55, width: 185, flex: 1, alignSelf: "center" }} />
            </Body>
          </CardItem>
          <CardItem style={{ alignItems: "center" }}>
            <Left>
              <Button iconLeft rounded success
                disabled={!canLogOn}
                onPress={() => logOn()}>
                <Icon name='sync' type="FontAwesome5" />
                <Text>Log on</Text>
              </Button>
            </Left>
            <Right>
              <Text>{remainingTime}</Text>
            </Right>
          </CardItem>
        </Card>
      </Content>
    </>
  );
};