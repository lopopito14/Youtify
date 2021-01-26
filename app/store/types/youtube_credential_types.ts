import { AuthorizeResult, RefreshResult } from "react-native-app-auth";
import { Action, TypedAction } from "../types";

export enum Types {
    YOUTUBE_API_AUTHORIZE_REQUEST = 'YOUTUBE_API_AUTHORIZE_REQUEST',
    YOUTUBE_API_AUTHORIZE_SUCCESS = 'YOUTUBE_API_AUTHORIZE_SUCCESS',
    YOUTUBE_API_AUTHORIZE_ERROR = 'YOUTUBE_API_AUTHORIZE_ERROR',
    YOUTUBE_API_REFRESH_REQUEST = 'YOUTUBE_API_REFRESH_REQUEST',
    YOUTUBE_API_REFRESH_SUCCESS = 'YOUTUBE_API_REFRESH_SUCCESS',
    YOUTUBE_API_REFRESH_ERROR = 'YOUTUBE_API_REFRESH_ERROR',
}

export interface IYoutubeApiAuthorizeRequest extends TypedAction<Types.YOUTUBE_API_AUTHORIZE_REQUEST> {}
export interface IYoutubeApiAuthorizeSuccess extends Action<Types.YOUTUBE_API_AUTHORIZE_SUCCESS, AuthorizeResult>  {}
export interface IYoutubeApiAuthorizeError extends Action<Types.YOUTUBE_API_AUTHORIZE_ERROR, any> {}
export interface IYoutubeApiRefreshRequest extends TypedAction<Types.YOUTUBE_API_REFRESH_REQUEST> {}
export interface IYoutubeApiRefreshSuccess extends Action<Types.YOUTUBE_API_REFRESH_SUCCESS, RefreshResult> {}
export interface IYoutubeApiRefreshError extends Action<Types.YOUTUBE_API_REFRESH_ERROR, any> {}

export type TYoutubeCredentialsActions = IYoutubeApiAuthorizeRequest | IYoutubeApiAuthorizeSuccess | IYoutubeApiAuthorizeError | IYoutubeApiRefreshRequest | IYoutubeApiRefreshSuccess | IYoutubeApiRefreshError;