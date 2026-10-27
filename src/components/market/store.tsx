import { createContext, useContext, useState, type ReactNode } from "react";
import type { World } from "@/data/catalog";

interface Store {
  world: World;
  setWorld: (w: World) => void;
  cart: Record<string, number>;
  addToCart: (id: string) => void;
  wishlist: Set<string>;
  toggleWish: (id: string) => void;
}

const Ctx = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [world, setWorldState] = useState<World>("robot");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [wishlist, setWish] = useState<Set<string>>(new Set());

  const setWorld = (w: World) => {
    setWorldState(w);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Ctx.Provider
      value={{
        world,
        setWorld,
        cart,
        addToCart: (id) => setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 })),
        wishlist,
        toggleWish: (id) =>
          setWish((s) => {
            const n = new Set(s);
            n.has(id) ? n.delete(id) : n.add(id);
            return n;
          }),
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useStore() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useStore outside StoreProvider");
  return c;
}
