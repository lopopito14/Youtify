import { ActionCreator } from 'redux';
import { PlaylistItem } from '../../youtubeApi/youtube-api-models';
import { IYoutubePlaylistsExists, IYoutubePlaylistsFavoritesItemsComplete, IYoutubePlaylistsFavoritesItemsError, IYoutubePlaylistsFavoritesItemsRequest, IYoutubePlaylistsFavoritesItemsSuccess, IYoutubePlaylistsItemsClear, IYoutubePlaylistsItemsComplete, IYoutubePlaylistsItemsError, IYoutubePlaylistsItemsRequest, IYoutubePlaylistsItemsSuccess, IYoutubePlaylistsItemsSynchronized, Types } from './youtube_playlists_types';

export const youtubePlaylistsFavoritesItemsRequest: ActionCreator<IYoutubePlaylistsFavoritesItemsRequest> = () => ({
    type: Types.YOUTUBE_PLAYLISTS_FAVORITES_ITEMS_REQUEST,
});

export const youtubePlaylistsFavoritesItemsSuccess: ActionCreator<IYoutubePlaylistsFavoritesItemsSuccess> = (result: {
    items: PlaylistItem[]
}) => ({
    type: Types.YOUTUBE_PLAYLISTS_FAVORITES_ITEMS_SUCCESS,
    payload: result
});

export const youtubePlaylistsFavoritesItemsComplete: ActionCreator<IYoutubePlaylistsFavoritesItemsComplete> = () => ({
    type: Types.YOUTUBE_PLAYLISTS_FAVORITES_ITEMS_COMPLETE,
});

export const youtubePlaylistsFavoritesItemsError: ActionCreator<IYoutubePlaylistsFavoritesItemsError> = (result: any) => ({
    type: Types.YOUTUBE_PLAYLISTS_FAVORITES_ITEMS_ERROR,
    payload: result
});

export const youtubePlaylistsExists: ActionCreator<IYoutubePlaylistsExists> = (result: {year: number,
    month: number, playlistId?: string}) => ({
    type: Types.YOUTUBE_PLAYLISTS_EXISTS,
    payload: result
});

export const youtubePlaylistsItemsRequest: ActionCreator<IYoutubePlaylistsItemsRequest> = () => ({
    type: Types.YOUTUBE_PLAYLISTS_ITEMS_REQUEST,
});

export const youtubePlaylistsItemsSuccess: ActionCreator<IYoutubePlaylistsItemsSuccess> = (result: {
    year: number,
    month: number,
    items: PlaylistItem[]
}) => ({
    type: Types.YOUTUBE_PLAYLISTS_ITEMS_SUCCESS,
    payload: result
});

export const youtubePlaylistsItemsComplete: ActionCreator<IYoutubePlaylistsItemsComplete> = () => ({
    type: Types.YOUTUBE_PLAYLISTS_ITEMS_COMPLETE,
});

export const youtubePlaylistsItemsError: ActionCreator<IYoutubePlaylistsItemsError> = (result: any) => ({
    type: Types.YOUTUBE_PLAYLISTS_ITEMS_ERROR,
    payload: result
});

export const youtubePlaylistsItemsClear: ActionCreator<IYoutubePlaylistsItemsClear> = (result: {
    year: number,
    month: number
}) => ({
    type: Types.YOUTUBE_PLAYLISTS_ITEMS_CLEAR,
    payload: result
});

export const youtubePlaylistsItemsSynchronized: ActionCreator<IYoutubePlaylistsItemsSynchronized> = (result: {
    year: number,
    month: number
}) => ({
    type: Types.YOUTUBE_PLAYLISTS_ITEMS_SYNCHRONIZED,
    payload: result
});