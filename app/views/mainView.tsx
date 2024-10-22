import React from 'react';
import { Button, Footer, FooterTab, Icon, Root, Text } from 'native-base';
import { DrawerLayoutAndroid, StyleSheet } from 'react-native';
import YoutubeView from './youtubeView';
import SpotifyView from './spotifyView';
import reducer from '../store/reducer';
import { InitialState } from '../store/state';
import Context from '../store/context';
import SettingsView from './settingsView';
import { synchronizeTheme, spotifyTheme, youtubeTheme } from './theme';
import NotificationToast from './utils/notificationToast';
import NoneView from './noneView';
import SynchronizeView from './synchronizeView';

enum MainViewType {
	NONE = "NONE",
	YOUTUBE = "YOUTUBE",
	SPOTIFY = "SPOTIFY",
	SYNCHRONIZE = "SYNCHRONIZE"
}

const MainView: React.VoidFunctionComponent = () => {

	/// ###### ///
	/// STATES ///
	/// ###### ///
	const [state, dispatch] = React.useReducer(reducer, InitialState);
	const [selectedView, setSelectedView] = React.useState<MainViewType>(MainViewType.NONE);

	/// ######### ///
	/// CALLBACKS ///
	/// ######### ///
	const isSelected = React.useCallback((view: MainViewType) => selectedView === view, [selectedView]);

	const footerOpacity = React.useCallback((view: MainViewType) => isSelected(view) ? 1 : 0.5, [isSelected]);

	/// ####### ///
	/// EFFECTS ///
	/// ####### ///
	React.useEffect(() => {
		if (state.spotifyState.credential.isLogged && !state.youtubeState.credential.isLogged) {
			setSelectedView(MainViewType.SPOTIFY);
		} else if (state.youtubeState.credential.isLogged && !state.spotifyState.credential.isLogged) {
			setSelectedView(MainViewType.YOUTUBE);
		} else if (state.youtubeState.credential.isLogged && state.spotifyState.credential.isLogged) {
			setSelectedView(MainViewType.SYNCHRONIZE);
		} else {
			setSelectedView(MainViewType.NONE);
		}
	}, [state.spotifyState.credential.isLogged, state.youtubeState.credential.isLogged]);

	const footerBackgroundColor = () => {
		if (isSelected(MainViewType.YOUTUBE)) {
			return youtubeTheme.primaryColor;
		} if (isSelected(MainViewType.SYNCHRONIZE)) {
			return synchronizeTheme.primaryColor;
		} if (isSelected(MainViewType.SPOTIFY)) {
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
											<Button vertical onPress={() => setSelectedView(MainViewType.YOUTUBE)}>
												<Icon android="md-logo-youtube" ios="ios-logo-youtube" style={{ ...styles.iconStyle, opacity: footerOpacity(MainViewType.YOUTUBE) }} fontSize={1} />
												<Text style={{ ...styles.textStyle, opacity: footerOpacity(MainViewType.YOUTUBE) }}>Youtube</Text>
											</Button>
										</>
									}
									{
										state.youtubeState.credential.isLogged && state.spotifyState.credential.isLogged &&
										<>
											<Button vertical onPress={() => setSelectedView(MainViewType.SYNCHRONIZE)}>
												<Icon name="md-sync-circle" type='Ionicons' style={{ ...styles.iconStyle, opacity: footerOpacity(MainViewType.SYNCHRONIZE) }} fontSize={1} />
												<Text style={{ ...styles.textStyle, opacity: footerOpacity(MainViewType.SYNCHRONIZE) }}>Synchronize</Text>
											</Button>
										</>
									}
									{
										state.spotifyState.credential.isLogged &&
										<>
											<Button vertical onPress={() => setSelectedView(MainViewType.SPOTIFY)}>
												<Icon name="spotify" fontSize={50} type='FontAwesome' style={{ ...styles.iconStyle, opacity: footerOpacity(MainViewType.SPOTIFY) }} />
												<Text style={{ ...styles.textStyle, opacity: footerOpacity(MainViewType.SPOTIFY) }}>Spotify</Text>
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

const styles = StyleSheet.create({
	iconStyle: {
		color: "white"
	},
	textStyle: {
		color: "white",
		fontWeight: 'bold'
	}
});

export default MainView;
