import { ApolloError } from 'apollo-client';
import { useToast } from '@chakra-ui/core';

export const useGraphQLErrorNotification = () => {
  const toast = useToast();

  const displayNotification = (error: ApolloError) =>
    error.graphQLErrors.map(({ message }) =>
      toast({
        title: 'Error happened',
        description: message,
        status: 'error',
        position: 'bottom',
        isClosable: true,
      }),
    );

  return displayNotification;
};
