import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { CATEGORIES, SITE_CONFIG } from "@/lib/constants";
import { formatDate, stripMarkdown } from "@/lib/utils";

export default async function HomePage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("id, title, body_md, category_slug, user_id, created_at, updated_at, image_urls")
    .order("created_at", { ascending: false })
    .limit(12);

  const list = posts ?? [];
  const categoryMap = Object.fromEntries(CATEGORIES.map(c => [c.slug, c.label]));

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] overflow-hidden bg-brand-dark">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-road.jpg"
            alt="Hero background"
            fill
            className="object-cover"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-brand-cream"></div>
        </div>
        <div className="relative z-10 mx-auto flex min-h-[90vh] max-w-7xl flex-col justify-end px-6 pb-20 sm:px-12">
          <div className="max-w-3xl">
            <h1 className="font-display text-5xl font-bold leading-tight text-white sm:text-7xl lg:text-8xl drop-shadow-2xl">
              {SITE_CONFIG.hero.title}
            </h1>
            <div className="mt-8 inline-block rounded-full bg-white/95 px-8 py-4 shadow-2xl backdrop-blur-sm">
              <p className="text-base font-medium text-brand-dark sm:text-lg">
                {SITE_CONFIG.hero.subtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories Section */}
      <section className="bg-brand-cream py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-12">
          <div className="mb-16">
            <h2 className="font-display text-4xl font-bold text-brand-dark sm:text-5xl">
              探索主题
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map(({ slug, label, description }, index) => (
              <Link
                key={slug}
                href={`/${slug}`}
                className="group relative overflow-hidden rounded-3xl bg-white shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-brand-blue/20 to-brand-orange/20">
                  <div className="relative h-full w-full">
                    <Image
                      src={index === 0 ? "/images/vintage-car.jpg" : index === 1 ? "/images/mountain-road.jpg" : "/images/adventure.jpg"}
                      alt={label}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="font-display text-2xl font-bold text-brand-dark">
                    {label}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-brand-muted">
                    {description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Posts Grid Section */}
      <section className="bg-white py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-12">
          <div className="mb-16 flex items-end justify-between">
            <div>
              <h2 className="font-display text-4xl font-bold text-brand-dark sm:text-5xl">
                最新内容
              </h2>
              <p className="mt-3 text-lg text-brand-muted">
                探索我们的最新文章和见解
              </p>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {list.slice(0, 6).map((post) => (
              <Link
                key={post.id}
                href={`/post/${post.id}`}
                className="group flex flex-col overflow-hidden rounded-3xl bg-brand-cream shadow-md transition-all hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="aspect-[16/10] overflow-hidden bg-gradient-to-br from-brand-blue/10 to-brand-orange/10">
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
                    <span>{categoryMap[post.category_slug]}</span>
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

          <div className="mt-16 text-center">
            <Link
              href="#"
              className="inline-block rounded-full bg-brand-dark px-10 py-4 text-base font-semibold text-white transition hover:bg-brand-blue"
            >
              查看更多文章
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-brand-dark py-20 sm:py-32">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/vintage-car.jpg"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center sm:px-12">
          <h2 className="font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            准备开始你的旅程?
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/80 sm:text-xl">
            加入我们的社区,分享你的故事和见解
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/new"
              className="inline-block rounded-full bg-brand-blue px-10 py-4 text-base font-semibold text-white transition hover:bg-brand-orange"
            >
              发布新文章
            </Link>
            <Link
              href="/about"
              className="inline-block rounded-full border-2 border-white/30 px-10 py-4 text-base font-semibold text-white transition hover:bg-white hover:text-brand-dark"
            >
              了解更多
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-brand-border bg-brand-cream py-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-12">
          <div className="flex flex-col items-center justify-between gap-10 md:flex-row">
            <div className="text-center md:text-left">
              <Link href="/" className="font-display text-2xl font-bold text-brand-dark">
                {SITE_CONFIG.name}
              </Link>
              <p className="mt-2 text-sm text-brand-muted">
                © 2026 {SITE_CONFIG.name}. All rights reserved.
              </p>
            </div>
            <nav className="flex flex-wrap justify-center gap-8 text-sm font-semibold text-brand-muted">
              {CATEGORIES.map((c) => (
                <Link key={c.slug} href={`/${c.slug}`} className="hover:text-brand-blue">
                  {c.label}
                </Link>
              ))}
              <Link href="/about" className="hover:text-brand-blue">关于</Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
