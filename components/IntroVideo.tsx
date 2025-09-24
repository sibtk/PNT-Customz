"use client";
import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "pnt_intro_seen_v1";

export function IntroVideo() {
  const [show, setShow] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const seen = typeof window !== "undefined" && window.localStorage.getItem(STORAGE_KEY);
    if (!seen) {
      setShow(true);
    }
  }, []);

  useEffect(() => {
    if (!show) return;
    function onScroll() {
      setShow(false);
      try { window.localStorage.setItem(STORAGE_KEY, "1"); } catch {}
      window.removeEventListener("scroll", onScroll);
    }
    window.addEventListener("scroll", onScroll, { once: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [show]);

  if (!show) return null;
  return (
    <div className="fixed inset-0 z-[60] bg-black">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        muted
        playsInline
        src="/intro.mp4"
        onEnded={() => {
          try { window.localStorage.setItem(STORAGE_KEY, "1"); } catch {}
          setShow(false);
        }}
      />
      <button
        aria-label="Close intro"
        className="absolute top-4 right-4 bg-white/10 text-white px-3 py-2 rounded-lg border border-white/20"
        onClick={() => {
          try { window.localStorage.setItem(STORAGE_KEY, "1"); } catch {}
          setShow(false);
        }}
      >
        Skip
      </button>
    </div>
  );
}


