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
            关于 {SITE_CONFIG.name}
          </h1>
        </div>
      </section>

      {/* About Content */}
      <section className="mx-auto max-w-4xl px-6 py-24 sm:py-32">
        <div className="rounded-3xl bg-white p-8 shadow-xl shadow-brand-brown/5 sm:p-16">
          <div className="prose prose-stone max-w-none">
            <h2 className="font-serif text-3xl font-semibold text-brand-coffee">站点定位</h2>
            <p className="mt-8 text-xl leading-relaxed text-brand-coffee/80">
              这是一个个人内容站，用来打磨我对未来十年的判断。我会把自己的假设写清楚，把支撑这些假设的证据和推导记录下来，并在现实信号变化时更新结论。
            </p>
            
            <p className="mt-6 text-xl leading-relaxed text-brand-coffee/80">
              我目前重点关注三个主题：AI、稳定币、区块链。它们未必需要被强行串成一个统一叙事；对我来说，更重要的是持续追踪这些变量如何改变生产力、价值流动与协作秩序，以及它们各自的边界条件、风险与真实落地路径。
            </p>

            <div className="mt-16 grid gap-8 sm:grid-cols-3">
              <div className="rounded-2xl bg-brand-sand p-8">
                <h3 className="font-serif text-xl font-semibold text-brand-coffee">AI</h3>
                <p className="mt-4 text-sm text-brand-coffee/70">
                  生产力革命与硅基智能。
                </p>
              </div>
              <div className="rounded-2xl bg-brand-sand p-8">
                <h3 className="font-serif text-xl font-semibold text-brand-coffee">Stablecoin</h3>
                <p className="mt-4 text-sm text-brand-coffee/70">
                  价值流动的全球润滑剂。
                </p>
              </div>
              <div className="rounded-2xl bg-brand-sand p-8">
                <h3 className="font-serif text-xl font-semibold text-brand-coffee">Blockchain</h3>
                <p className="mt-4 text-sm text-brand-coffee/70">
                  宇宙通用的可信账本。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
