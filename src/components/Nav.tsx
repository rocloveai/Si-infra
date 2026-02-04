"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import { NAV_ITEMS, SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user: u } }) => setUser(u));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-brand-border bg-brand-cream/80 backdrop-blur-md">
      <nav className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-serif text-2xl font-semibold tracking-tight text-brand-coffee transition hover:text-brand-brown"
        >
          {SITE_CONFIG.name}
        </Link>
        <div className="flex items-center gap-8">
          <ul className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.map(({ href, label }) => {
              const isActive =
                pathname === href || pathname.startsWith(href + "/");
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={cn(
                      "text-sm font-medium tracking-wide transition-colors uppercase",
                      isActive
                        ? "text-brand-brown"
                        : "text-brand-coffee/70 hover:text-brand-brown"
                    )}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center gap-4 border-l border-brand-border pl-8">
            {user ? (
              <>
                <Link
                  href="/new"
                  className="rounded-full bg-brand-brown px-5 py-2 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-brand-coffee"
                >
                  发帖
                </Link>
                <button
                  type="button"
                  onClick={async () => {
                    const supabase = createClient();
                    await supabase.auth.signOut();
                    router.refresh();
                    router.push("/");
                  }}
                  className="text-xs font-semibold uppercase tracking-widest text-brand-coffee/70 hover:text-brand-brown"
                >
                  退出
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="rounded-full border border-brand-brown px-5 py-2 text-xs font-semibold uppercase tracking-widest text-brand-brown transition hover:bg-brand-brown hover:text-white"
              >
                登录
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
