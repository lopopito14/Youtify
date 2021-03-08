/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */
import { AuthorizeResult, RefreshResult } from "react-native-app-auth";
import { Action, TypedAction } from "../types";

export enum Types {
    YOUTUBE_API_AUTHORIZE_REQUEST = 'YOUTUBE_API_AUTHORIZE_REQUEST',
    YOUTUBE_API_AUTHORIZE_SUCCESS = 'YOUTUBE_API_AUTHORIZE_SUCCESS',
    YOUTUBE_API_AUTHORIZE_ERROR = 'YOUTUBE_API_AUTHORIZE_ERROR',
    YOUTUBE_API_REFRESH_REQUEST = 'YOUTUBE_API_REFRESH_REQUEST',
    YOUTUBE_API_REFRESH_SUCCESS = 'YOUTUBE_API_REFRESH_SUCCESS',
    YOUTUBE_API_REFRESH_ERROR = 'YOUTUBE_API_REFRESH_ERROR',
    YOUTUBE_API_REVOKE_REQUEST = 'YOUTUBE_API_REVOKE_REQUEST',
    YOUTUBE_API_REVOKE_SUCCESS = 'YOUTUBE_API_REVOKE_SUCCESS',
    YOUTUBE_API_REVOKE_ERROR = 'YOUTUBE_API_REVOKE_ERROR',
}

export type IYoutubeApiAuthorizeRequest = TypedAction<Types.YOUTUBE_API_AUTHORIZE_REQUEST>
export type IYoutubeApiAuthorizeSuccess = Action<Types.YOUTUBE_API_AUTHORIZE_SUCCESS, AuthorizeResult>
export type IYoutubeApiAuthorizeError = Action<Types.YOUTUBE_API_AUTHORIZE_ERROR, any>
export type IYoutubeApiRefreshRequest = TypedAction<Types.YOUTUBE_API_REFRESH_REQUEST>
export type IYoutubeApiRefreshSuccess = Action<Types.YOUTUBE_API_REFRESH_SUCCESS, RefreshResult>
export type IYoutubeApiRefreshError = Action<Types.YOUTUBE_API_REFRESH_ERROR, any>
export type IYoutubeApiRevokeRequest = TypedAction<Types.YOUTUBE_API_REVOKE_REQUEST>
export type IYoutubeApiRevokeSuccess = TypedAction<Types.YOUTUBE_API_REVOKE_SUCCESS>
export type IYoutubeApiRevokeError = Action<Types.YOUTUBE_API_REVOKE_ERROR, any>

export type TYoutubeCredentialsActions = IYoutubeApiAuthorizeRequest | IYoutubeApiAuthorizeSuccess | IYoutubeApiAuthorizeError | IYoutubeApiRefreshRequest | IYoutubeApiRefreshSuccess | IYoutubeApiRefreshError | IYoutubeApiRevokeRequest | IYoutubeApiRevokeSuccess | IYoutubeApiRevokeError;