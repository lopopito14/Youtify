import { Action } from "redux";
import { PlaylistItem } from "../../youtubeApi/youtube-api-models";

export enum Types {
    YOUTUBE_PLAYLISTS_FAVORITES_ITEMS_REQUEST = 'YOUTUBE_PLAYLISTS_FAVORITES_ITEMS_REQUEST',
    YOUTUBE_PLAYLISTS_FAVORITES_ITEMS_SUCCESS = 'YOUTUBE_PLAYLISTS_FAVORITES_ITEMS_SUCCESS',
    YOUTUBE_PLAYLISTS_FAVORITES_ITEMS_ERROR = 'YOUTUBE_PLAYLISTS_FAVORITES_ITEMS_ERROR',
    YOUTUBE_PLAYLISTS_ITEMS_REQUEST = 'YOUTUBE_PLAYLISTS_ITEMS_REQUEST',
    YOUTUBE_PLAYLISTS_ITEMS_SUCCESS = 'YOUTUBE_PLAYLISTS_ITEMS_SUCCESS',
    YOUTUBE_PLAYLISTS_ITEMS_ERROR = 'YOUTUBE_PLAYLISTS_ITEMS_ERROR',
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

export interface IYoutubePlaylistsFavoritesItemsError extends Action {
    type: Types.YOUTUBE_PLAYLISTS_FAVORITES_ITEMS_ERROR;
    payload: any;
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

export interface IYoutubePlaylistsItemsError extends Action {
    type: Types.YOUTUBE_PLAYLISTS_ITEMS_ERROR;
    payload: any;
}

export type TYoutubePlaylistsActions = IYoutubePlaylistsFavoritesItemsRequest | IYoutubePlaylistsFavoritesItemsSuccess | IYoutubePlaylistsFavoritesItemsError | IYoutubePlaylistsItemsRequest | IYoutubePlaylistsItemsSuccess | IYoutubePlaylistsItemsError;