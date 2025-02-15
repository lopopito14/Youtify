import { Button, Icon, Left, Right, Text } from "native-base";
import React from "react";
import { ICredential } from "../../store/state";

interface Props {
	credential: ICredential
	authorizeDelegate(): Promise<void>;
	refreshDelegate(): Promise<void>;
	// eslint-disable-next-line react/no-unused-prop-types
	revokeDelegate(): Promise<void>;
}

const CredentialView: React.FunctionComponent<Props> = (props: Props) => {
	const { credential, authorizeDelegate, refreshDelegate } = props;

	/// ###### ///
	/// STATES ///
	/// ###### ///
	const [canLogOn, setcanLogOn] = React.useState(true);
	const [remainingTime, setRemainingTime] = React.useState('');
	const [interval, setinterval] = React.useState(0);

	/// ######### ///
	/// CALLBACKS ///
	/// ######### ///
	const logOn = React.useCallback(async () => {
		if (credential.refreshToken === '') {
			await authorizeDelegate();
		}
		else {
			await refreshDelegate();
		}
	}, [authorizeDelegate, credential.refreshToken, refreshDelegate]);

	/// ####### ///
	/// EFFECTS ///
	/// ####### ///
	React.useEffect(() => {
		const counterInterval = setInterval(() => {
			setinterval((prev) => prev + 1);
		}, 500);
		return () => clearInterval(counterInterval);
	}, []);

	React.useEffect(() => {
		if (credential.isLogged) {

			const currentDate = new Date(Date.now());
			const expirationDate = new Date(credential.accessTokenExpirationDate);

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
	}, [interval, canLogOn, credential.isLogged, credential.accessTokenExpirationDate]);

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