import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { MarkdownContent } from "@/components/MarkdownContent";
import { CommentList } from "./CommentList";
import { CommentForm } from "./CommentForm";
import { CATEGORIES } from "@/lib/constants";
import { formatDate, stripMarkdown } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from("posts")
    .select("title, body_md")
    .eq("id", id)
    .single();

  if (!post) return {};

  return {
    title: post.title,
    description: stripMarkdown(post.body_md, 160),
  };
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

  const categoryInfo = CATEGORIES.find(c => c.slug === post.category_slug);

  return (
    <div className="bg-brand-cream min-h-screen">
      {/* Header with Background Image */}
      <div className="relative h-[40vh] w-full overflow-hidden bg-brand-coffee">
        <div className="absolute inset-0 opacity-50">
          <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
        </div>
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <Link
            href={`/${post.category_slug}`}
            className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-brand-cream hover:text-white"
          >
            {categoryInfo?.label ?? post.category_slug}
          </Link>
          <h1 className="max-w-4xl font-serif text-3xl font-bold text-white sm:text-5xl">
            {post.title}
          </h1>
          <div className="mt-6 flex items-center gap-4 text-xs font-medium text-brand-cream/70">
            <span>{formatDate(post.created_at)}</span>
            <span className="h-1 w-1 rounded-full bg-brand-cream/30"></span>
            <span>By Community Member</span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <article className="mx-auto -mt-20 relative z-20 max-w-4xl px-6 pb-24">
        <div className="rounded-3xl bg-white p-8 shadow-xl shadow-brand-brown/5 sm:p-16">
          <div className="prose prose-stone max-w-none">
            <MarkdownContent content={post.body_md} />
          </div>

          <section className="mt-20 border-t border-brand-border pt-12">
            <div className="mb-10">
              <h2 className="font-serif text-3xl font-semibold text-brand-coffee">Comments</h2>
              <p className="mt-2 text-sm text-brand-coffee/50 uppercase tracking-widest font-bold">
                Join the discussion
              </p>
            </div>
            <CommentForm postId={post.id} />
            <div className="mt-12">
              <CommentList postId={post.id} initialComments={comments ?? []} />
            </div>
          </section>
        </div>
      </article>
    </div>
  );
}
