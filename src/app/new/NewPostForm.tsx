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
      const { error: insertErr } = await supabase.from("posts").insert({
        title: title.trim(),
        body_md: bodyMd.trim(),
        category_slug: categorySlug,
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
        <label htmlFor="title" className="block text-sm font-semibold text-brand-dark">
          标题
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          maxLength={200}
          className="mt-2 w-full rounded-2xl border border-brand-border bg-white px-6 py-4 text-brand-dark placeholder:text-brand-muted focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all"
          placeholder="输入文章标题"
        />
      </div>
      <div>
        <label htmlFor="category" className="block text-sm font-semibold text-brand-dark">
          分类
        </label>
        <select
          id="category"
          value={categorySlug}
          onChange={(e) => setCategorySlug(e.target.value as CategorySlug)}
          className="mt-2 w-full rounded-2xl border border-brand-border bg-white px-6 py-4 text-brand-dark focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all appearance-none"
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
          <label htmlFor="body" className="block text-sm font-semibold text-brand-dark">
            正文 (Markdown)
          </label>
          <label className="cursor-pointer text-sm font-semibold text-brand-blue hover:text-brand-orange transition-colors">
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
          className="mt-2 w-full rounded-2xl border border-brand-border bg-white p-6 font-sans text-brand-dark placeholder:text-brand-muted focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all"
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
          className="flex-1 rounded-full bg-brand-blue py-4 text-sm font-semibold text-white transition hover:bg-brand-orange disabled:opacity-50"
        >
          {submitting ? "发布中..." : "立即发布"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-full border-2 border-brand-border px-8 py-4 text-sm font-semibold text-brand-muted transition hover:bg-brand-cream"
        >
          取消
        </button>
      </div>
    </form>
  );
}
