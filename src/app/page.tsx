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
      {/* Hero Section - 模仿图片中的顶部大图风格 */}
      <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-brand-coffee">
        <div className="absolute inset-0 opacity-40">
          {/* 模拟背景图 */}
          <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <span className="mb-4 block text-sm font-semibold uppercase tracking-[0.3em] text-brand-cream/80">
            Welcome to {SITE_CONFIG.name}
          </span>
          <h1 className="font-serif text-5xl font-bold leading-tight text-white sm:text-7xl">
            Join us for Community <br /> Building Week
          </h1>
          <div className="mt-12">
            <Link
              href="/login"
              className="inline-block rounded-full bg-brand-brown px-10 py-4 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-brand-cream hover:text-brand-coffee"
            >
              Register Now
            </Link>
          </div>
        </div>
      </section>

      {/* Intro Section - 模仿图片中的 "Each person matters" 部分 */}
      <section className="bg-brand-cream py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div className="order-2 lg:order-1">
              <h2 className="font-serif text-4xl font-semibold text-brand-coffee sm:text-5xl">
                Each person matters
              </h2>
              <p className="mt-8 text-lg leading-relaxed text-brand-coffee/70">
                {SITE_CONFIG.description} 我们致力于构建一个开放、理性、有信息密度的讨论环境。
                无论你是开发者、研究者还是爱好者，你的声音在这里都至关重要。
              </p>
              <div className="mt-10">
                <blockquote className="relative border-l-2 border-brand-brown pl-8 py-2">
                  <span className="absolute -left-2 -top-4 font-serif text-6xl text-brand-brown/20">“</span>
                  <p className="font-serif text-xl italic text-brand-brown">
                    A better world starts with a caring community.
                  </p>
                </blockquote>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-brand-sand shadow-2xl">
                <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule/Topics Section - 模仿图片中的 "Schedule of Events" */}
      <section className="bg-brand-brown py-24 text-white">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="font-serif text-4xl font-semibold sm:text-5xl">
            Explore Our Topics
          </h2>
          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            {CATEGORIES.map(({ slug, label, description }) => (
              <Link
                key={slug}
                href={`/${slug}`}
                className="group relative overflow-hidden rounded-2xl bg-white/10 p-10 backdrop-blur-sm transition hover:bg-white hover:text-brand-coffee"
              >
                <span className="mb-4 block text-xs font-bold uppercase tracking-widest text-brand-cream group-hover:text-brand-brown">
                  Category
                </span>
                <h3 className="font-serif text-2xl font-semibold">{label}</h3>
                <p className="mt-4 text-sm opacity-70 group-hover:opacity-100">{description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Posts - 模仿图片中的 "Community Reflections" */}
      <section className="bg-brand-cream py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16 flex items-end justify-between">
            <div>
              <h2 className="font-serif text-4xl font-semibold text-brand-coffee sm:text-5xl">
                Community Reflections
              </h2>
              <p className="mt-4 text-brand-coffee/60 uppercase tracking-widest text-sm font-bold">
                Latest discussions from our members
              </p>
            </div>
            <Link href="/ai" className="hidden text-sm font-bold uppercase tracking-widest text-brand-brown hover:underline sm:block">
              View All Posts →
            </Link>
          </div>

          <div className="grid gap-12 lg:grid-cols-3">
            {featured && (
              <Link
                href={`/post/${featured.id}`}
                className="group lg:col-span-2"
              >
                <div className="aspect-[16/9] overflow-hidden rounded-3xl bg-brand-sand shadow-lg">
                  <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"></div>
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
              {rest.slice(0, 3).map((post) => (
                <Link
                  key={post.id}
                  href={`/post/${post.id}`}
                  className="group flex gap-6"
                >
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl bg-brand-sand">
                    <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80')] bg-cover bg-center transition-transform duration-500 group-hover:scale-110"></div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-brown">
                      {categoryMap[post.category_slug]}
                    </span>
                    <h4 className="mt-1 font-serif text-lg font-semibold leading-tight text-brand-coffee group-hover:text-brand-brown line-clamp-2">
                      {post.title}
                    </h4>
                    <span className="mt-2 text-[10px] uppercase tracking-widest text-brand-coffee/40">
                      Read more
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="relative overflow-hidden bg-brand-coffee py-24 text-center text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
        </div>
        <div className="relative z-10 mx-auto max-w-2xl px-6">
          <h2 className="font-serif text-4xl font-semibold sm:text-5xl">
            Register Now
          </h2>
          <p className="mt-6 text-lg text-brand-cream/70">
            加入我们的社区，参与讨论，分享你的见解。
          </p>
          <div className="mt-10">
            <Link
              href="/login"
              className="inline-block rounded-full bg-brand-brown px-10 py-4 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-brand-cream hover:text-brand-coffee"
            >
              Get Started
            </Link>
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
              <Link href="/about" className="hover:text-brand-brown">About</Link>
              {CATEGORIES.map((c) => (
                <Link key={c.slug} href={`/${c.slug}`} className="hover:text-brand-brown">
                  {c.label}
                </Link>
              ))}
            </nav>
            <div className="flex gap-6">
              {/* Social Icons Placeholder */}
              <div className="h-5 w-5 rounded-full bg-brand-coffee/20"></div>
              <div className="h-5 w-5 rounded-full bg-brand-coffee/20"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
