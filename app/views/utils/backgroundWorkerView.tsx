import React, { useContext, useEffect, useState } from 'react'
import Context from '../../store/context';
import { youtubeFavoritesError, youtubeFavoritesItemsComplete, youtubeFavoritesItemsError, youtubeFavoritesItemsRequest, youtubeFavoritesItemsSuccess, youtubeFavoritesRequest, youtubeFavoritesSucess } from '../../store/types/youtube_favorites_actions';
import { PlaylistItems } from '../../youtubeApi/youtube-api-playlistItems';
import { Playlists } from '../../youtubeApi/youtube-api-playlists';

interface IProps { }

export const BackgroundWorkerView: React.FunctionComponent<IProps> = () => {
    const { state, dispatch } = useContext(Context);
    const [favoritepageToken, setfavoritepageToken] = useState<string | undefined>(undefined);

    const favoritePlaylistName = "FL65Vblm8jhqYm8-0QPi3Z6A";

    useEffect(() => {
        if (state.youtubeState.userProfile.loaded) {
            if (!state.youtubeState.favorite.favoritePlaylist.loaded) {
                _fetchFavoritePlaylist();
            }
            if (!state.youtubeState.favorite.favoritePlaylistItems.loaded) {
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
            dispatch(youtubeFavoritesRequest());
            var response = await new Playlists(state.youtubeState.credential.accessToken).list({
                id: [favoritePlaylistName],
                part: ['snippet', 'contentDetails'],
                maxResults: 1,
            });
            if (response && response.items && response.items.length === 1) {
                dispatch(youtubeFavoritesSucess(response.items[0]));
            }
        } catch (error) {
            dispatch(youtubeFavoritesError(error));
        }
    }

    async function _fetchFavoritePlaylistItems(pageToken: string | undefined = undefined) {
        try {
            dispatch(youtubeFavoritesItemsRequest());
            var response = await new PlaylistItems(state.youtubeState.credential.accessToken).list({
                playlistId: favoritePlaylistName,
                part: ['snippet', 'contentDetails'],
                maxResults: 50,
                pageToken: pageToken
            });
            if (response && response.items && response.pageInfo?.totalResults) {
                dispatch(youtubeFavoritesItemsSuccess(
                    {
                        progress: 100 * ((state.youtubeState.favorite.favoritePlaylistItems.playlistItems.length + response.items.length) / response.pageInfo?.totalResults),
                        items: response.items
                    }));
                if (response.nextPageToken) {
                    setfavoritepageToken(response.nextPageToken);
                } else {
                    dispatch(youtubeFavoritesItemsComplete());
                    setfavoritepageToken(undefined);
                }
            }
        } catch (error) {
            dispatch(youtubeFavoritesItemsError(error));
        }
    }

    return (<></>)
}

export default BackgroundWorkerView
