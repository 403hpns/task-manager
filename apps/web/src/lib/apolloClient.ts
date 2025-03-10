import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: import.meta.env.GQL_APOLLO_CLIENT_URI || 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});
