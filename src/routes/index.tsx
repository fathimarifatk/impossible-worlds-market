import { createFileRoute } from "@tanstack/react-router";
import { StoreProvider, useStore } from "@/components/market/store";
import { Nav } from "@/components/market/Nav";
import { Hero } from "@/components/market/Hero";
import { BestSellers, Categories, Featured, Footer, ImpossibleCollection, Marquee, NewArrivals, Newsletter, PromoBanner } from "@/components/market/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Impossible Marketplace — Two Worlds, One Universe" },
      { name: "description", content: "Shop impossible things across two timelines: a cosmic Robot World and a dreamy Human World." },
      { property: "og:title", content: "Impossible Marketplace — Two Worlds, One Universe" },
      { property: "og:description", content: "Bottled yesterdays, pocket thunderstorms and the colour nobody named." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <StoreProvider>
      <World />
    </StoreProvider>
  ),
});

function World() {
  const { world } = useStore();
  return (
    <div data-world={world} className={`world-shell min-h-screen bg-background text-foreground ${world === "robot" ? "cosmos-bg" : "paper-bg"}`}>
      <Nav />
      <main key={world} className="world-enter">
        <Hero />
        <Marquee />
        <Featured />
        <Categories />
        <BestSellers />
        <PromoBanner />
        <NewArrivals />
        <ImpossibleCollection />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
