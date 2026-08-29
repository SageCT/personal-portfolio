/**
 * The photography gallery's source of truth.
 *
 * Every entry renders today as a generated placeholder tile. To swap in a real
 * frame: drop the file in `public/photography/` and set `src` on its entry —
 * nothing else changes. `aspect` is what drives the masonry rhythm, so keep it
 * matched to the real file's dimensions even while the tile is a placeholder.
 */
export type Photo = {
  /** Stable key, and the placeholder's caption slug. */
  id: string;
  title: string;
  location: string;
  year: string;
  /** [width, height] of the frame. Ratio only — the numbers aren't pixels. */
  aspect: readonly [number, number];
  /** Path under /public once the real photo exists, e.g. "/photography/dusk.jpg". */
  src?: string;
  /** Seeds the placeholder gradient. Two stops, dark to light. */
  tone: readonly [string, string];
  /** Optional shot data, shown in the lightbox caption. */
  camera?: string;
  settings?: string;
};

export const PHOTOS: readonly Photo[] = [
  {
    id: "harbor-light",
    title: "Harbor Light",
    location: "Delaware River, Philadelphia",
    year: "2025",
    aspect: [4, 5],
    tone: ["#1d2b3a", "#54b0d5"],
    camera: "Fujifilm X-T4 · 35mm",
    settings: "f/2 · 1/250s · ISO 200",
  },
  {
    id: "market-street-rain",
    title: "Market Street, Raining",
    location: "Philadelphia, PA",
    year: "2025",
    aspect: [3, 2],
    tone: ["#2a2118", "#f0b501"],
    camera: "Fujifilm X-T4 · 23mm",
    settings: "f/1.4 · 1/125s · ISO 800",
  },
  {
    id: "long-exposure-broad",
    title: "Broad Street, Long Exposure",
    location: "Philadelphia, PA",
    year: "2024",
    aspect: [2, 3],
    tone: ["#160f1c", "#3b7ded"],
    camera: "Fujifilm X-T4 · 16mm",
    settings: "f/11 · 8s · ISO 160",
  },
  {
    id: "kitchen-window",
    title: "Kitchen Window",
    location: "Houston, TX",
    year: "2024",
    aspect: [1, 1],
    tone: ["#2b1f1a", "#e0a884"],
    camera: "Canon AE-1 · 50mm",
    settings: "Portra 400",
  },
  {
    id: "ridge-at-dusk",
    title: "Ridge at Dusk",
    location: "Shenandoah, VA",
    year: "2024",
    aspect: [16, 9],
    tone: ["#20161f", "#e43e2b"],
    camera: "Fujifilm X-T4 · 55mm",
    settings: "f/5.6 · 1/500s · ISO 400",
  },
  {
    id: "green-room",
    title: "Green Room",
    location: "Fishtown, Philadelphia",
    year: "2025",
    aspect: [4, 5],
    tone: ["#12211a", "#60c166"],
    camera: "Fujifilm X-T4 · 35mm",
    settings: "f/2.8 · 1/60s · ISO 1600",
  },
  {
    id: "parking-structure",
    title: "Parking Structure",
    location: "Houston, TX",
    year: "2023",
    aspect: [3, 4],
    tone: ["#1a1a1e", "#8f93a8"],
    camera: "Canon AE-1 · 28mm",
    settings: "HP5 Plus 400",
  },
  {
    id: "last-call",
    title: "Last Call",
    location: "South Philadelphia, PA",
    year: "2025",
    aspect: [3, 2],
    tone: ["#241016", "#bf9fdb"],
    camera: "Fujifilm X-T4 · 35mm",
    settings: "f/1.8 · 1/80s · ISO 3200",
  },
  {
    id: "static-hour",
    title: "Static Hour",
    location: "Atlantic City, NJ",
    year: "2024",
    aspect: [1, 1],
    tone: ["#101a22", "#7fd4d0"],
    camera: "Fujifilm X-T4 · 23mm",
    settings: "f/4 · 1/1000s · ISO 160",
  },
  {
    id: "the-long-way-home",
    title: "The Long Way Home",
    location: "I-76, Pennsylvania",
    year: "2023",
    aspect: [16, 9],
    tone: ["#191320", "#f0b501"],
    camera: "iPhone 15 Pro",
    settings: "Night mode · 3s",
  },
  {
    id: "second-floor",
    title: "Second Floor",
    location: "Philadelphia, PA",
    year: "2025",
    aspect: [2, 3],
    tone: ["#1c1512", "#d9b48f"],
    camera: "Canon AE-1 · 50mm",
    settings: "Gold 200",
  },
  {
    id: "quiet-block",
    title: "Quiet Block",
    location: "Germantown, Philadelphia",
    year: "2024",
    aspect: [4, 5],
    tone: ["#141a26", "#54b0d5"],
    camera: "Fujifilm X-T4 · 55mm",
    settings: "f/2.8 · 1/320s · ISO 200",
  },
] as const;
