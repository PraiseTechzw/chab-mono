import mongoose, { Schema, model, models } from "mongoose";
import type { KnowledgeNode } from "@chab/shared/src/index";

export async function connectToDatabase(mongoUri: string): Promise<typeof mongoose> {
  if (mongoose.connection.readyState === 1) return mongoose;
  return mongoose.connect(mongoUri, { dbName: process.env.MONGO_DB_NAME || "chab" });
}

const KnowledgeNodeSchema = new Schema<KnowledgeNode>({
  id: { type: String, required: true, index: true, unique: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: { type: [String], default: [] },
  author: { type: String },
  createdAt: { type: String, required: true },
  updatedAt: { type: String, required: true },
});

export const KnowledgeNodeModel = models.KnowledgeNode || model<KnowledgeNode>("KnowledgeNode", KnowledgeNodeSchema);


