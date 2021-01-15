import { Toast } from 'native-base';
import React, { FunctionComponent, useContext, useEffect } from 'react'
import Context from '../../store/context';
import { INotification, NotificationType } from '../../store/state';
import { popNotification } from '../../store/types/notifications_actions';

interface IProps {
    notifications: INotification[];
}

const NotificationToast: FunctionComponent<IProps> = (props: IProps) => {
    const { dispatch } = useContext(Context);

    useEffect(() => {
        if (props.notifications.length > 0) {
            const notification = props.notifications[0];

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
    }, [props.notifications]);

    return (<></>)
}

export default NotificationToast;
