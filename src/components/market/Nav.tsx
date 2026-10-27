import { useState } from "react";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { useStore } from "./store";

function Switcher() {
  const { world, setWorld } = useStore();
  return (
    <div className="flex items-center gap-3">
      <span className="hidden font-mono text-[10px] tracking-[0.25em] text-muted-foreground xl:block">CHOOSE YOUR REALITY</span>
      <div role="radiogroup" aria-label="Choose your reality" className="relative grid grid-cols-2 rounded-full border border-border bg-muted/60 p-1 text-[11px] font-semibold tracking-widest">
        <span
          aria-hidden
          className={`absolute inset-y-1 w-[calc(50%-4px)] rounded-full transition-all duration-500 ${world === "human" ? "left-1 bg-coral shadow-[0_0_24px_var(--color-coral)]" : "left-1/2 bg-nebula shadow-[0_0_24px_var(--color-nebula)]"}`}
        />
        {(["human", "robot"] as const).map((w) => (
          <button
            key={w}
            role="radio"
            aria-checked={world === w}
            onClick={() => setWorld(w)}
            className={`relative z-10 flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors sm:px-4 ${world === w ? "text-ivory" : "text-muted-foreground hover:text-foreground"}`}
          >
            <span className={`size-1.5 rounded-full ${w === "human" ? "bg-peach" : "bg-cyan"} ${world === w ? "animate-twinkle" : ""}`} />
            {w === "human" ? "HUMAN" : "ROBOT"}<span className="hidden sm:inline">&nbsp;WORLD</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function Nav() {
  const { world, cart, wishlist } = useStore();
  const [open, setOpen] = useState(false);
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const robot = world === "robot";
  const links = ["Explore", "Categories", "Collection"];

  return (
    <header className={`sticky top-0 z-50 border-b transition-colors duration-700 ${robot ? "border-border bg-void/60 backdrop-blur-xl" : "border-border/60 bg-ivory/80 backdrop-blur-md"}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <a href="#top" className="flex shrink-0 items-center gap-2">
          <span className={`grid size-8 place-items-center rounded-full ${robot ? "border border-cyan/60 text-cyan glow-cyan" : "bg-coral text-ivory"}`}>
            <span className="font-display text-sm">{robot ? "◎" : "✺"}</span>
          </span>
          <span className="hidden font-display leading-none sm:block">
            <span className={robot ? "text-xs tracking-[0.2em]" : "text-lg italic"}>Impossible</span>
            <span className={`block ${robot ? "text-[10px] tracking-[0.4em] text-cyan" : "text-[11px] uppercase tracking-[0.3em] text-muted-foreground"}`}>Marketplace</span>
          </span>
        </a>

        <ul className="hidden items-center gap-7 text-sm lg:flex">
          {links.map((l) => (
            <li key={l}><a href={`#${l.toLowerCase()}`} className={`transition-colors hover:text-primary ${robot ? "font-mono text-xs uppercase tracking-widest" : ""}`}>{l}</a></li>
          ))}
        </ul>

        <div className="flex items-center gap-1 sm:gap-2">
          <Switcher />
          <button aria-label="Search" className="hidden size-9 place-items-center rounded-full hover:bg-muted md:grid"><Search className="size-4" /></button>
          <button aria-label="Wishlist" className="relative hidden size-9 place-items-center rounded-full hover:bg-muted md:grid">
            <Heart className="size-4" />
            {wishlist.size > 0 && <span className="absolute -right-0.5 -top-0.5 grid size-4 place-items-center rounded-full bg-secondary text-[9px] text-secondary-foreground">{wishlist.size}</span>}
          </button>
          <button aria-label="Cart" className="relative grid size-9 place-items-center rounded-full hover:bg-muted">
            <ShoppingBag className="size-4" />
            {count > 0 && <span className="absolute -right-0.5 -top-0.5 grid size-4 place-items-center rounded-full bg-primary text-[9px] text-primary-foreground">{count}</span>}
          </button>
          <button aria-label="Menu" onClick={() => setOpen(!open)} className="grid size-9 place-items-center rounded-full hover:bg-muted lg:hidden">
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="border-t border-border px-6 py-4 lg:hidden">
          <ul className="flex flex-col gap-3">
            {[...links, "Search", "Wishlist"].map((l) => (
              <li key={l}><a onClick={() => setOpen(false)} href={`#${l.toLowerCase()}`} className="block py-1">{l}</a></li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
