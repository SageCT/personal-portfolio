"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  /** Seconds. */
  delay?: number;
  /** Pixels the element rises from. */
  y?: number;
  className?: string;
};

/** Scroll-triggered entrance. Fires once — no re-hide on scroll up. */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: RevealProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
