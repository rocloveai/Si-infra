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
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("请先登录");
      const { error: insertErr } = await supabase.from("posts").insert({
        title: title.trim(),
        body_md: bodyMd.trim(),
        category_slug: categorySlug,
        user_id: user.id,
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
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-[var(--text-muted)]">
          标题
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          maxLength={200}
          className="mt-1 w-full rounded-md border border-surface-border bg-surface-light px-3 py-2 text-[var(--text)] placeholder:text-[var(--text-muted)] focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          placeholder="帖子标题"
        />
      </div>
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-[var(--text-muted)]">
          分类
        </label>
        <select
          id="category"
          value={categorySlug}
          onChange={(e) => setCategorySlug(e.target.value as CategorySlug)}
          className="mt-1 w-full rounded-md border border-surface-border bg-surface-light px-3 py-2 text-[var(--text)] focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
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
          <label htmlFor="body" className="block text-sm font-medium text-[var(--text-muted)]">
            正文（Markdown）
          </label>
          <label className="cursor-pointer text-sm text-accent hover:underline">
            {uploading ? "上传中…" : "上传图片"}
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
          rows={14}
          className="mt-1 w-full rounded-md border border-surface-border bg-surface-light px-3 py-2 font-mono text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          placeholder="支持 **粗体**、列表、链接等 Markdown 语法。点击「上传图片」插入图片。"
        />
      </div>
      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-md bg-surface-light px-4 py-2 text-sm font-medium text-[var(--text)] hover:bg-surface-border disabled:opacity-50"
        >
          {submitting ? "发布中…" : "发布"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-md px-4 py-2 text-sm font-medium text-[var(--text-muted)] hover:bg-surface-light/50 hover:text-[var(--text)]"
        >
          取消
        </button>
      </div>
    </form>
  );
}
