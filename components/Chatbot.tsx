"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Estimator } from "./Estimator";

export function Chatbot() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 800);
    return () => clearTimeout(t);
  }, []);

  function handleSend(payload: unknown) {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new CustomEvent("prefill-quote", { detail: payload }));
    const el = document.querySelector('#quote');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="fixed bottom-4 right-4 z-50" aria-live="polite">
      <div className="relative" style={{ width: 56, height: 56 }}>
        <AnimatePresence>
          {open && (
            <motion.div
              key="chat-card"
              initial={{ opacity: 0, scale: 0.9, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 8 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              className="absolute bottom-16 right-0"
            >
              <div className="relative">
                <button
                  aria-label="Close assistant"
                  onClick={() => setOpen(false)}
                  className="absolute -top-2 -right-2 z-10 rounded-full w-8 h-8 bg-white text-black border border-black/10 shadow"
                  title="Close"
                >
                  ×
                </button>
                <Estimator onSend={handleSend} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {!open && (
            <motion.button
              key="chat-launcher"
              aria-label="Open quote assistant"
              onClick={() => setOpen(true)}
              className="absolute bottom-0 right-0 rounded-full w-14 h-14 bg-[#E02727] text-white shadow-lg"
              initial={{ opacity: 0, scale: 0.9, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 8 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
            >
              Chat
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}


