import { Reducer } from 'redux';
import { ErrorResponseException } from '../../youtubeApi/youtube-api-models';
import { TActions } from '../actions';
import { INotifications, InitialState, NotificationType } from '../state';
import { TNotificationsActions, Types } from './notifications_types';

const reducer: Reducer<INotifications, TActions> = (state: INotifications = InitialState.notifications, action: TActions) => {

    var notificationAction = action as TNotificationsActions;
    if (notificationAction === null) {
        return state;
    }

    console.log(notificationAction.type);

    switch (notificationAction.type) {
        case Types.PUSH_YOUTUBE_SUCCESS_NOTIFICATION:
            return {
                ...state,
                youtubeNotifications: [
                    ...state.youtubeNotifications,
                    {
                        message: notificationAction.payload,
                        type: NotificationType.SUCCESS
                    }
                ]
            }

        case Types.PUSH_YOUTUBE_WARNING_NOTIFICATION:
            return {
                ...state,
                youtubeNotifications: [
                    ...state.youtubeNotifications,
                    {
                        message: notificationAction.payload,
                        type: NotificationType.SUCCESS
                    }
                ]
            }

        case Types.PUSH_YOUTUBE_ERROR_NOTIFICATION:
            if (notificationAction.payload instanceof ErrorResponseException) {
                return {
                    ...state,
                    youtubeNotifications: [
                        ...state.youtubeNotifications,
                        {
                            message: notificationAction.payload.errorResponse.error.message,
                            type: NotificationType.SUCCESS
                        }
                    ]
                }
            }

            return {
                ...state,
                youtubeNotifications: [
                    ...state.youtubeNotifications,
                    {
                        message: notificationAction.payload,
                        type: NotificationType.SUCCESS
                    }
                ]
            }

        case Types.POP_YOUTUBE_NOTIFICATION:
            return {
                ...state,
                youtubeNotifications: state.youtubeNotifications.slice(1)
            }
        default:
            return state;
    }
};

export default reducer;