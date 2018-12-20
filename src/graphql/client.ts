import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';

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
    console.log(`[Operation]: ${operation}`);
  }

  if (response) {
    console.log(`[Response]: ${response}`);
  }

  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
    );
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

export const client = new ApolloClient({
  link: authLink.concat(errorLink).concat(httpLink),
  cache: new InMemoryCache(),
});
