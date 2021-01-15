import { ActionCreator } from 'redux';
import { IPopYoutubeNotification, IPushYoutubeErrorNotification, IPushYoutubeSuccessNotification, IPushYoutubeWarningNotification, Types } from './notifications_types';

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

export const popYoutubeNotification: ActionCreator<IPopYoutubeNotification> = () => ({
    type: Types.POP_YOUTUBE_NOTIFICATION
});