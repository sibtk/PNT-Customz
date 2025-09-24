"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { SITE } from "@/config/site";

// Smooth scroll function
const smoothScrollTo = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
};

export function Hero() {
  return (
    <section className="relative pt-28" aria-label="Hero">
      {/* Mobile: Video first */}
      <div className="md:hidden mb-8">
        <div className="relative aspect-[9/16] rounded-3xl overflow-hidden">
          <video
            className="w-full h-full object-contain bg-black"
            src="/gallery/g-010.mp4"
            muted
            loop
            playsInline
            autoPlay
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-[#E02727]/20" />
          {/* Floating Get Quote button */}
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <motion.a 
              href="#quote"
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo('quote');
              }}
              className="bg-[#E02727]/40 backdrop-blur-md text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#E02727]/60 transition-all duration-300 shadow-xl border border-white/20 block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Quote
            </motion.a>
          </motion.div>
        </div>
      </div>

      <div className="container-max grid md:grid-cols-2 gap-8 items-center">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-[var(--font-display)] text-3xl sm:text-5xl font-bold leading-tight"
          >
            Automotive Tint, PPF, Wraps, and Custom Installs
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white/80 mt-4 max-w-prose"
          >
            Protect, style, and refresh your vehicle with quality materials and clean craftsmanship.
          </motion.p>
          <div className="mt-6 flex gap-3">
            <motion.a 
              href="#quote" 
              className="rounded-full bg-[#E02727] text-white px-5 py-3 font-medium"
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo('quote');
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {SITE.primaryCta}
            </motion.a>
            <motion.a 
              href="#gallery" 
              className="rounded-full border border-white/20 px-5 py-3 font-medium"
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo('gallery');
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {SITE.secondaryCta}
            </motion.a>
          </div>
          
          {/* Trust items */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 grid grid-cols-2 gap-3"
          >
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center hover:from-white/10 hover:to-white/15 transition-all duration-300">
              <div className="w-8 h-8 mx-auto mb-2 bg-gradient-to-br from-[#E02727]/20 to-[#E02727]/30 rounded-xl flex items-center justify-center">
                <span className="text-[#E02727] text-lg">🏆</span>
              </div>
              <h3 className="font-semibold text-sm mb-1">Expert Craftsmanship</h3>
              <p className="text-xs text-white/60">Professional installation</p>
            </div>
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center hover:from-white/10 hover:to-white/15 transition-all duration-300">
              <div className="w-8 h-8 mx-auto mb-2 bg-gradient-to-br from-[#E02727]/20 to-[#E02727]/30 rounded-xl flex items-center justify-center">
                <span className="text-[#E02727] text-lg">⚡</span>
              </div>
              <h3 className="font-semibold text-sm mb-1">Fast Turnaround</h3>
              <p className="text-xs text-white/60">Quick service</p>
            </div>
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center hover:from-white/10 hover:to-white/15 transition-all duration-300">
              <div className="w-8 h-8 mx-auto mb-2 bg-gradient-to-br from-[#E02727]/20 to-[#E02727]/30 rounded-xl flex items-center justify-center">
                <span className="text-[#E02727] text-lg">💎</span>
              </div>
              <h3 className="font-semibold text-sm mb-1">Premium Materials</h3>
              <p className="text-xs text-white/60">Quality products</p>
            </div>
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center hover:from-white/10 hover:to-white/15 transition-all duration-300">
              <div className="w-8 h-8 mx-auto mb-2 bg-gradient-to-br from-[#E02727]/20 to-[#E02727]/30 rounded-xl flex items-center justify-center">
                <span className="text-[#E02727] text-lg">🛡️</span>
              </div>
              <h3 className="font-semibold text-sm mb-1">Warranty</h3>
              <p className="text-xs text-white/60">Peace of mind</p>
            </div>
          </motion.div>
        </div>
        {/* Desktop: Video on right */}
        <div className="hidden md:block relative aspect-[9/16] sm:aspect-[4/3] lg:aspect-[3/4] rounded-3xl overflow-hidden">
          <video
            className="w-full h-full object-contain bg-black"
            src="/gallery/g-010.mp4"
            muted
            loop
            playsInline
            autoPlay
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-[#E02727]/20" />
        </div>
      </div>
    </section>
  );
}


