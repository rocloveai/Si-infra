"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { SITE_CONFIG } from "@/lib/constants";

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
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-brand-cream px-6 py-12">
      <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl shadow-brand-brown/10">
        <div className="bg-brand-coffee px-8 py-12 text-center text-white">
          <h1 className="font-serif text-3xl font-bold">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="mt-2 text-sm text-brand-cream/60 uppercase tracking-widest">
            {isSignUp ? "Join the community" : "Login to your account"}
          </p>
        </div>
        
        <div className="p-8 sm:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-brand-coffee/50">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-2 w-full border-b border-brand-border bg-transparent py-3 text-brand-coffee placeholder:text-brand-coffee/30 focus:border-brand-brown focus:outline-none transition-colors"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-xs font-bold uppercase tracking-widest text-brand-coffee/50">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="mt-2 w-full border-b border-brand-border bg-transparent py-3 text-brand-coffee placeholder:text-brand-coffee/30 focus:border-brand-brown focus:outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>
            
            {message && (
              <p className={`text-sm font-medium ${message.type === "ok" ? "text-brand-brown" : "text-red-500"}`}>
                {message.text}
              </p>
            )}
            
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-brand-brown py-4 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-brand-coffee disabled:opacity-50"
            >
              {loading ? "Processing..." : isSignUp ? "Sign Up" : "Login"}
            </button>
          </form>
          
          <div className="mt-10 text-center">
            <p className="text-sm text-brand-coffee/60">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp((v) => !v);
                  setMessage(null);
                }}
                className="font-bold text-brand-brown hover:underline"
              >
                {isSignUp ? "Login" : "Sign Up"}
              </button>
            </p>
            <Link href="/" className="mt-6 inline-block text-xs font-bold uppercase tracking-widest text-brand-coffee/40 hover:text-brand-coffee">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
