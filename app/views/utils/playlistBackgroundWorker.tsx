import React, { useContext, useEffect, useState } from 'react'
import Context from '../../store/context';
import { IYoutubeMonthPlaylist } from '../../store/state';
import { bindYoutubePlaylist, bindYoutubePlaylistItemsComplete, bindYoutubePlaylistItemsError, bindYoutubePlaylistItemsRequest, bindYoutubePlaylistItemsSuccess } from '../../store/types/youtube_playlists_actions';
import { Playlist } from '../../youtubeApi/youtube-api-models';
import { PlaylistItems } from '../../youtubeApi/youtube-api-playlistItems';

interface IProps {
    playlists?: Playlist[];
    playlist: IYoutubeMonthPlaylist;
}

export const PlaylistBackgroundWorker: React.FunctionComponent<IProps> = (props: IProps) => {
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
            _fetchPlaylistItems();
        }
    }, [props.playlist.youtube?.playlist.id]);

    useEffect(() => {
        if (playlistItemPageToken) {
            _fetchPlaylistItems(playlistItemPageToken);
        }
    }, [playlistItemPageToken]);

    async function _fetchPlaylistItems(pageToken: string | undefined = undefined) {
        if (props.playlist.youtube?.playlist.id) {
            try {
                dispatch(bindYoutubePlaylistItemsRequest());
                var response = await new PlaylistItems(state.youtubeState.credential.accessToken).list({
                    playlistId: props.playlist.youtube.playlist?.id,
                    part: ['snippet', 'contentDetails'],
                    maxResults: 50,
                    pageToken: pageToken
                });
                if (response && response.items && response.pageInfo?.totalResults) {
                    dispatch(bindYoutubePlaylistItemsSuccess({ year: props.playlist.year, month: props.playlist.month, items: response.items }));
                    if (response.nextPageToken) {
                        setplaylistItemPageToken(response.nextPageToken);
                    } else {
                        dispatch(bindYoutubePlaylistItemsComplete());
                        setplaylistItemPageToken(undefined);
                    }
                }
            } catch (error) {
                dispatch(bindYoutubePlaylistItemsError(error));
            }
        }
    }

    return (<></>)
}

export default PlaylistBackgroundWorker
