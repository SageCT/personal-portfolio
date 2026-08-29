"use client";

import { Menu, Moon, Sun } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SageMark } from "@/components/site/brand";
import { useTheme } from "@/components/site/use-theme";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

/** Anchors into the home page's sections. */
const LINKS = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
] as const;

/** Standalone routes, always absolute. */
const PAGES = [
  { href: "/photography", label: "Photos" },
  { href: "/reading", label: "Reading" },
] as const;

/**
 * Floating frosted pill, after the Mobbin header: a fixed, centered capsule
 * hovering over the page rather than a full-width bar attached to it.
 * Geometry is theirs — 584px cap, 60px tall, 30px radius, 48px backdrop blur —
 * the contents and tokens are ours.
 */
export function SiteNav() {
  const { theme, toggleTheme } = useTheme();
  const [active, setActive] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);
  // Section links only scroll on the home page; elsewhere they navigate to it.
  const pathname = usePathname();
  const onHome = pathname === "/";
  const sectionHref = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  useEffect(() => {
    const onScroll = () => {
      let current = "";
      for (const { id } of LINKS) {
        const section = document.getElementById(id);
        if (
          section &&
          section.getBoundingClientRect().top < window.innerHeight * 0.4
        ) {
          current = id;
        }
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-2 md:px-6 md:pt-6">
      <nav
        className="flex h-[60px] w-full max-w-[584px] items-center gap-2.5 rounded-[30px] pr-3 pl-4 backdrop-blur-[48px] backdrop-saturate-[180%] md:pr-3 md:pl-6"
        style={{
          background: "color-mix(in srgb, var(--site-bg) 64%, transparent)",
          border: "1px solid var(--site-line)",
          boxShadow: "0 8px 32px -16px rgb(0 0 0 / 0.25)",
        }}
      >
        <a
          href={onHome ? "#top" : "/"}
          className="shrink-0 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
          aria-label="Sage Turner — back to top"
        >
          <SageMark size={24} showWord={false} inkColor="var(--site-bg)" />
        </a>

        {/* Bare icon beside the mark — no chrome of its own. */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="grid size-8 shrink-0 place-items-center rounded-full opacity-70 transition-opacity duration-[250ms] hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
        >
          {theme === "dark" ? (
            <Sun className="size-4" />
          ) : (
            <Moon className="size-4" />
          )}
        </button>

        {/* Trailing group — 20px gap, pinned right, matching the reference. */}
        <div className="ml-auto flex items-center gap-5">
          <div className="hidden items-center gap-5 md:flex">
            {LINKS.map(({ id, label }) => (
              <NavLink
                key={id}
                href={sectionHref(id)}
                label={label}
                active={onHome && active === id}
              />
            ))}
            {PAGES.map(({ href, label }) => (
              <NavLink
                key={href}
                href={href}
                label={label}
                active={pathname === href}
              />
            ))}
          </div>

          <a
            href="/contact"
            className="hidden shrink-0 rounded-full px-[18px] py-[9px] text-[15px] font-semibold tracking-[0.2px] transition-transform duration-[250ms] hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current sm:inline-block"
            style={{ background: "var(--site-ink)", color: "var(--site-bg)" }}
          >
            Get in touch
          </a>

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger
              className="grid size-10 shrink-0 place-items-center rounded-full border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current md:hidden"
              style={{ borderColor: "var(--site-line)" }}
              aria-label="Open menu"
            >
              <Menu className="size-4" />
            </SheetTrigger>
            <SheetContent side="right" className="w-64 p-8">
              <SheetTitle className="font-serif text-2xl">Menu</SheetTitle>
              <nav className="mt-8 flex flex-col gap-5 text-lg">
                {LINKS.map(({ id, label }) => (
                  <a
                    key={id}
                    href={sectionHref(id)}
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </a>
                ))}
                {PAGES.map(({ href, label }) => (
                  <a key={href} href={href} onClick={() => setMenuOpen(false)}>
                    {label}
                  </a>
                ))}
                <a href="/contact" onClick={() => setMenuOpen(false)}>
                  Get in touch
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}

/** 16px / 600 / 0.2px tracking — the reference's link type. */
function NavLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <a
      href={href}
      className={cn(
        "relative text-base leading-[22px] font-semibold tracking-[0.2px] transition-opacity duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current",
        active ? "opacity-100" : "opacity-70 hover:opacity-100",
      )}
    >
      {label}
      <span
        aria-hidden="true"
        className="absolute right-0 -bottom-1.5 left-0 h-[1.5px] origin-left transition-transform duration-[350ms] ease-[var(--ease-house)]"
        style={{
          background: "var(--color-brand-red)",
          transform: `scaleX(${active ? 1 : 0})`,
        }}
      />
    </a>
  );
}
