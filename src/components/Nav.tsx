"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

const navItems = [
  { href: "/ai", label: "AI" },
  { href: "/stablecoin", label: "Stablecoin" },
  { href: "/web3", label: "Web3" },
  { href: "/about", label: "About" },
] as const;

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
    <header className="sticky top-0 z-50 border-b border-surface-border bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/80">
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="font-semibold tracking-tight text-[var(--text)] no-underline transition hover:text-accent"
        >
          Si-Infra
        </Link>
        <div className="flex items-center gap-2">
          <ul className="flex items-center gap-1 sm:gap-2">
            {navItems.map(({ href, label }) => {
              const isActive =
                pathname === href || pathname.startsWith(href + "/");
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`inline-block px-3 py-2 text-sm font-medium transition rounded-md ${
                      isActive
                        ? "text-[var(--text)] bg-surface-light text-accent"
                        : "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-surface-light/50"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <span className="ml-2 h-4 w-px bg-surface-border" aria-hidden />
          {user ? (
            <>
              <Link
                href="/new"
                className="rounded-md px-3 py-2 text-sm font-medium text-[var(--text-muted)] hover:bg-surface-light/50 hover:text-[var(--text)]"
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
                className="rounded-md px-3 py-2 text-sm font-medium text-[var(--text-muted)] hover:bg-surface-light/50 hover:text-[var(--text)]"
              >
                退出
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-md px-3 py-2 text-sm font-medium text-[var(--text-muted)] hover:bg-surface-light/50 hover:text-[var(--text)]"
            >
              登录
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
