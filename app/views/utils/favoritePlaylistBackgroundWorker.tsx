import React, { useContext, useEffect, useState } from 'react'
import Context from '../../store/context';
import { pushYoutubeErrorNotification, pushYoutubeSuccessNotification } from '../../store/types/notifications_actions';
import { bindYoutubeFavoriteItemsComplete, bindYoutubeFavoriteItemsError, bindYoutubeFavoriteItemsRequest, bindYoutubeFavoriteItemsSuccess } from '../../store/types/my_playlists_actions';
import { PlaylistItem } from '../../youtubeApi/youtube-api-models';
import { PlaylistItems } from '../../youtubeApi/youtube-api-playlistItems';

interface IProps { }

export const FavoritePlaylistBackgroundWorker: React.FunctionComponent<IProps> = () => {
    const { state, dispatch } = useContext(Context);
    const [favoritePlaylistItems] = useState<PlaylistItem[] | undefined>(undefined);
    const [favoritepageToken, setfavoritepageToken] = useState<string | undefined>(undefined);

    const favoritePlaylistName = "FL65Vblm8jhqYm8-0QPi3Z6A";

    useEffect(() => {
        if (state.youtubeState.userProfile.loaded) {
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

    async function _fetchFavoritePlaylistItems(pageToken: string | undefined = undefined) {
        try {
            dispatch(bindYoutubeFavoriteItemsRequest());
            var response = await new PlaylistItems(state.youtubeState.credential.accessToken).list({
                playlistId: favoritePlaylistName,
                part: ['snippet', 'contentDetails'],
                maxResults: 50,
                pageToken: pageToken
            });
            if (response && response.items && response.pageInfo?.totalResults) {
                dispatch(bindYoutubeFavoriteItemsSuccess({ items: response.items }));

                const lastItem = response.items[response.items.length - 1];

                // todo => removed in production mode
                if (lastItem.snippet?.publishedAt) {
                    const date = new Date(lastItem.snippet?.publishedAt);
                    const currentYear = date.getFullYear();

                    const limitYear = 2020;

                    if (currentYear < limitYear) {
                        response.nextPageToken = undefined;
                    }
                }

                if (response.nextPageToken) {
                    setfavoritepageToken(response.nextPageToken);
                } else {
                    dispatch(bindYoutubeFavoriteItemsComplete());
                    dispatch(pushYoutubeSuccessNotification("Favorite items dispatched !"));
                    setfavoritepageToken(undefined);
                }
            }
        } catch (error) {
            dispatch(bindYoutubeFavoriteItemsError(error));
            dispatch(pushYoutubeErrorNotification(error));
        }
    }

    return (<></>)
}

export default FavoritePlaylistBackgroundWorker
