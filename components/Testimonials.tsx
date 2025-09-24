export function Testimonials() {
  const items = [
    "Clean edges and no bubbles. Tint looks factory. Five stars.",
    "Booked PPF full front. Fast and professional. Will return.",
    "Wrap and calipers came out perfect. Attention to detail shows.",
  ];
  return (
    <section id="reviews" className="py-16" aria-label="Reviews">
      <div className="container-max">
        <h2 className="text-2xl sm:text-3xl font-bold font-[var(--font-display)] mb-6">Reviews</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {items.map((t, i) => (
            <div key={i} className="rounded-2xl bg-[#1A1B1E] border border-white/10 p-5">
              <div className="text-[#E02727] mb-2" aria-hidden>★★★★★</div>
              <p className="text-white/90">{t}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


