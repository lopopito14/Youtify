import { Action } from "redux";
import { Playlist, PlaylistItem } from "../../youtubeApi/youtube-api-models";

export enum Types {
    BIND_YOUTUBE_FAVORITE_ITEMS_REQUEST = 'YOUTUBE_PLAYLISTS_FAVORITES_ITEMS_REQUEST',
    BIND_YOUTUBE_FAVORITE_ITEMS_SUCCESS = 'YOUTUBE_PLAYLISTS_FAVORITES_ITEMS_SUCCESS',
    BIND_YOUTUBE_FAVORITE_ITEMS_COMPLETE = 'YOUTUBE_PLAYLISTS_FAVORITES_ITEMS_COMPLETE',
    BIND_YOUTUBE_FAVORITE_ITEMS_ERROR = 'YOUTUBE_PLAYLISTS_FAVORITES_ITEMS_ERROR',
    BIND_YOUTUBE_PLAYLIST = 'YOUTUBE_PLAYLISTS_EXISTS',
    BIND_YOUTUBE_PLAYLIST_ITEMS_REQUEST = 'YOUTUBE_PLAYLISTS_ITEMS_REQUEST',
    BIND_YOUTUBE_PLAYLIST_ITEMS_SUCCESS = 'YOUTUBE_PLAYLISTS_ITEMS_SUCCESS',
    BIND_YOUTUBE_PLAYLIST_ITEMS_COMPLETE = 'YOUTUBE_PLAYLISTS_ITEMS_COMPLETE',
    BIND_YOUTUBE_PLAYLIST_ITEMS_ERROR = 'YOUTUBE_PLAYLISTS_ITEMS_ERROR',
    SYNCHRONIZE_YOUTUBE_PLAYLIST_ITEMS_SUCCESS = 'YOUTUBE_PLAYLISTS_ITEMS_SYNCHRONIZED',
}

export interface IBindYoutubeFavoriteItemsRequest extends Action {
    type: Types.BIND_YOUTUBE_FAVORITE_ITEMS_REQUEST;
}

export interface IBindYoutubeFavoriteItemsSuccess extends Action {
    type: Types.BIND_YOUTUBE_FAVORITE_ITEMS_SUCCESS;
    payload: {
        items: PlaylistItem[]
    };
}

export interface IBindYoutubeFavoriteItemsComplete extends Action {
    type: Types.BIND_YOUTUBE_FAVORITE_ITEMS_COMPLETE;
}

export interface IBindYoutubeFavoriteItemsError extends Action {
    type: Types.BIND_YOUTUBE_FAVORITE_ITEMS_ERROR;
    payload: any;
}

export interface IBindYoutubePlaylist extends Action {
    type: Types.BIND_YOUTUBE_PLAYLIST;
    payload: {
        year: number,
        month: number,
        playlist?: Playlist
    }
}

export interface IBindYoutubePlaylistItemsRequest extends Action {
    type: Types.BIND_YOUTUBE_PLAYLIST_ITEMS_REQUEST;
}

export interface IBindYoutubePlaylistItemsSuccess extends Action {
    type: Types.BIND_YOUTUBE_PLAYLIST_ITEMS_SUCCESS;
    payload: {
        year: number,
        month: number,
        items: PlaylistItem[]
    };
}

export interface IBindYoutubePlaylistItemsComplete extends Action {
    type: Types.BIND_YOUTUBE_PLAYLIST_ITEMS_COMPLETE;
}

export interface IBindYoutubePlaylistItemsError extends Action {
    type: Types.BIND_YOUTUBE_PLAYLIST_ITEMS_ERROR;
    payload: any;
}

export interface ISynchronizeYoutubePlaylistItemsSuccess extends Action {
    type: Types.SYNCHRONIZE_YOUTUBE_PLAYLIST_ITEMS_SUCCESS;
    payload: {
        year: number,
        month: number
    }
}

export type TYoutubePlaylistsActions = IBindYoutubeFavoriteItemsRequest | IBindYoutubeFavoriteItemsSuccess | IBindYoutubeFavoriteItemsComplete | IBindYoutubeFavoriteItemsError | IBindYoutubePlaylist | IBindYoutubePlaylistItemsRequest | IBindYoutubePlaylistItemsSuccess | IBindYoutubePlaylistItemsComplete | IBindYoutubePlaylistItemsError | ISynchronizeYoutubePlaylistItemsSuccess;