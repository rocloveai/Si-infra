import Image from "next/image";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PostList } from "@/components/PostList";
import { CATEGORIES, SITE_CONFIG } from "@/lib/constants";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({
    category: c.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category } = params;
  const categoryInfo = CATEGORIES.find((c) => c.slug === category);
  return {
    title: categoryInfo?.label ?? "分类",
    description: categoryInfo?.description ?? SITE_CONFIG.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params;
  const categoryInfo = CATEGORIES.find((c) => c.slug === category);

  if (!categoryInfo) {
    notFound();
  }

  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("id, title, body_md, category_slug, user_id, created_at, updated_at, image_urls")
    .eq("category_slug", category)
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <div className="bg-brand-cream min-h-screen">
      {/* Category Header */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-brand-dark">
        <div className="absolute inset-0">
          <Image
            src="/images/mountain-road.jpg"
            alt={categoryInfo.label}
            fill
            className="object-cover opacity-40"
          />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <div className="mb-6 inline-block rounded-full bg-white/10 px-6 py-2 backdrop-blur-sm">
            <span className="text-sm font-semibold text-white">
              {categoryInfo.label}
            </span>
          </div>
          <h1 className="font-display text-5xl font-bold text-white sm:text-7xl">
            {categoryInfo.label}
          </h1>
          <p className="mt-8 text-lg leading-relaxed text-white/90 sm:text-xl">
            {categoryInfo.longDescription}
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-12 sm:py-32">
        <div className="mb-12 flex items-center justify-between">
          <h2 className="font-display text-3xl font-bold text-brand-dark sm:text-4xl">
            全部文章
          </h2>
          <span className="text-sm font-semibold text-brand-muted">
            共 {posts?.length ?? 0} 篇
          </span>
        </div>
        <PostList posts={posts ?? []} />
      </section>
    </div>
  );
}
