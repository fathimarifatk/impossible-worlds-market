import { useState, type ReactNode } from "react";
import * as Icons from "lucide-react";
import { ArrowRight } from "lucide-react";
import robotBanner from "@/assets/robot-banner.jpg";
import humanBanner from "@/assets/human-banner.jpg";
import { categories, products, type Product } from "@/data/catalog";
import { ProductCard } from "./ProductCard";
import { Reveal } from "./Reveal";
import { useStore } from "./store";

function Heading({ eyebrow, title, id }: { eyebrow: string; title: string; id?: string }) {
  const { world } = useStore();
  return (
    <Reveal className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div id={id} className="scroll-mt-28">
        <p className={world === "robot" ? "font-mono text-[11px] tracking-[0.3em] text-magenta" : "text-[11px] font-semibold tracking-[0.3em] text-coral"}>{eyebrow}</p>
        <h2
          className={`mt-2 font-display ${
            world === "robot"
              ? "text-2xl font-semibold uppercase sm:text-4xl"
              : "text-3xl font-bold text-cocoa sm:text-4xl"
          }`}
        >
          {title}
        </h2>
      </div>
      <a href="#collection" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary">View all <ArrowRight className="size-4" /></a>
    </Reveal>
  );
}

function Grid({ items }: { items: Product[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((p, i) => (
        <Reveal key={p.id} delay={i * 80}><ProductCard product={p} index={i} /></Reveal>
      ))}
    </div>
  );
}

function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`mx-auto max-w-7xl px-4 py-20 sm:px-6 ${className}`}>{children}</section>;
}

const byTag = (t: Product["tags"][number]) => products.filter((p) => p.tags.includes(t)).slice(0, 4);

export function Featured() {
  const { world } = useStore();
  return (
    <Section>
      <Heading id="explore" eyebrow={world === "robot" ? "// FEATURED TRANSMISSIONS" : "Featured this season"} title={world === "robot" ? "Featured Artifacts" : "Little impossibilities"} />
      <Grid items={byTag("featured")} />
    </Section>
  );
}

/* ─── Category tiles ─── */
// Robot icons
const robotCatIcons = ["Heart", "Archive", "Brain", "Eye", "Globe", "Lock"];
// Human icons
const humanCatIcons = ["Clock", "Smile", "Sparkles", "PenTool", "Users", "Star"];
// Human category Unsplash thumbnails (small, square-ish)
const humanCatImages = [
  "https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&w=300&q=70&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&w=300&q=70&fit=crop",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&w=300&q=70&fit=crop",
  "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&w=300&q=70&fit=crop",
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&w=300&q=70&fit=crop",
  "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&w=300&q=70&fit=crop",
];

