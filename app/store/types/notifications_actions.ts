import { ActionCreator } from 'redux';
import { IPopNotification, IPushSpotifyErrorNotification, IPushSpotifySuccessNotification, IPushSpotifyWarningNotification, IPushYoutubeErrorNotification, IPushYoutubeSuccessNotification, IPushYoutubeWarningNotification, Types } from './notifications_types';

export const pushYoutubeSuccessNotification: ActionCreator<IPushYoutubeSuccessNotification> = (result: string) => ({
    type: Types.PUSH_YOUTUBE_SUCCESS_NOTIFICATION,
    payload: result
});

export const pushYoutubeWarningNotification: ActionCreator<IPushYoutubeWarningNotification> = (result: string) => ({
    type: Types.PUSH_YOUTUBE_WARNING_NOTIFICATION,
    payload: result
});

export const pushYoutubeErrorNotification: ActionCreator<IPushYoutubeErrorNotification> = (result: any) => ({
    type: Types.PUSH_YOUTUBE_ERROR_NOTIFICATION,
    payload: result
});

export const popNotification: ActionCreator<IPopNotification> = () => ({
    type: Types.POP_NOTIFICATION
});

export const pushSpotifySuccessNotification: ActionCreator<IPushSpotifySuccessNotification> = (result: string) => ({
    type: Types.PUSH_SPOTIFY_SUCCESS_NOTIFICATION,
    payload: result
});

export const pushSpotifyWarningNotification: ActionCreator<IPushSpotifyWarningNotification> = (result: string) => ({
    type: Types.PUSH_SPOTIFY_WARNING_NOTIFICATION,
    payload: result
});

export const pushSpotifyErrorNotification: ActionCreator<IPushSpotifyErrorNotification> = (result: any) => ({
    type: Types.PUSH_SPOTIFY_ERROR_NOTIFICATION,
    payload: result
});