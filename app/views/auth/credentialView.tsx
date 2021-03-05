import { Button, Icon, Left, Right, Text } from "native-base";
import React from "react";
import { ICredential } from "../../store/state";

interface Props {
	credential: ICredential
	authorizeDelegate(): Promise<void>;
	refreshDelegate(): Promise<void>;
	revokeDelegate(): Promise<void>;
}

const CredentialView: React.FunctionComponent<Props> = (props: Props) => {
	const [canLogOn, setcanLogOn] = React.useState(true);
	const [remainingTime, setRemainingTime] = React.useState('');
	const [interval, setinterval] = React.useState(0);

	React.useEffect(() => {
		const counterInterval = setInterval(() => {
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
				setRemainingTime(`${remainingDate.getHours()}h ${remainingDate.getMinutes()}min ${remainingDate.getSeconds()}s`);
			}
			else {
				setcanLogOn(true);
				setRemainingTime('Session expired, please log on again !');
			}
		}
		else {
			setcanLogOn(true);
			setRemainingTime('Please log on !');
		}
	}, [interval, canLogOn]);

	const logOn = React.useCallback(async () => {
		if (props.credential.refreshToken === '') {
			await props.authorizeDelegate();
		}
		else {
			await props.refreshDelegate();
		}
	}, []);

	return (
		<>
			<Left>
				<Button iconLeft rounded success
					disabled={!canLogOn}
					onPress={logOn}>
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

export default CredentialView;