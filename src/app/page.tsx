import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Post } from "@/types/db";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("zh-CN", {
    month: "short",
    day: "numeric",
  });
}

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
  const categoryLabel: Record<string, string> = {
    ai: "AI",
    stablecoin: "Stablecoin",
    web3: "Web3",
  };

  return (
    <>
      {/* Hero */}
      <section className="relative border-b border-surface-border bg-[var(--bg-section)] py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
          <h1 className="text-3xl font-semibold tracking-tight text-[var(--text)] sm:text-4xl md:text-5xl">
            加入 Si-Infra 社区
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-[var(--text-muted)]">
            讨论 AI、Stablecoin、Web3 与基础设施 — 每个声音都重要。
          </p>
          <div className="mt-8">
            <Link
              href="/login"
              className="inline-block rounded-md border border-[var(--accent)] bg-transparent px-6 py-3 text-sm font-medium text-[var(--accent)] transition hover:bg-[var(--accent)]/10"
            >
              立即加入
            </Link>
          </div>
        </div>
      </section>

      {/* 理念 / 双栏 */}
      <section className="border-b border-surface-border bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-[var(--text)] sm:text-3xl">
                每个声音都重要
              </h2>
              <p className="mt-4 leading-relaxed text-[var(--text-muted)]">
                Si-Infra 是一个开放论坛，聚焦 AI、稳定币与 Web3 基础设施。
                无论你是开发者、研究者还是爱好者，都可以在这里发帖、讨论与分享。
              </p>
              <blockquote className="mt-6 border-l-2 border-[var(--accent)] bg-[var(--bg-section)] pl-4 pr-4 py-3 text-[var(--text-muted)]">
                “共建开放、理性、有信息密度的讨论环境。”
              </blockquote>
            </div>
            <div className="flex items-center justify-center rounded-lg border border-surface-border bg-[var(--bg-section)] min-h-[240px]">
              <span className="text-[var(--text-muted)] text-sm tracking-wider">
                SI-INFRA
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 讨论主题 - 三卡片 */}
      <section className="border-b border-surface-border bg-[var(--bg-section)] py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-center text-2xl font-semibold tracking-tight text-[var(--text)] sm:text-3xl">
            讨论主题
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-[var(--text-muted)]">
            按分类浏览与发帖
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              { slug: "ai", label: "AI", desc: "人工智能与机器学习" },
              { slug: "stablecoin", label: "Stablecoin", desc: "稳定币与支付基础设施" },
              { slug: "web3", label: "Web3", desc: "区块链与去中心化应用" },
            ].map(({ slug, label, desc }) => (
              <Link
                key={slug}
                href={`/${slug}`}
                className="group block rounded-lg border border-surface-border bg-surface p-6 text-center transition hover:border-[var(--accent)] hover:bg-surface/80"
              >
                <span className="text-lg font-medium text-[var(--text)] group-hover:text-[var(--accent)]">
                  {label}
                </span>
                <p className="mt-2 text-sm text-[var(--text-muted)]">{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 最新动态 - 表格式/列表 */}
      <section className="border-b border-surface-border bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--text)]">
            最新动态
          </h2>
          <p className="mt-1 text-[var(--text-muted)]">
            按时间排序的近期帖子
          </p>
          {list.length === 0 ? (
            <div className="mt-8 rounded-lg border border-surface-border bg-[var(--bg-section)] py-12 text-center text-[var(--text-muted)]">
              暂无帖子，登录后即可发帖。
            </div>
          ) : (
            <div className="mt-6 overflow-hidden rounded-lg border border-surface-border">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-surface-border bg-[var(--bg-section)]">
                    <th className="px-4 py-3 font-medium text-[var(--text-muted)]">标题</th>
                    <th className="px-4 py-3 font-medium text-[var(--text-muted)]">分类</th>
                    <th className="px-4 py-3 font-medium text-[var(--text-muted)]">日期</th>
                  </tr>
                </thead>
                <tbody>
                  {list.slice(0, 5).map((post) => (
                    <tr key={post.id} className="border-b border-surface-border last:border-0">
                      <td className="px-4 py-3">
                        <Link
                          href={`/post/${post.id}`}
                          className="font-medium text-[var(--text)] hover:text-[var(--accent)]"
                        >
                          {post.title}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-[var(--text-muted)]">
                        {categoryLabel[post.category_slug] ?? post.category_slug}
                      </td>
                      <td className="px-4 py-3 text-[var(--text-muted)]">
                        {formatDate(post.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* 精选 / 社区文章 - 一大 + 多小 */}
      {rest.length > 0 && (
        <section className="border-b border-surface-border bg-[var(--bg-section)] py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-2xl font-semibold tracking-tight text-[var(--text)]">
              社区动态
            </h2>
            <p className="mt-1 text-[var(--text-muted)]">
              与社区一起交流
            </p>
            <div className="mt-8 grid gap-8 md:grid-cols-3">
              {featured && (
                <Link
                  href={`/post/${featured.id}`}
                  className="md:col-span-2 rounded-lg border border-surface-border bg-surface p-6 transition hover:border-[var(--accent)]"
                >
                  <h3 className="font-semibold text-[var(--text)] line-clamp-2">
                    {featured.title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--text-muted)] line-clamp-2">
                    {featured.body_md.replace(/#|\*|\[|\]|\(|\)/g, "").slice(0, 120)}…
                  </p>
                  <span className="mt-4 inline-block text-sm text-[var(--accent)]">
                    阅读更多 →
                  </span>
                </Link>
              )}
              <div className="space-y-4 md:col-span-1">
                {rest.slice(0, 3).map((post) => (
                  <Link
                    key={post.id}
                    href={`/post/${post.id}`}
                    className="block rounded-lg border border-surface-border bg-surface p-4 transition hover:border-[var(--accent)]"
                  >
                    <h3 className="font-medium text-[var(--text)] line-clamp-1 text-sm">
                      {post.title}
                    </h3>
                    <span className="mt-2 inline-block text-xs text-[var(--accent)]">
                      阅读更多
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 底部 CTA */}
      <section className="border-b border-surface-border bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--text)] sm:text-3xl">
            立即加入，参与讨论
          </h2>
          <p className="mt-2 text-[var(--text-muted)]">
            登录后即可发帖、评论，与社区互动。
          </p>
          <div className="mt-6">
            <Link
              href="/login"
              className="inline-block rounded-md border border-[var(--accent)] bg-transparent px-6 py-3 text-sm font-medium text-[var(--accent)] transition hover:bg-[var(--accent)]/10"
            >
              登录 / 注册
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--bg-section)] py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="text-sm text-[var(--text-muted)]">
              Si-Infra · 极简工业风论坛
            </div>
            <nav className="flex gap-6 text-sm">
              <Link href="/about" className="text-[var(--text-muted)] hover:text-[var(--text)]">
                关于
              </Link>
              <Link href="/ai" className="text-[var(--text-muted)] hover:text-[var(--text)]">
                AI
              </Link>
              <Link href="/stablecoin" className="text-[var(--text-muted)] hover:text-[var(--text)]">
                Stablecoin
              </Link>
              <Link href="/web3" className="text-[var(--text-muted)] hover:text-[var(--text)]">
                Web3
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </>
  );
}
