import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/types/db";
import { formatDate, stripMarkdown } from "@/lib/utils";
import { CATEGORIES } from "@/lib/constants";

export function PostList({ posts }: { posts: Post[] }) {
  const categoryMap = Object.fromEntries(CATEGORIES.map(c => [c.slug, c.label]));

  if (posts.length === 0) {
    return (
      <div className="rounded-3xl border border-brand-border bg-white py-20 text-center text-brand-muted">
        <p className="text-xl">暂无文章</p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/post/${post.id}`}
          className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-md transition-all hover:-translate-y-2 hover:shadow-xl"
        >
          <div className="aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-brand-blue/10 to-brand-orange/10">
            <div className="relative h-full w-full">
              <Image
                src="/images/mountain-road.jpg"
                alt={post.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </div>
          <div className="flex flex-1 flex-col p-6">
            <div className="mb-3 flex items-center gap-3 text-sm font-semibold text-brand-blue">
              <span>{categoryMap[post.category_slug] ?? post.category_slug}</span>
            </div>
            <h3 className="font-display text-xl font-bold leading-tight text-brand-dark group-hover:text-brand-blue line-clamp-2">
              {post.title}
            </h3>
            <p className="mt-3 flex-1 text-base leading-relaxed text-brand-muted line-clamp-3">
              {stripMarkdown(post.body_md)}
            </p>
            <div className="mt-4 text-sm text-brand-muted">
              {formatDate(post.created_at)}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
