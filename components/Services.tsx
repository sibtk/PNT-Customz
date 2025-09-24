"use client";
import { motion } from "framer-motion";
import { SERVICES } from "@/config/services";

export function Services() {
  return (
    <section id="services" className="py-16" aria-label="Services">
      <div className="container-max">
        <h2 className="text-2xl sm:text-3xl font-bold font-[var(--font-display)] mb-6">Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s, idx) => (
            <motion.div
              key={s.key}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.03 }}
              className="rounded-2xl bg-[#1A1B1E] border border-white/10 p-5 hover:scale-[1.01] transition will-change-transform"
            >
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <ul className="mt-3 space-y-1 text-white/80 text-sm">
                {s.bullets.map((b) => (
                  <li key={b} className="pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-[#E02727]">
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


