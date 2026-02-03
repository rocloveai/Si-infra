"use client";

// 从 YouTube 链接提取 video id
function getYoutubeId(href: string): string | null {
  try {
    const u = new URL(href);
    if (u.hostname === "youtu.be") return u.pathname.slice(1) || null;
    if (/youtube\.com|youtube-nocookie\.com/.test(u.hostname))
      return u.searchParams.get("v");
  } catch {
    // ignore
  }
  return null;
}

// 从 Bilibili 链接提取 bvid (BV...) 或 av id
function getBilibiliId(href: string): { bvid?: string; aid?: string } | null {
  try {
    const u = new URL(href);
    const host = u.hostname.toLowerCase();
    if (host === "b23.tv" || host === "www.b23.tv") {
      // 短链需跳转，这里仅支持直接带 bvid 的 URL；若为短链可后端解析
      return null;
    }
    if (host.includes("bilibili.com")) {
      const m = u.pathname.match(/\/video\/(BV[\w]+)/i);
      if (m) return { bvid: m[1] };
      const av = u.pathname.match(/\/video\/av(\d+)/i);
      if (av) return { aid: av[1] };
    }
  } catch {
    // ignore
  }
  return null;
}

export function YoutubeEmbed({ url }: { url: string }) {
  const id = getYoutubeId(url);
  if (!id) return <a href={url} className="text-accent hover:underline">{url}</a>;

  return (
    <div className="my-4 aspect-video w-full max-w-2xl overflow-hidden rounded-lg border border-surface-border">
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-full w-full"
      />
    </div>
  );
}

export function BilibiliEmbed({ url }: { url: string }) {
  const info = getBilibiliId(url);
  if (!info) return <a href={url} className="text-accent hover:underline">{url}</a>;

  const embedUrl = info.bvid
    ? `https://player.bilibili.com/player.html?bvid=${info.bvid}&high_quality=1`
    : `https://player.bilibili.com/player.html?aid=${info.aid}&high_quality=1`;

  return (
    <div className="my-4 aspect-video w-full max-w-2xl overflow-hidden rounded-lg border border-surface-border">
      <iframe
        src={embedUrl}
        title="Bilibili video"
        allowFullScreen
        className="h-full w-full"
      />
    </div>
  );
}

export function isYoutubeLink(href: string): boolean {
  if (!href || !href.startsWith("http")) return false;
  try {
    const h = new URL(href).hostname.toLowerCase();
    return h === "youtu.be" || h.includes("youtube.com");
  } catch {
    return false;
  }
}

export function isBilibiliLink(href: string): boolean {
  if (!href || !href.startsWith("http")) return false;
  try {
    const h = new URL(href).hostname.toLowerCase();
    return h.includes("bilibili.com") || h === "b23.tv" || h === "www.b23.tv";
  } catch {
    return false;
  }
}
