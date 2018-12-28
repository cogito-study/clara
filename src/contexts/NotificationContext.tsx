import React, { createContext, FunctionComponent, useState } from 'react';

import { Notification, NotificationType } from '../ui/components/Notification';

interface NotificationContextState {
  showNotification: (message: string, type?: NotificationType, duration?: number) => void;
}

export const NotificationContext = createContext<NotificationContextState>({ showNotification: () => undefined });

export const NotificationConsumer = NotificationContext.Consumer;

export const NotificationProvider: FunctionComponent = ({ children }) => {
  const defaultNotificationDuration = 5000;

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState<string | undefined>(undefined);
  const [notificationType, setNotificationType] = useState<NotificationType | undefined>(undefined);

  const showNotification = (
    message: string,
    type: NotificationType = 'success',
    duration: number = defaultNotificationDuration,
  ) => {
    setIsNotificationOpen(true);
    setNotificationMessage(message);
    setNotificationType(type);

    setTimeout(hideNotification, duration);
  };

  const hideNotification = () => setIsNotificationOpen(false);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
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
