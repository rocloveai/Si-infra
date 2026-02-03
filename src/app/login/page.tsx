"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "error"; text: string } | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);

  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${location.origin}/auth/callback` },
        });
        if (error) throw error;
        setMessage({ type: "ok", text: "请查收邮件确认链接后登录。" });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        const next = new URLSearchParams(location.search).get("next") || "/";
        window.location.href = next;
      }
    } catch (err: unknown) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "操作失败",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-sm px-4 py-16 sm:px-6">
      <h1 className="text-xl font-semibold text-[var(--text)]">
        {isSignUp ? "注册" : "登录"}
      </h1>
      <p className="mt-1 text-sm text-[var(--text-muted)]">
        使用邮箱 {isSignUp ? "注册" : "登录"} Si-Infra
      </p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[var(--text-muted)]">
            邮箱
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 w-full rounded-md border border-surface-border bg-surface-light px-3 py-2 text-[var(--text)] placeholder:text-[var(--text-muted)] focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-[var(--text-muted)]">
            密码
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="mt-1 w-full rounded-md border border-surface-border bg-surface-light px-3 py-2 text-[var(--text)] placeholder:text-[var(--text-muted)] focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            placeholder="••••••••"
          />
        </div>
        {message && (
          <p
            className={`text-sm ${
              message.type === "ok" ? "text-accent" : "text-red-400"
            }`}
          >
            {message.text}
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-surface-light px-4 py-2 text-sm font-medium text-[var(--text)] hover:bg-surface-border disabled:opacity-50"
        >
          {loading ? "处理中…" : isSignUp ? "注册" : "登录"}
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-[var(--text-muted)]">
        {isSignUp ? "已有账号？" : "没有账号？"}{" "}
        <button
          type="button"
          onClick={() => {
            setIsSignUp((v) => !v);
            setMessage(null);
          }}
          className="text-accent hover:underline"
        >
          {isSignUp ? "登录" : "注册"}
        </button>
      </p>
      <p className="mt-4 text-center">
        <Link href="/" className="text-sm text-[var(--text-muted)] hover:text-[var(--text)]">
          ← 返回首页
        </Link>
      </p>
    </div>
  );
}
