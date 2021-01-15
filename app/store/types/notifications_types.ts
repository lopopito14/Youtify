import { Action } from "redux";

export enum Types {
    PUSH_YOUTUBE_SUCCESS_NOTIFICATION = 'PUSH_YOUTUBE_SUCCESS_NOTIFICATION',
    PUSH_YOUTUBE_WARNING_NOTIFICATION = 'PUSH_YOUTUBE_WARNING_NOTIFICATION',
    PUSH_YOUTUBE_ERROR_NOTIFICATION = 'PUSH_YOUTUBE_ERROR_NOTIFICATION',
    PUSH_SPOTIFY_SUCCESS_NOTIFICATION = 'PUSH_SPOTIFY_SUCCESS_NOTIFICATION',
    PUSH_SPOTIFY_WARNING_NOTIFICATION = 'PUSH_SPOTIFY_WARNING_NOTIFICATION',
    PUSH_SPOTIFY_ERROR_NOTIFICATION = 'PUSH_SPOTIFY_ERROR_NOTIFICATION',
    POP_NOTIFICATION = 'POP_NOTIFICATION'
}

export interface IPushYoutubeSuccessNotification extends Action {
    type: Types.PUSH_YOUTUBE_SUCCESS_NOTIFICATION;
    payload: string;
}

export interface IPushYoutubeWarningNotification extends Action {
    type: Types.PUSH_YOUTUBE_WARNING_NOTIFICATION;
    payload: string;
}

export interface IPushYoutubeErrorNotification extends Action {
    type: Types.PUSH_YOUTUBE_ERROR_NOTIFICATION;
    payload: any;
}

export interface IPushSpotifySuccessNotification extends Action {
    type: Types.PUSH_SPOTIFY_SUCCESS_NOTIFICATION;
    payload: string;
}

export interface IPushSpotifyWarningNotification extends Action {
    type: Types.PUSH_SPOTIFY_WARNING_NOTIFICATION;
    payload: string;
}

export interface IPushSpotifyErrorNotification extends Action {
    type: Types.PUSH_SPOTIFY_ERROR_NOTIFICATION;
    payload: any;
}

export interface IPopNotification extends Action {
    type: Types.POP_NOTIFICATION;
}


export type TNotificationsActions = IPushYoutubeSuccessNotification | IPushYoutubeWarningNotification| IPushYoutubeErrorNotification | IPushSpotifySuccessNotification | IPushSpotifyWarningNotification | IPushSpotifyErrorNotification | IPopNotification;