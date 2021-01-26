import { AuthorizeResult, RefreshResult } from 'react-native-app-auth';
import { IYoutubeApiAuthorizeError, IYoutubeApiAuthorizeRequest, IYoutubeApiAuthorizeSuccess, IYoutubeApiRefreshError, IYoutubeApiRefreshRequest, IYoutubeApiRefreshSuccess, Types } from './youtube_credential_types';

export function youtubeApiAuthorizeRequest(): IYoutubeApiAuthorizeRequest {
    return {
        type: Types.YOUTUBE_API_AUTHORIZE_REQUEST
    }
}

export function youtubeApiAuthorizeSucess(result: AuthorizeResult): IYoutubeApiAuthorizeSuccess {
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

export function youtubeApiRefreshSucess(result: RefreshResult): IYoutubeApiRefreshSuccess {
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