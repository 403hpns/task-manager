import { ApolloProvider } from '@apollo/client';
import { PropsWithChildren } from 'react';
import { client } from '../lib/apolloClient';

function ClientApolloProvider({ children }: PropsWithChildren) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default ClientApolloProvider;
