export type KnowledgeNode = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  author?: string;
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
};

export type CreateKnowledgeNodeInput = Omit<KnowledgeNode, "id" | "createdAt" | "updatedAt">;


