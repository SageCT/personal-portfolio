"use client";

import { ArrowUpRight, Mail } from "lucide-react";
import { type MouseEvent, useRef } from "react";
import { useProjectTransition } from "@/components/site/project-transition";
import type { Channel, ChannelIcon } from "@/lib/contact";

/**
 * lucide dropped its brand icons in 1.x, so the two logos are inline marks.
 * Both are the official paths, drawn in `currentColor` on a 24-unit grid.
 */
const BRAND_PATHS: Record<"github" | "linkedin", string> = {
  github:
    "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  linkedin:
    "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
};

function ChannelGlyph({ icon }: { icon: ChannelIcon }) {
  if (icon === "mail") {
    return <Mail aria-hidden="true" className="size-8 md:size-10" />;
  }
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="size-8 md:size-10"
    >
      <path d={BRAND_PATHS[icon]} />
    </svg>
  );
}

/**
 * One of the three contact boxes. Same flood transition as a work card — the
 * box's color takes the screen before the handoff, whether that's an outbound
 * navigation or the mail client opening.
 */
export function ContactCard({ channel }: { channel: Channel }) {
  const card = useRef<HTMLAnchorElement>(null);
  const { launch } = useProjectTransition();

  const open = (e: MouseEvent) => {
    // Let modified clicks open a tab the way the browser expects.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    if (!card.current) return;
    launch(card.current, {
      href: channel.href,
      mode: channel.mode,
      color: channel.bg,
      ink: channel.fg,
      label: channel.label,
    });
  };

  return (
    <a
      ref={card}
      href={channel.href}
      onClick={open}
      {...(channel.mode === "external"
        ? { target: "_blank", rel: "noreferrer" }
        : {})}
      className="group relative flex h-full min-h-[260px] flex-col justify-between overflow-hidden rounded-[26px] p-7 shadow-[0_1px_2px_rgb(0_0_0/0.05)] transition-[transform,box-shadow] duration-[550ms] ease-[var(--ease-house)] hover:-translate-y-[5px] hover:shadow-[0_30px_60px_-28px_rgb(0_0_0/0.45)] focus-visible:-translate-y-[5px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current md:min-h-[340px] md:p-9"
      style={{ background: channel.bg, color: channel.fg }}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 -right-10 size-[200px] rounded-full bg-white/[0.13] transition-transform duration-[800ms] ease-[var(--ease-house)] group-hover:scale-[1.12]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[70px] left-[38%] size-[140px] rounded-full bg-black/[0.07]"
      />

      <div className="relative flex items-start justify-between gap-4">
        <ChannelGlyph icon={channel.icon} />
        <ArrowUpRight
          aria-hidden="true"
          className="size-6 transition-transform duration-[350ms] ease-[var(--ease-house)] group-hover:translate-x-1 group-hover:-translate-y-1"
        />
      </div>

      <div className="relative">
        <p className="font-mono text-[11px] tracking-[1.8px] uppercase">
          {channel.label}
        </p>
        <p className="mt-2.5 font-serif text-[clamp(24px,2.6vw,34px)] leading-[1.05] tracking-[-0.5px] break-words">
          {channel.handle}
        </p>
        <p className="mt-3 max-w-[34ch] text-[15px] leading-[1.5] text-pretty">
          {channel.note}
        </p>
      </div>
    </a>
  );
}
