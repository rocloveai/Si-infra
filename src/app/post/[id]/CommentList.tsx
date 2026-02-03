"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { MarkdownContent } from "@/components/MarkdownContent";
import type { Comment } from "@/types/db";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("zh-CN", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function CommentList({
  postId,
  initialComments,
}: {
  postId: string;
  initialComments: Comment[];
}) {
  const [comments, setComments] = useState(initialComments);

  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel(`comments:${postId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "comments",
          filter: `post_id=eq.${postId}`,
        },
        (payload) => {
          setComments((prev) => [...prev, payload.new as Comment]);
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [postId]);

  if (comments.length === 0) {
    return (
      <p className="mt-4 text-sm text-[var(--text-muted)]">暂无评论</p>
    );
  }

  return (
    <ul className="mt-4 space-y-4">
      {comments.map((c) => (
        <li
          key={c.id}
          className="rounded-lg border border-surface-border bg-surface-light/30 p-4"
        >
          <p className="text-xs text-[var(--text-muted)]">
            {formatDate(c.created_at)}
          </p>
          <div className="mt-2 text-sm">
            <MarkdownContent content={c.body_md} />
          </div>
        </li>
      ))}
    </ul>
  );
}
