import { KnowledgeNode } from "./models/KnowledgeNode.js";

export const resolvers = {
  Query: {
    knowledgeNode: async (_: unknown, { id }: { id: string }) => {
      return KnowledgeNode.findById(id);
    },
    knowledgeNodes: async (
      _: unknown,
      args: { tag?: string; search?: string; limit?: number; offset?: number }
    ) => {
      const { tag, search, limit = 20, offset = 0 } = args;
      const filter: Record<string, unknown> = {};
      if (tag) filter.tags = tag;
      if (search) filter.$text = { $search: search } as never;
      return KnowledgeNode.find(filter).skip(offset).limit(limit).sort({ createdAt: -1 });
    },
  },
  Mutation: {
    createKnowledgeNode: async (
      _: unknown,
      { input }: { input: { title: string; content: string; tags?: string[]; author?: string } }
    ) => {
      const doc = await KnowledgeNode.create({
        title: input.title,
        content: input.content,
        tags: input.tags || [],
        author: input.author || null,
      });
      return doc;
    },
  },
};


