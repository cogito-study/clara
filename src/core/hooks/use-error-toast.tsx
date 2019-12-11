import { useToast } from '@chakra-ui/core';
import { ApolloError } from 'apollo-client';
import React, { useEffect } from 'react';
import { ErrorToast } from '../components/toast/toast';

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

  useEffect(() => {
    if (error) {
      errorToast(error);
    }
  }, [error, errorToast]);
};
