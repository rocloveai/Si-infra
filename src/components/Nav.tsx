"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS, SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-brand-border bg-white/95 backdrop-blur-md shadow-sm">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-12">
        <Link
          href="/"
          className="font-display text-xl font-bold tracking-tight text-brand-dark transition hover:text-brand-blue sm:text-2xl"
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
                      "text-sm font-semibold tracking-wide transition-colors",
                      isActive
                        ? "text-brand-blue"
                        : "text-brand-muted hover:text-brand-blue"
                    )}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center gap-4">
            <Link
              href="/new"
              className="rounded-full bg-brand-blue px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-orange"
            >
              发布文章
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
