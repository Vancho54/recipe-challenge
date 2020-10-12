import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import dotEnv from 'dotenv'

import { typeDefs } from './typeDefs/typeDefs'
import { resolvers } from './resolvers/index'
import { verifyUser } from './helper/context/index'


dotEnv.config()

const app = express();

const startServer = async () => {
  const server = new ApolloServer({ 
    typeDefs,
    resolvers,
    context: async ({ req }: any) => {
      let contextObj = {};
      if (req) {
        await verifyUser(req);
        contextObj = req.user;
      }
      return contextObj;
    },
    playground: true 
  });

  await createConnection();

  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000

  app.listen(PORT, () =>
    console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  );
};

startServer();
