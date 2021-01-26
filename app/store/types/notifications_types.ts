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

export interface IPushYoutubeSuccessNotification extends Action<Types.PUSH_YOUTUBE_SUCCESS_NOTIFICATION, string> {}
export interface IPushYoutubeWarningNotification extends Action<Types.PUSH_YOUTUBE_WARNING_NOTIFICATION, string> {}
export interface IPushYoutubeErrorNotification extends Action<Types.PUSH_YOUTUBE_ERROR_NOTIFICATION, any> {}
export interface IPushSpotifySuccessNotification extends Action<Types.PUSH_SPOTIFY_SUCCESS_NOTIFICATION, string> {}
export interface IPushSpotifyWarningNotification extends Action<Types.PUSH_SPOTIFY_WARNING_NOTIFICATION, string> {}
export interface IPushSpotifyErrorNotification extends Action<Types.PUSH_SPOTIFY_ERROR_NOTIFICATION, any> {}
export interface IPopNotification extends TypedAction<Types.POP_NOTIFICATION> {}


export type TNotificationsActions = IPushYoutubeSuccessNotification | IPushYoutubeWarningNotification| IPushYoutubeErrorNotification | IPushSpotifySuccessNotification | IPushSpotifyWarningNotification | IPushSpotifyErrorNotification | IPopNotification;