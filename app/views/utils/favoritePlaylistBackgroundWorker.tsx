import React, { useContext, useEffect, useState } from 'react'
import Context from '../../store/context';
import { youtubePlaylistsFavoritesItemsComplete, youtubePlaylistsFavoritesItemsError, youtubePlaylistsFavoritesItemsRequest, youtubePlaylistsFavoritesItemsSuccess } from '../../store/types/youtube_playlists_actions';
import { Playlist, PlaylistItem } from '../../youtubeApi/youtube-api-models';
import { PlaylistItems } from '../../youtubeApi/youtube-api-playlistItems';
import { Playlists } from '../../youtubeApi/youtube-api-playlists';

interface IProps { }

export const FavoritePlaylistBackgroundWorker: React.FunctionComponent<IProps> = () => {
    const { state, dispatch } = useContext(Context);
    const [favoritePlaylist, setfavoritePlaylist] = useState<Playlist | undefined>(undefined);
    const [favoritePlaylistItems, setfavoritePlaylistItems] = useState<PlaylistItem[] | undefined>(undefined);
    const [favoritepageToken, setfavoritepageToken] = useState<string | undefined>(undefined);

    const favoritePlaylistName = "FL65Vblm8jhqYm8-0QPi3Z6A";

    useEffect(() => {
        if (state.youtubeState.userProfile.loaded) {
            if (!favoritePlaylist) {
                _fetchFavoritePlaylist();
            }
            if (!favoritePlaylistItems) {
                _fetchFavoritePlaylistItems();
            }
        }
    }, [state.youtubeState.userProfile.loaded]);

    useEffect(() => {
        if (favoritepageToken) {
            _fetchFavoritePlaylistItems(favoritepageToken);
        }
    }, [favoritepageToken]);

    async function _fetchFavoritePlaylist() {
        try {
            var response = await new Playlists(state.youtubeState.credential.accessToken).list({
                id: [favoritePlaylistName],
                part: ['snippet', 'contentDetails'],
                maxResults: 1,
            });
            if (response && response.items && response.items.length === 1) {
                setfavoritePlaylist(response.items[0]);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function _fetchFavoritePlaylistItems(pageToken: string | undefined = undefined) {
        try {
            dispatch(youtubePlaylistsFavoritesItemsRequest());
            var response = await new PlaylistItems(state.youtubeState.credential.accessToken).list({
                playlistId: favoritePlaylistName,
                part: ['snippet', 'contentDetails'],
                maxResults: 50,
                pageToken: pageToken
            });
            if (response && response.items && response.pageInfo?.totalResults) {
                dispatch(youtubePlaylistsFavoritesItemsSuccess({ items: response.items }));
                if (response.nextPageToken) {
                    setfavoritepageToken(response.nextPageToken);
                } else {
                    dispatch(youtubePlaylistsFavoritesItemsComplete());
                    setfavoritepageToken(undefined);
                }
            }
        } catch (error) {
            dispatch(youtubePlaylistsFavoritesItemsError(error));
        }
    }

    return (<></>)
}

export default FavoritePlaylistBackgroundWorker
