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
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-brand-coffee">
        <div className="absolute inset-0 opacity-40">
          <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <span className="mb-6 block text-xs font-bold uppercase tracking-[0.3em] text-brand-cream/80">
            Column / {categoryInfo.label}
          </span>
          <h1 className="font-serif text-5xl font-bold text-white sm:text-7xl">
            {categoryInfo.label}
          </h1>
          <div className="mt-10 flex justify-center">
            <div className="h-px w-24 bg-brand-brown"></div>
          </div>
          <p className="mt-10 text-lg leading-relaxed text-brand-cream/90 sm:text-xl">
            {categoryInfo.longDescription}
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <div className="mb-16 flex items-center justify-between border-b border-brand-border pb-8">
          <h2 className="font-serif text-3xl font-semibold text-brand-coffee">栏目文章</h2>
          <span className="text-xs font-bold uppercase tracking-widest text-brand-coffee/40">
            {posts?.length ?? 0} Posts Found
          </span>
        </div>
        <PostList posts={posts ?? []} />
      </section>
    </div>
  );
}
