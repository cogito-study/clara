import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { config } from '../environment/config';

const httpLink = new HttpLink({
  uri: config.apiURL,
  // headers: {
  //   authorization: `Bearer ${
  //     process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
  //   }`,
  // },
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
