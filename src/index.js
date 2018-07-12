const { GraphQLServer }  =require('graphql-yoga');
const { Prisma }  =require('prisma-binding');
const { Query, Mutation }  =require('./resolvers');

const context = (req) => ({
  ...req,
  db: new Prisma({
    typeDefs: './src/generated/prisma.graphql',
    endpoint: 'https://eu1.prisma.sh/itchakhun-6f75a7/blopper-news/dev',
    secret: 'legacy001',
    debug: true,
  })
})

const resolvers = {
  Query,
  Mutation
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context
});

server.start(() => console.log('👉🏻  http://localhost:4000 👈🏻'));
