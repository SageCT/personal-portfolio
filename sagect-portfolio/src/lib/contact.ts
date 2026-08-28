import { BRAND } from "@/components/site/brand";

export const EMAIL = "sageturn01@gmail.com";
export const GITHUB = "https://github.com/SageCT";
export const LINKEDIN = "https://www.linkedin.com/in/sageturn01/";

export type ChannelIcon = "mail" | "github" | "linkedin";

export type Channel = {
  icon: ChannelIcon;
  /** Short name, set as the flood's label. */
  label: string;
  /** The handle itself — the thing worth reading at size. */
  handle: string;
  /** One line on what this channel is actually good for. */
  note: string;
  href: string;
  /** `handoff` hands off to the mail client; the page stays put. */
  mode: "external" | "handoff";
  bg: string;
  fg: string;
};

/**
 * Yellow, green, blue — the same ink-on-color treatment as the work cards, so
 * the three boxes read as one family with them.
 */
export const CHANNELS: readonly Channel[] = [
  {
    icon: "mail",
    label: "Email",
    handle: EMAIL,
    note: "Best for anything that needs a real reply.",
    href: `mailto:${EMAIL}`,
    mode: "handoff",
    bg: BRAND.yellow,
    fg: BRAND.ink,
  },
  {
    icon: "github",
    label: "GitHub",
    handle: "SageCT",
    note: "The code behind everything in the work section.",
    href: GITHUB,
    mode: "external",
    bg: BRAND.green,
    fg: BRAND.ink,
  },
  {
    icon: "linkedin",
    label: "LinkedIn",
    handle: "in/sageturn01",
    note: "Roles, referrals, and the long version of the résumé.",
    href: LINKEDIN,
    mode: "external",
    bg: BRAND.blue,
    fg: BRAND.ink,
  },
];
