"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useRouter } from "next/navigation";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type Rect = { top: number; left: number; width: number; height: number };

type Flight = {
  href: string;
  color: string;
  ink: string;
  label: string;
  from: Rect;
  /** Viewport size at launch — the flood's end state. */
  to: { width: number; height: number };
  radius: number;
  /** Set once the destination page has mounted — the overlay dissolves. */
  landed: boolean;
};

type TransitionApi = {
  /** Grow `el` into a full-bleed flood of `color`, then navigate to `href`. */
  launch: (
    el: HTMLElement,
    opts: { href: string; color: string; ink: string; label: string },
  ) => void;
  /** Called by the destination page once it is on screen. */
  land: () => void;
};

const Ctx = createContext<TransitionApi | null>(null);

/** Escape hatch for pages rendered outside the provider (tests, storybook). */
const NOOP: TransitionApi = { launch: () => {}, land: () => {} };

export function useProjectTransition() {
  return useContext(Ctx) ?? NOOP;
}

/**
 * Owns the flood overlay. Lives in the root layout so the animation survives
 * the route change that happens underneath it.
 */
export function ProjectTransitionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const reduced = useReducedMotion();
  const [flight, setFlight] = useState<Flight | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const launch = useCallback<TransitionApi["launch"]>(
    (el, { href, color, ink, label }) => {
      if (reduced) {
        router.push(href);
        return;
      }
      const box = el.getBoundingClientRect();
      const radius = Number.parseFloat(
        getComputedStyle(el).borderTopLeftRadius,
      );
      setFlight({
        href,
        color,
        ink,
        label,
        radius: Number.isFinite(radius) ? radius : 26,
        from: {
          top: box.top,
          left: box.left,
          width: box.width,
          height: box.height,
        },
        to: { width: window.innerWidth, height: window.innerHeight },
        landed: false,
      });
    },
    [reduced, router],
  );

  const land = useCallback(() => {
    setFlight((f) => (f && !f.landed ? { ...f, landed: true } : f));
  }, []);

  // The overlay must never outlive the navigation, even if the destination
  // never reports in (bad route, error boundary, prefetch miss).
  useEffect(() => {
    if (!flight) return;
    timer.current = setTimeout(land, 2200);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [flight, land]);

  useEffect(() => {
    document.body.style.overflow = flight && !flight.landed ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [flight]);

  return (
    <Ctx.Provider value={{ launch, land }}>
      {children}
      <AnimatePresence>
        {flight && !flight.landed && (
          <motion.div
            key="flood"
            className="pointer-events-none fixed z-[200] overflow-hidden"
            style={{ background: flight.color, color: flight.ink }}
            initial={{ ...flight.from, borderRadius: flight.radius }}
            animate={{
              top: 0,
              left: 0,
              width: flight.to.width,
              height: flight.to.height,
              borderRadius: 0,
            }}
            exit={{
              opacity: 0,
              transition: { duration: 0.5, ease: "easeOut" },
            }}
            transition={{ duration: 0.62, ease: [0.72, 0, 0.16, 1] }}
            onAnimationComplete={() => router.push(flight.href)}
          >
            {/* Bloom — the "glow" the card carries with it into the page. */}
            <motion.span
              aria-hidden="true"
              className="absolute top-1/2 left-1/2 aspect-square w-[140vmax] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgb(255 255 255 / 0.42) 0%, rgb(255 255 255 / 0.10) 38%, transparent 66%)",
              }}
              initial={{ scale: 0.15, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
            />
            <motion.span
              className="absolute inset-0 flex items-center justify-center px-8 text-center font-serif text-[clamp(34px,7vw,86px)] leading-none tracking-[-1.5px] italic"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                delay: 0.24,
                ease: [0.2, 0.7, 0.2, 1],
              }}
            >
              {flight.label}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
}

/**
 * Rendered by a project page. Dissolves the flood once the page is painted,
 * revealing a hero that is already the same color underneath.
 */
export function ProjectArrival() {
  const { land } = useProjectTransition();
  useEffect(() => {
    const raf = requestAnimationFrame(() => requestAnimationFrame(land));
    return () => cancelAnimationFrame(raf);
  }, [land]);
  return null;
}
