import { SITE } from "@/config/site";

export function Footer() {
  return (
    <footer className="mt-10 border-t border-white/10" aria-label="Footer">
      <div className="container-max py-8 grid md:grid-cols-3 gap-6 text-sm">
        <div>
          <div className="font-semibold">{SITE.company}</div>
          <p className="text-white/80 mt-2">Premium automotive customization in Katy, TX</p>
          <a href={SITE.website} target="_blank" rel="noopener noreferrer" className="underline mt-2 inline-block">
            Visit website
          </a>
        </div>
        <div>
          <div className="font-semibold">Contact</div>
          <div className="mt-2"><a href={SITE.phoneHref} className="underline">{SITE.phone}</a></div>
          <div><a href={`mailto:${SITE.email}`} className="underline">{SITE.email}</a></div>
        </div>
        <div>
          <div className="font-semibold">Hours</div>
          <ul className="mt-2 text-white/80">
            {SITE.hours.map((h) => (
              <li key={h.day}>{h.day}: {h.open}{h.close ? ` - ${h.close}` : ''}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/70">
        © {new Date().getFullYear()} {SITE.company}. All rights reserved.
      </div>
    </footer>
  );
}


