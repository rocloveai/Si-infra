import Link from "next/link";
import type { Post } from "@/types/db";
import { formatDate } from "@/lib/utils";
import { CATEGORIES } from "@/lib/constants";

export function PostList({ posts }: { posts: Post[] }) {
  const categoryMap = Object.fromEntries(CATEGORIES.map(c => [c.slug, c.label]));

  if (posts.length === 0) {
    return (
      <div className="rounded-2xl border border-brand-border bg-brand-sand/30 py-20 text-center text-brand-coffee/60">
        <p className="font-serif text-xl">暂无帖子</p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/post/${post.id}`}
          className="group flex flex-col overflow-hidden rounded-2xl border border-brand-border bg-white transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-brown/5"
        >
          <div className="aspect-[4/3] w-full bg-brand-sand overflow-hidden">
            {/* 模拟图片占位符，实际项目中会使用 post.image_urls */}
            <div className="flex h-full w-full items-center justify-center bg-brand-sand text-brand-brown/20 transition-transform duration-500 group-hover:scale-105">
              <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <div className="flex flex-1 flex-col p-6">
            <div className="mb-3 flex items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-brown">
                {categoryMap[post.category_slug] ?? post.category_slug}
              </span>
              <span className="h-px flex-1 bg-brand-border"></span>
              <span className="text-[10px] text-brand-coffee/50 uppercase tracking-widest">
                {formatDate(post.created_at)}
              </span>
            </div>
            <h3 className="font-serif text-xl font-semibold leading-tight text-brand-coffee group-hover:text-brand-brown">
              {post.title}
            </h3>
            <div className="mt-4 flex items-center text-xs font-semibold uppercase tracking-widest text-brand-brown opacity-0 transition-opacity group-hover:opacity-100">
              阅读更多 →
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
