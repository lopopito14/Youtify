import React from 'react';
import Context from '../../../store/context';
import { Playlist, Video } from '../../../youtubeApi/youtube-api-models';
import { PlaylistItems } from '../../../youtubeApi/youtube-api-playlistItems';
import { pushYoutubeErrorNotification } from '../../../store/types/notifications_actions';
import { Videos } from '../../../youtubeApi/youtube-api-videos';

const useFetchPlaylist = (playlist: Playlist) => {
    const { state, dispatch } = React.useContext(Context);

    const [loaded, setLoaded] = React.useState(false);
    const [youtubeVideos, setYoutubeVideos] = React.useState<Video[]>([]);
    const [pageToken, setpageToken] = React.useState<string | undefined>(undefined);

    React.useEffect(() => {
        fetchPlaylistVideos();
    }, [playlist]);

    React.useEffect(() => {
        if (pageToken) {
            fetchPlaylistVideos(pageToken);
        }
    }, [pageToken]);

    const fetchPlaylistVideos = async (pageToken: string | undefined = undefined) => {
        try {
            var playlistItemsResponse = await new PlaylistItems(state.youtubeState.credential.accessToken).list({
                playlistId: playlist.id ? playlist.id : '',
                part: ['contentDetails'],
                maxResults: 50,
                pageToken: pageToken
            });
            if (playlistItemsResponse) {

                if (playlistItemsResponse.items) {
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
                        const items = videosResponse.items;
                        setYoutubeVideos((prev) => {
                            return [...prev, ...items]
                        });
                    }
                }

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

    return { youtubeVideos, loaded };
}

export default useFetchPlaylist
