"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function CommentForm({ postId }: { postId: string }) {
  const router = useRouter();
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push(`/login?next=/post/${postId}`);
        return;
      }
      const { error: err } = await supabase.from("comments").insert({
        post_id: postId,
        user_id: user.id,
        body_md: body.trim(),
      });
      if (err) throw err;
      setBody("");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "评论失败");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
        rows={3}
        placeholder="支持 Markdown…"
        className="w-full rounded-md border border-surface-border bg-surface-light px-3 py-2 text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
      />
      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="mt-2 rounded-md bg-surface-light px-4 py-2 text-sm font-medium text-[var(--text)] hover:bg-surface-border disabled:opacity-50"
      >
        {loading ? "发送中…" : "发送评论"}
      </button>
    </form>
  );
}