export function Categories() {
  const { world } = useStore();
  const robot = world === "robot";
  return (
    <Section>
      <Heading id="categories" eyebrow={robot ? "// SECTORS" : "Shop by feeling"} title={robot ? "Six Sectors of Humanity" : "Browse the collection"} />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories[world].map((c, i) => {
          const I =
            (Icons as unknown as Record<string, Icons.LucideIcon>)[
              robot ? robotCatIcons[i]! : humanCatIcons[i]!
            ] ?? Icons.Sparkles;
          return (
            <Reveal key={c.name} delay={i * 70}>
              {robot ? (
                <a href="#collection" className="group glass-cosmic relative flex h-44 flex-col justify-between overflow-hidden rounded-2xl p-6 transition hover:glow-cyan">
                  <div className="absolute -right-10 -top-10 size-40 rounded-full bg-nebula/40 blur-2xl transition group-hover:bg-magenta/40" />
                  <div className="flex items-center justify-between">
                    <I className="size-7 text-cyan" strokeWidth={1.25} />
                    <span className="font-mono text-[10px] tracking-widest text-muted-foreground">SECTOR 0{i + 1}</span>
                  </div>
                  <div className="relative">
                    <h3 className="font-display text-lg">{c.name}</h3>
                    <p className="text-sm text-muted-foreground">{c.blurb}</p>
                  </div>
                </a>
              ) : (
                /* Human: clean white card with small photo thumbnail */
                <a
                  href="#collection"
                  className="group flex items-center gap-4 overflow-hidden rounded-2xl border border-border bg-white p-4 shadow-card transition hover:-translate-y-0.5 hover:shadow-card-hover"
                >
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-xl">
                    <img
                      src={humanCatImages[i]}
                      alt={c.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-cocoa">{c.name}</h3>
                    <p className="mt-0.5 text-sm text-muted-foreground">{c.blurb}</p>
                  </div>
                  <I className="size-4 shrink-0 text-muted-foreground transition group-hover:text-coral" strokeWidth={1.5} />
                </a>
              )}
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

export function BestSellers() {
  const { world } = useStore();
  return (
    <Section>
      <Heading eyebrow={world === "robot" ? "// HIGH DEMAND" : "Best loved"} title={world === "robot" ? "Most Acquired" : "Our best sellers"} />
      <Grid items={byTag("best")} />
    </Section>
  );
}

export function NewArrivals() {
  const { world } = useStore();
  return (
    <Section>
      <Heading eyebrow={world === "robot" ? "// INCOMING SIGNAL" : "Just arrived"} title={world === "robot" ? "New Transmissions" : "New arrivals"} />
      <Grid items={byTag("new")} />
    </Section>
  );
}

export function ImpossibleCollection() {
  const { world } = useStore();
  const robot = world === "robot";
  const [cat, setCat] = useState<number | null>(null);
  const items = products.filter((p) => cat === null || p.category === cat);
  return (
    <div className={robot ? "relative border-y border-border bg-galaxy/40" : "bg-muted"}>
      <Section>
        <Reveal className="mx-auto mb-10 max-w-3xl text-center">
          <div id="collection" className="scroll-mt-28" />
          <p className={robot ? "font-mono text-[11px] tracking-[0.4em] text-cyan" : "text-[11px] font-semibold tracking-[0.3em] text-coral"}>ALL 12 · EXPANDABLE TO 30</p>
          <h2
            className={`mt-3 font-display ${
              robot
                ? "text-cosmic text-3xl font-bold sm:text-5xl"
                : "text-3xl font-bold text-cocoa sm:text-4xl"
            }`}
          >
            The Impossible Collection
          </h2>
        </Reveal>

        {/* Filter chips */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {[null, ...categories[world].map((_, i) => i)].map((i) => (
            <button
              key={String(i)}
              onClick={() => setCat(i)}
              className={`rounded-full px-4 py-2 text-xs font-medium transition ${
                robot
                  ? `border font-mono tracking-widest ${cat === i ? "border-cyan bg-cyan text-void" : "border-border text-muted-foreground hover:text-cyan"}`
                  : cat === i
                  ? "bg-cocoa text-ivory"
                  : "bg-white border border-border text-cocoa hover:border-coral hover:text-coral"
              }`}
            >
              {i === null ? "All" : categories[world][i]?.name}
            </button>
          ))}
        </div>

        <Grid items={items} />
      </Section>
    </div>
  );
}

export function PromoBanner() {
  const { world } = useStore();
  const robot = world === "robot";
  const [pos, setPos] = useState({ x: 50, y: 50 });
  return (
    <Section>
      <Reveal>
        <div
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
          }}
          className={`group relative grid overflow-hidden lg:grid-cols-2 ${
            robot ? "glass-cosmic rounded-3xl" : "rounded-2xl border border-border bg-white shadow-card"
          }`}
        >
          {robot && (
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: `radial-gradient(400px circle at ${pos.x}% ${pos.y}%, var(--color-magenta), transparent 60%)`, mixBlendMode: "screen" }}
            />
          )}

          <div className="relative z-10 flex flex-col justify-center p-8 sm:p-14">
            <p className={robot ? "font-mono text-[11px] tracking-[0.3em] text-cyan" : "text-[11px] font-semibold tracking-[0.3em] text-coral"}>
              {robot ? "LIMITED TRANSMISSION · 72H" : "THIS WEEK ONLY"}
            </p>
            <h2
              className={`mt-4 font-display ${
                robot
                  ? "text-3xl font-semibold sm:text-4xl"
                  : "text-3xl font-bold text-cocoa sm:text-4xl"
              }`}
            >
              {robot
                ? "Portal open: sunsets at −40% Q-bits."
                : <>Take 20% off every<br /><span className="text-coral">Time & Memories</span> piece.</>}
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground">
              {robot
                ? "A rare wormhole to Earth is open. Acquire captured human sunsets before the signal collapses."
                : "Bottled yesterdays, extra hours, and childhood summers — wrapped in hand-pressed paper and shipped with care."}
            </p>
            <a
              href="#collection"
              className={`mt-8 inline-flex w-fit items-center gap-2 rounded-full px-6 py-3.5 text-xs font-semibold tracking-widest transition ${
                robot
                  ? "bg-magenta font-mono text-void glow-magenta hover:scale-105"
                  : "bg-cocoa text-ivory hover:bg-coral"
              }`}
            >
              {robot ? "ENTER PORTAL" : "Claim the offer"} <ArrowRight className="size-4" />
            </a>
          </div>

          <div className="relative min-h-64">
            <img
              src={robot ? robotBanner : humanBanner}
              alt={robot ? "A glowing cosmic portal holding a bottled sunset" : "A glass jar holding a tiny ocean beside roses"}
              loading="lazy"
              width={1600}
              height={912}
              className={`absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105 ${
                robot ? "" : "rounded-r-2xl"
              }`}
            />
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

export function Newsletter() {
  const { world } = useStore();
  const robot = world === "robot";
  const [done, setDone] = useState(false);
  return (
    <Section className="text-center">
      <Reveal className="mx-auto max-w-2xl">
        <h2
          className={`font-display ${
            robot
              ? "text-2xl font-semibold uppercase sm:text-4xl"
              : "text-3xl font-bold text-cocoa sm:text-4xl"
          }`}
        >
          {robot ? "Subscribe to the human signal" : "One gentle letter a month"}
        </h2>
        <p className="mt-4 text-muted-foreground">
          {robot
            ? "Encrypted drops of new artifacts, beamed to your core every cycle."
            : "New wonders, small stories, and unusual finds — no noise, no spam."}
        </p>
        <form
          onSubmit={(e) => { e.preventDefault(); setDone(true); }}
          className={`mx-auto mt-8 flex max-w-md flex-col gap-2 p-1.5 sm:flex-row ${
            robot ? "glass-cosmic rounded-full" : "rounded-full border border-border bg-white shadow-soft"
          }`}
        >
          <label htmlFor="nl" className="sr-only">Email</label>
          <input
            id="nl"
            type="email"
            required
            placeholder={robot ? "unit@galaxy.q" : "your@email.com"}
            className="min-w-0 flex-1 bg-transparent px-5 py-3 text-sm outline-none placeholder:text-muted-foreground"
          />
          <button
            className={`rounded-full px-6 py-3 text-xs font-semibold tracking-widest ${
              robot ? "bg-cyan font-mono text-void" : "bg-coral text-ivory hover:bg-cocoa transition"
            }`}
          >
            {done ? (robot ? "LINKED ✓" : "Thank you ♡") : robot ? "TRANSMIT" : "Subscribe"}
          </button>
        </form>
      </Reveal>
    </Section>
  );
}

export function Marquee() {
  const { world } = useStore();
  const words =
    world === "robot"
      ? ["EMOTIONS", "✦", "MEMORIES", "✦", "IMAGINATION", "✦", "INTUITION", "✦"]
      : ["Trending", "·", "New arrivals", "·", "Best loved", "·", "Editor's picks", "·", "₹999 & under", "·"];
  return (
    <div
      className={`overflow-hidden border-y border-border py-3.5 ${
        world === "robot"
          ? "font-mono text-sm tracking-[0.3em] text-cyan"
          : "text-sm font-semibold tracking-widest text-cocoa/50"
      }`}
    >
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {[...words, ...words, ...words, ...words].map((w, i) => (
          <span key={i}>{w}</span>
        ))}
      </div>
    </div>
  );
}

export function Footer() {
  const { world } = useStore();
  const robot = world === "robot";
  const cols = robot
    ? { Market: ["Artifacts", "Sectors", "Transmissions"], Protocol: ["Q-bit Exchange", "Shipping by Wormhole", "Authenticity"], Network: ["Galactic Council", "Signal", "Careers"] }
    : { Shop: ["New arrivals", "Best loved", "Gift cards"], Help: ["Shipping", "Returns", "Contact"], About: ["Our story", "Journal", "Stockists"] };
  return (
    <footer className={robot ? "relative border-t border-border cosmos-bg" : "bg-cocoa text-ivory"}>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <p className={`font-display ${robot ? "text-xl font-semibold tracking-widest text-cosmic" : "text-3xl font-bold"}`}>
            Impossible Marketplace
          </p>
          <p className={`mt-3 max-w-xs text-sm ${robot ? "text-muted-foreground" : "text-ivory/70"}`}>
            {robot ? "Timeline 02. Trading humanity across 4,000 galaxies." : "Timeline 01. Made with care, for very human lives."}
          </p>
        </div>
        {Object.entries(cols).map(([h, ls]) => (
          <div key={h}>
            <p className={robot ? "font-mono text-[11px] tracking-[0.3em] text-cyan" : "text-[11px] font-semibold tracking-[0.3em] text-peach"}>
              {h.toUpperCase()}
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {ls.map((l) => (
                <li key={l}><a href="#top" className="opacity-80 hover:opacity-100">{l}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className={`border-t px-4 py-5 text-center text-xs ${robot ? "border-border font-mono tracking-widest text-muted-foreground" : "border-ivory/15 text-ivory/60"}`}>
        © 2026 Impossible Marketplace · {robot ? "ALL REALITIES RESERVED" : "All little wonders reserved"}
      </div>
    </footer>
  );
}
