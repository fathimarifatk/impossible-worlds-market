import * as Icons from "lucide-react";
import { Heart, Plus, ShoppingBag } from "lucide-react";
import { formatPrice, type Product } from "@/data/catalog";
import { useStore } from "./store";

function ProductIcon({ name, className }: { name: string; className?: string }) {
  const I = (Icons as unknown as Record<string, Icons.LucideIcon>)[name] ?? Icons.Sparkles;
  return <I className={className} strokeWidth={1.25} />;
}

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { world, addToCart, toggleWish, wishlist } = useStore();
  const v = product[world];
  const wished = wishlist.has(product.id);
  const h = product.hue;

  if (world === "robot") {
    const accent = index % 2 ? "magenta" : "cyan";
    return (
      <article className={`group glass-cosmic relative flex h-full flex-col overflow-hidden rounded-2xl p-4 transition-all duration-500 hover:-translate-y-1.5 ${accent === "cyan" ? "hover:glow-cyan hover:border-cyan" : "hover:glow-magenta hover:border-magenta"}`}>
        <div
          className="relative grid aspect-square place-items-center overflow-hidden rounded-xl starfield"
          style={{ backgroundColor: `oklch(0.16 0.08 ${h})`, backgroundImage: `radial-gradient(circle at 50% 55%, oklch(0.55 0.22 ${h} / 0.7), transparent 60%)` }}
        >
          <div className="absolute size-[72%] rounded-full border border-cyan/30 animate-spin-slow" style={{ transform: "rotateX(70deg)" }} />
          <div className="absolute size-[56%] rounded-full border border-dashed border-magenta/40 animate-spin-slow [animation-direction:reverse]" />
          <ProductIcon name={product.icon} className="relative size-16 text-starlight drop-shadow-[0_0_14px_currentColor] transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6" />
          <span className="absolute left-3 top-3 rounded-full border border-cyan/50 bg-void/60 px-2.5 py-1 font-mono text-[10px] tracking-widest text-cyan">{v.badge}</span>
          <button aria-label="Add to wishlist" onClick={() => toggleWish(product.id)} className="absolute right-3 top-3 grid size-8 place-items-center rounded-full border border-border bg-void/50 text-starlight transition hover:text-magenta">
            <Heart className={`size-4 ${wished ? "fill-magenta text-magenta" : ""}`} />
          </button>
        </div>
        <div className="flex flex-1 flex-col pt-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">ID-{product.id.slice(0, 6).toUpperCase()}</p>
          <h3 className="mt-1 font-display text-base leading-tight">{v.name}</h3>
          <p className="mt-2 flex-1 text-sm text-muted-foreground">{v.description}</p>
          <div className="mt-4 flex items-center justify-between gap-2">
            <span className="font-mono text-sm text-cyan">{formatPrice(world, v.price)}</span>
            <button onClick={() => addToCart(product.id)} className="inline-flex items-center gap-1.5 rounded-full border border-cyan/60 px-3.5 py-2 font-mono text-[11px] uppercase tracking-widest text-cyan transition hover:bg-cyan hover:text-void hover:glow-cyan">
              <Plus className="size-3.5" /> Acquire
            </button>
          </div>
        </div>
      </article>
    );
  }

  const tones = ["bg-peach", "bg-butter", "bg-rose/60", "bg-sage/60"];
  return (
    <article className="group flex h-full flex-col">
      <div className={`relative grid aspect-[4/5] place-items-center overflow-hidden rounded-[2rem] ${tones[index % 4]} shadow-soft transition-transform duration-700 group-hover:-translate-y-1`}>
        <div className="absolute inset-x-8 top-8 bottom-0 rounded-t-full bg-ivory/60" />
        <div className="absolute bottom-10 size-24 rounded-full bg-coral/20 blur-2xl" />
        <ProductIcon name={product.icon} className="relative size-20 text-cocoa transition-transform duration-700 group-hover:-translate-y-2 group-hover:scale-105" />
        <span className="absolute left-4 top-4 rounded-full bg-ivory px-3 py-1 text-[10px] font-semibold tracking-[0.18em] text-cocoa">{v.badge}</span>
        <button aria-label="Add to wishlist" onClick={() => toggleWish(product.id)} className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-ivory text-cocoa transition hover:text-coral">
          <Heart className={`size-4 ${wished ? "fill-coral text-coral" : ""}`} />
        </button>
      </div>
      <div className="flex flex-1 flex-col px-1 pt-5">
        <h3 className="font-display text-2xl italic leading-tight">{v.name}</h3>
        <p className="mt-2 flex-1 text-sm text-muted-foreground">{v.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-display text-xl">{formatPrice(world, v.price)}</span>
          <button onClick={() => addToCart(product.id)} className="inline-flex items-center gap-2 rounded-full bg-cocoa px-4 py-2.5 text-xs font-medium text-ivory transition hover:bg-coral">
            <ShoppingBag className="size-3.5" /> Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}
