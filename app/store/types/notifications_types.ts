import { Action } from "redux";

export enum Types {
    PUSH_YOUTUBE_SUCCESS_NOTIFICATION = 'PUSH_YOUTUBE_SUCCESS_NOTIFICATION',
    PUSH_YOUTUBE_WARNING_NOTIFICATION = 'PUSH_YOUTUBE_WARNING_NOTIFICATION',
    PUSH_YOUTUBE_ERROR_NOTIFICATION = 'PUSH_YOUTUBE_ERROR_NOTIFICATION',
    POP_YOUTUBE_NOTIFICATION = 'POP_YOUTUBE_NOTIFICATION',
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

export interface IPopYoutubeNotification extends Action {
    type: Types.POP_YOUTUBE_NOTIFICATION;
}

export type TNotificationsActions = IPushYoutubeSuccessNotification | IPushYoutubeWarningNotification| IPushYoutubeErrorNotification | IPopYoutubeNotification;