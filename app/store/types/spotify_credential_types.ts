import { AuthorizeResult, RefreshResult } from "react-native-app-auth";
import { Action, TypedAction } from "../types";

export enum Types {
    SPOTIFY_API_AUTHORIZE_REQUEST = 'SPOTIFY_API_AUTHORIZE_REQUEST',
    SPOTIFY_API_AUTHORIZE_SUCCEESS = 'SPOTIFY_API_AUTHORIZE_SUCCEESS',
    SPOTIFY_API_AUTHORIZE_ERROR = 'SPOTIFY_API_AUTHORIZE_ERROR',
    SPOTIFY_API_REFRESH_REQUEST = 'SPOTIFY_API_REFRESH_REQUEST',
    SPOTIFY_API_REFRESH_SUCCEESS = 'SPOTIFY_API_REFRESH_SUCCEESS',
    SPOTIFY_API_REFRESH_ERROR = 'SPOTIFY_API_REFRESH_ERROR',
    SPOTIFY_API_REVOKE_REQUEST = 'SPOTIFY_API_REVOKE_REQUEST',
    SPOTIFY_API_REVOKE_SUCCESS = 'SPOTIFY_API_REVOKE_SUCCESS',
    SPOTIFY_API_REVOKE_ERROR = 'SPOTIFY_API_REVOKE_ERROR',
}

export interface ISpotifyApiAuthorizeRequest extends TypedAction<Types.SPOTIFY_API_AUTHORIZE_REQUEST> {}
export interface ISpotifyApiAuthorizeSuccess extends Action<Types.SPOTIFY_API_AUTHORIZE_SUCCEESS, AuthorizeResult> {}
export interface ISpotifyApiAuthorizeError extends Action<Types.SPOTIFY_API_AUTHORIZE_ERROR, any> {}
export interface ISpotifyApiRefreshRequest extends TypedAction<Types.SPOTIFY_API_REFRESH_REQUEST> {}
export interface ISpotifyApiRefreshSuccess extends Action<Types.SPOTIFY_API_REFRESH_SUCCEESS, RefreshResult> {}
export interface IspotifyApiRefreshError extends Action<Types.SPOTIFY_API_REFRESH_ERROR, any> {}
export interface ISpotifyApiRevokeRequest extends TypedAction<Types.SPOTIFY_API_REVOKE_REQUEST> {}
export interface ISpotifyApiRevokeSuccess extends TypedAction<Types.SPOTIFY_API_REVOKE_SUCCESS> {}
export interface ISpotifyApiRevokeError extends Action<Types.SPOTIFY_API_REVOKE_ERROR, any> {}

export type TSpotifyCredentialsActions = ISpotifyApiAuthorizeRequest | ISpotifyApiAuthorizeSuccess | ISpotifyApiAuthorizeError | ISpotifyApiRefreshRequest | ISpotifyApiRefreshSuccess | IspotifyApiRefreshError | ISpotifyApiRevokeRequest | ISpotifyApiRevokeSuccess | ISpotifyApiRevokeError;