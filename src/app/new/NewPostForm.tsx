"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { CategorySlug } from "@/lib/constants";
import { CATEGORIES } from "@/lib/constants";

const BUCKET = "post-images";

export function NewPostForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [bodyMd, setBodyMd] = useState("");
  const [categorySlug, setCategorySlug] = useState<CategorySlug>(CATEGORIES[0].slug);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    setUploading(true);
    setError(null);
    try {
      const ext = file.name.split(".").pop() || "jpg";
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: uploadErr } = await supabase.storage.from(BUCKET).upload(path, file, {
        cacheControl: "3600",
        upsert: false,
      });
      if (uploadErr) throw uploadErr;
      const { data: { publicUrl } } = supabase.storage.from(BUCKET).getPublicUrl(path);
      setBodyMd((prev) => prev + `\n![image](${publicUrl})\n`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "图片上传失败");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      // 移除用户登录检查，直接插入数据
      // 注意：在实际生产环境中，您可能需要在 Supabase RLS 中允许匿名插入，或者在这里硬编码一个管理员 ID
      const { error: insertErr } = await supabase.from("posts").insert({
        title: title.trim(),
        body_md: bodyMd.trim(),
        category_slug: categorySlug,
        // 如果数据库要求 user_id，您可能需要在这里提供一个默认值或处理 RLS
      });
      if (insertErr) throw insertErr;
      router.push(`/${categorySlug}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "发布失败");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <label htmlFor="title" className="block text-xs font-bold uppercase tracking-widest text-brand-coffee/50">
          标题
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          maxLength={200}
          className="mt-2 w-full border-b border-brand-border bg-transparent py-3 text-brand-coffee placeholder:text-brand-coffee/30 focus:border-brand-brown focus:outline-none transition-colors"
          placeholder="输入文章标题"
        />
      </div>
      <div>
        <label htmlFor="category" className="block text-xs font-bold uppercase tracking-widest text-brand-coffee/50">
          分类
        </label>
        <select
          id="category"
          value={categorySlug}
          onChange={(e) => setCategorySlug(e.target.value as CategorySlug)}
          className="mt-2 w-full border-b border-brand-border bg-transparent py-3 text-brand-coffee focus:border-brand-brown focus:outline-none transition-colors appearance-none"
        >
          {CATEGORIES.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="body" className="block text-xs font-bold uppercase tracking-widest text-brand-coffee/50">
            正文 (Markdown)
          </label>
          <label className="cursor-pointer text-xs font-bold uppercase tracking-widest text-brand-brown hover:underline">
            {uploading ? "上传中…" : "插入图片"}
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              disabled={uploading}
              onChange={handleImageUpload}
            />
          </label>
        </div>
        <textarea
          id="body"
          value={bodyMd}
          onChange={(e) => setBodyMd(e.target.value)}
          required
          rows={12}
          className="mt-2 w-full rounded-2xl border border-brand-border bg-brand-cream/30 p-6 font-sans text-brand-coffee placeholder:text-brand-coffee/30 focus:border-brand-brown focus:outline-none transition-colors"
          placeholder="支持 Markdown 语法..."
        />
      </div>
      {error && (
        <p className="text-sm font-medium text-red-500">{error}</p>
      )}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 rounded-full bg-brand-brown py-4 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-brand-coffee disabled:opacity-50"
        >
          {submitting ? "发布中..." : "立即发布"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-full border border-brand-border px-8 py-4 text-xs font-bold uppercase tracking-widest text-brand-coffee/50 transition hover:bg-brand-cream"
        >
          取消
        </button>
      </div>
    </form>
  );
}
