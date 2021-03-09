import React from 'react';
import SpotifyApi from 'spotify-web-api-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Context from '../../store/context';
import { pushSpotifyErrorNotification, pushYoutubeErrorNotification, pushYoutubeSuccessNotification } from '../../store/types/notifications_actions';
import { PlaylistItems } from '../../youtubeApi/youtube-api-playlistItems';
import { ILoad } from '../../store/state';
import { Videos } from '../../youtubeApi/youtube-api-videos';
import { Video } from '../../youtubeApi/youtube-api-models';
import { IMyFavorite, IMySpotify, IMyYoutube, IYoutubeMonthPlaylist } from '../../interfaces/synchronizeInterfaces';
import logger from '../utils/logger';

interface IYoutubeVideos extends ILoad {
	videos: Video[];
}

interface ISpotifyTracks extends ILoad {
	tracks: globalThis.SpotifyApi.TrackObjectFull[];
}

interface IMyPlaylist extends ILoad {
	items: IMyPlaylistItem[]
}

interface IMyPlaylistItem {
	favorite: IMyFavorite,
	youtube?: IMyYoutube,
	spotify?: IMySpotify
}

interface ISynchro {
	favoriteVideoId: string,
	spotify?: {
		id: string,
		title: string,
		uri: string
	}
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useSynchronizePlaylists = (myPlaylist: IYoutubeMonthPlaylist) => {

	const { state, dispatch } = React.useContext(Context);

	const { log, error } = logger();

	const [youtubePlaylistId] = React.useState<string | undefined | null>(myPlaylist.youtubePlaylist?.id);
	const [spotifyPlaylistId] = React.useState<string | undefined>(myPlaylist.spotifyPlaylist?.id);
	const [localSave, setLocalSave] = React.useState<IMyPlaylist>({
		loading: false,
		loaded: false,
		items: []
	});

	const [youtubeVideos, setYoutubeVideos] = React.useState<IYoutubeVideos>({
		loaded: false,
		loading: false,
		videos: []
	});
	const [playlistItemPageToken, setPlaylistItemPageToken] = React.useState<string | undefined>(undefined);

	const [spotifyTracks, setSpotifyTracks] = React.useState<ISpotifyTracks>({
		loaded: false,
		loading: false,
		tracks: []
	});
	const [spotifyTracksPageOffset, setSpotifyTracksPageOffset] = React.useState<number | undefined>(undefined);
	const [nonAffectedVideos, setNonAffectedVideos] = React.useState<Video[]>([]);
	const [nonAffectedTracks, setNonAffectedTracks] = React.useState<globalThis.SpotifyApi.TrackObjectFull[]>([]);

	const ArtistsName = "Artists";
	const TitleName = "Title";

	const [artistsSeparator] = React.useState<string[]>([
		" - ",
		" & ",
		" ft. ",
		" ft ",
		" Ft. ",
		" Ft ",
		" feat. ",
		" feat ",
		" Feat. ",
		" Feat ",
		" featuring ",
		" vs. ",
		" vs ",
		" Vs. ",
		" Vs ",
		", ",
		" x ",
		" X ",
		" and ",
		" with ",
		" With "
	]);

	const [titleUpdates] = React.useState<Record<string, string>>(
		{
			"²": "2",
			" | ": " ",
			"F.": "F. ",
			"Mc Tha Watcher": "Tha Watcher",
			" HQ ": " ",
			" Rip ": " ",
			"Preview": " ",
			"Q-dance": " ",
			"Q-Base": " ",
			"QORE": " ",
			"Official": " ",
			" Video": " ",
			" Out Now": " ",
			"Soundtrack": " ",
			"Aftermovie": " ",
			"Dj Anime": "Anime",
			" anthem ": " ",
			" by ": " ",
			"SPEQTRUM": " ",
			"Topic": " ",
			" vs ": " "
		});

	const [titleRegex] = React.useState<RegExp>(() => {

		const SeparatorName = "Separator";
		const Artists = `(?<${ArtistsName}>[A-Za-z0-9_\\s\\.\\&\\-\\'\\,\\²\\#\\"]*)`;

		const SpaceDelimiter = "(\\s{2,3})";
		const DashDelimiter = "(\\s*(-|–)\\s+)|(\\s+(-|–)\\s*)";
		const ColonDelimiter = "(\\s*(:)\\s+)|(\\s+(:)\\s*)";

		const Separator = `(?<${SeparatorName}>${SpaceDelimiter}|${DashDelimiter}|${ColonDelimiter})`;
		const Title = `(?<${TitleName}>[A-Za-z0-9_\\s\\.\\&\\-\\'\\,\\²\\#\\"]*)`;

		return new RegExp(`${Artists}${Separator}${Title}`)
	});

	const fetchYoutubeVideos = React.useCallback(async (pageToken: string | undefined = undefined) => {
		if (youtubePlaylistId) {
			try {
				setYoutubeVideos((prev) => ({
					...prev,
					loading: true,
					loaded: false,
					videos: pageToken ? [...prev.videos] : []
				}));

				const playlistItemsResponse = await new PlaylistItems(state.youtubeState.credential.accessToken).list({
					playlistId: youtubePlaylistId,
					part: ['contentDetails'],
					maxResults: 50,
					pageToken
				});

				if (playlistItemsResponse) {

					if (playlistItemsResponse.items) {
						const videosIds: string[] = [];

						playlistItemsResponse.items.forEach(i => {
							if (i.contentDetails?.videoId) {
								videosIds.push(i.contentDetails?.videoId);
							}
						});

						const videosResponse = await new Videos(state.youtubeState.credential.accessToken).list({
							id: videosIds,
							part: ['snippet', 'contentDetails', 'statistics'],
							maxResults: 50,
						});

						if (videosResponse && videosResponse.items) {
							const { items } = videosResponse;
							setYoutubeVideos((prev) => ({
								...prev,
								videos: [
									...prev.videos,
									...items
								]
							}));
						}
					}

					if (playlistItemsResponse.nextPageToken) {
						setPlaylistItemPageToken(playlistItemsResponse.nextPageToken);
					} else {
						setYoutubeVideos((prev) => ({
							...prev,
							loading: false,
							loaded: true
						}));
						setPlaylistItemPageToken(undefined);
					}
				}
			} catch (e) {
				setYoutubeVideos((prev) => ({
					...prev,
					loading: false,
					loaded: false
				}));
				dispatch(pushYoutubeErrorNotification(e));
			}
		}
	}, [dispatch, youtubePlaylistId, state.youtubeState.credential.accessToken]);

	const fetchSpotifyTracks = React.useCallback(async (offset: number | undefined = undefined) => {
		if (spotifyPlaylistId) {
			try {
				setSpotifyTracks((prev) => ({
					...prev,
					loading: true,
					loaded: false,
					tracks: offset ? [...prev.tracks] : []
				}));

				const spotifyApi = new SpotifyApi();
				spotifyApi.setAccessToken(state.spotifyState.credential.accessToken);

				const limit = 50;
				// eslint-disable-next-line @typescript-eslint/ban-types
				let options: Object;
				if (offset) {
					options = {
						"market": state.spotifyState.userProfile.country,
						"limit": limit,
						"offset": offset,
					}
				}
				else {
					options = {
						"market": state.spotifyState.userProfile.country,
						"limit": limit
					}
				}

				const response = await spotifyApi.getPlaylistTracks(spotifyPlaylistId, options);
				if (response) {

					const filteredTracks: globalThis.SpotifyApi.TrackObjectFull[] = [];
					response.items.forEach(t => {
						if (t.track.type === 'track') {
							filteredTracks.push(t.track);
						}
					});

					setSpotifyTracks((prev) => ({
						...prev,
						tracks: [
							...prev.tracks,
							...filteredTracks
						]
					}));

					if (response.next === null) {
						setSpotifyTracksPageOffset(undefined);
						setSpotifyTracks((prev) => ({
							...prev,
							loading: false,
							loaded: true
						}));
					} else {
						setSpotifyTracksPageOffset(response.offset + limit);
					}
				}
			} catch (e) {
				setSpotifyTracks((prev) => ({
					...prev,
					loading: false,
					loaded: false
				}));
				dispatch(pushSpotifyErrorNotification(e));
			}
		}
	}, [dispatch, spotifyPlaylistId, state.spotifyState.credential.accessToken, state.spotifyState.userProfile.country]);

	React.useEffect(() => {

		log('get save !');

		const getSave = async () => {

			let items: IMyPlaylistItem[] = [];

			try {

				setLocalSave((prev) => ({
					...prev,
					loading: true,
					loaded: false
				}));

				const value = await AsyncStorage.getItem(myPlaylist.title);
				if (value !== null) {
					const myPlaylistSave = JSON.parse(value) as IMyPlaylist;
					if (myPlaylistSave) {

						log("save loaded !");
						log(myPlaylistSave.items);

						items = [...myPlaylistSave.items];

						if (myPlaylist.favoriteitems) {

							[...myPlaylist.favoriteitems].reverse().forEach((playlistItem, i) => {

								const existingSaveItem = items.find(item => item.favorite?.videoId === playlistItem.contentDetails?.videoId);

								if (existingSaveItem) { // favorite item already in the save

									const index = items.indexOf(existingSaveItem);

									if (playlistItem.snippet?.title === 'Deleted video') { // video removed
										items = [
											...items.slice(0, index),
											{
												...existingSaveItem,
												favorite: {
													exists: false,
													videoId: existingSaveItem.favorite.videoId,
													title: existingSaveItem.favorite.title
												}
											},
											...items.slice(index + 1),
										];
									}
								} else if (playlistItem.snippet?.title === 'Deleted video') { // video removed
									items = [
										{
											favorite: {
												exists: false,
												videoId: playlistItem.contentDetails?.videoId ? playlistItem.contentDetails?.videoId : '',
												title: 'Deleted video'
											}
										},
										...items
									];
								} else {
									items = [
										...items.slice(0, items.length - i),
										{
											favorite: {
												exists: true,
												videoId: playlistItem.contentDetails?.videoId ? playlistItem.contentDetails?.videoId : '',
												title: playlistItem.snippet?.title ? playlistItem.snippet?.title : 'Unknown'
											}
										},
										...items.slice(items.length - i)
									];
								}
							});
						} else {
							log("No favorite items.");
						}

					}
				} else {

					log("save created !");

					if (myPlaylist.favoriteitems) {

						myPlaylist.favoriteitems.forEach((favoriteItem) => {
							const videoId = favoriteItem.contentDetails?.videoId ? favoriteItem.contentDetails?.videoId : '';
							const title = favoriteItem.snippet?.title ? favoriteItem.snippet?.title : '';

							items.push({
								favorite: {
									exists: favoriteItem.snippet?.title !== 'Deleted video',
									videoId,
									title
								}
							});
						});

					} else {
						log("No favorite items.");
					}
				}
			} catch (e) {
				error(e);
			} finally {
				setLocalSave((prev) => ({
					...prev,
					loading: false,
					loaded: true,
					items
				}));
			}
		}

		getSave();
	}, [error, log, myPlaylist.favoriteitems, myPlaylist.title]);

	React.useEffect(() => {

		log('filter non affected !');

		if (localSave) {
			if (youtubeVideos.loaded) {
				const bindedVideoIds = localSave.items.reduce((ids: string[], i: IMyPlaylistItem) => {
					if (i.youtube && i.youtube.videoId) {
						ids.push(i.youtube.videoId)
					}

					return ids;
				}, []);

				if (bindedVideoIds) {
					setNonAffectedVideos(youtubeVideos.videos.filter(v => v.id && !bindedVideoIds.includes(v.id)));
				}
			}
			if (spotifyTracks.loaded) {
				const bindedTrackIds = localSave.items.reduce((ids: string[], i: IMyPlaylistItem) => {
					if (i.spotify && i.spotify.id) {
						ids.push(i.spotify.id)
					}

					return ids;
				}, []);

				if (bindedTrackIds) {
					setNonAffectedTracks(spotifyTracks.tracks.filter(t => t.id && !bindedTrackIds.includes(t.id)));
				}
			}
		}
	}, [localSave, youtubeVideos.loaded, spotifyTracks.loaded, youtubeVideos.videos, spotifyTracks.tracks, log])

	React.useEffect(() => {
		if (youtubePlaylistId) {
			fetchYoutubeVideos();
		} else {
			setYoutubeVideos((prev) => ({
				...prev,
				loading: false,
				loaded: true
			}));
		}
	}, [fetchYoutubeVideos, youtubePlaylistId]);

	React.useEffect(() => {
		if (playlistItemPageToken) {
			fetchYoutubeVideos(playlistItemPageToken);
		}
	}, [fetchYoutubeVideos, playlistItemPageToken]);

	React.useEffect(() => {
		if (spotifyPlaylistId) {
			fetchSpotifyTracks();
		} else {
			setSpotifyTracks((prev) => ({
				...prev,
				loading: false,
				loaded: true
			}));
		}
	}, [fetchSpotifyTracks, spotifyPlaylistId]);

	React.useEffect(() => {
		if (spotifyTracksPageOffset) {
			fetchSpotifyTracks(spotifyTracksPageOffset);
		}
	}, [fetchSpotifyTracks, spotifyTracksPageOffset]);

	const saveFile = React.useCallback(async () => {
		if (localSave) {
			try {
				log(`save ${myPlaylist.title} => `);
				log(localSave.items);

				const jsonValue = JSON.stringify(localSave);
				await AsyncStorage.setItem(myPlaylist.title, jsonValue);
			} catch (e) {
				error(e);
			}
		}
	}, [error, localSave, log, myPlaylist.title]);

	const resetSave = React.useCallback(async () => {

		const items: IMyPlaylistItem[] = [];

		if (myPlaylist.favoriteitems) {
			myPlaylist.favoriteitems.forEach((favoriteItem) => {
				const videoId = favoriteItem.contentDetails?.videoId ? favoriteItem.contentDetails?.videoId : '';
				const title = favoriteItem.snippet?.title ? favoriteItem.snippet?.title : '';

				items.push({
					favorite: {
						exists: favoriteItem.snippet?.title !== 'Deleted video',
						videoId,
						title
					}
				});
			});

		} else {
			log("No favorite items.");
		}

		setLocalSave((prev) => ({
			...prev,
			loading: false,
			loaded: true,
			items
		}));

	}, [log, myPlaylist.favoriteitems]);

	const deleteYoutubePlaylistVideos = React.useCallback(async () => {
		if (youtubePlaylistId) {
			try {

				const playlistItemsResponse = await new PlaylistItems(state.youtubeState.credential.accessToken).list({
					playlistId: youtubePlaylistId,
					part: ['id'],
					maxResults: 50
				});

				if (playlistItemsResponse && playlistItemsResponse.items) {

					const promises = playlistItemsResponse.items.map(async playlistItem => {
						if (playlistItem.id) {
							await new PlaylistItems(state.youtubeState.credential.accessToken).delete({
								id: playlistItem.id
							});
						}
					});

					await Promise.all(promises);

					setYoutubeVideos((prev) => ({
						...prev,
						videos: []
					}));

					setLocalSave((prev) => ({
						...prev,
						items: prev.items.map(i => ({
							...i,
							youtube: undefined
						}))
					}));

					dispatch(pushYoutubeSuccessNotification(`${myPlaylist.title} cleaned !`));
				}
			} catch (e) {
				dispatch(pushYoutubeErrorNotification(e));
			}
		}

	}, [dispatch, myPlaylist.title, youtubePlaylistId, state.youtubeState.credential.accessToken]);

	const synchronizeYoutubePlaylist = React.useCallback(async () => {

		try {
			if (youtubePlaylistId) {

				const playlistItemsToRemove = youtubeVideos.videos.filter(i => !myPlaylist.favoriteitems.map(fav => fav.snippet?.resourceId?.videoId).includes(i.id));
				const playlistItemsToAdd = myPlaylist.favoriteitems.filter(i => !youtubeVideos.videos.map(v => v.id).includes(i.snippet?.resourceId?.videoId));

				playlistItemsToRemove.forEach(async (playlistItemToRemove) => {
					if (playlistItemToRemove.id) {
						await new PlaylistItems(state.youtubeState.credential.accessToken).delete({
							id: playlistItemToRemove.id
						});
					}
				});

				playlistItemsToAdd.forEach(async (playlistItemToAdd) => {
					if (playlistItemToAdd.id) {
						await new PlaylistItems(state.youtubeState.credential.accessToken).insert({
							part: ['snippet'],
							requestBody: {
								snippet: {
									playlistId: youtubePlaylistId,
									resourceId: playlistItemToAdd.snippet?.resourceId
								}
							}
						});
					}
				});

				await fetchYoutubeVideos();

				dispatch(pushYoutubeSuccessNotification(`${myPlaylist.title} synchronized !`));

				setLocalSave((prev) => ({
					...prev,
					items: [...prev.items].map(f => ({
						...f,
						youtube: {
							videoId: f.favorite.videoId,
							title: f.favorite.title
						}
					}))
				}));
			}
		} catch (e) {
			dispatch(pushYoutubeErrorNotification(e));
		}
	}, [dispatch, fetchYoutubeVideos, myPlaylist.favoriteitems, myPlaylist.title, state.youtubeState.credential.accessToken, youtubePlaylistId, youtubeVideos.videos]);

	const deleteSpotifyPlaylistTracks = React.useCallback(async () => {
		if (!spotifyPlaylistId) {
			return;
		}

		try {
			const spotifyApi = new SpotifyApi();
			spotifyApi.setAccessToken(state.spotifyState.credential.accessToken);

			// eslint-disable-next-line @typescript-eslint/ban-types
			const uris: Object[] = [];

			spotifyTracks.tracks.forEach((t, i) => {
				uris.push({
					uri: t.uri,
					positions: [i]
				});
			});

			const removeTrackResponse = await spotifyApi.removeTracksFromPlaylist(spotifyPlaylistId, uris);
			if (removeTrackResponse) {

				setSpotifyTracks((prev) => ({
					...prev,
					tracks: []
				}));

				setLocalSave((prev) => ({
					...prev,
					items: prev.items.map(i => ({
						...i,
						spotify: undefined
					}))
				}));
			}
		} catch (e) {
			dispatch(pushSpotifyErrorNotification(e));
		}
	}, [dispatch, spotifyPlaylistId, spotifyTracks.tracks, state.spotifyState.credential.accessToken]);

	const updateRawTitle = React.useCallback((title: string) => {
		let updatedTitle = title;

		Object.entries(titleUpdates).forEach(keyValuePair => {
			const [key, value] = keyValuePair;
			updatedTitle = updatedTitle.replace(key, value);
		});

		if (updatedTitle.includes('(')) {
			updatedTitle = updatedTitle.substring(0, updatedTitle.indexOf('('));
		}

		return updatedTitle;
	}, [titleUpdates]);

	const synchronizeSpotifyPlaylist = React.useCallback(async () => {
		try {

			const spotifyApi = new SpotifyApi();
			spotifyApi.setAccessToken(state.spotifyState.credential.accessToken);

			const promises = localSave.items.map(async item => {

				const result: ISynchro = {
					favoriteVideoId: item.favorite.videoId,
				};

				if (item.spotify === undefined) {

					const { title } = item.favorite;
					const updatedTitle = updateRawTitle(title);

					const matchArray = updatedTitle.match(titleRegex);
					if (matchArray && matchArray.groups) {

						const artistsName = matchArray.groups[ArtistsName];
						const titleName = matchArray.groups[TitleName];

						const artists = artistsName.trim().split(new RegExp(`(${artistsSeparator.join('|')})`)).filter(r => !artistsSeparator.includes(r));

						const search = `${titleName} ${artists.join(" ")}`;

						log(`search => ${search}`);

						const options: globalThis.SpotifyApi.SearchForItemParameterObject = {
							limit: 1
						};

						const response = await spotifyApi.searchTracks(search, options);
						if (response && response.tracks.total > 0) {
							const res = response.tracks.items[0];

							result.spotify = {
								id: res.id,
								title: res.name,
								uri: res.uri
							}
						}
					}
				}

				return result;
			});

			const sync: ISynchro[] = await Promise.all(promises);

			if (spotifyPlaylistId) {

				const uris: string[] = [];

				sync.forEach(s => {
					if (s.spotify) {
						uris.push(s.spotify.uri);
					}
				});

				if (uris.length > 0) {
					const respons = await spotifyApi.addTracksToPlaylist(spotifyPlaylistId, uris);
					if (respons) {

						await fetchSpotifyTracks();

						setLocalSave((prev) => {

							let copy: IMyPlaylistItem[] = [...prev.items];

							sync.forEach(element => {

								if (element.spotify) {
									const existingSaveItem = copy.find(i => i.favorite?.videoId === element.favoriteVideoId);
									if (existingSaveItem) {

										const index = copy.indexOf(existingSaveItem);

										copy = [
											...copy.slice(0, index),
											{
												...existingSaveItem,
												spotify: {
													id: element.spotify.id,
													title: element.spotify.title
												}
											},
											...copy.slice(index + 1),
										];

									}
								}
							});

							return {
								...prev,
								items: copy
							}
						});
					}
				}
			}
		} catch (e) {
			dispatch(pushSpotifyErrorNotification(e));
		}
	}, [state.spotifyState.credential.accessToken, localSave.items, spotifyPlaylistId, updateRawTitle, titleRegex, artistsSeparator, log, fetchSpotifyTracks, dispatch]);

	const bindYoutubeVideo = React.useCallback(async (videoId: string, video: Video) => {
		setLocalSave((prev) => {
			const playlistItem = prev.items.find(i => i.favorite.videoId === videoId);
			if (playlistItem) {

				const index = prev.items.indexOf(playlistItem);

				return {
					...prev,
					items: [
						...prev.items.slice(0, index),
						{
							...playlistItem,
							youtube: {
								title: video.snippet?.title ? video.snippet?.title : '',
								videoId: video.id ? video.id : ''
							}
						},
						...prev.items.slice(index + 1),
					]
				}
			}

			return prev;
		});
	}, []);

	const bindSpotifyTrack = React.useCallback(async (videoId: string, track: globalThis.SpotifyApi.TrackObjectFull) => {
		if (!spotifyPlaylistId) {
			return;
		}

		try {
			const spotifyTrack = spotifyTracks.tracks.find(t => t.id === track.id);
			if (!spotifyTrack) {
				if (myPlaylist.spotifyPlaylist) {
					const spotifyApi = new SpotifyApi();
					spotifyApi.setAccessToken(state.spotifyState.credential.accessToken);

					const addTracksResponse = await spotifyApi.addTracksToPlaylist(spotifyPlaylistId, [track.uri]);
					if (addTracksResponse) {
						await fetchSpotifyTracks();
					}
				}
			} else {
				setSpotifyTracks((prev) => ({
					...prev,
					tracks: prev.tracks.filter(t => t.id !== track.id)
				}));
			}
			// const playlistItem = localSave.items.find(item => item.favorite.videoId === videoId);
			// if (playlistItem) {
			// 	if (myPlaylist.spotifyPlaylist) {
			// 		if (playlistItem.spotify) {

			// 			const track = spotifyTracks.tracks.find(t => t.id === playlistItem.spotify?.id);
			// 			if (track) {
			// 				const spotifyApi = new SpotifyApi();
			// 				spotifyApi.setAccessToken(state.spotifyState.credential.accessToken);

			// 				await spotifyApi.removeTracksFromPlaylist(myPlaylist.spotifyPlaylist?.id, [track.uri]);

			// 				setSpotifyTracks((prev) => ({
			// 					...prev,
			// 					tracks: prev.tracks.filter(t => t.id !== track.id)
			// 				}));
			// 			}
			// 		}
			// 	}
			// }

			setLocalSave((prev) => {
				const storedPlaylistItem = prev.items.find(i => i.favorite.videoId === videoId);
				if (storedPlaylistItem) {

					const index = prev.items.indexOf(storedPlaylistItem);

					return {
						...prev,
						items: [
							...prev.items.slice(0, index),
							{
								...storedPlaylistItem,
								spotify: {
									title: track.name,
									id: track.id
								}
							},
							...prev.items.slice(index + 1),
						]
					}
				}

				return prev;
			});
		} catch (e) {
			dispatch(pushSpotifyErrorNotification(e));
		}
	}, [dispatch, fetchSpotifyTracks, myPlaylist.spotifyPlaylist, spotifyPlaylistId, spotifyTracks.tracks, state.spotifyState.credential.accessToken]);

	return { localSave, saveFile, resetSave, youtubeVideos, spotifyTracks, nonAffectedVideos, nonAffectedTracks, deleteYoutubePlaylistVideos, deleteSpotifyPlaylistTracks, synchronizeYoutubePlaylist, synchronizeSpotifyPlaylist, bindYoutubeVideo, bindSpotifyTrack };
};

export default useSynchronizePlaylists;
