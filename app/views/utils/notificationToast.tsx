import { Toast } from 'native-base';
import React from 'react'
import Context from '../../store/context';
import { NotificationType } from '../../store/state';
import { popNotification } from '../../store/types/notifications_actions';

const NotificationToast: React.VoidFunctionComponent = () => {

    /// ###### ///
    /// STATES ///
    /// ###### ///
    const { state, dispatch } = React.useContext(Context);
    const [duration] = React.useState<number>(2000);

    /// ####### ///
    /// EFFECTS ///
    /// ####### ///
    React.useEffect(() => {
        if (state.notifications.notifications.length > 0) {
            const notification = state.notifications.notifications[0];

            switch (notification.type) {
                case NotificationType.SUCCESS:
                    Toast.show({
                        text: notification.message,
                        duration,
                        type: "success",
                        onClose: () => {
                            dispatch(popNotification());
                        }
                    });
                    break;

                case NotificationType.WARNING:
                    Toast.show({
                        text: notification.message,
                        duration,
                        type: "warning",
                        onClose: () => {
                            dispatch(popNotification());
                        }
                    });
                    break;

                case NotificationType.ERROR:
                    Toast.show({
                        text: notification.message,
                        duration,
                        type: "danger",
                        onClose: () => {
                            dispatch(popNotification());
                        }
                    });
                    break;

                default:
                    break;
            }
        }
    }, [dispatch, duration, state.notifications.notifications]);

    return (<></>)
}

export default NotificationToast;
