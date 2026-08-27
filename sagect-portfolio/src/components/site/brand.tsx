import { cn } from "@/lib/utils";

export const BRAND = {
  red: "#E43E2B",
  yellow: "#F0B501",
  green: "#60C166",
  blue: "#54B0D5",
  royal: "#3B7DED",
  svelte: "#FF3E00",
  ink: "#111111",
  bone: "#FAF7F2",
} as const;

type SageMarkProps = {
  size?: number;
  /** Circle fill. */
  color?: string;
  /** The knocked-out "s" — should match the surface behind the mark. */
  inkColor?: string;
  showWord?: boolean;
  wordClassName?: string;
};

/** Dot + italic serif wordmark. The signature mark, used in the nav and footer. */
export function SageMark({
  size = 26,
  color = BRAND.red,
  inkColor = "var(--site-bg)",
  showWord = true,
  wordClassName,
}: SageMarkProps) {
  return (
    <span
      className="inline-flex items-center align-middle"
      style={{ gap: showWord ? 10 : 0 }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        className="block"
        aria-hidden="true"
      >
        <circle cx="20" cy="20" r="18" fill={color} />
        <text
          x="20"
          y="20"
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily="var(--font-instrument-serif), Georgia, serif"
          fontStyle="italic"
          fontSize="26"
          fill={inkColor}
        >
          s
        </text>
      </svg>
      {showWord && (
        <span
          className={cn(
            "font-serif italic leading-none whitespace-nowrap",
            wordClassName,
          )}
          style={{ fontSize: Math.round(size * 0.82), letterSpacing: -0.2 }}
        >
          Sage Turner
        </span>
      )}
    </span>
  );
}

type ConfettiFieldProps = {
  count?: number;
  seed?: number;
  opacity?: number;
  sizeRange?: [number, number];
  colors?: readonly string[];
};

const CONFETTI_COLORS = [
  BRAND.red,
  BRAND.yellow,
  BRAND.green,
  BRAND.blue,
  BRAND.royal,
] as const;

/**
 * Decorative floating polka dots. Deterministic by design — a seeded LCG keeps
 * placement stable across renders, themes, and between server and client.
 */
export function ConfettiField({
  count = 40,
  seed = 1,
  opacity = 1,
  sizeRange = [4, 14],
  colors = CONFETTI_COLORS,
}: ConfettiFieldProps) {
  let s = seed * 9301 + 49297;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };

  const dots = Array.from({ length: count }, () => {
    const size = sizeRange[0] + rand() * (sizeRange[1] - sizeRange[0]);
    return {
      x: rand() * 100,
      y: rand() * 100,
      size,
      color: colors[Math.floor(rand() * colors.length)],
      delay: rand() * 3,
    };
  });

  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{ opacity }}
      aria-hidden="true"
    >
      {dots.map((d, i) => (
        <span
          // biome-ignore lint/suspicious/noArrayIndexKey: fixed-length deterministic list
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.size,
            height: d.size,
            background: d.color,
            animation: `float ${3 + d.delay}s ease-in-out ${d.delay}s infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}
