// Shared product identity, with per-timeline presentation.
// Extend to 30 products by adding entries here.
export type World = "human" | "robot";

export interface WorldVariant {
  name: string;
  description: string;
  price: number;
  badge: string;
}

export interface Product {
  id: string;
  icon: string; // lucide icon name key in components/icons
  hue: number; // drives per-product art colours
  category: number; // index into categories
  tags: ("featured" | "best" | "new" | "impossible")[];
  human: WorldVariant;
  robot: WorldVariant;
}

export const categories: Record<World, { name: string; blurb: string }[]> = {
  human: [
    { name: "Time & Memories", blurb: "Moments worth keeping, gently preserved." },
    { name: "Little Joys", blurb: "Small delights for ordinary Tuesdays." },
    { name: "Impossible Experiences", blurb: "Things that shouldn't exist, but do." },
    { name: "Dreams & Creativity", blurb: "Tools for the wandering mind." },
    { name: "Human Connections", blurb: "For the people who feel like home." },
    { name: "Curious Objects", blurb: "Strange, lovely, slightly magical." },
  ],
  robot: [
    { name: "Human Emotions", blurb: "Authentic feelings, ethically harvested." },
    { name: "Memory Archives", blurb: "Recovered fragments of organic history." },
    { name: "Organic Imagination", blurb: "Unpredictable ideation modules." },
    { name: "Human Intuition", blurb: "Non-computable decision engines." },
    { name: "Rare Earth Objects", blurb: "Relics from the third planet." },
    { name: "Forbidden Experiences", blurb: "Restricted. Transmission encrypted." },
  ],
};

export const products: Product[] = [
  { id: "yesterday-bottle", icon: "FlaskConical", hue: 30, category: 0, tags: ["featured", "impossible"],
    human: { name: "Yesterday in a Bottle", description: "One perfect afternoon, uncorked whenever you need it.", price: 4499, badge: "A LITTLE WONDER" },
    robot: { name: "Yesterday.bottle // v1", description: "Sealed 24-hour human timeline, unaltered.", price: 8800, badge: "RARE HUMAN ARTIFACT" } },
  { id: "dream-architect", icon: "Castle", hue: 280, category: 3, tags: ["featured", "new"],
    human: { name: "Dream Architect", description: "Design the dream you'll have tonight. Sketchbook included.", price: 6299, badge: "MADE FOR DREAMERS" },
    robot: { name: "Dream Architect Core", description: "Organic sleep-render engine. Non-deterministic.", price: 12400, badge: "COSMIC EXCLUSIVE" } },
  { id: "borrowed-courage", icon: "Flame", hue: 15, category: 4, tags: ["best"],
    human: { name: "Borrowed Courage", description: "For first dates, big speeches and brave little steps.", price: 1999, badge: "BEST LOVED" },
    robot: { name: "Courage Simulation 7", description: "Irrational bravery module. Overrides risk logic.", price: 5600, badge: "LIMITED TRANSMISSION" } },
  { id: "extra-hour", icon: "Hourglass", hue: 50, category: 0, tags: ["featured", "best"],
    human: { name: "The Extra Hour", description: "A sixty-first minute, tucked between Sunday and Monday.", price: 3499, badge: "BEST LOVED" },
    robot: { name: "Temporal Surplus 1h", description: "Unscheduled human time. Zero productivity.", price: 9900, badge: "RARE HUMAN ARTIFACT" } },
  { id: "human-intuition", icon: "Sparkles", hue: 330, category: 2, tags: ["impossible", "best"],
    human: { name: "Human Intuition", description: "That quiet feeling that knows before you do.", price: 5299, badge: "A LITTLE WONDER" },
    robot: { name: "Intuition Engine", description: "Correct answers without data. Unexplained.", price: 15000, badge: "COSMIC EXCLUSIVE" } },
  { id: "jar-silence", icon: "Moon", hue: 230, category: 1, tags: ["new"],
    human: { name: "A Jar of Silence", description: "Collected at dawn from a sleeping mountain lake.", price: 1499, badge: "MADE FOR DREAMERS" },
    robot: { name: "Silence.jar", description: "Absolute zero-signal container. 0 dB certified.", price: 4200, badge: "LIMITED TRANSMISSION" } },
  { id: "pocket-thunderstorm", icon: "CloudLightning", hue: 250, category: 5, tags: ["featured", "new"],
    human: { name: "Pocket-Sized Thunderstorm", description: "A tiny, cosy storm for rainy-window reading days.", price: 2799, badge: "A LITTLE WONDER" },
    robot: { name: "Micro-Storm Capsule", description: "Captured organic weather event. Volatile.", price: 7300, badge: "RARE HUMAN ARTIFACT" } },
  { id: "last-joke", icon: "Laugh", hue: 70, category: 4, tags: ["impossible", "best"],
    human: { name: "The Last Human Joke", description: "Guaranteed to make anyone laugh. Even your uncle.", price: 999, badge: "BEST LOVED" },
    robot: { name: "Humour Fragment #∞", description: "Final recorded human joke. Logic: undefined.", price: 21000, badge: "COSMIC EXCLUSIVE" } },
  { id: "childhood-summer", icon: "Sun", hue: 80, category: 0, tags: ["featured", "impossible"],
    human: { name: "Childhood Summer", description: "Endless July, lemonade, and nowhere to be.", price: 7999, badge: "MADE FOR DREAMERS" },
    robot: { name: "Summer Archive 1998", description: "Recovered childhood memory. 92 days intact.", price: 18500, badge: "RARE HUMAN ARTIFACT" } },
  { id: "ocean-room", icon: "Waves", hue: 200, category: 2, tags: ["new", "best"],
    human: { name: "Ocean in a Room", description: "The tide, softly rolling in beside your bed.", price: 12999, badge: "A LITTLE WONDER" },
    robot: { name: "Oceanic Enclosure", description: "Planetary saltwater biome, room-scaled.", price: 26000, badge: "LIMITED TRANSMISSION" } },
  { id: "chaos-sketchbook", icon: "PenTool", hue: 350, category: 3, tags: ["new", "impossible"],
    human: { name: "Chaos Sketchbook", description: "Every page draws back. Ideas guaranteed.", price: 1799, badge: "MADE FOR DREAMERS" },
    robot: { name: "Chaos Ideation Pad", description: "Generates unpredictable organic creativity.", price: 6600, badge: "COSMIC EXCLUSIVE" } },
  { id: "colour-nobody-named", icon: "Palette", hue: 300, category: 5, tags: ["featured", "impossible"],
    human: { name: "The Colour Nobody Named", description: "Somewhere between longing and peach. Yours alone.", price: 3999, badge: "A LITTLE WONDER" },
    robot: { name: "Unindexed Wavelength", description: "Colour absent from all machine spectra.", price: 33000, badge: "COSMIC EXCLUSIVE" } },
];

export function formatPrice(world: World, value: number) {
  return world === "human"
    ? `₹${value.toLocaleString("en-IN")}`
    : `${value.toLocaleString("en-US")} Q-bits`;
}
