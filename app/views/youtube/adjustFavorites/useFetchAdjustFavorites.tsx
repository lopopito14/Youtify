import React from 'react';
import Context from '../../../store/context';
import { pushYoutubeErrorNotification } from '../../../store/types/notifications_actions';
import { SearchResult } from '../../../youtubeApi/youtube-api-models';
import { PlaylistItems } from '../../../youtubeApi/youtube-api-playlistItems';
import { Videos } from '../../../youtubeApi/youtube-api-videos';
import { IAdjustableVideo } from './adjustFavoritesView';

const useFetchAdjustFavorites = () => {
    const { state, dispatch } = React.useContext(Context);

    const [loaded, setLoaded] = React.useState(false);
    const [progress, setProgress] = React.useState(0);
    const [adjustableVideos, setAdjustableVideos] = React.useState<IAdjustableVideo[]>([]);
    const [pageToken, setPageToken] = React.useState<string | undefined>(undefined);

    const filteredChannelIds = [
        "UC6murUWtqOwnTL68pwjoGjQ", // EuphoricHardStyleZ
        "UCv-XlFFGN30KJkG8BhvF7nA", // Hard Records
        "UCBOQta0mgFd7a9Ss3CYbXAA", // The Legendary Uploadzz
        "UCQxonuu3uUCnt7DdV9KZljA", // Hardstyle Zone Music
        "UCzH6Fc7Ba-S4U83P5ZR6dLA", // Rawstyle Nation
        "UCuSoYG4BvzRVnNfkwXICBpg", // Hard Edits
        "UC67WZta3Qqm-P2Eu3fej1bw"  // HARDSTYLE Records
    ];

    React.useEffect(() => {
        if (!loaded) {
            fetchFavoriteVideos();
        }
    }, []);

    React.useEffect(() => {
        if (pageToken) {
            fetchFavoriteVideos(pageToken);
        }
    }, [pageToken]);

    const fetchFavoriteVideos = async (pageToken: string | undefined = undefined) => {

        try {
            var playlistItemsResponse = await new PlaylistItems(state.youtubeState.credential.accessToken).list({
                playlistId: state.youtubeState.userProfile.favoritePlaylistId,
                part: ['snippet', 'contentDetails'],
                maxResults: 50,
                pageToken: pageToken
            });
            if (playlistItemsResponse) {

                if (playlistItemsResponse.items) {

                    setProgress((prev) => {
                        let result = prev;
                        if (playlistItemsResponse.pageInfo &&
                            playlistItemsResponse.pageInfo.totalResults &&
                            playlistItemsResponse.items) {
                            result += 100 * (playlistItemsResponse.items.length / playlistItemsResponse.pageInfo.totalResults)
                        }
                        return result;
                    });

                    let videosIds: string[] = [];

                    playlistItemsResponse.items.forEach(i => {
                        if (i.contentDetails?.videoId) {
                            videosIds.push(i.contentDetails?.videoId);
                        }
                    });

                    var videosResponse = await new Videos(state.youtubeState.credential.accessToken).list({
                        id: videosIds,
                        part: ['snippet', 'contentDetails', 'statistics'],
                        maxResults: 50,
                    });

                    if (videosResponse && videosResponse.items) {
                        const videos = videosResponse.items.filter(v => v.snippet?.channelId && filteredChannelIds.includes(v.snippet?.channelId));

                        let adjustableVideos: IAdjustableVideo[] = [];

                        videos.forEach(video => {
                            const playlistItem = playlistItemsResponse.items?.find(p => p.contentDetails?.videoId === video.id);
                            if (playlistItem) {
                                adjustableVideos.push({
                                    playlistItem: playlistItem,
                                    video: video
                                });
                            }
                        });

                        setAdjustableVideos((prev) => {
                            return [...prev, ...adjustableVideos]
                        });
                    }
                }

                if (playlistItemsResponse.nextPageToken) {
                    setPageToken(playlistItemsResponse.nextPageToken);
                } else {
                    setLoaded(true);
                    setPageToken(undefined);
                }
            }
        } catch (error) {
            dispatch(pushYoutubeErrorNotification(error));
        }
    }

    const replace = async (searchResult: SearchResult, adjustableVideo: IAdjustableVideo) => {

        try {
            const insertVideoResponse = await new PlaylistItems(state.youtubeState.credential.accessToken).insert({
                part: ['snippet'],
                requestBody: {
                    snippet: {
                        position: adjustableVideo.playlistItem.snippet?.position,
                        playlistId: state.youtubeState.userProfile.favoritePlaylistId,
                        resourceId: searchResult.id
                    },
                    id: adjustableVideo.playlistItem.id
                }
            });

            if (insertVideoResponse) {

                if (adjustableVideo.playlistItem.id) {
                    await new PlaylistItems(state.youtubeState.credential.accessToken).delete({
                        id: adjustableVideo.playlistItem.id
                    });

                    setAdjustableVideos((prev) => {
                        return prev.filter((i) => i.playlistItem.id !== adjustableVideo.playlistItem.id);
                    });
                }
            }
        } catch (error) {
            console.error(error);
            dispatch(pushYoutubeErrorNotification(error));
        }
    }

    return { adjustableVideos, progress, loaded, replace };
}

export default useFetchAdjustFavorites;