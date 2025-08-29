import { createServer } from "http";
import { createYoga } from "graphql-yoga";
import { schema } from "./schema.js";

const yoga = createYoga({ schema, graphqlEndpoint: "/graphql" });

const server = createServer(yoga);

const port = Number(process.env.PORT || 4000);
server.listen(port, () => {
  console.log(`API listening on http://localhost:${port}/graphql`);
});


