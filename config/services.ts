export type Service = {
  key: string;
  title: string;
  bullets: string[];
};

export const SERVICES: Service[] = [
  {
    key: "tint",
    title: "Window Tint",
    bullets: [
      "Heat and UV reduction, privacy, and style",
      "Ceramic and dyed options",
      "Legal shade guidance",
      "Rear glass contours",
      "Clean, edge-consistent installs",
    ],
  },
  {
    key: "ppf_full_front",
    title: "Paint Protection Film (PPF)",
    bullets: [
      "Clear protection against chips, scratches, and road debris",
      "High-impact zones",
      "Full-front packages",
      "Self-healing film options",
      "Invisible edges where possible",
    ],
  },
  {
    key: "vinyl_wrap_full",
    title: "Vinyl Wraps",
    bullets: [
      "Color changes, accents, and branding",
      "Full/partial wraps",
      "Chrome deletes",
      "Roof/hood accents",
      "Badge and trim details",
    ],
  },
  {
    key: "starlights",
    title: "Starlights (Headliner)",
    bullets: [
      "Custom starlight roof installations",
      "Multiple patterns",
      "Brightness control options",
      "Clean wiring",
      "OEM-like finish",
    ],
  },
  {
    key: "ceramic_coating",
    title: "Ceramic Coating",
    bullets: [
      "Long-lasting gloss and easier maintenance",
      "Multi-year protection",
      "Hydrophobic finish",
      "Paint, glass, wheels",
    ],
  },
  {
    key: "paint_correction_single",
    title: "Paint Corrections",
    bullets: [
      "Remove swirls and enhance clarity",
      "Single and multi-stage",
      "Gloss enhancement",
      "Safe polishing process",
    ],
  },
  {
    key: "caliper_paint",
    title: "Caliper Paint",
    bullets: [
      "Durable, color-matched caliper finishes",
      "High-temp coatings",
      "Logo/lettering options",
      "Wheel-off prep",
    ],
  },
  {
    key: "powder_coating_wheels",
    title: "Powder Coating",
    bullets: [
      "Durable finish for wheels and parts",
      "Color library",
      "Corrosion resistance",
      "Smooth or textured finishes",
    ],
  },
  {
    key: "wheel_paint_set",
    title: "Wheel Paint",
    bullets: [
      "Refresh or restyle wheel appearance",
      "Curb rash repair (where applicable)",
      "OEM and custom colors",
      "Clear-coat protection",
    ],
  },
  {
    key: "aftermarket_install",
    title: "Aftermarket Installations",
    bullets: [
      "Add-ons and accessories professionally installed",
      "Fitment guidance",
      "Clean wiring",
      "Secure mounting",
    ],
  },
];

export const SERVICE_KEYS = SERVICES.map((s) => s.key);


