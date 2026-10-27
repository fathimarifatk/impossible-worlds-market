import * as Icons from "lucide-react";
import { Heart, ShoppingBag, Plus, Star } from "lucide-react";
import { formatPrice, type Product } from "@/data/catalog";
import { useStore } from "./store";

function ProductIcon({ name, className }: { name: string; className?: string }) {
  const I = (Icons as unknown as Record<string, Icons.LucideIcon>)[name] ?? Icons.Sparkles;
  return <I className={className} strokeWidth={1.25} />;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`size-3 ${i < Math.floor(rating) ? "fill-amber-400 text-amber-400" : i < rating ? "fill-amber-200 text-amber-300" : "fill-stone-200 text-stone-200"}`}
          strokeWidth={0}
        />
      ))}
    </div>
  );
}

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { world, addToCart, toggleWish, wishlist } = useStore();
  const v = product[world];
  const wished = wishlist.has(product.id);
  const h = product.hue;

  /* ─── ROBOT WORLD ─── unchanged futuristic style */
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

  /* ─── HUMAN WORLD ─── realistic e-commerce card */
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white border border-border shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      {/* Product photo */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={product.imageUrl}
          alt={v.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            img.style.display = "none";
            img.parentElement!.style.background = `oklch(0.93 0.025 ${h})`;
          }}
        />
        {/* Badge */}
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[10px] font-semibold tracking-[0.15em] text-cocoa shadow-sm">
          {v.badge}
        </span>
        {/* Wishlist */}
        <button
          aria-label="Add to wishlist"
          onClick={() => toggleWish(product.id)}
          className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-white/95 text-stone-500 shadow-sm transition hover:text-coral"
        >
          <Heart className={`size-4 ${wished ? "fill-coral text-coral" : ""}`} />
        </button>
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-semibold leading-tight text-cocoa">{v.name}</h3>
        <p className="mt-1.5 flex-1 text-sm text-muted-foreground leading-relaxed">{v.description}</p>

        {/* Rating row */}
        <div className="mt-3 flex items-center gap-2">
          <StarRating rating={product.rating} />
          <span className="text-xs text-muted-foreground">
            {product.rating.toFixed(1)} ({product.reviews.toLocaleString("en-IN")})
          </span>
        </div>

        {/* Price + Add to cart */}
        <div className="mt-4 flex items-center justify-between gap-2">
          <span className="text-lg font-bold text-cocoa">{formatPrice("human", v.price)}</span>
          <button
            onClick={() => addToCart(product.id)}
            className="inline-flex items-center gap-1.5 rounded-full bg-cocoa px-4 py-2 text-xs font-semibold text-ivory transition hover:bg-coral"
          >
            <ShoppingBag className="size-3.5" />
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}
