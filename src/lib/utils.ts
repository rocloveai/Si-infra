import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("zh-CN", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function stripMarkdown(md: string, length: number = 120) {
  const stripped = md
    .replace(/#+\s/g, "") // 移除标题
    .replace(/!\[.*?\]\(.*?\)/g, "") // 移除图片
    .replace(/\[(.*?)\]\(.*?\)/g, "$1") // 移除链接但保留文字
    .replace(/(\*\*|__)(.*?)\1/g, "$2") // 移除加粗
    .replace(/(\*|_)(.*?)\1/g, "$2") // 移除斜体
    .replace(/`{1,3}.*?`{1,3}/g, "") // 移除代码块
    .replace(/\n/g, " ") // 换行转空格
    .trim();
  
  if (stripped.length <= length) return stripped;
  return stripped.slice(0, length) + "…";
}
