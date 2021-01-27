import { Button, Icon, Left, Right, Text } from "native-base";
import React from "react";
import { ICredential } from "../../store/state";

interface Props {
  credential: ICredential
  authorizeDelegate(): any;
  refreshDelegate(): any;
  revokeDelegate(): any;
}

export const CredentialView: React.FunctionComponent<Props> = (props: Props) => {
  const [canLogOn, setcanLogOn] = React.useState(true);
  const [remainingTime, setremainingTime] = React.useState('');
  const [interval, setinterval] = React.useState(0);

  React.useEffect(() => {
    const counterInterval = setInterval(function () {
      setinterval((prev) => prev + 1);
    }, 500);
    return () => clearInterval(counterInterval);
  }, []);

  React.useEffect(() => {
    if (props.credential.isLogged) {

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

  function _logOn() {
    if (props.credential.refreshToken === '') {
      props.authorizeDelegate();
    }
    else {
      props.refreshDelegate();
    }
  }

  return (
    <>
      <Left>
        <Button iconLeft rounded success
          disabled={!canLogOn}
          onPress={_logOn}>
          <Icon name='sync' type="FontAwesome5" />
          <Text>Log on</Text>
        </Button>
      </Left>
      <Right>
        <Text>{remainingTime}</Text>
      </Right>
    </>
  );
};