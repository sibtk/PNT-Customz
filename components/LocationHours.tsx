import { SITE } from "@/config/site";

export function LocationHours() {
  return (
    <section id="location" className="py-16" aria-label="Location and Hours">
      <div className="container-max grid md:grid-cols-2 gap-8 items-start">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold font-[var(--font-display)] mb-4">Find Us</h2>
          <p className="text-white/80">{SITE.address}</p>
          <div className="mt-3 flex gap-3">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#E02727] text-white px-5 py-2 text-sm"
            >
              Get Directions
            </a>
            <a href={SITE.phoneHref} className="rounded-full border border-white/20 px-5 py-2 text-sm">
              Call {SITE.phone}
            </a>
          </div>
          <div className="mt-2">
            <a href={`mailto:${SITE.email}`} className="text-white/80 underline">{SITE.email}</a>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Hours</h3>
          <table className="w-full text-sm">
            <tbody>
              {SITE.hours.map((h) => (
                <tr key={h.day} className="border-b border-white/10">
                  <td className="py-2 text-white/80">{h.day}</td>
                  <td className="py-2 text-right">{h.open}{h.close ? ` – ${h.close}` : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 rounded-xl overflow-hidden border border-white/10">
            <iframe
              title="Map to PNT Automotive Customz"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3459.971656908845!2d-95.70664692337117!3d29.865091227044104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640d7922e955555%3A0xdd6950d5e4405741!2s19200%20W%20Little%20York%20Rd%20suite%20204%2C%20Katy%2C%20TX%2077449!5e0!3m2!1sen!2sus!4v1758732823960!5m2!1sen!2sus"
              width="100%"
              height="300"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}


