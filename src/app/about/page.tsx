import { SITE_CONFIG } from "@/lib/constants";

export default function AboutPage() {
  return (
    <div className="bg-brand-cream min-h-screen">
      {/* About Header */}
      <section className="relative h-[40vh] w-full overflow-hidden bg-brand-coffee">
        <div className="absolute inset-0 opacity-30">
          <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
        </div>
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <h1 className="font-serif text-5xl font-bold text-white sm:text-6xl">
            About {SITE_CONFIG.name}
          </h1>
        </div>
      </section>

      {/* About Content */}
      <section className="mx-auto max-w-4xl px-6 py-24 sm:py-32">
        <div className="rounded-3xl bg-white p-8 shadow-xl shadow-brand-brown/5 sm:p-16">
          <div className="prose prose-stone max-w-none">
            <h2 className="font-serif text-3xl font-semibold text-brand-coffee">Our Vision</h2>
            <p className="mt-6 text-lg leading-relaxed text-brand-coffee/70">
              {SITE_CONFIG.name} 是一个 Web2 论坛，聚焦 AI、Stablecoin、Web3 与基础设施话题。
              我们相信，在技术飞速发展的今天，一个开放、理性且具有信息密度的讨论环境比以往任何时候都更加重要。
            </p>
            
            <div className="my-12 grid gap-8 sm:grid-cols-2">
              <div className="rounded-2xl bg-brand-sand p-8">
                <h3 className="font-serif text-xl font-semibold text-brand-coffee">Technology</h3>
                <p className="mt-4 text-sm text-brand-coffee/70">
                  采用 Next.js 14 (App Router) 与 Supabase 构建，确保极致的性能与安全性。
                </p>
              </div>
              <div className="rounded-2xl bg-brand-sand p-8">
                <h3 className="font-serif text-xl font-semibold text-brand-coffee">Community</h3>
                <p className="mt-4 text-sm text-brand-coffee/70">
                  支持 Markdown、图片与视频嵌入，让每一篇分享都能以最完美的形式呈现。
                </p>
              </div>
            </div>

            <h2 className="mt-16 font-serif text-3xl font-semibold text-brand-coffee">Join the Conversation</h2>
            <p className="mt-6 text-lg leading-relaxed text-brand-coffee/70">
              无论你是行业专家还是初学者，我们都欢迎你加入讨论。在这里，每一个声音都重要，每一次交流都能碰撞出新的火花。
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
