"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Estimator } from "./Estimator";

export function Chatbot() {
  const [open, setOpen] = useState(false);

  function handleSend(payload: unknown) {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new CustomEvent("prefill-quote", { detail: payload }));
    const el = document.querySelector('#quote');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="fixed bottom-4 right-4 z-50" aria-live="polite">
      <div className="relative">
        <AnimatePresence>
          {open && (
            <motion.div
              key="chat-window"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
            >
              {/* Chat Header */}
              <div className="bg-[#E02727] text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-sm">🤖</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">PNT Assistant</h3>
                    <p className="text-xs text-white/80">Online now</p>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition"
                  aria-label="Close chat"
                >
                  ×
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                <div className="flex gap-2">
                  <div className="w-6 h-6 bg-[#E02727]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs">🤖</span>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm text-gray-800">Hi! I&apos;m here to help you get a quote for your automotive customization needs. Let me ask you a few questions to provide an accurate estimate.</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <div className="w-6 h-6 bg-[#E02727]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs">🤖</span>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm text-gray-800">What services are you interested in?</p>
                  </div>
                </div>
              </div>

              {/* Estimator Component */}
              <div className="border-t border-gray-200 p-4">
                <Estimator onSend={handleSend} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Launcher */}
        <AnimatePresence>
          {!open && (
            <motion.button
              key="chat-launcher"
              onClick={() => setOpen(true)}
              className="w-14 h-14 bg-[#E02727] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#C02323] transition-colors"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              aria-label="Open chat assistant"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}


