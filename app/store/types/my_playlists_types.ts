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
    BIND_SPOTIFY_PLAYLIST = 'BIND_SPOTIFY_PLAYLIST',
    BIND_SPOTIFY_PLAYLIST_TRACKS_REQUEST = 'BIND_SPOTIFY_PLAYLIST_TRACKS_REQUEST',
    BIND_SPOTIFY_PLAYLIST_TRACKS_SUCCESS = 'BIND_SPOTIFY_PLAYLIST_TRACKS_SUCCESS',
    BIND_SPOTIFY_PLAYLIST_TRACKS_COMPLETE = 'BIND_SPOTIFY_PLAYLIST_TRACKS_COMPLETE',
    BIND_SPOTIFY_PLAYLIST_TRACKS_ERROR = 'BIND_SPOTIFY_PLAYLIST_TRACKS_ERROR',
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

export interface IBindSpotifyPlaylist extends Action {
    type: Types.BIND_SPOTIFY_PLAYLIST;
    payload: {
        year: number,
        month: number,
        playlist?: globalThis.SpotifyApi.PlaylistObjectFull
    }
}

export interface IBindSpotifyPlaylistTracksRequest extends Action {
    type: Types.BIND_SPOTIFY_PLAYLIST_TRACKS_REQUEST;
}

export interface IBindSpotifyPlaylistTracksSuccess extends Action {
    type: Types.BIND_SPOTIFY_PLAYLIST_TRACKS_SUCCESS;
    payload: {
        year: number,
        month: number,
        items: globalThis.SpotifyApi.TrackObjectFull[]
    };
}

export interface IBindSpotifyPlaylistTracksComplete extends Action {
    type: Types.BIND_SPOTIFY_PLAYLIST_TRACKS_COMPLETE;
}

export interface IBindSpotifyPlaylistTracksError extends Action {
    type: Types.BIND_SPOTIFY_PLAYLIST_TRACKS_ERROR;
    payload: any;
}

export type TMyPlaylistsActions = IBindYoutubeFavoriteItemsRequest | IBindYoutubeFavoriteItemsSuccess | IBindYoutubeFavoriteItemsComplete | IBindYoutubeFavoriteItemsError | IBindYoutubePlaylist | IBindYoutubePlaylistItemsRequest | IBindYoutubePlaylistItemsSuccess | IBindYoutubePlaylistItemsComplete | IBindYoutubePlaylistItemsError | ISynchronizeYoutubePlaylistItemsSuccess | IBindSpotifyPlaylist | IBindSpotifyPlaylistTracksRequest | IBindSpotifyPlaylistTracksSuccess | IBindSpotifyPlaylistTracksComplete | IBindSpotifyPlaylistTracksError;