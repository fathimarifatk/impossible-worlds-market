import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import robotHero from "@/assets/robot-hero.jpg";
import humanHero from "@/assets/human-hero.jpg";
import { formatPrice, products } from "@/data/catalog";
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

function HumanHero({ y }: { y: number }) {
  return (
    <section id="top" className="relative overflow-hidden paper-bg grain">
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:pt-20">
        <div className="world-enter relative z-10">
          <p className="text-[11px] font-semibold tracking-[0.3em] text-coral">TIMELINE 01 • HUMAN CIVILIZATION</p>
          <h1 className="mt-6 font-display text-5xl font-light leading-[0.98] tracking-tight sm:text-6xl lg:text-[5.5rem]">
            A little <em className="text-coral">magic,</em> for your very human life.
          </h1>
          <p className="mt-7 max-w-md text-lg text-muted-foreground">
            Discover extraordinary experiences, impossible little luxuries and things that make being human unforgettable.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#explore" className="inline-flex items-center gap-2 rounded-full bg-coral px-7 py-4 text-sm font-medium text-ivory shadow-soft transition hover:bg-cocoa">
              Discover the impossible <ArrowRight className="size-4" />
            </a>
            <a href="#collection" className="inline-flex items-center rounded-full border border-cocoa/30 px-7 py-4 text-sm font-medium transition hover:bg-cocoa hover:text-ivory">
              Explore the collection
            </a>
          </div>
          <p className="mt-10 font-display text-sm italic text-muted-foreground">“The most beautiful things are slightly impossible.”</p>
        </div>

        <div className="relative">
          <div className="absolute -left-6 -top-6 size-24 rounded-full bg-butter animate-float-slow" />
          <div className="absolute -bottom-6 -right-2 size-32 rounded-full bg-rose/50 blur-xl" />
          <div className="relative overflow-hidden rounded-t-[50%] rounded-b-[2.5rem] shadow-soft">
            <img src={humanHero} alt="A surreal doorway onto a sunset with floating flowers, a teacup and a pocket watch" width={1920} height={1088}
              className="aspect-[4/5] w-full object-cover object-[70%_center] sm:aspect-[5/5]" style={{ transform: `translateY(${y * 0.08}px) scale(1.08)` }} />
          </div>
          <div className="absolute -left-4 bottom-10 rounded-2xl bg-ivory p-4 shadow-soft animate-float sm:-left-10">
            <p className="text-[10px] font-semibold tracking-[0.2em] text-coral">BEST LOVED</p>
            <p className="font-display text-lg italic">The Extra Hour</p>
            <p className="text-sm text-muted-foreground">{formatPrice("human", 3499)}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
