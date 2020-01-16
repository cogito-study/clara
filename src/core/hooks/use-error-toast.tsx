import { useToast } from '@chakra-ui/core';
import { ApolloError } from 'apollo-client';
import React, { useEffect } from 'react';
import { useThrottle } from 'react-use';
import { ErrorToast } from '../components';

export const useErrorToast = () => {
  const toast = useToast();

  const errorToast = (error: ApolloError | Error) => {
    return error instanceof ApolloError
      ? error.graphQLErrors.map(({ message }) =>
          toast({
            position: 'top',
            render: (props) => <ErrorToast description={message} {...props} />,
          }),
        )
      : toast({
          position: 'top',
          render: (props) => <ErrorToast description={error.message} {...props} />,
        });
  };

  return errorToast;
};

export const useErrorToastEffect = (error?: ApolloError | Error) => {
  const errorToast = useErrorToast();
  const throttledError = useThrottle(error, 1000);

  useEffect(() => {
    if (throttledError) {
      errorToast(throttledError);
    }
  }, [throttledError, errorToast]);
};
