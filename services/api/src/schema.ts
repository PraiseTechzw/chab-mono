import { gql } from "apollo-server-express";

export const typeDefs = gql`
  scalar Date

  type KnowledgeNode {
    id: ID!
    title: String!
    content: String!
    tags: [String!]!
    author: String
    createdAt: Date!
    updatedAt: Date!
  }

  input CreateKnowledgeNodeInput {
    title: String!
    content: String!
    tags: [String!]
    author: String
  }

  type Query {
    knowledgeNode(id: ID!): KnowledgeNode
    knowledgeNodes(tag: String, search: String, limit: Int = 20, offset: Int = 0): [KnowledgeNode!]!
  }

  type Mutation {
    createKnowledgeNode(input: CreateKnowledgeNodeInput!): KnowledgeNode!
  }
`;


