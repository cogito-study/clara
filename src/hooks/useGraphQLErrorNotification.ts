import { ApolloError } from 'apollo-client';
import { useContext } from 'react';

import { NotificationContext } from '../contexts/notification/NotificationContext';

export const useGraphQLErrorNotification = () => {
  const { showNotification } = useContext(NotificationContext);

  const displayNotification = (error: ApolloError) =>
    error.graphQLErrors.map(({ message }) => showNotification(message, 'error'));

  return displayNotification;
};
