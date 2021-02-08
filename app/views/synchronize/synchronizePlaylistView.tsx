import React from 'react';
import { Body, Button, Card, CardItem, Content, H1, H3, Icon, Input, Item, Left, List, Right, Separator, Spinner, SwipeRow, Text, Thumbnail, View } from 'native-base';
import { spotifyTheme, synchronizeTheme, youtubeTheme } from '../theme';
import ModalPopup, { ModalType } from '../utils/modalPopup';
import { ISynchronizeNavigationProps, IYoutubeMonthPlaylist } from '../synchronizeView';
import { defaultThumbnail, getYoutubeVideoDuration, msToTime } from '../utils/helpers';
import useSynchronizePlaylists, { IMyFavorite, IMySpotify, IMyYoutube } from './useSynchronizePlaylists';
import { Video } from '../../youtubeApi/youtube-api-models';
import useSearch from './useSearch';

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

const SynchronizePlaylistView: React.FunctionComponent<IProps> = (props: IProps) => {

	const { localSave, saveFile, resetSave, youtubeVideos, spotifyTracks, nonAffectedVideos, nonAffectedTracks, deleteYoutubePlaylistVideos, deleteSpotifyPlaylistTracks, synchronizeYoutubePlaylist, synchronizeSpotifyPlaylist, bindYoutubeVideo, bindSpotifyTrack } = useSynchronizePlaylists(props.myPlaylist);
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

	const onBind = React.useCallback((favorite: IMyFavorite, bindingMode: BindingMode) => {
		setSearch(favorite?.title);
		setSelectedFavorite(favorite);
		setBindingMode(bindingMode);
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
		console.log(search);

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
				<Item style={{ width: 350 }} rounded>
					<Input multiline placeholder='Search...' value={search} onChangeText={(text) => setSearch(text)} />
					<Button transparent onPress={onSearch}>
						<Icon name='search' type='FontAwesome' />
					</Button>
				</Item>
				{
					bindingMode === BindingMode.BindYoutubeVideo &&
					<>
						<Separator style={{ height: 5 }} />
						{
							nonAffectedVideos.map((v, i) =>
								<SwipeRow
									key={i}
									disableRightSwipe={true}
									rightOpenValue={-75}
									stopRightSwipe={-75}
									body={
										<View style={{ flexDirection: 'row' }}>
											{
												v.snippet?.thumbnails?.medium?.url &&
												<Thumbnail source={{ uri: v.snippet?.thumbnails?.medium?.url }} style={{ width: 80, height: 80 }} />
											}
											<View style={{ marginLeft: 5, alignSelf: 'center' }}>
												<Text numberOfLines={3} style={{ maxWidth: 250 }}>{v.snippet?.title}</Text>
												<Text note>{v.snippet?.channelTitle}</Text>
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
							searchResults.searchResults.map((s, i) =>
								<SwipeRow
									key={i}
									disableRightSwipe={true}
									rightOpenValue={-75}
									stopRightSwipe={-75}
									body={
										<View style={{ flexDirection: 'row' }}>
											{
												s.album.images.length > 0 &&
												<Thumbnail source={{ uri: s.album.images[0].url }} style={{ width: 80, height: 80 }} />
											}
											<View style={{ marginLeft: 5, alignSelf: 'center' }}>
												<Text numberOfLines={3} style={{ maxWidth: 250 }}>{s.name}</Text>
												<Text note>{s.artists.map(a => a.name).join(', ')}</Text>
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
						<Separator style={{ height: 5 }} />
						{
							nonAffectedTracks.map((t, i) =>
								<SwipeRow
									key={i}
									disableRightSwipe={true}
									rightOpenValue={-75}
									stopRightSwipe={-75}
									body={
										<View style={{ flexDirection: 'row' }}>
											{
												t.album.images.length > 0 &&
												<Thumbnail source={{ uri: t.album.images[0].url }} style={{ width: 80, height: 80 }} />
											}
											<View style={{ marginLeft: 5, alignSelf: 'center' }}>
												<Text numberOfLines={3} style={{ maxWidth: 250 }}>{t.name}</Text>
												<Text note>{t.artists.map(a => a.name).join(', ')}</Text>
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
			<Content style={{ backgroundColor: synchronizeTheme.secondaryColor }}>
				<Card noShadow transparent style={{ backgroundColor: synchronizeTheme.secondaryColor }}>
					<CardItem header style={{ backgroundColor: synchronizeTheme.secondaryColor }}>
						<Left>
							<H1 style={{ color: "white" }}>{props.myPlaylist.title}</H1>
						</Left>
						<Right>
							<Body style={{ display: 'flex', flexDirection: 'row' }}>
								<Button dark rounded icon onPress={resetSave} style={{ borderColor: synchronizeTheme.secondaryColor, borderWidth: 1 }}>
									<Icon name="cross" type="Entypo" />
								</Button>
								<Button dark rounded icon onPress={saveFile} style={{ borderColor: synchronizeTheme.secondaryColor, borderWidth: 1 }}>
									<Icon name="save" type="FontAwesome" />
								</Button>
							</Body>
						</Right>
					</CardItem>
					<CardItem cardBody style={{ backgroundColor: synchronizeTheme.secondaryColor }}>
						<Body>
							<Text note style={{ marginLeft: 30 }} >Favorites playlist contains {props.myPlaylist.favoriteitems.length} items.</Text>
						</Body>
					</CardItem>
					<CardItem style={{ backgroundColor: synchronizeTheme.secondaryColor }}>
						<Left>
							<Icon android="md-logo-youtube" ios="ios-logo-youtube" style={{ color: youtubeTheme.primaryColor, fontSize: 50 }} />
						</Left>
						<Body>
							<Text note style={{ color: youtubeTheme.primaryColor }}>{youtubeVideos.videos.length} videos</Text>
						</Body>
						<Right>
							{
								props.myPlaylist.youtubePlaylist &&
								<Body style={{ display: 'flex', flexDirection: 'row' }}>
									<Button style={{ marginRight: 10, borderColor: synchronizeTheme.secondaryColor, borderWidth: 1 }} light icon rounded onPress={() => setActionMode(ActionMode.DeleteYoutubeVideos)} >
										<Icon name="cross" type="Entypo" />
									</Button>
									<Button style={{ marginRight: 10, borderColor: synchronizeTheme.secondaryColor, borderWidth: 1 }} light icon rounded onPress={() => setActionMode(ActionMode.SynchronizeYoutube)}>
										<Icon name="refresh" type="MaterialCommunityIcons" />
									</Button>
								</Body>
							}
						</Right>
					</CardItem>
					<CardItem last style={{ backgroundColor: synchronizeTheme.secondaryColor }}>
						<Left>
							<Icon name="spotify" type='FontAwesome' style={{ color: spotifyTheme.primaryColor, fontSize: 50 }} />
						</Left>
						<Body>
							<Text note style={{ color: spotifyTheme.primaryColor }}>{spotifyTracks.tracks.length} tracks</Text>
						</Body>
						<Right>
							{
								props.myPlaylist.spotifyPlaylist &&
								<Body style={{ display: 'flex', flexDirection: 'row' }}>
									<Button style={{ marginRight: 10, borderColor: synchronizeTheme.secondaryColor, borderWidth: 1 }} light rounded icon onPress={() => setActionMode(ActionMode.DeleteSpotifyTracks)}>
										<Icon name="cross" type="Entypo" />
									</Button>
									<Button style={{ marginRight: 10, borderColor: synchronizeTheme.secondaryColor, borderWidth: 1 }} light rounded icon onPress={() => setActionMode(ActionMode.SynchronizeSpotify)}>
										<Icon name="refresh" type="MaterialCommunityIcons" />
									</Button>
								</Body>
							}
						</Right>
					</CardItem>
				</Card>
				<Separator style={{ height: 5, backgroundColor: synchronizeTheme.secondaryBackgroundColor }} />
				<List style={{ backgroundColor: synchronizeTheme.secondaryColor }}>
					{
						localSave &&
						localSave.items.map((saveItem, i) =>
							<Card key={i} noShadow={true} style={{ borderColor: "white", borderBottomColor: "transparent", borderLeftWidth: 5, borderTopWidth: 5, borderRightWidth: 0, borderBottomWidth: 0, backgroundColor: synchronizeTheme.secondaryColor }}>
								<CardItem cardBody header style={{ backgroundColor: synchronizeTheme.secondaryColor, borderRadius: 0 }}>
									<Left style={{ maxWidth: 50 }}>
										<Text style={{ color: "white" }}>#{i + 1}</Text>
									</Left>
									<Body>
										<H3 style={{ color: "white", overflow: 'hidden' }} numberOfLines={2}>{saveItem.favorite.title}</H3>
									</Body>
								</CardItem>
								{
									spotifyTracks.loaded && youtubeVideos.loaded &&
									<>
										<CardItem style={{ backgroundColor: synchronizeTheme.secondaryColor, borderRadius: 0 }}>
											<Left style={{ maxWidth: 90 }}>
												<Button rounded style={{ width: 80, height: 80, backgroundColor: "transparent" }} onPress={() => onBind(saveItem.favorite, BindingMode.BindYoutubeVideo)}>
													<Thumbnail source={{ uri: getYoutubeThumbnail(saveItem.youtube) }} style={{ borderRadius: 20, borderColor: youtubeTheme.primaryColor, borderWidth: 2, width: 80, height: 80 }} />
												</Button>
											</Left>
											{
												saveItem.youtube &&
												<Body>
													<Text style={{ fontSize: 18, color: "white" }} numberOfLines={2}>{saveItem.youtube.title}</Text>
													<Text note numberOfLines={1}>{getYoutubeChannel(saveItem.youtube)}</Text>
													<Text note numberOfLines={1}>{getYoutubeViewCount(saveItem.youtube)}</Text>
													<Text note numberOfLines={1}>{getYoutubeDuration(saveItem.youtube)}</Text>
												</Body>
											}
										</CardItem>
										<CardItem style={{ backgroundColor: synchronizeTheme.secondaryColor, borderRadius: 0 }}>
											<Left style={{ maxWidth: 90 }}>
												<Button rounded style={{ width: 80, height: 80, backgroundColor: "transparent" }} onPress={() => onBind(saveItem.favorite, BindingMode.BindSpotifyTrack)}>
													<Thumbnail source={{ uri: getSpotifyThumbnail(saveItem.spotify) }} style={{ borderRadius: 20, borderColor: spotifyTheme.primaryColor, borderWidth: 2, width: 80, height: 80 }} />
												</Button>
											</Left>
											{
												saveItem.spotify &&
												<>
													<Body>
														<Text style={{ fontSize: 18, color: "white" }}>{saveItem.spotify.title}</Text>
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
