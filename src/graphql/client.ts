import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { config } from '../environment/config';
import { authService } from '../services/authService';

const httpLink = new HttpLink({ uri: config.apiURL });

const authLink = setContext((_, { headers }) => {
  const token = authService.authToken();
  return {
    headers: {
      ...headers,
      Authorization: token ? `JWT ${token}` : '',
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
