import React from 'react';
import Context from '../../../store/context';
import { Playlist, Video } from '../../../youtubeApi/youtube-api-models';
import { PlaylistItems } from '../../../youtubeApi/youtube-api-playlistItems';
import { pushYoutubeErrorNotification } from '../../../store/types/notifications_actions';
import { Videos } from '../../../youtubeApi/youtube-api-videos';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useFetchPlaylist = (playlist: Playlist) => {

    /// ###### ///
    /// STATES ///
    /// ###### ///
    const { state, dispatch } = React.useContext(Context);
    const [loaded, setLoaded] = React.useState(false);
    const [youtubeVideos, setYoutubeVideos] = React.useState<Video[]>([]);
    const [pageToken, setPageToken] = React.useState<string | undefined>(undefined);

    /// ######### ///
    /// CALLBACKS ///
    /// ######### ///
    const fetchPlaylistVideos = React.useCallback(async (pageTokenValue: string | undefined = undefined) => {
        try {
            const playlistItemsResponse = await new PlaylistItems(state.youtubeState.credential.accessToken).list({
                playlistId: playlist.id ? playlist.id : '',
                part: ['contentDetails'],
                maxResults: 50,
                pageToken: pageTokenValue
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
                        setYoutubeVideos((prev) => [...prev, ...items]);
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
    }, [dispatch, playlist.id, state.youtubeState.credential.accessToken]);

    /// ####### ///
    /// EFFECTS ///
    /// ####### ///
    React.useEffect(() => {
        fetchPlaylistVideos();
    }, [fetchPlaylistVideos]);

    React.useEffect(() => {
        if (pageToken) {
            fetchPlaylistVideos(pageToken);
        }
    }, [fetchPlaylistVideos, pageToken]);

    return { youtubeVideos, loaded };
}

export default useFetchPlaylist;
