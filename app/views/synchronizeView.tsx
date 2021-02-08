import React from 'react';
import { Accordion, Body, Button, Content, H1, Header, Icon, Left, List, ListItem, Right, Spinner, Switch, Text, Title, View } from 'native-base';
import { spotifyTheme, synchronizeTheme, youtubeTheme } from './theme';
import { ILoad } from '../store/state';
import SynchronizePlaylistView from './synchronize/synchronizePlaylistView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import usePlaylistsSynchronizer from './usePlaylistsSynchronizer';
import { Playlist, PlaylistItem } from '../youtubeApi/youtube-api-models';

interface Props { }

export enum SynchronizeViewType {
	SYNCHRONIZE,
	SYNCHRONIZE_PLAYLIST
}

export interface ISynchronizeNavigationProps {
	selectedView: SynchronizeViewType;
	setselectedView(view: SynchronizeViewType): any;
}

interface YearFilter {
	year: number;
	active: boolean;
}

export interface IMyPlaylists extends ILoad {
	playlists: IYoutubeMonthPlaylist[];
}
export interface IYoutubeMonthPlaylist {
	year: number,
	month: number;
	title: string;
	favoriteitems: PlaylistItem[];
	youtubePlaylist?: Playlist;
	spotifyPlaylist?: globalThis.SpotifyApi.PlaylistObjectSimplified;
}

export const SynchronizeView: React.FunctionComponent<Props> = () => {

	const { myPlaylist, createPlaylists } = usePlaylistsSynchronizer();
	const [selectedView, setselectedView] = React.useState<SynchronizeViewType>(SynchronizeViewType.SYNCHRONIZE);
	const [selectedPlaylist, setSelectedPlaylist] = React.useState<IYoutubeMonthPlaylist | undefined>(undefined);
	const [yearFilter, setYearFilter] = React.useState<YearFilter[] | undefined>(undefined);

	const yearFilterKey = "synchronize-year-filter";

	React.useEffect(() => {
		if (myPlaylist.loaded) {

			const buildYearsFilter = async () => {

				let yearsFilter: YearFilter[] = [];

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
								let existingItem = yearsFilter.find(y => y.year === p.year);
								if (existingItem) {
									const index = yearsFilter.indexOf(existingItem);
									yearsFilter[index].active = false;
								}
							});
						}
					}
				} catch (e) {
					console.error(e);
				}

				setYearFilter(yearsFilter);
			}

			buildYearsFilter();
		}
	}, [myPlaylist.loaded]);

	React.useEffect(() => {
		if (yearFilter) {

			const saveYearsFilter = async () => {
				try {
					const jsonValue = JSON.stringify(yearFilter);
					await AsyncStorage.setItem(yearFilterKey, jsonValue);
				} catch (e) {
					console.error(e);
				}
			}

			saveYearsFilter();
		}
	}, [yearFilter]);

	const isSelectedView = (view: SynchronizeViewType) => {
		return selectedView === view;
	}

	const headerTitle = () => {
		if (isSelectedView(SynchronizeViewType.SYNCHRONIZE_PLAYLIST)) {
			return "Synchronize Playlist";
		}

		return 'Synchronize';
	}

	const onBackButtonPressed = React.useCallback(() => {
		if (isSelectedView(SynchronizeViewType.SYNCHRONIZE_PLAYLIST)) {
			setselectedView(SynchronizeViewType.SYNCHRONIZE);
		}
	}, [isSelectedView]);

	const onOpenSynchronizePlaylist = React.useCallback((myPlaylist: IYoutubeMonthPlaylist) => {
		setSelectedPlaylist(myPlaylist);
		setselectedView(SynchronizeViewType.SYNCHRONIZE_PLAYLIST);
	}, []);

	const buildAccordion = () => {
		var array: { title: JSX.Element, content: JSX.Element }[] = [];

		const title = <H1>Filtre</H1>;
		const content =
			<List>
				{
					yearFilter?.map((y, i) =>
						<ListItem key={i}>
							<Left>
								<Text style={{ color: "white" }}>{y.year}</Text>
							</Left>
							<Right>
								<Switch style={{ transform: [{ scale: 1.2 }, { translateX: -40 }] }} thumbColor={"white"} trackColor={{ true: "green", false: "white" }} value={y.active} onValueChange={() =>
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
		array.push({ title: title, content: content });

		return array;
	}

	return (
		<>
			<Header noShadow style={{ backgroundColor: synchronizeTheme.primaryColor }} androidStatusBarColor={synchronizeTheme.secondaryColor}>
				<Left>
					{
						!isSelectedView(SynchronizeViewType.SYNCHRONIZE) &&
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
				selectedView === SynchronizeViewType.SYNCHRONIZE &&
				<>
					{
						myPlaylist.loaded && yearFilter &&
						<View style={{ backgroundColor: "black" }}>
							<Accordion style={{ backgroundColor: synchronizeTheme.secondaryBackgroundColor }} dataArray={buildAccordion()} expanded={-1} renderContent={(item) => <>{item.content}</>} />
						</View>
					}
					<Content style={{ backgroundColor: "black" }}>
						{
							myPlaylist.loaded && yearFilter &&
							<>
								<List>
									{
										yearFilter.filter(y => y.active).map((y, i) =>
											<View key={i}>
												<ListItem itemHeader key={1}>
													<H1 style={{ color: "white" }}>{y.year}</H1>
												</ListItem>
												{
													myPlaylist.playlists.filter(p => p.year === y.year).map((p, j) =>
														<ListItem key={j + 1} thumbnail>
															<Left>
																{
																	(p.youtubePlaylist === undefined || p.spotifyPlaylist === undefined) &&
																	<Button warning icon transparent>
																		<Icon name='sync' type='FontAwesome5' />
																	</Button>
																}
																{
																	p.youtubePlaylist && p.spotifyPlaylist &&
																	<Button success icon transparent>
																		<Icon name='check' type='FontAwesome' />
																	</Button>
																}
															</Left>
															<Body>
																<Text style={{ color: "white" }}>{p.title}</Text>
																<Text note>{p.favoriteitems.length} favorite items</Text>
																{
																	p.youtubePlaylist &&
																	<Text note style={{ color: youtubeTheme.primaryColor }}>youtube contains {p.youtubePlaylist.contentDetails?.itemCount} videos</Text>
																}
																{
																	p.spotifyPlaylist &&
																	<Text note style={{ color: spotifyTheme.primaryColor }}>spotify contains {p.spotifyPlaylist.tracks.total} tracks</Text>
																}
															</Body>
															<Right>
																{
																	(p.spotifyPlaylist === undefined || p.youtubePlaylist === undefined) &&
																	<Button icon light onPress={() => createPlaylists(p)}>
																		<Icon name='create' type='MaterialIcons' />
																	</Button>
																}
																{
																	p.spotifyPlaylist && p.youtubePlaylist &&
																	<Button icon light onPress={() => onOpenSynchronizePlaylist(p)}>
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
				selectedView === SynchronizeViewType.SYNCHRONIZE_PLAYLIST && selectedPlaylist &&
				<SynchronizePlaylistView selectedView={selectedView} setselectedView={setselectedView} myPlaylist={selectedPlaylist} />
			}
		</>
	)
};

export default SynchronizeView;
