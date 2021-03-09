import React from 'react';
import { Accordion, Badge, Body, Button, Content, H1, Header, Icon, Left, List, ListItem, Right, Spinner, Switch, Text, Title, View } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet } from 'react-native';
import { spotifyTheme, synchronizeTheme, youtubeTheme } from './theme';
import { SynchronizeViewType, IYoutubeMonthPlaylist } from '../interfaces/synchronizeInterfaces';
import usePlaylistsSynchronizer from './usePlaylistsSynchronizer';
import SynchronizePlaylistView from './synchronize/synchronizePlaylistView';
import logger from './utils/logger';

interface YearFilter {
	year: number;
	active: boolean;
}

const SynchronizeView: React.VoidFunctionComponent = () => {

	/// ###### ///
	/// STATES ///
	/// ###### ///
	const { log, error } = logger();
	const { myPlaylist, createPlaylists } = usePlaylistsSynchronizer();
	const [selectedView, setSelectedView] = React.useState<SynchronizeViewType>(SynchronizeViewType.SYNCHRONIZE_PLAYLISTS);
	const [selectedPlaylist, setSelectedPlaylist] = React.useState<IYoutubeMonthPlaylist | undefined>(undefined);
	const [yearFilter, setYearFilter] = React.useState<YearFilter[] | undefined>(undefined);
	const [yearFilterKey] = React.useState<string>("synchronize-year-filter");

	/// ######### ///
	/// CALLBACKS ///
	/// ######### ///
	const isSelectedView = React.useCallback((view: SynchronizeViewType) => selectedView === view, [selectedView]);

	const onBackButtonPressed = React.useCallback(() => {
		if (isSelectedView(SynchronizeViewType.SYNCHRONIZE_PLAYLIST)) {
			setSelectedView(SynchronizeViewType.SYNCHRONIZE_PLAYLISTS);
		}
	}, [isSelectedView]);

	const onOpenSynchronizePlaylist = React.useCallback((monthPlaylist: IYoutubeMonthPlaylist) => {
		setSelectedPlaylist(monthPlaylist);
		setSelectedView(SynchronizeViewType.SYNCHRONIZE_PLAYLIST);
	}, []);

	/// ####### ///
	/// EFFECTS ///
	/// ####### ///
	React.useEffect(() => {

		log("load save !");

		if (myPlaylist.loaded) {

			const buildYearsFilter = async () => {

				const yearsFilter: YearFilter[] = [];

				const years = [...new Set(myPlaylist.playlists.map(p => p.year))];

				years.forEach(y => {
					yearsFilter.push({ year: y, active: true });
				});

				try {
					const value = await AsyncStorage.getItem(yearFilterKey);
					if (value) {
						const parsedYearsFilter = JSON.parse(value) as YearFilter[];
						if (parsedYearsFilter) {
							parsedYearsFilter.filter(y => !y.active).forEach(p => {
								const existingItem = yearsFilter.find(y => y.year === p.year);
								if (existingItem) {
									const index = yearsFilter.indexOf(existingItem);
									yearsFilter[index].active = false;
								}
							});
						}
					}
				} catch (e) {
					error(e);
				}

				setYearFilter(yearsFilter);
			}

			buildYearsFilter();
		}
	}, [error, log, myPlaylist.loaded, myPlaylist.playlists, yearFilterKey]);

	React.useEffect(() => {

		log("save save !");

		if (yearFilter) {

			const saveYearsFilter = async () => {
				try {
					const jsonValue = JSON.stringify(yearFilter);
					await AsyncStorage.setItem(yearFilterKey, jsonValue);
				} catch (e) {
					error(e);
				}
			}

			saveYearsFilter();
		}
	}, [error, log, yearFilter, yearFilterKey]);

	const headerTitle = () => {
		if (isSelectedView(SynchronizeViewType.SYNCHRONIZE_PLAYLIST)) {
			return "Synchronize Playlist";
		}

		return 'Synchronize';
	}

	const buildAccordion = () => {
		const array: { title: JSX.Element, content: JSX.Element }[] = [];

		const title = <H1>Filtre</H1>;
		const content =
			<List>
				{
					yearFilter?.map((y, i) =>
						<ListItem key={y.year}>
							<Left>
								<Text style={styles.filterTitleStyle}>{y.year}</Text>
							</Left>
							<Right>
								<Switch style={styles.switchStyle} thumbColor="white" trackColor={{ true: "green", false: "white" }} value={y.active} onValueChange={() =>
									setYearFilter(
										[
											...yearFilter.slice(0, i),
											{
												active: !yearFilter[i].active,
												year: yearFilter[i].year
											},
											...yearFilter.slice(i + 1)
										])
								} />
							</Right>
						</ListItem>
					)
				}
			</List>;
		array.push({ title, content });

		return array;
	}

	return (
		<>
			<Header noShadow style={styles.headerStyle} androidStatusBarColor={synchronizeTheme.secondaryColor}>
				<Left>
					{
						!isSelectedView(SynchronizeViewType.SYNCHRONIZE_PLAYLISTS) &&
						<Button transparent onPress={onBackButtonPressed}>
							<Icon name='arrow-back' />
						</Button>
					}
				</Left>
				<Body>
					<Title>{headerTitle()}</Title>
				</Body>
			</Header>
			{
				isSelectedView(SynchronizeViewType.SYNCHRONIZE_PLAYLISTS) &&
				<>
					{
						myPlaylist.loaded && yearFilter &&
						<View style={styles.viewStyle}>
							<Accordion style={styles.accordionStyle} dataArray={buildAccordion()} expanded={-1} renderContent={(item) => <>{item.content}</>} />
						</View>
					}
					<Content style={styles.viewStyle}>
						{
							myPlaylist.loaded && yearFilter &&
							<>
								<List>
									{
										yearFilter.filter(y => y.active).map((y) =>
											<View key={y.year}>
												<ListItem itemHeader key={1}>
													<H1 style={styles.listTitleStyle}>{y.year}</H1>
												</ListItem>
												{
													myPlaylist.playlists.filter(p => p.year === y.year).map((playlist) =>
														<ListItem key={playlist.month} thumbnail>
															<Left>
																<Button iconRight vertical transparent>
																	{
																		playlist.youtubePlaylist &&
																		<Badge style={styles.youtubeBadgeStyle}>
																			<Text>{playlist.youtubePlaylist.contentDetails?.itemCount}</Text>
																		</Badge>
																	}
																	<Icon android="md-logo-youtube" ios="ios-logo-youtube" style={{ ...styles.logoIconStyle, marginTop: playlist.youtubePlaylist ? 0 : 28 }} />
																</Button>
																<Button iconRight vertical transparent>
																	{
																		playlist.spotifyPlaylist &&
																		<Badge style={styles.spotifyBadgeStyle}>
																			<Text>{playlist.spotifyPlaylist.tracks.total}</Text>
																		</Badge>
																	}
																	<Icon name="spotify" type='FontAwesome' style={{ ...styles.logoIconStyle, marginTop: playlist.spotifyPlaylist ? 0 : 28 }} />
																</Button>
															</Left>
															<Body>
																<Text style={styles.listItemTitleStyle}>{playlist.title}</Text>
																<Text note>{playlist.favoriteitems.length} favorite items</Text>
															</Body>
															<Right>
																{
																	(playlist.spotifyPlaylist === undefined || playlist.youtubePlaylist === undefined) &&
																	<Button icon light onPress={() => createPlaylists(playlist)}>
																		<Icon name='create' type='MaterialIcons' />
																	</Button>
																}
																{
																	playlist.spotifyPlaylist && playlist.youtubePlaylist &&
																	<Button icon light onPress={() => onOpenSynchronizePlaylist(playlist)}>
																		<Icon name='arrow-forward' />
																	</Button>
																}
															</Right>
														</ListItem>
													)
												}
											</View>
										)
									}
								</List>
							</>
						}
						{
							(!myPlaylist.loaded || yearFilter === undefined) && <Spinner color={synchronizeTheme.primaryColor} />
						}

					</Content>
				</>
			}
			{
				isSelectedView(SynchronizeViewType.SYNCHRONIZE_PLAYLIST) && selectedPlaylist &&
				<SynchronizePlaylistView selectedView={selectedView} setSelectedView={setSelectedView} myPlaylist={selectedPlaylist} />
			}
		</>
	)
};

const styles = StyleSheet.create({
	viewStyle: {
		backgroundColor: "black"
	},
	accordionStyle: {
		backgroundColor: synchronizeTheme.secondaryBackgroundColor
	},
	headerStyle: {
		backgroundColor: synchronizeTheme.primaryColor
	},
	filterTitleStyle: {
		color: "white"
	},
	switchStyle: {
		transform: [
			{
				scale: 1.2
			},
			{
				translateX: -40
			}
		]
	},
	listTitleStyle: {
		color: "white"
	},
	listItemTitleStyle: {
		color: "white"
	},
	youtubeBadgeStyle: {
		backgroundColor: youtubeTheme.primaryColor
	},
	spotifyBadgeStyle: {
		backgroundColor: spotifyTheme.primaryColor
	},
	logoIconStyle: {
		color: "white"
	}
});

export default SynchronizeView;
