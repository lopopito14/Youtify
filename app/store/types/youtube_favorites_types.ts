import { Action } from "redux";
import {  Playlist, PlaylistItem } from "../../youtubeApi/youtube-api-models";

export enum Types {
    YOUTUBE_FAVORITES_REQUEST = 'YOUTUBE_FAVORITES_REQUEST',
    YOUTUBE_FAVORITES_SUCCESS = 'YOUTUBE_FAVORITES_SUCCESS',
    YOUTUBE_FAVORITES_ERROR = 'YOUTUBE_FAVORITES_ERROR',
    YOUTUBE_FAVORITES_ITEMS_REQUEST = 'YOUTUBE_FAVORITES_ITEMS_REQUEST',
    YOUTUBE_FAVORITES_ITEMS_SUCCESS = 'YOUTUBE_FAVORITES_ITEMS_SUCCESS',
    YOUTUBE_FAVORITES_ITEMS_COMPLETE = 'YOUTUBE_FAVORITES_ITEMS_COMPLETE',
    YOUTUBE_FAVORITES_ITEMS_ERROR = 'YOUTUBE_FAVORITES_ITEMS_ERROR',
}

export interface IYoutubeFavoritesRequest extends Action {
    type: Types.YOUTUBE_FAVORITES_REQUEST;
}

export interface IYoutubeFavoritesSuccess extends Action {
    type: Types.YOUTUBE_FAVORITES_SUCCESS;
    payload: Playlist;
}

export interface IYoutubeFavoritesError extends Action {
    type: Types.YOUTUBE_FAVORITES_ERROR;
    payload: any;
}

export interface IYoutubeFavoritesItemsRequest extends Action {
    type: Types.YOUTUBE_FAVORITES_ITEMS_REQUEST;
}

export interface IYoutubeFavoritesItemsSuccess extends Action {
    type: Types.YOUTUBE_FAVORITES_ITEMS_SUCCESS;
    payload: {
        items: PlaylistItem[],
        progress: number
    };
}

export interface IYoutubeFavoritesItemsComplete extends Action {
    type: Types.YOUTUBE_FAVORITES_ITEMS_COMPLETE;
}

export interface IYoutubeFavoritesItemsError extends Action {
    type: Types.YOUTUBE_FAVORITES_ITEMS_ERROR;
    payload: any;
}

export type TYoutubeFavoritesActions = IYoutubeFavoritesRequest | IYoutubeFavoritesSuccess | IYoutubeFavoritesError | IYoutubeFavoritesItemsRequest | IYoutubeFavoritesItemsSuccess | IYoutubeFavoritesItemsComplete | IYoutubeFavoritesItemsError;