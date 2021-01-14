import React, { useContext, useEffect, useState } from 'react'
import Context from '../../store/context';
import { IYoutubeMonthPlaylist } from '../../store/state';
import { youtubePlaylistsItemsClear, youtubePlaylistsItemsComplete, youtubePlaylistsItemsError, youtubePlaylistsItemsRequest, youtubePlaylistsItemsSuccess } from '../../store/types/youtube_playlists_actions';
import { PlaylistItems } from '../../youtubeApi/youtube-api-playlistItems';

interface IProps {
    year: number;
    playlist: IYoutubeMonthPlaylist;
}

export const MonthPlaylistBackgroundWorker: React.FunctionComponent<IProps> = (props: IProps) => {
    const { state, dispatch } = useContext(Context);
    const [playlistItemPageToken, setplaylistItemPageToken] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (props.playlist.playlistId) {
            _fetchPlaylistItems();
        } else {
            dispatch(youtubePlaylistsItemsClear({ year: props.year, month: props.playlist.month }))
        }
    }, [props.playlist.playlistId]);

    useEffect(() => {
        if (playlistItemPageToken) {
            _fetchPlaylistItems(playlistItemPageToken);
        }
    }, [playlistItemPageToken]);

    async function _fetchPlaylistItems(pageToken: string | undefined = undefined) {
        try {
            dispatch(youtubePlaylistsItemsRequest());
            var response = await new PlaylistItems(state.youtubeState.credential.accessToken).list({
                playlistId: props.playlist.playlistId,
                part: ['snippet', 'contentDetails'],
                maxResults: 50,
                pageToken: pageToken
            });
            if (response && response.items && response.pageInfo?.totalResults) {
                dispatch(youtubePlaylistsItemsSuccess({ year: props.year, month: props.playlist.month, items: response.items }));
                if (response.nextPageToken) {
                    setplaylistItemPageToken(response.nextPageToken);
                } else {
                    dispatch(youtubePlaylistsItemsComplete());
                    setplaylistItemPageToken(undefined);
                }
            }
        } catch (error) {
            dispatch(youtubePlaylistsItemsError(error));
        }
    }

    return (<></>)
}

export default MonthPlaylistBackgroundWorker
