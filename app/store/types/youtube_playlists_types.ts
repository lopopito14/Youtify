import { Action } from "redux";
import { PlaylistItem } from "../../youtubeApi/youtube-api-models";

export enum Types {
    YOUTUBE_PLAYLISTS_FAVORITES_ITEMS_REQUEST = 'YOUTUBE_PLAYLISTS_FAVORITES_ITEMS_REQUEST',
    YOUTUBE_PLAYLISTS_FAVORITES_ITEMS_SUCCESS = 'YOUTUBE_PLAYLISTS_FAVORITES_ITEMS_SUCCESS',
    YOUTUBE_PLAYLISTS_FAVORITES_ITEMS_COMPLETE = 'YOUTUBE_PLAYLISTS_FAVORITES_ITEMS_COMPLETE',
    YOUTUBE_PLAYLISTS_FAVORITES_ITEMS_ERROR = 'YOUTUBE_PLAYLISTS_FAVORITES_ITEMS_ERROR',
    YOUTUBE_PLAYLISTS_EXISTS = 'YOUTUBE_PLAYLISTS_EXISTS',
    YOUTUBE_PLAYLISTS_ITEMS_REQUEST = 'YOUTUBE_PLAYLISTS_ITEMS_REQUEST',
    YOUTUBE_PLAYLISTS_ITEMS_SUCCESS = 'YOUTUBE_PLAYLISTS_ITEMS_SUCCESS',
    YOUTUBE_PLAYLISTS_ITEMS_COMPLETE = 'YOUTUBE_PLAYLISTS_ITEMS_COMPLETE',
    YOUTUBE_PLAYLISTS_ITEMS_ERROR = 'YOUTUBE_PLAYLISTS_ITEMS_ERROR',
    YOUTUBE_PLAYLISTS_ITEMS_CLEAR = 'YOUTUBE_PLAYLISTS_ITEMS_CLEAR',
    YOUTUBE_PLAYLISTS_ITEMS_SYNCHRONIZED = 'YOUTUBE_PLAYLISTS_ITEMS_SYNCHRONIZED',
}

export interface IYoutubePlaylistsFavoritesItemsRequest extends Action {
    type: Types.YOUTUBE_PLAYLISTS_FAVORITES_ITEMS_REQUEST;
}

export interface IYoutubePlaylistsFavoritesItemsSuccess extends Action {
    type: Types.YOUTUBE_PLAYLISTS_FAVORITES_ITEMS_SUCCESS;
    payload: {
        items: PlaylistItem[]
    };
}

export interface IYoutubePlaylistsFavoritesItemsComplete extends Action {
    type: Types.YOUTUBE_PLAYLISTS_FAVORITES_ITEMS_COMPLETE;
}

export interface IYoutubePlaylistsFavoritesItemsError extends Action {
    type: Types.YOUTUBE_PLAYLISTS_FAVORITES_ITEMS_ERROR;
    payload: any;
}

export interface IYoutubePlaylistsExists extends Action {
    type: Types.YOUTUBE_PLAYLISTS_EXISTS;
    payload: {
        year: number,
        month: number,
        playlistId?: string
    }
}

export interface IYoutubePlaylistsItemsRequest extends Action {
    type: Types.YOUTUBE_PLAYLISTS_ITEMS_REQUEST;
}

export interface IYoutubePlaylistsItemsSuccess extends Action {
    type: Types.YOUTUBE_PLAYLISTS_ITEMS_SUCCESS;
    payload: {
        year: number,
        month: number,
        items: PlaylistItem[]
    };
}

export interface IYoutubePlaylistsItemsComplete extends Action {
    type: Types.YOUTUBE_PLAYLISTS_ITEMS_COMPLETE;
}

export interface IYoutubePlaylistsItemsError extends Action {
    type: Types.YOUTUBE_PLAYLISTS_ITEMS_ERROR;
    payload: any;
}

export interface IYoutubePlaylistsItemsClear extends Action {
    type: Types.YOUTUBE_PLAYLISTS_ITEMS_CLEAR;
    payload: {
        year: number,
        month: number
    };
}

export interface IYoutubePlaylistsItemsSynchronized extends Action {
    type: Types.YOUTUBE_PLAYLISTS_ITEMS_SYNCHRONIZED;
    payload: {
        year: number,
        month: number
    }
}

export type TYoutubePlaylistsActions = IYoutubePlaylistsFavoritesItemsRequest | IYoutubePlaylistsFavoritesItemsSuccess | IYoutubePlaylistsFavoritesItemsComplete | IYoutubePlaylistsFavoritesItemsError | IYoutubePlaylistsExists | IYoutubePlaylistsItemsRequest | IYoutubePlaylistsItemsSuccess | IYoutubePlaylistsItemsComplete | IYoutubePlaylistsItemsError | IYoutubePlaylistsItemsClear | IYoutubePlaylistsItemsSynchronized;