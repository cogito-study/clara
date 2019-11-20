import React from 'react';
import { ApolloError } from 'apollo-client';
import { useToast } from '@chakra-ui/core';
import { ErrorToast } from '../components/toast/toast';

export const useGraphQLErrorNotification = () => {
  const toast = useToast();

  const displayNotification = (error: ApolloError) =>
    error.graphQLErrors.map(({ message }) =>
      toast({
        position: 'top',
        render: (props) => <ErrorToast description={message} {...props} />,
      }),
    );

  return displayNotification;
};
