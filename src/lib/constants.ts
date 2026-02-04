export const CATEGORIES = [
  { 
    slug: "ai", 
    label: "AI", 
    description: "AI 是人类建立宇宙文明的必然引擎。",
    longDescription: "AI 不只是更强的工具，而是人类迈向宇宙文明的必然基础设施。宇宙尺度的工程与治理需要持续、可复制、可扩展的认知与决策能力：从科学发现、复杂系统设计，到长期自治与极端环境下的运行维护。人类的生物上限决定了必须引入硅基智能作为第二套生产力与理性系统，才能把文明从地表叙事变成跨时间、跨空间的可执行能力。"
  },
  { 
    slug: "stablecoin", 
    label: "Stablecoin", 
    description: "稳定币降低价值转移摩擦，是全球经济的润滑剂。",
    longDescription: "稳定币的意义不在于“币”，而在于把价值转移变成低摩擦、高频、可编程的基础动作。它像全球经济的润滑剂：减少跨境与跨机构的摩擦、缩短结算链条、降低不确定性成本，让交易、协作、雇佣与分配更接近信息流动的效率。价值一旦像数据一样顺畅流动，很多原本被成本压住的组织形态与商业模式才会出现。"
  },
  { 
    slug: "blockchain", 
    label: "Blockchain", 
    description: "区块链是“宇宙通用可信账本”的理想雏形。",
    longDescription: "区块链是一种理想化的底层秩序：把“信任”从个人与机构迁移到可验证的规则与记录。它的核心承诺是：在跨主体、跨地域、跨时间的协作中，仍然能够得到可审计、可追溯、难以篡改的公共记账与状态共识。把它放到更远处看，它像是“宇宙通用的可信账本”雏形——提供不依赖单点权威的记忆、核算与结算能力。"
  },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]["slug"];

export const NAV_ITEMS = [
  { href: "/", label: "主页" },
  { href: "/ai", label: "AI" },
  { href: "/stablecoin", label: "Stablecoin" },
  { href: "/blockchain", label: "Blockchain" },
  { href: "/about", label: "关于" },
] as const;

export const SITE_CONFIG = {
  name: "Si-Infra",
  hero: {
    title: "Notes on the future I’m betting on.",
    subtitle: "A personal content site on AI, Stablecoin, and Blockchain.",
  },
  description: "Web2 论坛 — 极简工业风，聚焦 AI、Stablecoin、Blockchain。",
  url: "https://si-infra.vercel.app",
};
