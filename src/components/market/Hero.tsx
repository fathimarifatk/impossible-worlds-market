import { useEffect, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import * as Icons from "lucide-react";
import robotHero from "@/assets/robot-hero.jpg";
import { formatPrice, products, categories } from "@/data/catalog";
import { useStore } from "./store";

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const f = () => setY(window.scrollY);
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return y;
}

export function Hero() {
  const { world } = useStore();
  const y = useScrollY();
  return world === "robot" ? <RobotHero y={y} /> : <HumanHero y={y} />;
}

/* ─── ROBOT HERO ─── completely unchanged */
function RobotHero({ y }: { y: number }) {
  const orbit = products.slice(0, 3);
  return (
    <section id="top" className="relative min-h-[92vh] overflow-hidden cosmos-bg">
      <img src={robotHero} alt="Glowing violet planet with a holographic marketplace orbiting its rings" width={1920} height={1088}
        className="absolute inset-0 h-full w-full object-cover opacity-80" style={{ transform: `translateY(${y * 0.25}px) scale(1.05)` }} />
      <div className="absolute inset-0 starfield animate-drift opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-r from-void via-void/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-void to-transparent" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-20 pt-20 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:pt-28">
        <div className="world-enter">
          <p className="inline-flex items-center gap-2 rounded-full border border-cyan/40 bg-void/50 px-4 py-1.5 font-mono text-[11px] tracking-[0.3em] text-cyan">
            <span className="size-1.5 animate-twinkle rounded-full bg-cyan" /> TIMELINE 02 • MACHINE DOMINION
          </p>
          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            THE FUTURE <span className="text-cosmic">BELONGS</span> TO THE IMPOSSIBLE.
          </h1>
          <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
            In a universe ruled by machines, the rarest commodities are human imagination, emotions, memories and unpredictable creativity.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#explore" className="inline-flex items-center gap-2 rounded-full bg-cyan px-6 py-3.5 font-mono text-xs font-bold tracking-widest text-void glow-cyan transition hover:scale-[1.03]">
              ENTER THE GALACTIC MARKET <ArrowRight className="size-4" />
            </a>
            <a href="#collection" className="inline-flex items-center rounded-full border border-magenta/60 px-6 py-3.5 font-mono text-xs tracking-widest text-starlight transition hover:glow-magenta">
              EXPLORE HUMAN ARTIFACTS
            </a>
          </div>
          <dl className="mt-12 grid max-w-md grid-cols-3 gap-4 font-mono">
            {[["12,408", "ARTIFACTS"], ["∞", "GALAXIES"], ["0.0001%", "HUMAN SUPPLY"]].map(([a, b]) => (
              <div key={b}><dt className="text-lg text-starlight">{a}</dt><dd className="text-[10px] tracking-widest text-muted-foreground">{b}</dd></div>
            ))}
          </dl>
        </div>

        <div className="relative hidden h-[460px] lg:block" style={{ transform: `translateY(${y * -0.08}px)` }}>
          <div className="absolute left-1/2 top-1/2 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/20 animate-spin-slow" />
          <div className="absolute left-1/2 top-1/2 size-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-magenta/30 animate-spin-slow [animation-direction:reverse]" />
          {orbit.map((p, i) => (
            <div key={p.id} className="glass-cosmic absolute w-52 rounded-2xl p-4 animate-float"
              style={{ top: `${[4, 38, 70][i]}%`, left: `${[8, 50, 14][i]}%`, animationDelay: `${i * 1.4}s` }}>
              <p className="font-mono text-[9px] tracking-widest text-magenta">{p.robot.badge}</p>
              <p className="mt-1 font-display text-sm">{p.robot.name}</p>
              <p className="mt-2 font-mono text-xs text-cyan">{formatPrice("robot", p.robot.price)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── HUMAN HERO ─── professional e-commerce landing */
const catIconNames = ["Clock", "Smile", "Sparkles", "PenTool", "Users", "Star"];

function HumanHero({ y }: { y: number }) {
  const featuredProducts = products.filter((p) => p.tags.includes("featured")).slice(0, 3);

  return (
    <section id="top" className="relative overflow-hidden bg-background">
      {/* Subtle warm tint in top-right */}
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-coral/5 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:pt-20">
        {/* ── Left column ── */}
        <div className="world-enter relative z-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-coral">
            TIMELINE 01 · HUMAN CIVILIZATION
          </p>

          <h1 className="mt-4 text-5xl font-bold leading-[1.05] tracking-tight text-cocoa sm:text-6xl lg:text-[4.5rem]">
            Shop the <span className="text-coral">Impossible.</span>
            <br />
            Live the everyday.
          </h1>

          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
            Extraordinary experiences for ordinary lives — impossible little luxuries and things that make being human unforgettable.
          </p>

          {/* Search bar */}
          <div className="mt-8 flex overflow-hidden rounded-xl border border-border bg-white shadow-soft">
            <select
              className="border-r border-border bg-transparent px-4 py-3.5 text-sm text-muted-foreground outline-none"
              aria-label="Category"
            >
              <option value="">All categories</option>
              {categories.human.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
            <input
              type="search"
              placeholder="Search impossible things…"
              className="min-w-0 flex-1 bg-transparent px-4 py-3.5 text-sm text-cocoa outline-none placeholder:text-muted-foreground"
            />
            <button
              aria-label="Search"
              className="flex items-center justify-center bg-coral px-5 text-ivory transition hover:bg-cocoa"
            >
              <Search className="size-4" />
            </button>
          </div>

          {/* Category quick-links */}
          <div className="mt-5 flex flex-wrap gap-2">
            {categories.human.map((c, i) => {
              const I =
                (Icons as unknown as Record<string, Icons.LucideIcon>)[catIconNames[i]!] ??
                Icons.Sparkles;
              return (
                <a
                  key={c.name}
                  href="#collection"
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition hover:border-coral hover:text-coral"
                >
                  <I className="size-3.5" strokeWidth={1.5} />
                  {c.name}
                </a>
              );
            })}
          </div>

          {/* Stats bar */}
          <dl className="mt-10 flex flex-wrap gap-8 border-t border-border pt-8">
            {[
              ["12", "Extraordinary products"],
              ["Free delivery", "on orders over ₹999"],
              ["Handpicked", "for humans, by humans"],
            ].map(([val, label]) => (
              <div key={label}>
                <dt className="text-base font-bold text-cocoa">{val}</dt>
                <dd className="text-[11px] text-muted-foreground">{label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ── Right column: product photo collage ── */}
        <div
          className="relative hidden h-[520px] lg:block"
          style={{ transform: `translateY(${y * -0.04}px)` }}
        >
          {/* Decorative accents */}
          <div className="absolute -bottom-8 -right-8 size-56 rounded-full bg-coral/8" />
          <div className="absolute -top-4 right-36 size-16 rounded-full bg-peach/60" />

          {featuredProducts.map((p, i) => {
            const positions = [
              "top-0 right-4 w-64 h-72",
              "top-40 right-72 w-52 h-60",
              "bottom-0 right-10 w-60 h-56",
            ];
            const parallax = [0.05, 0.03, 0.07];
            return (
              <div
                key={p.id}
                className={`absolute overflow-hidden rounded-2xl shadow-card transition-transform duration-1000 ${positions[i]}`}
                style={{ transform: `translateY(${y * parallax[i]!}px)` }}
              >
                <img
                  src={p.imageUrl}
                  alt={p.human.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent px-4 py-3">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-white/75">
                    {p.human.badge}
                  </p>
                  <p className="text-sm font-semibold text-white">{p.human.name}</p>
                  <p className="text-sm font-bold text-white/90">{formatPrice("human", p.human.price)}</p>
                </div>
              </div>
            );
          })}

          {/* CTA floating card */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-44 animate-float rounded-2xl bg-white p-4 shadow-card">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-coral">
              This week only
            </p>
            <p className="mt-1 text-sm font-bold text-cocoa">20% off Time & Memories</p>
            <a
              href="#collection"
              className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-coral hover:underline"
            >
              Claim offer <ArrowRight className="size-3" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
