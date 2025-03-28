const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./graphql/schemas");
const resolvers = require("./graphql/resolvers");
const express = require('express')
const http = require('http')
const app = express();
const cors = require('cors')

app.use(
  cors({
    origin: "*",
    credentials: false,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "OPTIONS"],
  })
);


const context = ({ req }) => {
  const apiKey = req.headers['authorization']
  if(!apiKey || apiKey.trim() !== process.env.API_KEY){
    throw new Error('Forbidden')
  }
  return {};
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context
});

const httpServer = http.createServer(app);


server.start().then(() => {
  server.applyMiddleware({ app });

  httpServer.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
    console.log(`Server listening on http://${process.env.APP_HOST}:${process.env.APP_PORT}${server.graphqlPath}`)
  });
});
