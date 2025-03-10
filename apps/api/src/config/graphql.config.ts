import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

export const graphqlConfig: ApolloDriverConfig = {
  driver: ApolloDriver,
  playground: false,
  autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  sortSchema: true,
  context: (req, res) => ({ req, res }),
  plugins: [ApolloServerPluginLandingPageLocalDefault()],
};
