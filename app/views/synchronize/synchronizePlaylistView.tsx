import React from 'react';
import { Body, Button, Card, CardItem, Content, H1, H3, Icon, Input, Item, Left, List, Right, Separator, Spinner, SwipeRow, Text, Thumbnail, View } from 'native-base';
import { StyleSheet } from 'react-native';
import { spotifyTheme, synchronizeTheme, youtubeTheme } from '../theme';
import ModalPopup, { ModalType } from '../utils/modalPopup';
import { defaultThumbnail, getYoutubeVideoDuration, msToTime } from '../utils/helpers';
import useSynchronizePlaylists, { IMyFavorite, IMySpotify, IMyYoutube } from './useSynchronizePlaylists';
import { Video } from '../../youtubeApi/youtube-api-models';
import useSearch from './useSearch';
import { ISynchronizeNavigationProps, IYoutubeMonthPlaylist } from '../../interfaces/synchronizeInterfaces';

interface IProps extends ISynchronizeNavigationProps {
	myPlaylist: IYoutubeMonthPlaylist;
}

enum ActionMode {
	None,
	DeleteYoutubeVideos,
	SynchronizeYoutube,
	DeleteSpotifyTracks,
	SynchronizeSpotify,
}

enum BindingMode {
	None,
	BindYoutubeVideo,
	BindSpotifyTrack,
}

const styles = StyleSheet.create({
	modalSearchInputStyle: {
		width: 350
	},
	separatorStyle: {
		height: 5
	},
	modalRowStyle: {
		flexDirection: 'row'
	},
	modalRowThumbnailStyle: {
		width: 80,
		height: 80
	},
	modalRowTextContainerStyle: {
		marginLeft: 5,
		alignSelf: 'center'
	},
	modalRowTextStyle: {
		maxWidth: 250
	},
	contentStyle: {
		backgroundColor: synchronizeTheme.secondaryColor
	},
	cardStyle: {
		backgroundColor: synchronizeTheme.secondaryColor
	},
	cardItemStyle: {
		backgroundColor: synchronizeTheme.secondaryColor
	},
	titleStyle: {
		color: 'white'
	},
	favoriteTextStyle: {
		marginLeft: 30
	},
	saveButtonStyle: {
		borderColor: synchronizeTheme.secondaryColor,
		borderWidth: 1
	},
	logoStyle: {
		fontSize: 50
	},
	spotifyLogoStyle: {
		color: spotifyTheme.primaryColor,
	},
	youtubeLogoStyle: {
		color: youtubeTheme.primaryColor,
	},
	spotifyText: {
		color: spotifyTheme.primaryColor
	},
	youtubeText: {
		color: youtubeTheme.primaryColor
	},
	buttonContainerStyle: {
		display: 'flex',
		flexDirection: 'row'
	},
	buttonStyle: {
		marginRight: 10,
		borderColor: synchronizeTheme.secondaryColor,
		borderWidth: 1
	},
	cardListStyle: {
		borderColor: "white",
		borderBottomColor: "transparent",
		borderLeftWidth: 5,
		borderTopWidth: 5,
		borderRightWidth: 0,
		borderBottomWidth: 0,
		backgroundColor: synchronizeTheme.secondaryColor
	},
	cardListItemStyle: {
		backgroundColor: synchronizeTheme.secondaryColor,
		borderRadius: 0
	},
	favoriteNumberingContainerStyle: {
		maxWidth: 50
	},
	favoriteNumberingTextStyle: {
		color: "white"
	},
	favoriteItemTextStyle: {
		color: "white",
		overflow: 'hidden'
	},
	thumbnailContainerStyle: {
		maxWidth: 90
	},
	thumbnailButtonStyle: {
		width: 80,
		height: 80,
		backgroundColor: "transparent"
	},
	thumbnailStyle: {
		borderRadius: 20,
		borderWidth: 2,
		width: 80,
		height: 80
	},
	thumbnailSpotifyStyle: {
		borderColor: spotifyTheme.primaryColor,
	},
	thumbnailYoutubeStyle: {
		borderColor: youtubeTheme.primaryColor,
	},
	textStyle: {
		fontSize: 18,
		color: "white"
	}
});

