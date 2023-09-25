import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose from "mongoose";

import MankatypeDef from "./schema/manga.typeDefs.js";
import MankaResoler from "./resolvers/manga.resolver.js";

const MONGODB = process.env.MONGODB_URL;

const server = new ApolloServer({
  typeDefs: MankatypeDef,
  resolvers: MankaResoler
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB Connected");
    return startStandaloneServer(server, {
      listen: { port: process.env.PORT },
    });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
