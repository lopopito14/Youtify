/* eslint-disable @typescript-eslint/no-explicit-any */
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

export type ISpotifyApiAuthorizeRequest = TypedAction<Types.SPOTIFY_API_AUTHORIZE_REQUEST>
export type ISpotifyApiAuthorizeSuccess = Action<Types.SPOTIFY_API_AUTHORIZE_SUCCEESS, AuthorizeResult>
export type ISpotifyApiAuthorizeError = Action<Types.SPOTIFY_API_AUTHORIZE_ERROR, any>
export type ISpotifyApiRefreshRequest = TypedAction<Types.SPOTIFY_API_REFRESH_REQUEST>
export type ISpotifyApiRefreshSuccess = Action<Types.SPOTIFY_API_REFRESH_SUCCEESS, RefreshResult>
export type IspotifyApiRefreshError = Action<Types.SPOTIFY_API_REFRESH_ERROR, any>
export type ISpotifyApiRevokeRequest = TypedAction<Types.SPOTIFY_API_REVOKE_REQUEST>
export type ISpotifyApiRevokeSuccess = TypedAction<Types.SPOTIFY_API_REVOKE_SUCCESS>
export type ISpotifyApiRevokeError = Action<Types.SPOTIFY_API_REVOKE_ERROR, any>

export type TSpotifyCredentialsActions = ISpotifyApiAuthorizeRequest | ISpotifyApiAuthorizeSuccess | ISpotifyApiAuthorizeError | ISpotifyApiRefreshRequest | ISpotifyApiRefreshSuccess | IspotifyApiRefreshError | ISpotifyApiRevokeRequest | ISpotifyApiRevokeSuccess | ISpotifyApiRevokeError;