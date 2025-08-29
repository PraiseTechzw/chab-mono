"use client";
import { useState } from "react";

export default function ContributePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Submitting...");
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `mutation($input: CreateKnowledgeNodeInput!) { createNode(input: $input) { id title } }`,
          variables: {
            input: {
              title,
              content,
              tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
            },
          },
        }),
      });
      const json = await res.json();
      if (json.errors) throw new Error(json.errors[0].message);
      setStatus(`Created: ${json.data.createNode.title}`);
      setTitle("");
      setContent("");
      setTags("");
    } catch (err: any) {
      setStatus(err.message || "Failed");
    }
  }

  return (
    <main style={{ padding: 24, display: "grid", gap: 12 }}>
      <h2>Contribute Knowledge</h2>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 8, maxWidth: 640 }}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" required rows={6} />
        <input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Tags (comma separated)" />
        <button type="submit">Submit</button>
      </form>
      {status && <p>{status}</p>}
    </main>
  );
}


