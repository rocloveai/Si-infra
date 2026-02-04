export const CATEGORIES = [
  { slug: "ai", label: "AI", description: "人工智能与机器学习" },
  { slug: "stablecoin", label: "Stablecoin", description: "稳定币与支付基础设施" },
  { slug: "web3", label: "Web3", description: "区块链与去中心化应用" },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]["slug"];

export const NAV_ITEMS = [
  ...CATEGORIES.map((c) => ({ href: `/${c.slug}`, label: c.label })),
  { href: "/about", label: "About" },
] as const;

export const SITE_CONFIG = {
  name: "Si-Infra",
  description: "Web2 论坛 — 极简工业风，聚焦 AI、Stablecoin、Web3。",
  url: "https://si-infra.vercel.app", // 示例 URL
};