const SynchronizePlaylistView: React.FunctionComponent<IProps> = (props: IProps) => {

	const { myPlaylist } = props;

	const { localSave, saveFile, resetSave, youtubeVideos, spotifyTracks, nonAffectedVideos, nonAffectedTracks, deleteYoutubePlaylistVideos, deleteSpotifyPlaylistTracks, synchronizeYoutubePlaylist, synchronizeSpotifyPlaylist, bindYoutubeVideo, bindSpotifyTrack } = useSynchronizePlaylists(myPlaylist);
	const [actionMode, setActionMode] = React.useState<ActionMode>(ActionMode.None);
	const [actionTitle, setActionTitle] = React.useState<string>('');
	const [bindingMode, setBindingMode] = React.useState<BindingMode>(BindingMode.None);
	const [bindingTitle, setBindingTitle] = React.useState<string>('');
	const [selectedFavorite, setSelectedFavorite] = React.useState<IMyFavorite | undefined>(undefined);
	const [search, setSearch] = React.useState('');
	const { searchResults, openSearch } = useSearch();

	React.useEffect(() => {
		switch (actionMode) {
			case ActionMode.DeleteYoutubeVideos:
				setActionTitle(`Delete youtube playlist "${props.myPlaylist.title}" ?`);
				break;

			case ActionMode.SynchronizeYoutube:
				setActionTitle(`Synchronize youtube playlist "${props.myPlaylist.title}" ?`);
				break;

			case ActionMode.DeleteSpotifyTracks:
				setActionTitle(`Delete spotify playlist "${props.myPlaylist.title}" items ?`);
				break;

			case ActionMode.SynchronizeSpotify:
				setActionTitle(`Synchronize spotify playlist "${props.myPlaylist.title}" ?`);
				break;

			default:
				setActionTitle('');
				break;
		}
	}, [actionMode]);

	const modalActionOkCallback = React.useCallback(async () => {

		const selectedMode = actionMode;

		setActionMode(ActionMode.None);

		switch (selectedMode) {
			case ActionMode.DeleteYoutubeVideos:
				await deleteYoutubePlaylistVideos();
				break;

			case ActionMode.SynchronizeYoutube:
				await synchronizeYoutubePlaylist();
				break;

			case ActionMode.DeleteSpotifyTracks:
				await deleteSpotifyPlaylistTracks();
				break;

			case ActionMode.SynchronizeSpotify:
				await synchronizeSpotifyPlaylist();
				break;

			default:
				break;
		}

	}, [actionMode]);

	const modalActionCancelCallback = React.useCallback(async () => {
		setActionMode(ActionMode.None);
	}, []);

	React.useEffect(() => {
		switch (bindingMode) {
			case BindingMode.BindYoutubeVideo:
				setBindingTitle(`Bind Youtube Video`);
				break;

			case BindingMode.BindSpotifyTrack:
				setBindingTitle(`Bind Spotify Track`);
				break;

			default:
				setBindingTitle('');
				break;
		}
	}, [bindingMode]);

	const modalBindingOkCallback = React.useCallback(async () => {
		// do nothing
	}, []);

	const modalBindingCancelCallback = React.useCallback(async () => {
		setBindingMode(BindingMode.None);
		setSearch('');
		openSearch(undefined);
	}, []);

	const onBind = React.useCallback((favorite: IMyFavorite, mode: BindingMode) => {
		setSearch(favorite?.title);
		setSelectedFavorite(favorite);
		setBindingMode(mode);
	}, []);

	const onReplaceYoutube = React.useCallback((video: Video) => {

		setBindingMode(BindingMode.None);

		if (selectedFavorite) {
			bindYoutubeVideo(selectedFavorite.videoId, video);
		}

		setSearch('');
		openSearch(undefined);

	}, [bindingMode, selectedFavorite]);

	const onReplaceSpotify = React.useCallback(async (track: SpotifyApi.TrackObjectFull) => {

		setBindingMode(BindingMode.None);

		if (selectedFavorite) {
			await bindSpotifyTrack(selectedFavorite.videoId, track);
		}

		setSearch('');
		openSearch(undefined);

	}, [bindingMode, selectedFavorite]);

	const onSearch = React.useCallback(() => {
		openSearch(search);
	}, [search, openSearch]);

	const getYoutubeThumbnail = (saveYoutube: IMyYoutube | undefined) => {

		if (saveYoutube) {
			const item = youtubeVideos.videos.find(i => i.id === saveYoutube.videoId);
			if (item && item.snippet?.thumbnails?.medium?.url) {
				return item.snippet.thumbnails.medium.url;
			}
		}

		return defaultThumbnail;
	}

	const getYoutubeChannel = (saveYoutube: IMyYoutube) => {

		const item = youtubeVideos.videos.find(i => i.id === saveYoutube.videoId);
		if (item && item.snippet?.channelTitle) {
			return item.snippet.channelTitle;
		}

		return 'No channel';
	}

	const getYoutubeViewCount = (saveYoutube: IMyYoutube) => {

		const item = youtubeVideos.videos.find(i => i.id === saveYoutube.videoId);
		if (item && item.statistics?.viewCount) {
			return `${item.statistics.viewCount} views`;
		}

		return '';
	}

	const getYoutubeDuration = (saveYoutube: IMyYoutube) => {

		const item = youtubeVideos.videos.find(i => i.id === saveYoutube.videoId);
		if (item && item.contentDetails?.duration) {
			return msToTime(getYoutubeVideoDuration(item.contentDetails?.duration));
		}

		return '';
	}

	const getSpotifyThumbnail = (saveSpotify: IMySpotify | undefined) => {

		if (saveSpotify) {
			const item = spotifyTracks.tracks.find(i => i.id === saveSpotify.id);
			if (item && item.album.images.length > 0) {
				return item.album.images[0].url;
			}
		}

		return defaultThumbnail;
	}

	const getSpotifyArtist = (saveSpotify: IMySpotify) => {

		const item = spotifyTracks.tracks.find(i => i.id === saveSpotify.id);
		if (item && item.artists.length > 0) {
			return item.artists.map(a => a.name).join(', ');
		}

		return 'No artist';
	}

	const getSpotifyDuration = (saveSpotify: IMySpotify) => {

		const item = spotifyTracks.tracks.find(i => i.id === saveSpotify.id);
		if (item) {
			return msToTime(item.duration_ms);
		}

		return '';
	}

	const getSpotifyPopularity = (saveSpotify: IMySpotify) => {

		const item = spotifyTracks.tracks.find(i => i.id === saveSpotify.id);
		if (item) {
			return `${item.popularity} (popularity)`;
		}

		return '';
	}

	return (
		<>
			<ModalPopup
				backgroundColor={synchronizeTheme.primaryBackgroundColor}
				cancelCallback={modalBindingCancelCallback}
				okCallback={modalBindingOkCallback}
				title={bindingTitle}
				type={ModalType.CANCEL}
				visible={bindingMode !== BindingMode.None}
			>
				<Item style={styles.modalSearchInputStyle} rounded>
					<Input multiline placeholder='Search...' value={search} onChangeText={(text) => setSearch(text)} />
					<Button transparent onPress={onSearch}>
						<Icon name='search' type='FontAwesome' />
					</Button>
				</Item>
				{
					bindingMode === BindingMode.BindYoutubeVideo &&
					<>
						<Separator style={styles.separatorStyle} />
						{
							nonAffectedVideos.map((v) =>
								<SwipeRow
									key={v.id}
									disableRightSwipe
									rightOpenValue={-75}
									stopRightSwipe={-75}
									body={
										<View style={styles.modalRowStyle}>
											{
												v.snippet?.thumbnails?.medium?.url &&
												<Thumbnail source={{ uri: v.snippet?.thumbnails?.medium?.url }} style={styles.modalRowThumbnailStyle} />
											}
											<View style={styles.modalRowTextContainerStyle}>
												<Text numberOfLines={3} style={styles.modalRowTextStyle}>{v.snippet?.title}</Text>
												<Text note style={styles.modalRowTextStyle}>{v.snippet?.channelTitle}</Text>
											</View>
										</View>
									}
									right={
										<Button success onPress={() => onReplaceYoutube(v)}>
											<Icon active name="add" />
										</Button>
									}
								/>
							)
						}
					</>
				}
				{
					bindingMode === BindingMode.BindSpotifyTrack &&
					<>
						{
							searchResults.loaded &&
							searchResults.searchResults.map((s) =>
								<SwipeRow
									key={s.id}
									disableRightSwipe
									rightOpenValue={-75}
									stopRightSwipe={-75}
									body={
										<View style={styles.modalRowStyle}>
											{
												s.album.images.length > 0 &&
												<Thumbnail source={{ uri: s.album.images[0].url }} style={styles.modalRowThumbnailStyle} />
											}
											<View style={styles.modalRowTextContainerStyle}>
												<Text numberOfLines={3} style={styles.modalRowTextStyle}>{s.name}</Text>
												<Text note style={styles.modalRowTextStyle}>{s.artists.map(a => a.name).join(', ')}</Text>
											</View>
										</View>
									}
									right={
										<Button success onPress={() => onReplaceSpotify(s)}>
											<Icon active name="add" />
										</Button>
									}
								/>
							)
						}
						{
							searchResults.loading &&
							<Spinner color={synchronizeTheme.primaryColor} />
						}
						<Separator style={styles.separatorStyle} />
						{
							nonAffectedTracks.map((t) =>
								<SwipeRow
									key={t.id}
									disableRightSwipe
									rightOpenValue={-75}
									stopRightSwipe={-75}
									body={
										<View style={styles.modalRowStyle}>
											{
												t.album.images.length > 0 &&
												<Thumbnail source={{ uri: t.album.images[0].url }} style={styles.modalRowThumbnailStyle} />
											}
											<View style={styles.modalRowTextContainerStyle}>
												<Text numberOfLines={3} style={styles.modalRowTextStyle}>{t.name}</Text>
												<Text note style={styles.modalRowTextStyle}>{t.artists.map(a => a.name).join(', ')}</Text>
											</View>
										</View>
									}
									right={
										<Button success onPress={() => onReplaceSpotify(t)}>
											<Icon active name="add" />
										</Button>
									}
								/>
							)
						}
					</>
				}
			</ModalPopup>
			<ModalPopup
				backgroundColor={synchronizeTheme.primaryBackgroundColor}
				cancelCallback={modalActionCancelCallback}
				okCallback={modalActionOkCallback}
				title={actionTitle}
				type={ModalType.OK_CANCEL}
				visible={actionMode !== ActionMode.None}
			/>
			<Content style={styles.contentStyle}>
				<Card noShadow transparent style={styles.cardStyle}>
					<CardItem header style={styles.cardItemStyle}>
						<Left>
							<H1 style={styles.titleStyle}>{myPlaylist.title}</H1>
						</Left>
						<Right>
							<Body style={styles.buttonContainerStyle}>
								<Button dark rounded icon onPress={resetSave} style={styles.saveButtonStyle}>
									<Icon name="cross" type="Entypo" />
								</Button>
								<Button dark rounded icon onPress={saveFile} style={styles.saveButtonStyle}>
									<Icon name="save" type="FontAwesome" />
								</Button>
							</Body>
						</Right>
					</CardItem>
					<CardItem cardBody style={styles.cardItemStyle}>
						<Body>
							<Text note style={styles.favoriteTextStyle} >Favorites playlist contains {myPlaylist.favoriteitems.length} items.</Text>
						</Body>
					</CardItem>
					<CardItem style={styles.cardItemStyle}>
						<Left>
							<Icon android="md-logo-youtube" ios="ios-logo-youtube" style={{ ...styles.logoStyle, ...styles.youtubeLogoStyle }} />
						</Left>
						<Body>
							<Text note style={styles.youtubeText}>{youtubeVideos.videos.length} videos</Text>
						</Body>
						<Right>
							{
								myPlaylist.youtubePlaylist &&
								<Body style={styles.buttonContainerStyle}>
									<Button style={styles.buttonStyle} light icon rounded onPress={() => setActionMode(ActionMode.DeleteYoutubeVideos)} >
										<Icon name="cross" type="Entypo" />
									</Button>
									<Button style={styles.buttonStyle} light icon rounded onPress={() => setActionMode(ActionMode.SynchronizeYoutube)}>
										<Icon name="refresh" type="MaterialCommunityIcons" />
									</Button>
								</Body>
							}
						</Right>
					</CardItem>
					<CardItem last style={styles.cardItemStyle}>
						<Left>
							<Icon name="spotify" type='FontAwesome' style={{ ...styles.logoStyle, ...styles.spotifyLogoStyle }} />
						</Left>
						<Body>
							<Text note style={styles.spotifyText}>{spotifyTracks.tracks.length} tracks</Text>
						</Body>
						<Right>
							{
								myPlaylist.spotifyPlaylist &&
								<Body style={styles.buttonContainerStyle}>
									<Button style={styles.buttonStyle} light rounded icon onPress={() => setActionMode(ActionMode.DeleteSpotifyTracks)}>
										<Icon name="cross" type="Entypo" />
									</Button>
									<Button style={styles.buttonStyle} light rounded icon onPress={() => setActionMode(ActionMode.SynchronizeSpotify)}>
										<Icon name="refresh" type="MaterialCommunityIcons" />
									</Button>
								</Body>
							}
						</Right>
					</CardItem>
				</Card>
				<Separator style={{ ...styles.separatorStyle, ...styles.cardItemStyle }} />
				<List style={styles.cardItemStyle}>
					{
						localSave &&
						localSave.items.map((saveItem, i) =>
							<Card key={saveItem.favorite.videoId} noShadow style={styles.cardListStyle}>
								<CardItem cardBody header style={styles.cardListItemStyle}>
									<Left style={styles.favoriteNumberingContainerStyle}>
										<Text style={styles.favoriteNumberingTextStyle}>#{i + 1}</Text>
									</Left>
									<Body>
										<H3 style={styles.favoriteItemTextStyle} numberOfLines={2}>{saveItem.favorite.title}</H3>
									</Body>
								</CardItem>
								{
									spotifyTracks.loaded && youtubeVideos.loaded &&
									<>
										<CardItem style={styles.cardListItemStyle}>
											<Left style={styles.thumbnailContainerStyle}>
												<Button rounded style={styles.thumbnailButtonStyle} onPress={() => onBind(saveItem.favorite, BindingMode.BindYoutubeVideo)}>
													<Thumbnail source={{ uri: getYoutubeThumbnail(saveItem.youtube) }} style={{ ...styles.thumbnailStyle, ...styles.thumbnailYoutubeStyle }} />
												</Button>
											</Left>
											{
												saveItem.youtube &&
												<Body>
													<Text style={styles.textStyle} numberOfLines={2}>{saveItem.youtube.title}</Text>
													<Text note numberOfLines={1}>{getYoutubeChannel(saveItem.youtube)}</Text>
													<Text note numberOfLines={1}>{getYoutubeViewCount(saveItem.youtube)}</Text>
													<Text note numberOfLines={1}>{getYoutubeDuration(saveItem.youtube)}</Text>
												</Body>
											}
										</CardItem>
										<CardItem style={styles.cardListItemStyle}>
											<Left style={styles.thumbnailContainerStyle}>
												<Button rounded style={styles.thumbnailButtonStyle} onPress={() => onBind(saveItem.favorite, BindingMode.BindSpotifyTrack)}>
													<Thumbnail source={{ uri: getSpotifyThumbnail(saveItem.spotify) }} style={{ ...styles.thumbnailStyle, ...styles.thumbnailSpotifyStyle }} />
												</Button>
											</Left>
											{
												saveItem.spotify &&
												<>
													<Body>
														<Text style={styles.textStyle}>{saveItem.spotify.title}</Text>
														<Text note>{getSpotifyArtist(saveItem.spotify)}</Text>
														<Text note>{getSpotifyPopularity(saveItem.spotify)}</Text>
														<Text note>{getSpotifyDuration(saveItem.spotify)}</Text>
													</Body>
												</>
											}
										</CardItem>
									</>
								}
								{
									(spotifyTracks.loading || youtubeVideos.loading) &&
									<Spinner color={synchronizeTheme.primaryColor} />
								}
							</Card>
						)
					}
				</List>
			</Content>
		</>
	)
};

export default SynchronizePlaylistView;
