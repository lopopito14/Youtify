/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, TypedAction } from "../types";

export enum Types {
    PUSH_YOUTUBE_SUCCESS_NOTIFICATION = 'PUSH_YOUTUBE_SUCCESS_NOTIFICATION',
    PUSH_YOUTUBE_WARNING_NOTIFICATION = 'PUSH_YOUTUBE_WARNING_NOTIFICATION',
    PUSH_YOUTUBE_ERROR_NOTIFICATION = 'PUSH_YOUTUBE_ERROR_NOTIFICATION',
    PUSH_SPOTIFY_SUCCESS_NOTIFICATION = 'PUSH_SPOTIFY_SUCCESS_NOTIFICATION',
    PUSH_SPOTIFY_WARNING_NOTIFICATION = 'PUSH_SPOTIFY_WARNING_NOTIFICATION',
    PUSH_SPOTIFY_ERROR_NOTIFICATION = 'PUSH_SPOTIFY_ERROR_NOTIFICATION',
    POP_NOTIFICATION = 'POP_NOTIFICATION'
}

export type IPushYoutubeSuccessNotification = Action<Types.PUSH_YOUTUBE_SUCCESS_NOTIFICATION, string>
export type IPushYoutubeWarningNotification = Action<Types.PUSH_YOUTUBE_WARNING_NOTIFICATION, string>
export type IPushYoutubeErrorNotification = Action<Types.PUSH_YOUTUBE_ERROR_NOTIFICATION, any>
export type IPushSpotifySuccessNotification = Action<Types.PUSH_SPOTIFY_SUCCESS_NOTIFICATION, string>
export type IPushSpotifyWarningNotification = Action<Types.PUSH_SPOTIFY_WARNING_NOTIFICATION, string>
export type IPushSpotifyErrorNotification = Action<Types.PUSH_SPOTIFY_ERROR_NOTIFICATION, any>
export type IPopNotification = TypedAction<Types.POP_NOTIFICATION>


export type TNotificationsActions = IPushYoutubeSuccessNotification | IPushYoutubeWarningNotification| IPushYoutubeErrorNotification | IPushSpotifySuccessNotification | IPushSpotifyWarningNotification | IPushSpotifyErrorNotification | IPopNotification;