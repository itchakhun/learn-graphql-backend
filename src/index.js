const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');
const { Query, Mutation, AuthPayload, Subscription } = require('./resolvers');

const context = (req) => (Object.assign(req, {
  db: new Prisma({
    typeDefs: './src/generated/prisma.graphql',
    endpoint: 'https://eu1.prisma.sh/supadechdw/blopper-news/dev',
    secret: 'legacy001',
    debug: true,
  })
}))

const resolvers = {
  Query,
  Mutation,
  AuthPayload,
  Subscription
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context
});

server.start(() => console.log('👉🏻 http://localhost:4000 👈🏻'));
