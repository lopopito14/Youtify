import React, { useContext, useEffect, useState } from 'react'
import Context from '../../store/context';
import { IYoutubeMonthPlaylist } from '../../store/state';
import { pushYoutubeErrorNotification } from '../../store/types/notifications_actions';
import { bindYoutubePlaylist, bindYoutubePlaylistVideosComplete, bindYoutubePlaylistVideosError, bindYoutubePlaylistItemsRequest, bindYoutubePlaylistVideosSuccess } from '../../store/types/my_playlists_actions';
import { Playlist } from '../../youtubeApi/youtube-api-models';
import { PlaylistItems } from '../../youtubeApi/youtube-api-playlistItems';
import { Videos } from '../../youtubeApi/youtube-api-videos';

interface IProps {
    playlists?: Playlist[];
    playlist: IYoutubeMonthPlaylist;
}

export const YoutubePlaylistBackgroundWorker: React.FunctionComponent<IProps> = (props: IProps) => {
    const { state, dispatch } = useContext(Context);
    const [playlistItemPageToken, setplaylistItemPageToken] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (props.playlists) {

            const playlist = props.playlists.find(p => p.snippet?.title === props.playlist.title);
            if (playlist) {
                dispatch(bindYoutubePlaylist(
                    {
                        year: props.playlist.year,
                        month: props.playlist.month,
                        playlist: playlist
                    }
                ));
            } else {
                dispatch(bindYoutubePlaylist(
                    {
                        year: props.playlist.year,
                        month: props.playlist.month,
                        playlist: undefined
                    }
                ));
            }
        }
    }, [props.playlists]);

    useEffect(() => {
        if (props.playlist.youtube?.playlist.id) {
            _fetchPlaylistVideos();
        }
    }, [props.playlist.youtube?.playlist.id]);

    useEffect(() => {
        if (playlistItemPageToken) {
            _fetchPlaylistVideos(playlistItemPageToken);
        }
    }, [playlistItemPageToken]);

    async function _fetchPlaylistVideos(pageToken: string | undefined = undefined) {
        if (props.playlist.youtube?.playlist.id) {
            try {
                dispatch(bindYoutubePlaylistItemsRequest());

                var response = await new PlaylistItems(state.youtubeState.credential.accessToken).list({
                    playlistId: props.playlist.youtube.playlist?.id,
                    part: ['contentDetails'],
                    maxResults: 50,
                    pageToken: pageToken
                });

                if (response && response.items && response.pageInfo?.totalResults) {

                    let videosIds: string[] = [];

                    response.items.forEach(i => {
                        if (i.contentDetails?.videoId) {
                            videosIds.push(i.contentDetails?.videoId);
                        }
                    });

                    var anotherResponse = await new Videos(state.youtubeState.credential.accessToken).list({
                        id: videosIds,
                        part: ['snippet', 'contentDetails', 'statistics'],
                        maxResults: 50,
                    });

                    if (anotherResponse) {
                        dispatch(bindYoutubePlaylistVideosSuccess({ year: props.playlist.year, month: props.playlist.month, videos: anotherResponse.items }));
                    }

                    if (response.nextPageToken) {
                        setplaylistItemPageToken(response.nextPageToken);
                    } else {
                        dispatch(bindYoutubePlaylistVideosComplete());
                        setplaylistItemPageToken(undefined);
                    }
                }
            } catch (error) {
                dispatch(bindYoutubePlaylistVideosError(error));
                dispatch(pushYoutubeErrorNotification(error));
            }
        }
    }

    return (<></>)
}

export default YoutubePlaylistBackgroundWorker
