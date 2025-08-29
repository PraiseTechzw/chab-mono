import { GoogleGenerativeAI } from "@google/generative-ai";
import type { KnowledgeNode } from "@chab/shared/src/index";

export type GeminiConfig = {
  apiKey: string;
  model?: string;
};

export function createGeminiClient(config: GeminiConfig) {
  const client = new GoogleGenerativeAI(config.apiKey);
  const model = client.getGenerativeModel({ model: config.model || "gemini-1.5-pro" });

  return {
    async answerQuestion(question: string, nodes: KnowledgeNode[]): Promise<string> {
      const context = nodes
        .map((n) => `Title: ${n.title}\nTags: ${n.tags.join(", ")}\nContent: ${n.content}`)
        .join("\n---\n");
      const prompt = `You are CHAB, the collective human-AI brain. Using only the context, answer succinctly.\n\nContext:\n${context}\n\nQuestion: ${question}`;
      const result = await model.generateContent(prompt);
      return result.response.text();
    },
  };
}


