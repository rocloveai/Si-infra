export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="text-2xl font-semibold tracking-tight text-[var(--text)]">
        About
      </h1>
      <p className="mt-4 text-[var(--text-muted)] leading-relaxed">
        Si-Infra 是一个 Web2 论坛，聚焦 AI、Stablecoin、Web3 与基础设施话题。
        采用 Next.js 14 (App Router) 与 Supabase 构建，支持 Markdown、图片与视频嵌入。
      </p>
    </div>
  );
}
