import React from 'react';
import { YoutubeView } from './youtubeView';
import { SpotifyView } from './spotifyView';
import { reducer } from '../store/reducer';
import { InitialState } from '../store/state';
import Context from '../store/context';
import { Button, Footer, FooterTab, Icon, Root, Text } from 'native-base';
import SettingsView from './settingsView';
import { synchronizeTheme, spotifyTheme, youtubeTheme } from './theme';
import NotificationToast from './utils/notificationToast';
import { DrawerLayoutAndroid } from 'react-native';
import { NoneView } from './noneView';
import SynchronizeView from './synchronizeView';

interface Props { }

enum MainViewType {
	NONE = "NONE",
	YOUTUBE = "YOUTUBE",
	SPOTIFY = "SPOTIFY",
	SYNCHRONIZE = "SYNCHRONIZE"
}

const MainView: React.FunctionComponent<Props> = () => {
	const [state, dispatch] = React.useReducer(reducer, InitialState);

	const [selectedView, setselectedView] = React.useState<MainViewType>(MainViewType.NONE);

	React.useEffect(() => {
		if (state.spotifyState.credential.isLogged && !state.youtubeState.credential.isLogged) {
			setselectedView(MainViewType.SPOTIFY);
		} else if (state.youtubeState.credential.isLogged && !state.spotifyState.credential.isLogged) {
			setselectedView(MainViewType.YOUTUBE);
		} else if (state.youtubeState.credential.isLogged && state.spotifyState.credential.isLogged) {
			setselectedView(MainViewType.SYNCHRONIZE);
		} else {
			setselectedView(MainViewType.NONE);
		}
	}, [state.spotifyState.credential.isLogged, state.youtubeState.credential.isLogged])

	const isSelected = (view: MainViewType) => {
		return selectedView == view;
	}

	const footerOpacity = (view: MainViewType) => {
		return isSelected(view) ? 1 : 0.5;
	}

	const footerBackgroundColor = () => {
		if (isSelected(MainViewType.YOUTUBE)) {
			return youtubeTheme.primaryColor;
		} else if (isSelected(MainViewType.SYNCHRONIZE)) {
			return synchronizeTheme.primaryColor;
		} else if (isSelected(MainViewType.SPOTIFY)) {
			return spotifyTheme.primaryColor;
		}

		return "black";
	}

	return (
		<Context.Provider value={{ state, dispatch }}>
			<Root>

				<DrawerLayoutAndroid drawerWidth={350} drawerLockMode='unlocked' renderNavigationView={() => <SettingsView />}>
					<>
						<NotificationToast />
						{
							isSelected(MainViewType.NONE) && <NoneView />
						}
						{
							isSelected(MainViewType.YOUTUBE) && <YoutubeView />
						}
						{
							isSelected(MainViewType.SPOTIFY) && <SpotifyView />
						}
						{
							isSelected(MainViewType.SYNCHRONIZE) && <SynchronizeView />
						}
						{
							!isSelected(MainViewType.NONE) &&
							<Footer>
								<FooterTab style={{ backgroundColor: footerBackgroundColor() }}>
									{
										state.youtubeState.credential.isLogged &&
										<>
											<Button vertical={true} onPress={() => setselectedView(MainViewType.YOUTUBE)}>
												<Icon android="md-logo-youtube" ios="ios-logo-youtube" style={{ color: "white", opacity: footerOpacity(MainViewType.YOUTUBE) }} fontSize={1} />
												<Text style={{ color: "white", opacity: footerOpacity(MainViewType.YOUTUBE), fontWeight: 'bold' }}>Youtube</Text>
											</Button>
										</>
									}
									{
										state.youtubeState.credential.isLogged && state.spotifyState.credential.isLogged &&
										<>
											<Button vertical={true} onPress={() => setselectedView(MainViewType.SYNCHRONIZE)}>
												<Icon name="md-sync-circle" type='Ionicons' style={{ color: "white", opacity: footerOpacity(MainViewType.SYNCHRONIZE) }} fontSize={1} />
												<Text style={{ color: "white", opacity: footerOpacity(MainViewType.SYNCHRONIZE), fontWeight: 'bold' }}>Synchronize</Text>
											</Button>
										</>
									}
									{
										state.spotifyState.credential.isLogged &&
										<>
											<Button vertical={true} onPress={() => setselectedView(MainViewType.SPOTIFY)}>
												<Icon name="spotify" fontSize={50} type='FontAwesome' style={{ color: "white", opacity: footerOpacity(MainViewType.SPOTIFY) }} />
												<Text style={{ color: "white", opacity: footerOpacity(MainViewType.SPOTIFY), fontWeight: 'bold' }}>Spotify</Text>
											</Button>
										</>
									}
								</FooterTab>
							</Footer>
						}
					</>
				</DrawerLayoutAndroid>
			</Root>
		</Context.Provider>
	);
};

export default MainView;
