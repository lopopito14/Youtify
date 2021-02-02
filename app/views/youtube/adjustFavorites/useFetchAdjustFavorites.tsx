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
    const [pageToken, setpageToken] = React.useState<string | undefined>(undefined);

    const favoritePlaylistId = "FL65Vblm8jhqYm8-0QPi3Z6A";

    const filteredChannelIds = [
        "UC6murUWtqOwnTL68pwjoGjQ",
        "UCv-XlFFGN30KJkG8BhvF7nA",
        "UCBOQta0mgFd7a9Ss3CYbXAA",
        "UCQxonuu3uUCnt7DdV9KZljA",
        "UCzH6Fc7Ba-S4U83P5ZR6dLA",
        "UCuSoYG4BvzRVnNfkwXICBpg",
        "UC67WZta3Qqm-P2Eu3fej1bw"
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
                playlistId: favoritePlaylistId,
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

                // todo => remove
                playlistItemsResponse.nextPageToken = undefined;

                if (playlistItemsResponse.nextPageToken) {
                    setpageToken(playlistItemsResponse.nextPageToken);
                } else {
                    setLoaded(true);
                    setpageToken(undefined);
                }
            }
        } catch (error) {
            dispatch(pushYoutubeErrorNotification(error));
        }
    }

    const replace = async (searchResult: SearchResult, adjustableVideo: IAdjustableVideo) => {

        // remove the old one
        const remove = async () => {
            try {
                if (adjustableVideo.playlistItem.id) {
                    await new PlaylistItems(state.youtubeState.credential.accessToken).delete({
                        id: adjustableVideo.playlistItem.id
                    });
                }
            } catch (error) {
                console.error(error);
                dispatch(pushYoutubeErrorNotification(error));
            }
        }

        // insert the new one
        const insert = async () => {
            try {
                await new PlaylistItems(state.youtubeState.credential.accessToken).insert({
                    part: ['snippet'],
                    requestBody: {
                        snippet: {
                            position: adjustableVideo.playlistItem.snippet?.position,
                            playlistId: favoritePlaylistId,
                            resourceId: searchResult.id
                        },
                        id: adjustableVideo.playlistItem.id
                    }
                });

            } catch (error) {
                console.error(error);
                dispatch(pushYoutubeErrorNotification(error));
            }
        }

        await Promise.all([remove(), insert()]);

        setAdjustableVideos((prev) => {
            return prev.filter((i) => i.playlistItem.id !== adjustableVideo.playlistItem.id);
        });
    }

    return { adjustableVideos, progress, loaded, replace };
}

export default useFetchAdjustFavorites
