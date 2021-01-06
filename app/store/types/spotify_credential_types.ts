import { AuthorizeResult, RefreshResult } from "react-native-app-auth";
import { Action } from "redux";

export enum Types {
    SPOTIFY_API_AUTHORIZE_REQUEST = 'SPOTIFY_API_AUTHORIZE_REQUEST',
    SPOTIFY_API_AUTHORIZE_SUCCEESS = 'SPOTIFY_API_AUTHORIZE_SUCCEESS',
    SPOTIFY_API_AUTHORIZE_ERROR = 'SPOTIFY_API_AUTHORIZE_ERROR',
    SPOTIFY_API_REFRESH_REQUEST = 'SPOTIFY_API_REFRESH_REQUEST',
    SPOTIFY_API_REFRESH_SUCCEESS = 'SPOTIFY_API_REFRESH_SUCCEESS',
    SPOTIFY_API_REFRESH_ERROR = 'SPOTIFY_API_REFRESH_ERROR',
}

export interface ISpotifyApiAuthorizeRequest extends Action {
    type: Types.SPOTIFY_API_AUTHORIZE_REQUEST;
}

export interface ISpotifyApiAuthorizeSuccess extends Action {
    type: Types.SPOTIFY_API_AUTHORIZE_SUCCEESS;
    payload: AuthorizeResult;
}

export interface ISpotifyApiAuthorizeError extends Action {
    type: Types.SPOTIFY_API_AUTHORIZE_ERROR;
    payload: any;
}

export interface ISpotifyApiRefreshRequest extends Action {
    type: Types.SPOTIFY_API_REFRESH_REQUEST;
}

export interface ISpotifyApiRefreshSuccess extends Action {
    type: Types.SPOTIFY_API_REFRESH_SUCCEESS;
    payload: RefreshResult;
}

export interface IspotifyApiRefreshError extends Action {
    type: Types.SPOTIFY_API_REFRESH_ERROR;
    payload: any;
}

export type TSpotifyCredentialsActions = ISpotifyApiAuthorizeRequest | ISpotifyApiAuthorizeSuccess | ISpotifyApiAuthorizeError | ISpotifyApiRefreshRequest | ISpotifyApiRefreshSuccess | IspotifyApiRefreshError;