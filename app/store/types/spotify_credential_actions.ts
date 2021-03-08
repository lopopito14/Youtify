/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */
import { AuthorizeResult, RefreshResult } from 'react-native-app-auth';
import { ISpotifyApiAuthorizeError, ISpotifyApiAuthorizeRequest, ISpotifyApiAuthorizeSuccess, IspotifyApiRefreshError, ISpotifyApiRefreshRequest, ISpotifyApiRefreshSuccess, ISpotifyApiRevokeError, ISpotifyApiRevokeRequest, ISpotifyApiRevokeSuccess, Types } from './spotify_credential_types';

export function spotifyApiAuthorizeRequest(): ISpotifyApiAuthorizeRequest {
    return {
        type: Types.SPOTIFY_API_AUTHORIZE_REQUEST
    }
}

export function spotifyApiAuthorizeSucess(result: AuthorizeResult): ISpotifyApiAuthorizeSuccess {
    return {
        type: Types.SPOTIFY_API_AUTHORIZE_SUCCEESS,
        payload: result
    }
}

export function spotifyApiAuthorizeError(result: any): ISpotifyApiAuthorizeError {
    return {
        type: Types.SPOTIFY_API_AUTHORIZE_ERROR,
        payload: result
    }
}

export function spotifyApiRefreshRequest(): ISpotifyApiRefreshRequest {
    return {
        type: Types.SPOTIFY_API_REFRESH_REQUEST
    }
}

export function spotifyApiRefreshSucess(result: RefreshResult): ISpotifyApiRefreshSuccess {
    return {
        type: Types.SPOTIFY_API_REFRESH_SUCCEESS,
        payload: result
    }
}

export function spotifyApiRefreshError(result: any): IspotifyApiRefreshError {
    return {
        type: Types.SPOTIFY_API_REFRESH_ERROR,
        payload: result
    }
}

export function spotifyApiRevokeRequest(): ISpotifyApiRevokeRequest {
    return {
        type: Types.SPOTIFY_API_REVOKE_REQUEST
    }
}

export function spotifyApiRevokeSuccess(): ISpotifyApiRevokeSuccess {
    return {
        type: Types.SPOTIFY_API_REVOKE_SUCCESS,
    }
}

export function spotifyApiRevokeError(result: any): ISpotifyApiRevokeError {
    return {
        type: Types.SPOTIFY_API_REVOKE_ERROR,
        payload: result
    }
}