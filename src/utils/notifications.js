import { notification } from 'antd';

export const showErrorNotification = (message, description, duration) => {
  notification.error({ message, description, duration: duration || 0 });
};


/*
*  Can similarly export for show success, show info, show warn etc..
*/
