import { GraphQLServer } from 'graphql-yoga';
import { Query, Mutation } from './resolvers';

const resolvers = {
  Query,
  Mutation
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
});

server.start(() => console.log('👉🏻  http://localhost:4000 👈🏻'));
