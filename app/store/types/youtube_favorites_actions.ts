import { ActionCreator } from 'redux';
import { Playlist, PlaylistItem } from '../../youtubeApi/youtube-api-models';
import { IYoutubeFavoritesError, IYoutubeFavoritesItemsComplete, IYoutubeFavoritesItemsError, IYoutubeFavoritesItemsRequest, IYoutubeFavoritesItemsSuccess, IYoutubeFavoritesRequest, IYoutubeFavoritesSuccess, Types } from './youtube_favorites_types';

export const youtubeFavoritesRequest: ActionCreator<IYoutubeFavoritesRequest> = () => ({
    type: Types.YOUTUBE_FAVORITES_REQUEST,
});

export const youtubeFavoritesSucess: ActionCreator<IYoutubeFavoritesSuccess> = (result: Playlist) => ({
    type: Types.YOUTUBE_FAVORITES_SUCCESS,
    payload: result
});

export const youtubeFavoritesError: ActionCreator<IYoutubeFavoritesError> = (result: any) => ({
    type: Types.YOUTUBE_FAVORITES_ERROR,
    payload: result
});

export const youtubeFavoritesItemsRequest: ActionCreator<IYoutubeFavoritesItemsRequest> = () => ({
    type: Types.YOUTUBE_FAVORITES_ITEMS_REQUEST,
});

export const youtubeFavoritesItemsSuccess: ActionCreator<IYoutubeFavoritesItemsSuccess> = (result: {items: PlaylistItem[], progress: number}) => ({
    type: Types.YOUTUBE_FAVORITES_ITEMS_SUCCESS,
    payload: result
});

export const youtubeFavoritesItemsComplete: ActionCreator<IYoutubeFavoritesItemsComplete> = () => ({
    type: Types.YOUTUBE_FAVORITES_ITEMS_COMPLETE
});

export const youtubeFavoritesItemsError: ActionCreator<IYoutubeFavoritesItemsError> = (result: any) => ({
    type: Types.YOUTUBE_FAVORITES_ITEMS_ERROR,
    payload: result
});