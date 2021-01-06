import { AuthorizeResult, RefreshResult } from 'react-native-app-auth';
import { ActionCreator } from 'redux';
import { IYoutubeApiAuthorizeError, IYoutubeApiAuthorizeRequest, IYoutubeApiAuthorizeSuccess, IYoutubeApiRefreshError, IYoutubeApiRefreshRequest, IYoutubeApiRefreshSuccess, Types } from './youtube_credential_types';

export const youtubeApiAuthorizeRequest: ActionCreator<IYoutubeApiAuthorizeRequest> = () => ({
    type: Types.YOUTUBE_API_AUTHORIZE_REQUEST,
});

export const youtubeApiAuthorizeSucess: ActionCreator<IYoutubeApiAuthorizeSuccess> = (result: AuthorizeResult) => ({
    type: Types.YOUTUBE_API_AUTHORIZE_SUCCEESS,
    payload: result
});

export const youtubeApiAuthorizeError: ActionCreator<IYoutubeApiAuthorizeError> = (result: any) => ({
    type: Types.YOUTUBE_API_AUTHORIZE_ERROR,
    payload: result
});

export const youtubeApiRefreshRequest: ActionCreator<IYoutubeApiRefreshRequest> = () => ({
    type: Types.YOUTUBE_API_REFRESH_REQUEST,
});

export const youtubeApiRefreshSucess: ActionCreator<IYoutubeApiRefreshSuccess> = (result: RefreshResult) => ({
    type: Types.YOUTUBE_API_REFRESH_SUCCEESS,
    payload: result
});

export const youtubeApiRefreshError: ActionCreator<IYoutubeApiRefreshError> = (result: any) => ({
    type: Types.YOUTUBE_API_REFRESH_ERROR,
    payload: result
});