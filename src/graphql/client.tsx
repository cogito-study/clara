import { captureException, captureMessage, Severity } from '@sentry/browser';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { from } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';

import { config } from '../environment/config';
import { authService } from '../services/authService';

const httpLink = new HttpLink({ uri: config.apiURL });

const authLink = setContext((_, { headers }) => {
  const token = authService.getAuthToken();
  return {
    headers: {
      ...headers,
      Authorization: token ? `JWT ${token}` : '',
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError, operation, response }) => {
  if (operation) {
    console.log('[Operation]: ', operation);
  }

  if (response) {
    console.log('[Response]: ', response);
  }

  if (graphQLErrors) {
    graphQLErrors.map(({ message }) => captureException(message));
  }

  if (networkError) {
    captureMessage(networkError.message, Severity.Error);
  }
});

export const client = new ApolloClient({
  link: from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
});
