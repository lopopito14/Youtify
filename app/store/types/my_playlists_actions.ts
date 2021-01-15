import { ActionCreator } from 'redux';
import { Playlist, PlaylistItem } from '../../youtubeApi/youtube-api-models';
import { IBindSpotifyPlaylist, IBindSpotifyPlaylistTracksComplete as IBindSpotifyPlaylistTracksComplete, IBindSpotifyPlaylistTracksError as IBindSpotifyPlaylistTracksError, IBindSpotifyPlaylistTracksRequest as IBindSpotifyPlaylistTracksRequest, IBindSpotifyPlaylistTracksSuccess as IBindSpotifyPlaylistTracksSuccess, IBindYoutubeFavoriteItemsComplete, IBindYoutubeFavoriteItemsError, IBindYoutubeFavoriteItemsRequest, IBindYoutubeFavoriteItemsSuccess, IBindYoutubePlaylist, IBindYoutubePlaylistItemsComplete, IBindYoutubePlaylistItemsError, IBindYoutubePlaylistItemsRequest, IBindYoutubePlaylistItemsSuccess, ISynchronizeYoutubePlaylistItemsSuccess, Types } from './my_playlists_types';

export const bindYoutubeFavoriteItemsRequest: ActionCreator<IBindYoutubeFavoriteItemsRequest> = () => ({
    type: Types.BIND_YOUTUBE_FAVORITE_ITEMS_REQUEST,
});

export const bindYoutubeFavoriteItemsSuccess: ActionCreator<IBindYoutubeFavoriteItemsSuccess> = (result: {
    items: PlaylistItem[]
}) => ({
    type: Types.BIND_YOUTUBE_FAVORITE_ITEMS_SUCCESS,
    payload: result
});

export const bindYoutubeFavoriteItemsComplete: ActionCreator<IBindYoutubeFavoriteItemsComplete> = () => ({
    type: Types.BIND_YOUTUBE_FAVORITE_ITEMS_COMPLETE,
});

export const bindYoutubeFavoriteItemsError: ActionCreator<IBindYoutubeFavoriteItemsError> = (result: any) => ({
    type: Types.BIND_YOUTUBE_FAVORITE_ITEMS_ERROR,
    payload: result
});

export const bindYoutubePlaylist: ActionCreator<IBindYoutubePlaylist> = (result: {
    year: number,
    month: number,
    playlist?: Playlist
}) => ({
    type: Types.BIND_YOUTUBE_PLAYLIST,
    payload: result
});

export const bindYoutubePlaylistItemsRequest: ActionCreator<IBindYoutubePlaylistItemsRequest> = () => ({
    type: Types.BIND_YOUTUBE_PLAYLIST_ITEMS_REQUEST,
});

export const bindYoutubePlaylistItemsSuccess: ActionCreator<IBindYoutubePlaylistItemsSuccess> = (result: {
    year: number,
    month: number,
    items: PlaylistItem[]
}) => ({
    type: Types.BIND_YOUTUBE_PLAYLIST_ITEMS_SUCCESS,
    payload: result
});

export const bindYoutubePlaylistItemsComplete: ActionCreator<IBindYoutubePlaylistItemsComplete> = () => ({
    type: Types.BIND_YOUTUBE_PLAYLIST_ITEMS_COMPLETE,
});

export const bindYoutubePlaylistItemsError: ActionCreator<IBindYoutubePlaylistItemsError> = (result: any) => ({
    type: Types.BIND_YOUTUBE_PLAYLIST_ITEMS_ERROR,
    payload: result
});

export const synchronizeYoutubePlaylistItemsSuccess: ActionCreator<ISynchronizeYoutubePlaylistItemsSuccess> = (result: {
    year: number,
    month: number
}) => ({
    type: Types.SYNCHRONIZE_YOUTUBE_PLAYLIST_ITEMS_SUCCESS,
    payload: result
});

export const bindSpotifyPlaylist: ActionCreator<IBindSpotifyPlaylist> = (result: {
    year: number,
    month: number,
    playlist?: globalThis.SpotifyApi.PlaylistObjectFull
}) => ({
    type: Types.BIND_SPOTIFY_PLAYLIST,
    payload: result
});

export const bindSpotifyPlaylistItemsRequest: ActionCreator<IBindSpotifyPlaylistTracksRequest> = () => ({
    type: Types.BIND_SPOTIFY_PLAYLIST_TRACKS_REQUEST,
});

export const bindSpotifyPlaylistItemsSuccess: ActionCreator<IBindSpotifyPlaylistTracksSuccess> = (result: {
    year: number,
    month: number,
    items: globalThis.SpotifyApi.TrackObjectFull[]
}) => ({
    type: Types.BIND_SPOTIFY_PLAYLIST_TRACKS_SUCCESS,
    payload: result
});

export const bindSpotifyPlaylistItemsComplete: ActionCreator<IBindSpotifyPlaylistTracksComplete> = () => ({
    type: Types.BIND_SPOTIFY_PLAYLIST_TRACKS_COMPLETE,
});

export const bindSpotifyPlaylistItemsError: ActionCreator<IBindSpotifyPlaylistTracksError> = (result: any) => ({
    type: Types.BIND_SPOTIFY_PLAYLIST_TRACKS_ERROR,
    payload: result
});