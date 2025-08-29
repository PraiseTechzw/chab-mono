"use client";
import { useState } from "react";

export default function AskPage() {
  const [question, setQuestion] = useState("");
  const [tag, setTag] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);

  async function handleAsk(e: React.FormEvent) {
    e.preventDefault();
    setAnswer("Thinking...");
    const query = `query($tag: String) { nodes(tag: $tag) { title content tags } }`;
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables: { tag: tag || null } }),
    });
    const json = await res.json();
    const nodes = json.data?.nodes || [];
    // naive: show concatenated content. Later: call API endpoint that uses Gemini.
    const merged = nodes.slice(0, 5).map((n: any) => `- ${n.title}: ${n.content}`).join("\n");
    setAnswer(merged || "No context yet. Try adding contributions.");
  }

  return (
    <main style={{ padding: 24, display: "grid", gap: 12 }}>
      <h2>Ask CHAB</h2>
      <form onSubmit={handleAsk} style={{ display: "grid", gap: 8, maxWidth: 640 }}>
        <input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Your question" required />
        <input value={tag} onChange={(e) => setTag(e.target.value)} placeholder="Filter by tag (optional)" />
        <button type="submit">Ask</button>
      </form>
      {answer && (
        <section>
          <h3>Answer</h3>
          <pre style={{ whiteSpace: "pre-wrap" }}>{answer}</pre>
        </section>
      )}
    </main>
  );
}


