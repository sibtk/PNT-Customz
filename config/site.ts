export const SITE = {
  company: "PNT Automotive Customz",
  tagline: "Premium automotive customization in Katy, TX",
  about:
    "We provide professional automotive customization services including window tint, paint protection, vinyl wraps, coatings, and more. Friendly service, careful installs, and clean finish.",
  phone: "(713) 291-5578",
  phoneHref: "tel:(713)291-5578",
  email: "pnt.tinting@gmail.com",
  address: "19200 W Little York Rd, Suite 204, Katy, Texas 77449",
  website: "https://pntcustomz.square.site/",
  primaryCta: "Get a Quote",
  secondaryCta: "See Our Work",
  seo: {
    title: "PNT Automotive Customz | Window Tint, PPF, Wraps in Katy, TX",
    description:
      "Window tint, paint protection film, vinyl wraps, starlights, ceramic coating, paint correction, caliper paint, powder coating, wheel paint, and aftermarket installs in Katy, TX. Call (713) 291-5578.",
  },
  palette: {
    black: "#0B0B0C",
    red: "#E02727",
    darkGray: "#1A1B1E",
    midGray: "#2A2C31",
    lightGray: "#ECEDEF",
    white: "#FFFFFF",
    silver: "#C8CDD2",
  },
  hours: [
    { day: "Mon–Fri", open: "9:00 AM", close: "7:00 PM" },
    { day: "Sat", open: "8:00 AM", close: "7:00 PM" },
    { day: "Sun", open: "Closed", close: "" },
  ],
} as const;

export const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#gallery", label: "Gallery" },
  { href: "#reviews", label: "Reviews" },
  { href: "#location", label: "Location" },
  { href: "#quote", label: "Quote" },
] as const;

export type ServiceKey =
  | "tint"
  | "ppf_full_front"
  | "vinyl_wrap_full"
  | "starlights"
  | "ceramic_coating"
  | "paint_correction_single"
  | "caliper_paint"
  | "powder_coating_wheels"
  | "wheel_paint_set"
  | "aftermarket_install";


