import React, { createContext, FunctionComponent, useState } from 'react';

import { Notification, NotificationType } from '../ui/components/Notification';

// tslint:disable-next-line
export const NotificationContext = createContext<(message: string, type: NotificationType) => void>(() => {});

export const NotificationConsumer = NotificationContext.Consumer;

export const NotificationProvider: FunctionComponent = ({ children }) => {
  const defaultNotificationDuration = 5000;

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState<string | undefined>(undefined);
  const [notificationType, setNotificationType] = useState<NotificationType | undefined>(undefined);

  const showNotification = (
    message: string,
    type: NotificationType,
    duration: number = defaultNotificationDuration,
  ) => {
    setIsNotificationOpen(true);
    setNotificationMessage(message);
    setNotificationType(type);

    setTimeout(hideNotification, duration);
  };

  const hideNotification = () => setIsNotificationOpen(false);

  return (
    <NotificationContext.Provider value={showNotification}>
      {children}
      <Notification
        isOpen={isNotificationOpen}
        message={notificationMessage}
        type={notificationType}
        onClose={hideNotification}
      />
    </NotificationContext.Provider>
  );
};
