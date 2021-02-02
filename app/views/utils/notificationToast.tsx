import { Toast } from 'native-base';
import React from 'react'
import Context from '../../store/context';
import { NotificationType } from '../../store/state';
import { popNotification } from '../../store/types/notifications_actions';

interface IProps { }

const NotificationToast: React.FunctionComponent<IProps> = () => {
    const { state, dispatch } = React.useContext(Context);

    React.useEffect(() => {
        if (state.notifications.notifications.length > 0) {
            const notification = state.notifications.notifications[0];

            switch (notification.type) {
                case NotificationType.SUCCESS:
                    Toast.show({
                        text: notification.message,
                        duration: 2000,
                        type: "success",
                        onClose: () => {
                            dispatch(popNotification());
                        }
                    });
                    break;

                case NotificationType.WARNING:
                    Toast.show({
                        text: notification.message,
                        duration: 2000,
                        type: "warning",
                        onClose: () => {
                            dispatch(popNotification());
                        }
                    });
                    break;

                case NotificationType.ERROR:
                    Toast.show({
                        text: notification.message,
                        duration: 2000,
                        type: "danger",
                        onClose: () => {
                            dispatch(popNotification());
                        }
                    });
                    break;
            }
        }
    }, [state.notifications.notifications]);

    return (<></>)
}

export default NotificationToast;
