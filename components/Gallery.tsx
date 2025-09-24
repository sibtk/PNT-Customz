"use client";

type MediaItem = { src: string; type: "image" | "video" };
let media: MediaItem[] = [];
try {
  // Load manifest produced by rename script
  const el = document?.createElement('link');
  // no-op to keep TS happy with "document" in client comp
  media = require("../public/gallery/manifest.json").items as MediaItem[];
} catch {}

export function Gallery() {
  return (
    <section id="gallery" className="py-16" aria-label="Our Work">
      <div className="container-max">
        <h2 className="text-2xl sm:text-3xl font-bold font-[var(--font-display)] mb-6">Our Work</h2>
        <p className="text-white/80 mb-6">Explore recent installs and transformations</p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
          {media.map((m, i) => (
            <div key={i} className="group relative overflow-hidden rounded-xl bg-[#2A2C31]">
              <div className="aspect-[4/3] w-full">
                {m.type === "image" ? (
                  // Use native img to avoid Next/Image 404 warnings during content staging
                  <img
                    src={m.src}
                    alt="Gallery item"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <video
                    className="w-full h-full object-contain bg-black"
                    src={m.src}
                    muted
                    loop
                    playsInline
                    onMouseEnter={(e) => (e.currentTarget as HTMLVideoElement).play()}
                    onMouseLeave={(e) => (e.currentTarget as HTMLVideoElement).pause()}
                  />
                )}
              </div>
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-white/80 text-xs bg-black/20 opacity-0 group-hover:opacity-100 transition">
                {m.type === "video" ? "Hover to play" : ""}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


