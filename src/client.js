import ApolloClient from 'apollo-client'

import { split } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { setContext } from 'apollo-link-context';
import { getMainDefinition } from 'apollo-utilities';
import { server } from './config';
// import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
// import fragmentTypes from './fragmentTypes.json'

const httpLink = new HttpLink({
  uri: server.urlHttp
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: server.urlWS,
  options: {
    reconnect: true,
    connectionParams: {
      authToken: ':v:v'
    }
  }
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

// const fragmentMatcher = new IntrospectionFragmentMatcher({
//   introspectionQueryResultData: fragmentTypes.data
// });

// const cache = new InMemoryCache({fragmentMatcher});
const cache = new InMemoryCache();

const client = new ApolloClient({
  link: authLink.concat(link),
  cache
});

export default client;