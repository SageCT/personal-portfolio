import { BRAND } from "@/components/site/brand";

export type MockKind = "csg" | "mart" | "ride";

const FRAME =
  "w-full aspect-[16/10] rounded-xl overflow-hidden shadow-[0_24px_48px_-20px_rgb(0_0_0/0.4)]";

/**
 * Placeholder product UIs — hand-built, not screenshots.
 * TODO: replace each of these with a real screenshot before launch.
 */
export function ProjectMock({ kind }: { kind: MockKind }) {
  if (kind === "csg") return <CsgMock />;
  if (kind === "mart") return <MartMock />;
  return <RideMock />;
}

function CsgMock() {
  const tiles = [BRAND.red, BRAND.yellow, BRAND.royal];
  return (
    <div className={`${FRAME} border border-black/10 bg-white text-[#111]`}>
      <div className="flex gap-1.5 border-b border-black/[0.08] px-[18px] py-3.5">
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
          <span
            key={c}
            className="size-[9px] rounded-full"
            style={{ background: c }}
          />
        ))}
      </div>
      <div className="px-6 py-[22px]">
        <p className="font-serif text-[30px] leading-none">
          Welcome, <em>girls.</em>
        </p>
        <p className="mt-1 font-mono text-[9px] tracking-[1.4px] text-[#6B6459]">
          CSG @ UH — EST. 2019
        </p>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {tiles.map((c, i) => (
            <div
              key={c}
              className="h-14 rounded-lg p-2"
              style={{ background: `${c}1f`, border: `1px solid ${c}3d` }}
            >
              <span
                className="block size-4 rounded-full"
                style={{ background: c }}
              />
              <span className="mt-1 block font-mono text-[8px] tracking-[1px] text-[#6B6459]">
                EVENT {i + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MartMock() {
  const produce = ["🥬", "🍅", "🥖", "🧀", "🥕", "🍎", "🥚", "🥛"];
  return (
    <div
      className={`${FRAME} flex flex-col border border-black/10 bg-white p-[18px] text-[#111]`}
    >
      <div className="flex items-baseline justify-between">
        <span className="font-serif text-[21px]">shastamart</span>
        <span className="font-mono text-[9px] tracking-[1px] text-[#6B6459]">
          FRESH · FAST
        </span>
      </div>
      <div className="mt-3 grid flex-1 grid-cols-4 gap-1.5">
        {produce.map((item) => (
          <div
            key={item}
            className="grid aspect-square place-items-center rounded-[7px] border border-black/[0.06] bg-[#faf9f5] text-[18px]"
          >
            {item}
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-between border-t border-black/[0.07] pt-[9px] font-mono text-[9px] tracking-[1px] text-[#6B6459]">
        <span>CART · 8 ITEMS</span>
        <span className="font-semibold text-[#111]">$42.18</span>
      </div>
    </div>
  );
}

function RideMock() {
  return (
    <div className={`${FRAME} relative bg-[#0E0D12] p-[18px] text-white`}>
      <svg
        className="absolute inset-0 size-full opacity-40"
        viewBox="0 0 300 180"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M 20 150 Q 80 84, 140 92 T 285 34"
          fill="none"
          stroke={BRAND.yellow}
          strokeWidth={2.5}
          strokeDasharray="7 5"
        />
        <circle cx="20" cy="150" r="5.5" fill={BRAND.green} />
        <circle cx="285" cy="34" r="5.5" fill={BRAND.red} />
      </svg>

      <div className="relative">
        <p className="font-serif text-[23px] italic">ride.</p>
        <p className="font-mono text-[9px] tracking-[1px] opacity-65">
          ETA 4 MIN · SURGE 1.2×
        </p>
      </div>

      <div className="absolute right-4 bottom-3.5 left-4 flex items-center justify-between rounded-[9px] bg-white/[0.09] px-3 py-[9px] backdrop-blur-[10px]">
        <span className="font-mono text-[9px] tracking-[1px]">
          Toyota Camry · ABC-123
        </span>
        <span
          className="rounded px-2 py-[3px] font-mono text-[9px] font-semibold tracking-[1px] text-[#111]"
          style={{ background: BRAND.green }}
        >
          ARRIVING
        </span>
      </div>
    </div>
  );
}
