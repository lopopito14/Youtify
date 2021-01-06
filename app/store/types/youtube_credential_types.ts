import { AuthorizeResult, RefreshResult } from "react-native-app-auth";
import { Action } from "redux";

export enum Types {
    YOUTUBE_API_AUTHORIZE_REQUEST = 'YOUTUBE_API_AUTHORIZE_REQUEST',
    YOUTUBE_API_AUTHORIZE_SUCCEESS = 'YOUTUBE_API_AUTHORIZE_SUCCEESS',
    YOUTUBE_API_AUTHORIZE_ERROR = 'YOUTUBE_API_AUTHORIZE_ERROR',
    YOUTUBE_API_REFRESH_REQUEST = 'YOUTUBE_API_REFRESH_REQUEST',
    YOUTUBE_API_REFRESH_SUCCEESS = 'YOUTUBE_API_REFRESH_SUCCEESS',
    YOUTUBE_API_REFRESH_ERROR = 'YOUTUBE_API_REFRESH_ERROR',
}

export interface IYoutubeApiAuthorizeRequest extends Action {
    type: Types.YOUTUBE_API_AUTHORIZE_REQUEST;
}

export interface IYoutubeApiAuthorizeSuccess extends Action {
    type: Types.YOUTUBE_API_AUTHORIZE_SUCCEESS;
    payload: AuthorizeResult;
}

export interface IYoutubeApiAuthorizeError extends Action {
    type: Types.YOUTUBE_API_AUTHORIZE_ERROR;
    payload: any;
}

export interface IYoutubeApiRefreshRequest extends Action {
    type: Types.YOUTUBE_API_REFRESH_REQUEST;
}

export interface IYoutubeApiRefreshSuccess extends Action {
    type: Types.YOUTUBE_API_REFRESH_SUCCEESS;
    payload: RefreshResult;
}

export interface IYoutubeApiRefreshError extends Action {
    type: Types.YOUTUBE_API_REFRESH_ERROR;
    payload: any;
}

export type TYoutubeCredentialsActions = IYoutubeApiAuthorizeRequest | IYoutubeApiAuthorizeSuccess | IYoutubeApiAuthorizeError | IYoutubeApiRefreshRequest | IYoutubeApiRefreshSuccess | IYoutubeApiRefreshError;