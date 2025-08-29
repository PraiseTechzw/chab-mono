import { Schema, model } from "mongoose";

export interface KnowledgeNodeDocument {
  title: string;
  content: string;
  tags: string[];
  author?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const KnowledgeNodeSchema = new Schema<KnowledgeNodeDocument>(
  {
    title: { type: String, required: true, index: true },
    content: { type: String, required: true },
    tags: { type: [String], default: [] },
    author: { type: String, default: null },
  },
  { timestamps: true }
);

KnowledgeNodeSchema.index({ title: "text", content: "text", tags: 1 });

export const KnowledgeNode = model<KnowledgeNodeDocument>(
  "KnowledgeNode",
  KnowledgeNodeSchema
);


