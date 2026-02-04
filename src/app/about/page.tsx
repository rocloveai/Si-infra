import Image from "next/image";
import { SITE_CONFIG } from "@/lib/constants";

export default function AboutPage() {
  return (
    <div className="bg-brand-cream min-h-screen">
      {/* About Header */}
      <section className="relative h-[50vh] w-full overflow-hidden bg-brand-dark">
        <div className="absolute inset-0">
          <Image
            src="/images/adventure.jpg"
            alt="About header"
            fill
            className="object-cover opacity-40"
          />
        </div>
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <h1 className="font-display text-5xl font-bold text-white sm:text-7xl">
            关于我们
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/80 sm:text-xl">
            探索未来十年的变革力量
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-12 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image
              src="/images/vintage-car.jpg"
              alt="Mission"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="font-display text-4xl font-bold text-brand-dark sm:text-5xl">
              我们的使命
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-brand-muted">
              这是一个个人内容站，用来打磨我对未来十年的判断。我会把自己的假设写清楚，把支撑这些假设的证据和推导记录下来，并在现实信号变化时更新结论。
            </p>
            <p className="mt-4 text-lg leading-relaxed text-brand-muted">
              我目前重点关注三个主题：AI、稳定币、区块链。它们未必需要被强行串成一个统一叙事；对我来说，更重要的是持续追踪这些变量如何改变生产力、价值流动与协作秩序，以及它们各自的边界条件、风险与真实落地路径。
            </p>
          </div>
        </div>
      </section>

      {/* Focus Areas Section */}
      <section className="bg-white py-20 sm:py-32">
        <div className="mx-auto max-w-6xl px-6 sm:px-12">
          <div className="mb-16 text-center">
            <h2 className="font-display text-4xl font-bold text-brand-dark sm:text-5xl">
              核心关注领域
            </h2>
            <p className="mt-4 text-lg text-brand-muted">
              三个改变世界的关键主题
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="group overflow-hidden rounded-3xl bg-gradient-to-br from-brand-blue/10 to-brand-blue/5 p-8 shadow-lg transition-all hover:-translate-y-2 hover:shadow-xl">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-blue text-2xl font-bold text-white">
                AI
              </div>
              <h3 className="font-display text-2xl font-bold text-brand-dark">
                人工智能
              </h3>
              <p className="mt-4 text-base leading-relaxed text-brand-muted">
                生产力革命与硅基智能。探索 AI 如何重塑我们的工作方式和创造价值的方式。
              </p>
            </div>
            <div className="group overflow-hidden rounded-3xl bg-gradient-to-br from-brand-orange/10 to-brand-orange/5 p-8 shadow-lg transition-all hover:-translate-y-2 hover:shadow-xl">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-orange text-2xl font-bold text-white">
                $
              </div>
              <h3 className="font-display text-2xl font-bold text-brand-dark">
                稳定币
              </h3>
              <p className="mt-4 text-base leading-relaxed text-brand-muted">
                价值流动的全球润滑剂。研究稳定币如何改变全球金融体系和支付方式。
              </p>
            </div>
            <div className="group overflow-hidden rounded-3xl bg-gradient-to-br from-brand-dark/10 to-brand-dark/5 p-8 shadow-lg transition-all hover:-translate-y-2 hover:shadow-xl">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-dark text-2xl font-bold text-white">
                ⛓
              </div>
              <h3 className="font-display text-2xl font-bold text-brand-dark">
                区块链
              </h3>
              <p className="mt-4 text-base leading-relaxed text-brand-muted">
                宇宙通用的可信账本。追踪区块链技术如何构建新的协作秩序和信任机制。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-brand-cream py-20 sm:py-32">
        <div className="mx-auto max-w-6xl px-6 sm:px-12">
          <div className="mb-16 text-center">
            <h2 className="font-display text-4xl font-bold text-brand-dark sm:text-5xl">
              我们的价值观
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="rounded-3xl bg-white p-8 shadow-md">
              <h3 className="font-display text-xl font-bold text-brand-dark">
                独立思考
              </h3>
              <p className="mt-4 text-base leading-relaxed text-brand-muted">
                不盲从主流叙事，基于第一性原理和实证数据形成自己的判断。
              </p>
            </div>
            <div className="rounded-3xl bg-white p-8 shadow-md">
              <h3 className="font-display text-xl font-bold text-brand-dark">
                持续更新
              </h3>
              <p className="mt-4 text-base leading-relaxed text-brand-muted">
                随着现实信号的变化，及时修正假设和结论，保持认知的动态演进。
              </p>
            </div>
            <div className="rounded-3xl bg-white p-8 shadow-md">
              <h3 className="font-display text-xl font-bold text-brand-dark">
                长期主义
              </h3>
              <p className="mt-4 text-base leading-relaxed text-brand-muted">
                关注未来十年的结构性变化，而非短期的市场波动和炒作热点。
              </p>
            </div>
            <div className="rounded-3xl bg-white p-8 shadow-md">
              <h3 className="font-display text-xl font-bold text-brand-dark">
                开放分享
              </h3>
              <p className="mt-4 text-base leading-relaxed text-brand-muted">
                公开分享思考过程和推导逻辑，与志同道合的人共同探索未来。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-dark py-20 sm:py-32">
        <div className="mx-auto max-w-4xl px-6 text-center sm:px-12">
          <h2 className="font-display text-4xl font-bold text-white sm:text-5xl">
            加入我们的探索之旅
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/80">
            订阅我们的内容，一起见证未来的到来
          </p>
          <div className="mt-10">
            <a
              href="/"
              className="inline-block rounded-full bg-brand-blue px-10 py-4 text-base font-semibold text-white transition hover:bg-brand-orange"
            >
              开始阅读
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
