"use client";

import { Menu, Moon, Sun } from "lucide-react";
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

const LINKS = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
] as const;

const EMAIL = "sageturn01@gmail.com";

export function SiteNav() {
  const { theme, toggleTheme } = useTheme();
  const [progress, setProgress] = useState(0);
  const [lifted, setLifted] = useState(false);
  const [active, setActive] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? el.scrollTop / max : 0);
      setLifted(el.scrollTop > 12);

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
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-[16px] backdrop-saturate-[180%] transition-[border-color] duration-300"
      style={{
        background: "color-mix(in srgb, var(--site-bg) 85%, transparent)",
        borderBottomColor: lifted ? "var(--site-line)" : "transparent",
      }}
    >
      <div className="flex items-center justify-between px-6 py-4 md:px-14 md:py-5">
        <a
          href="#top"
          className="shrink-0"
          aria-label="Sage Turner — back to top"
        >
          <SageMark size={26} />
        </a>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Sections"
        >
          {LINKS.map(({ id, label }) => (
            <NavLink key={id} id={id} label={label} active={active === id} />
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="grid size-[34px] place-items-center rounded-full border transition-colors duration-[250ms] hover:bg-[var(--site-hair)]"
            style={{ borderColor: "var(--site-line)" }}
          >
            {theme === "dark" ? (
              <Sun className="size-4" />
            ) : (
              <Moon className="size-4" />
            )}
          </button>

          <a
            href={`mailto:${EMAIL}`}
            className="hidden rounded-full px-[18px] py-[9px] text-sm font-medium transition-transform duration-[250ms] hover:-translate-y-px sm:inline-block"
            style={{ background: "var(--site-ink)", color: "var(--site-bg)" }}
          >
            Get in touch
          </a>

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger
              className="grid size-[34px] place-items-center rounded-full border md:hidden"
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
                    href={`#${id}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </a>
                ))}
                <a href={`mailto:${EMAIL}`} onClick={() => setMenuOpen(false)}>
                  Get in touch
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="h-0.5 w-full">
        <div
          className="h-full transition-[width] duration-100 ease-linear"
          style={{
            width: `${progress * 100}%`,
            background: "linear-gradient(90deg, #E43E2B, #F0B501, #60C166)",
          }}
        />
      </div>
    </header>
  );
}

function NavLink({
  id,
  label,
  active,
}: {
  id: string;
  label: string;
  active: boolean;
}) {
  return (
    <a
      href={`#${id}`}
      className={cn(
        "relative text-[15px] transition-opacity duration-300",
        active ? "opacity-100" : "opacity-60 hover:opacity-100",
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
