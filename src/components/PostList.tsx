import Link from "next/link";
import type { Post } from "@/types/db";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function PostList({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return (
      <div className="rounded-lg border border-surface-border bg-surface-light/30 py-12 text-center text-[var(--text-muted)]">
        暂无帖子
      </div>
    );
  }

  return (
    <ul className="divide-y divide-surface-border">
      {posts.map((post) => (
        <li key={post.id}>
          <Link
            href={`/post/${post.id}`}
            className="block py-4 transition hover:bg-surface-light/20"
          >
            <h2 className="font-medium text-[var(--text)] line-clamp-1">
              {post.title}
            </h2>
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              {formatDate(post.created_at)}
              <span className="ml-2 capitalize">{post.category_slug}</span>
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
