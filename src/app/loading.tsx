export default function Loading() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-accent border-t-transparent"></div>
        <p className="text-sm text-[var(--text-muted)]">加载中...</p>
      </div>
    </div>
  );
}
