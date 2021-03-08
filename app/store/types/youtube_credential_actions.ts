/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */
import { AuthorizeResult, RefreshResult } from 'react-native-app-auth';
import { IYoutubeApiAuthorizeError, IYoutubeApiAuthorizeRequest, IYoutubeApiAuthorizeSuccess, IYoutubeApiRefreshError, IYoutubeApiRefreshRequest, IYoutubeApiRefreshSuccess, IYoutubeApiRevokeError, IYoutubeApiRevokeRequest, IYoutubeApiRevokeSuccess, Types } from './youtube_credential_types';

export function youtubeApiAuthorizeRequest(): IYoutubeApiAuthorizeRequest {
    return {
        type: Types.YOUTUBE_API_AUTHORIZE_REQUEST
    }
}

export function youtubeApiAuthorizeSuccess(result: AuthorizeResult): IYoutubeApiAuthorizeSuccess {
    return {
        type: Types.YOUTUBE_API_AUTHORIZE_SUCCESS,
        payload: result
    }
}

export function youtubeApiAuthorizeError(result: any): IYoutubeApiAuthorizeError {
    return {
        type: Types.YOUTUBE_API_AUTHORIZE_ERROR,
        payload: result
    }
}

export function youtubeApiRefreshRequest(): IYoutubeApiRefreshRequest {
    return {
        type: Types.YOUTUBE_API_REFRESH_REQUEST
    }
}

export function youtubeApiRefreshSuccess(result: RefreshResult): IYoutubeApiRefreshSuccess {
    return {
        type: Types.YOUTUBE_API_REFRESH_SUCCESS,
        payload: result
    }
}

export function youtubeApiRefreshError(result: any): IYoutubeApiRefreshError {
    return {
        type: Types.YOUTUBE_API_REFRESH_ERROR,
        payload: result
    }
}

export function youtubeApiRevokeRequest(): IYoutubeApiRevokeRequest {
    return {
        type: Types.YOUTUBE_API_REVOKE_REQUEST
    }
}

export function youtubeApiRevokeSuccess(): IYoutubeApiRevokeSuccess {
    return {
        type: Types.YOUTUBE_API_REVOKE_SUCCESS,
    }
}

export function youtubeApiRevokeError(result: any): IYoutubeApiRevokeError {
    return {
        type: Types.YOUTUBE_API_REVOKE_ERROR,
        payload: result
    }
}