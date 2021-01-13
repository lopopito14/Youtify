import { ActionCreator } from 'redux';
import { PlaylistItem } from '../../youtubeApi/youtube-api-models';
import { IYoutubePlaylistsExists, IYoutubePlaylistsFavoritesItemsComplete, IYoutubePlaylistsFavoritesItemsError, IYoutubePlaylistsFavoritesItemsRequest, IYoutubePlaylistsFavoritesItemsSuccess, IYoutubePlaylistsItemsComplete, IYoutubePlaylistsItemsError, IYoutubePlaylistsItemsRequest, IYoutubePlaylistsItemsSuccess, Types } from './youtube_playlists_types';

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
    month: number, exists: boolean}) => ({
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