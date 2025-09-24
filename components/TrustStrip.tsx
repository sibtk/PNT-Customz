"use client";
import { motion } from "framer-motion";

const items = [
  { title: "Quality Work", desc: "Clean installs, careful prep" },
  { title: "Experienced Team", desc: "Professional automotive specialists" },
  { title: "Premium Materials", desc: "Reputable films and coatings" },
  { title: "Fast Turnaround", desc: "By appointment, timely delivery" },
];

export function TrustStrip() {
  return (
    <section className="py-8" aria-label="Trust">
      <div className="container-max grid grid-cols-2 md:grid-cols-4 gap-3">
        {items.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="rounded-full bg-[#1A1B1E] border border-white/10 px-4 py-3 text-center shadow-sm"
          >
            <div className="text-sm font-semibold">{it.title}</div>
            <div className="text-xs text-white/70">{it.desc}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}


