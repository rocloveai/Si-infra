"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS, SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Nav() {
  const pathname = usePathname();

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
            <Link
              href="/new"
              className="rounded-full bg-brand-brown px-6 py-2 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-brand-coffee"
            >
              POST
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
