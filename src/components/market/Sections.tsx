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
        <h2 className={`mt-2 font-display ${world === "robot" ? "text-2xl font-semibold uppercase sm:text-4xl" : "text-4xl font-light sm:text-5xl"}`}>{title}</h2>
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

const catIcons = [["Heart", "Archive", "Brain", "Eye", "Globe", "Lock"], ["Clock", "Cherry", "Rainbow", "Feather", "Users", "Key"]];

export function Categories() {
  const { world } = useStore();
  const robot = world === "robot";
  return (
    <Section>
      <Heading id="categories" eyebrow={robot ? "// SECTORS" : "Shop by feeling"} title={robot ? "Six Sectors of Humanity" : "Wander the boutique"} />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories[world].map((c, i) => {
          const I = (Icons as unknown as Record<string, Icons.LucideIcon>)[catIcons[robot ? 0 : 1]![i]!] ?? Icons.Sparkles;
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
                <a href="#collection" className={`group flex h-52 flex-col justify-between rounded-[2rem] p-7 transition hover:-translate-y-1 hover:shadow-soft ${["bg-peach", "bg-butter", "bg-rose/50", "bg-sage/50", "bg-peach/60", "bg-butter/60"][i]}`}>
                  <span className="grid size-12 place-items-center rounded-full bg-ivory"><I className="size-5 text-cocoa" strokeWidth={1.5} /></span>
                  <div>
                    <h3 className="font-display text-3xl italic">{c.name}</h3>
                    <p className="mt-1 text-sm text-cocoa/70">{c.blurb}</p>
                  </div>
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
          <h2 className={`mt-3 font-display ${robot ? "text-cosmic text-3xl font-bold sm:text-5xl" : "text-5xl font-light italic sm:text-6xl"}`}>THE IMPOSSIBLE COLLECTION</h2>
        </Reveal>
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {[null, ...categories[world].map((_, i) => i)].map((i) => (
            <button key={String(i)} onClick={() => setCat(i)}
              className={`rounded-full px-4 py-2 text-xs transition ${robot ? "border font-mono tracking-widest" : "font-medium"} ${cat === i ? (robot ? "border-cyan bg-cyan text-void" : "bg-cocoa text-ivory") : robot ? "border-border text-muted-foreground hover:text-cyan" : "bg-ivory text-cocoa hover:bg-peach"}`}>
              {i === null ? "All" : categories[world][i].name}
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
          className={`group relative grid overflow-hidden lg:grid-cols-2 ${robot ? "glass-cosmic rounded-3xl" : "rounded-[2.5rem] bg-butter"}`}
        >
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: `radial-gradient(400px circle at ${pos.x}% ${pos.y}%, ${robot ? "var(--color-magenta)" : "var(--color-peach)"}, transparent 60%)`, mixBlendMode: robot ? "screen" : "multiply", opacity: undefined }} />
          <div className="relative z-10 flex flex-col justify-center p-8 sm:p-14">
            <p className={robot ? "font-mono text-[11px] tracking-[0.3em] text-cyan" : "text-[11px] font-semibold tracking-[0.3em] text-coral"}>{robot ? "LIMITED TRANSMISSION · 72H" : "THIS WEEK ONLY"}</p>
            <h2 className={`mt-4 font-display ${robot ? "text-3xl font-semibold sm:text-4xl" : "text-4xl font-light sm:text-5xl"}`}>
              {robot ? "Portal open: sunsets at −40% Q-bits." : <>Bottle the ocean. <em className="text-coral">Keep the summer.</em></>}
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground">{robot ? "A rare wormhole to Earth is open. Acquire captured human sunsets before the signal collapses." : "Take 20% off every Time & Memories piece, wrapped in hand-pressed paper."}</p>
            <a href="#collection" className={`mt-8 inline-flex w-fit items-center gap-2 rounded-full px-6 py-3.5 text-xs font-semibold tracking-widest transition ${robot ? "bg-magenta font-mono text-void glow-magenta hover:scale-105" : "bg-cocoa text-ivory hover:bg-coral"}`}>
              {robot ? "ENTER PORTAL" : "Claim the offer"} <ArrowRight className="size-4" />
            </a>
          </div>
          <div className="relative min-h-64">
            <img src={robot ? robotBanner : humanBanner} alt={robot ? "A glowing cosmic portal holding a bottled sunset" : "A glass jar holding a tiny ocean beside roses"} loading="lazy" width={1600} height={912}
              className={`absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105 ${robot ? "" : "rounded-[2rem] lg:p-4"}`} />
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
        <h2 className={`font-display ${robot ? "text-2xl font-semibold uppercase sm:text-4xl" : "text-4xl font-light italic sm:text-5xl"}`}>
          {robot ? "Subscribe to the human signal" : "Letters from the softer side of life"}
        </h2>
        <p className="mt-4 text-muted-foreground">{robot ? "Encrypted drops of new artifacts, beamed to your core every cycle." : "One gentle letter a month. New wonders, small stories, no noise."}</p>
        <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className={`mx-auto mt-8 flex max-w-md flex-col gap-2 p-1.5 sm:flex-row ${robot ? "glass-cosmic rounded-full" : "rounded-full bg-ivory shadow-soft"}`}>
          <label htmlFor="nl" className="sr-only">Email</label>
          <input id="nl" type="email" required placeholder={robot ? "unit@galaxy.q" : "you@somewhere.lovely"} className="min-w-0 flex-1 bg-transparent px-5 py-3 text-sm outline-none placeholder:text-muted-foreground" />
          <button className={`rounded-full px-6 py-3 text-xs font-semibold tracking-widest ${robot ? "bg-cyan font-mono text-void" : "bg-coral text-ivory"}`}>
            {done ? (robot ? "LINKED ✓" : "Thank you ♡") : robot ? "TRANSMIT" : "Subscribe"}
          </button>
        </form>
      </Reveal>
    </Section>
  );
}

export function Marquee() {
  const { world } = useStore();
  const words = world === "robot" ? ["EMOTIONS", "✦", "MEMORIES", "✦", "IMAGINATION", "✦", "INTUITION", "✦"] : ["little joys", "❀", "sunsets", "❀", "slow mornings", "❀", "old letters", "❀"];
  return (
    <div className={`overflow-hidden border-y border-border py-4 ${world === "robot" ? "font-mono text-sm tracking-[0.3em] text-cyan" : "font-display text-2xl italic text-coral"}`}>
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {[...words, ...words, ...words, ...words].map((w, i) => <span key={i}>{w}</span>)}
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
          <p className={`font-display ${robot ? "text-xl font-semibold tracking-widest text-cosmic" : "text-4xl italic"}`}>Impossible Marketplace</p>
          <p className={`mt-3 max-w-xs text-sm ${robot ? "text-muted-foreground" : "text-ivory/70"}`}>{robot ? "Timeline 02. Trading humanity across 4,000 galaxies." : "Timeline 01. Made with love, for very human lives."}</p>
        </div>
        {Object.entries(cols).map(([h, ls]) => (
          <div key={h}>
            <p className={robot ? "font-mono text-[11px] tracking-[0.3em] text-cyan" : "text-[11px] font-semibold tracking-[0.3em] text-peach"}>{h.toUpperCase()}</p>
            <ul className="mt-4 space-y-2 text-sm">{ls.map((l) => <li key={l}><a href="#top" className="opacity-80 hover:opacity-100">{l}</a></li>)}</ul>
          </div>
        ))}
      </div>
      <div className={`border-t px-4 py-5 text-center text-xs ${robot ? "border-border font-mono tracking-widest text-muted-foreground" : "border-ivory/15 text-ivory/60"}`}>
        © 2026 Impossible Marketplace · {robot ? "ALL REALITIES RESERVED" : "All little wonders reserved"}
      </div>
    </footer>
  );
}
