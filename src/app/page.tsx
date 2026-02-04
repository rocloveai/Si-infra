import Link from "next/link";
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
  const featured = list[0];
  const rest = list.slice(1, 7);
  
  const categoryMap = Object.fromEntries(CATEGORIES.map(c => [c.slug, c.label]));

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-brand-coffee">
        <div className="absolute inset-0 opacity-30">
          <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
        </div>
        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
          <h1 className="font-serif text-5xl font-bold leading-tight text-white sm:text-8xl">
            {SITE_CONFIG.hero.title}
          </h1>
          <p className="mt-8 font-sans text-xl tracking-wide text-brand-cream/80 sm:text-2xl">
            {SITE_CONFIG.hero.subtitle}
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Link
              href="#latest"
              className="inline-block rounded-full bg-brand-brown px-10 py-4 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-brand-cream hover:text-brand-coffee"
            >
              阅读最新内容
            </Link>
            <Link
              href="#topics"
              className="inline-block rounded-full border border-brand-cream/30 px-10 py-4 text-sm font-bold uppercase tracking-widest text-brand-cream transition hover:bg-brand-cream hover:text-brand-coffee"
            >
              按主题浏览
            </Link>
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section id="topics" className="bg-brand-cream py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 sm:grid-cols-3">
            {CATEGORIES.map(({ slug, label, description }) => (
              <Link
                key={slug}
                href={`/${slug}`}
                className="group relative flex flex-col overflow-hidden rounded-3xl bg-white p-10 shadow-xl shadow-brand-brown/5 transition-all hover:-translate-y-2 hover:shadow-2xl"
              >
                <span className="mb-6 block text-xs font-bold uppercase tracking-widest text-brand-brown">
                  {label}
                </span>
                <h3 className="font-serif text-2xl font-semibold text-brand-coffee group-hover:text-brand-brown">
                  {label}
                </h3>
                <p className="mt-4 text-brand-coffee/60 leading-relaxed">
                  {description}
                </p>
                <div className="mt-8 flex items-center text-xs font-bold uppercase tracking-widest text-brand-brown opacity-0 transition-opacity group-hover:opacity-100">
                  进入栏目 →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section id="latest" className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16 flex items-end justify-between border-b border-brand-border pb-8">
            <div>
              <h2 className="font-serif text-4xl font-semibold text-brand-coffee">最新文章</h2>
              <p className="mt-2 text-xs font-bold uppercase tracking-widest text-brand-brown">
                Recent thoughts and analysis
              </p>
            </div>
          </div>

          <div className="grid gap-12 lg:grid-cols-3">
            {featured && (
              <Link
                href={`/post/${featured.id}`}
                className="group lg:col-span-2"
              >
                <div className="aspect-[16/9] overflow-hidden rounded-3xl bg-brand-sand">
                  <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"></div>
                </div>
                <div className="mt-8">
                  <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-brand-brown">
                    <span>{categoryMap[featured.category_slug]}</span>
                    <span className="h-px w-8 bg-brand-border"></span>
                    <span className="text-brand-coffee/40">{formatDate(featured.created_at)}</span>
                  </div>
                  <h3 className="mt-4 font-serif text-3xl font-semibold text-brand-coffee group-hover:text-brand-brown">
                    {featured.title}
                  </h3>
                  <p className="mt-4 text-lg leading-relaxed text-brand-coffee/60 line-clamp-2">
                    {stripMarkdown(featured.body_md)}
                  </p>
                </div>
              </Link>
            )}
            <div className="space-y-10">
              {rest.slice(0, 4).map((post) => (
                <Link
                  key={post.id}
                  href={`/post/${post.id}`}
                  className="group flex gap-6"
                >
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl bg-brand-sand">
                    <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80')] bg-cover bg-center transition-transform duration-500 group-hover:scale-110"></div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-brown">
                      {categoryMap[post.category_slug]}
                    </span>
                    <h4 className="mt-1 font-serif text-lg font-semibold leading-tight text-brand-coffee group-hover:text-brand-brown line-clamp-2">
                      {post.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-cream border-t border-brand-border py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center justify-between gap-10 md:flex-row">
            <div className="text-center md:text-left">
              <Link href="/" className="font-serif text-2xl font-bold text-brand-coffee">
                {SITE_CONFIG.name}
              </Link>
              <p className="mt-2 text-sm text-brand-coffee/50">
                © 2026 {SITE_CONFIG.name}. All rights reserved.
              </p>
            </div>
            <nav className="flex flex-wrap justify-center gap-8 text-xs font-bold uppercase tracking-widest text-brand-coffee/70">
              {CATEGORIES.map((c) => (
                <Link key={c.slug} href={`/${c.slug}`} className="hover:text-brand-brown">
                  {c.label}
                </Link>
              ))}
              <Link href="/about" className="hover:text-brand-brown">关于</Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
