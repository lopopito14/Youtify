import { Reducer } from 'redux';
import { ErrorResponseException } from '../../youtubeApi/youtube-api-models';
import { TActions } from '../actions';
import { INotifications, InitialState, NotificationType } from '../state';
import { TNotificationsActions, Types } from './notifications_types';

const reducer: Reducer<INotifications, TActions> = (state: INotifications = InitialState.notifications, action: TActions) => {

    const notificationAction = action as TNotificationsActions;
    if (notificationAction === null) {
        return state;
    }

    switch (notificationAction.type) {
        case Types.PUSH_SPOTIFY_SUCCESS_NOTIFICATION:
        case Types.PUSH_YOUTUBE_SUCCESS_NOTIFICATION:
            return {
                ...state,
                notifications: [
                    ...state.notifications,
                    {
                        message: notificationAction.payload,
                        type: NotificationType.SUCCESS
                    }
                ]
            }

        case Types.PUSH_SPOTIFY_WARNING_NOTIFICATION:
        case Types.PUSH_YOUTUBE_WARNING_NOTIFICATION:
            return {
                ...state,
                notifications: [
                    ...state.notifications,
                    {
                        message: notificationAction.payload,
                        type: NotificationType.WARNING
                    }
                ]
            }

        case Types.PUSH_YOUTUBE_ERROR_NOTIFICATION:
            if (notificationAction.payload instanceof ErrorResponseException) {
                return {
                    ...state,
                    notifications: [
                        ...state.notifications,
                        {
                            message: notificationAction.payload.message,
                            type: NotificationType.ERROR
                        }
                    ]
                }
            }

            return {
                ...state,
                notifications: [
                    ...state.notifications,
                    {
                        message: notificationAction.payload,
                        type: NotificationType.ERROR
                    }
                ]
            }

        case Types.PUSH_SPOTIFY_ERROR_NOTIFICATION:
            return {
                ...state,
                spotifyNotifications: [
                    ...state.notifications,
                    {
                        message: notificationAction.payload,
                        type: NotificationType.ERROR
                    }
                ]
            }

        case Types.POP_NOTIFICATION:
            return {
                ...state,
                notifications: state.notifications.slice(1)
            }

        default:
            return state;
    }
};

export default reducer;