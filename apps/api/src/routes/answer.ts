import { KnowledgeNodeModel, connectToDatabase } from "@chab/db/src/index";
import { createGeminiClient } from "@chab/core-ai/src/index";

export async function answerQuestion(question: string): Promise<string> {
  const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017";
  await connectToDatabase(mongoUri);
  const nodes = await KnowledgeNodeModel.find({}).lean();
  const apiKey = process.env.GEMINI_API_KEY || "";
  if (!apiKey) return "Gemini API key not configured";
  const gemini = createGeminiClient({ apiKey });
  return gemini.answerQuestion(question, nodes as any);
}


