"use client";

import DottedTrailCursor from "@/components/ui/dotted-trail-cursor";

const settings = {
  colorA: "#14b8a6", // Amriza Cyan
  colorB: "#0d9488", // Amriza Deep Teal
  headRadius: 80,
  glowRadius: 300,
  followSpeed: 0.22,
  trailLength: 18,
  fadeOnIdle: true,
  idleDelay: 100,
  idleFade: 1100,
  backgroundColor: "#f2f8f7",
  dotColor: "#cbd5e1",
  activeDotColor: "#14b8a6",
  dotSpacing: 34,
  dotRadius: 1.2,
  rimInner: 2.1,
  rimOuter: 1.5,
  edgeDesaturate: 0.3,
  edgeDesaturateSpan: 2.1,
  tailTilt: 0.18,
};

export default function DottedTrailCursorDemo(props: Partial<typeof settings>) {
  const s = { ...settings, ...props };
  // Hex keeps a color picker in the Controls panel; until a color is changed,
  // the component's own theme-aware default is used.
  const themed = (key: "backgroundColor" | "dotColor" | "activeDotColor") =>
    s[key] === settings[key] ? undefined : s[key];

  return (
    <DottedTrailCursor
      colorA={s.colorA}
      colorB={s.colorB}
      headRadius={s.headRadius}
      glowRadius={s.glowRadius}
      followSpeed={s.followSpeed}
      trailLength={s.trailLength}
      fadeOnIdle={s.fadeOnIdle}
      idleDelay={s.idleDelay}
      idleFade={s.idleFade}
      backgroundColor={themed("backgroundColor")}
      dotColor={themed("dotColor")}
      activeDotColor={themed("activeDotColor")}
      dotSpacing={s.dotSpacing}
      dotRadius={s.dotRadius}
      rimInner={s.rimInner}
      rimOuter={s.rimOuter}
      edgeDesaturate={s.edgeDesaturate}
      edgeDesaturateSpan={s.edgeDesaturateSpan}
      tailTilt={s.tailTilt}
    >
      <section className="flex h-full w-full flex-col items-center justify-center gap-6 px-6 text-center font-body">
        <span className="rounded-full border border-teal-200 bg-white/80 px-3.5 py-1 text-xs font-semibold text-teal-800 backdrop-blur-md font-heading uppercase tracking-wider">
          Interactive background
        </span>
        <h1 className="max-w-[14ch] text-4xl font-bold leading-[1.05] tracking-tight text-slate-900 sm:text-6xl font-heading">
          Every move leaves a trail.
        </h1>
        <p className="max-w-md text-sm leading-relaxed text-slate-600 sm:text-base font-body">
          A dotted grid that lights up behind the cursor. Drop it behind any hero
          or section and keep your content on top.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            className="rounded-full bg-[#14b8a6] hover:bg-[#0d9488] px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            Get started
          </button>
          <button
            type="button"
            className="rounded-full border border-slate-200 bg-white/80 px-6 py-2.5 text-sm font-semibold text-slate-800 backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            View docs
          </button>
        </div>
      </section>
      <p className="pointer-events-none absolute inset-x-0 bottom-8 text-center text-xs text-slate-500 font-body">
        <span className="pointer-coarse:hidden">Move your cursor across the grid</span>
        <span className="hidden pointer-coarse:inline">Best experienced with a mouse or trackpad</span>
      </p>
    </DottedTrailCursor>
  );
}
