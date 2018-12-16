import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { config } from '../environment/config';
import { localStorageKeys } from '../constants';

const httpLink = new HttpLink({ uri: config.apiURL });

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(localStorageKeys.authToken); // TODO: Handle in authentication service
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
