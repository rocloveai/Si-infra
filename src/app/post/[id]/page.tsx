import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { MarkdownContent } from "@/components/MarkdownContent";
import { CommentList } from "./CommentList";
import { CommentForm } from "./CommentForm";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: post, error } = await supabase
    .from("posts")
    .select("id, title, body_md, category_slug, user_id, created_at, updated_at, image_urls")
    .eq("id", id)
    .single();

  if (error || !post) notFound();

  const { data: comments } = await supabase
    .from("comments")
    .select("id, post_id, user_id, body_md, created_at")
    .eq("post_id", id)
    .order("created_at", { ascending: true });

  const categoryLabel =
    post.category_slug === "ai"
      ? "AI"
      : post.category_slug === "stablecoin"
        ? "Stablecoin"
        : "Web3";

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-sm text-[var(--text-muted)]">
        <Link
          href={`/${post.category_slug}`}
          className="text-accent hover:underline"
        >
          {categoryLabel}
        </Link>
        <span className="mx-2">·</span>
        {formatDate(post.created_at)}
      </p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--text)] sm:text-3xl">
        {post.title}
      </h1>
      <div className="mt-6">
        <MarkdownContent content={post.body_md} />
      </div>

      <section className="mt-12 border-t border-surface-border pt-8">
        <h2 className="text-lg font-medium text-[var(--text)]">评论</h2>
        <CommentForm postId={post.id} />
        <CommentList postId={post.id} initialComments={comments ?? []} />
      </section>
    </article>
  );
}
