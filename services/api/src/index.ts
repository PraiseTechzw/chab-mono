import "dotenv/config";
import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import { typeDefs } from "./schema.js";
import { resolvers } from "./resolvers.js";

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/chab";

async function start() {
  await mongoose.connect(MONGO_URI);

  const app = express();
  app.use(cors());

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });

  app.get("/health", (_req, res) => res.json({ ok: true }));

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`API running on http://localhost:${PORT}${server.graphqlPath}`);
  });
}

start().catch((err) => {
  // eslint-disable-next-line no-console
  console.error("Fatal error starting API:", err);
  process.exit(1);
});


