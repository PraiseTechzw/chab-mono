import { createSchema } from "graphql-yoga";
import { KnowledgeNodeModel, connectToDatabase } from "@chab/db/src/index";
import type { CreateKnowledgeNodeInput } from "@chab/shared/src/index";

const typeDefs = /* GraphQL */ `
  scalar DateTime

  type KnowledgeNode {
    id: ID!
    title: String!
    content: String!
    tags: [String!]!
    author: String
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    nodes(query: String, tag: String): [KnowledgeNode!]!
    node(id: ID!): KnowledgeNode
  }

  input CreateKnowledgeNodeInput {
    title: String!
    content: String!
    tags: [String!]!
    author: String
  }

  type Mutation {
    createNode(input: CreateKnowledgeNodeInput!): KnowledgeNode!
  }
`;

const resolvers = {
  Query: {
    nodes: async (_: unknown, args: { query?: string; tag?: string }) => {
      const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017";
      await connectToDatabase(mongoUri);
      const filter: any = {};
      if (args.query) filter.$text = { $search: args.query };
      if (args.tag) filter.tags = args.tag;
      return KnowledgeNodeModel.find(filter).lean();
    },
    node: async (_: unknown, { id }: { id: string }) => {
      const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017";
      await connectToDatabase(mongoUri);
      return KnowledgeNodeModel.findOne({ id }).lean();
    },
  },
  Mutation: {
    createNode: async (_: unknown, { input }: { input: CreateKnowledgeNodeInput }) => {
      const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017";
      await connectToDatabase(mongoUri);
      const now = new Date().toISOString();
      const id = crypto.randomUUID();
      const node = await KnowledgeNodeModel.create({
        id,
        ...input,
        createdAt: now,
        updatedAt: now,
      });
      return node.toObject();
    },
  },
};

export const schema = createSchema({ typeDefs, resolvers });


