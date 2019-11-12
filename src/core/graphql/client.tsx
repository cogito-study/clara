import { captureException, captureMessage, Severity } from '@sentry/browser';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { from, split } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { config } from '../environment/config';

const httpLink = new HttpLink({ uri: config.apiURL });

const wsLink = new WebSocketLink({
  uri: config.wsURL || 'ws://localhost:4000/graphql',
  options: {
    reconnect: true,
    connectionParams: {
      authToken: localStorage.getItem('AUTH_TOKEN'),
    },
  },
});

// TODO: Fix when this is merged https://github.com/apollographql/subscriptions-transport-ws/pull/675
// eslint-disable-next-line
// @ts-ignore
(wsLink as any).subscriptionClient.maxConnectTimeGenerator.duration = () =>
  (wsLink as any).subscriptionClient.maxConnectTimeGenerator.max;

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('AUTH_TOKEN');
  const languageCode = localStorage.getItem('i18nextLng');

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
      languageCode,
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

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink,
);

export const client = new ApolloClient({
  link: from([authLink, errorLink, link]),
  cache: new InMemoryCache(),
});
