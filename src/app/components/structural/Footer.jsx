import Link from 'next/link';
import { site } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="bg-[#172546] text-[#E9F4F1]">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="mt-6 max-w-md text-sm leading-relaxed text-[#E9F4F1]/75">
              Stop the Cycle Initiative is a non-governmental initiative powered
              by Uche Juan Foundation. We have empowered over 10,000 youths since
              2016 to break free from identity crisis, irresponsibility,
              unproductivity, mental health challenges, substance abuse, crime,
              and other vices ravaging the societies.
            </p>
            <div className="mt-8 flex items-center gap-5">
              <div className="text-xs leading-relaxed text-[#E9F4F1]/70">
                <p>Eleven years of breaking cycles.</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-montserrat text-sm font-bold uppercase tracking-[0.16em] text-[#8BE08B]">
              Explore
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                { href: '/', label: 'Home' },
                { href: '/#programs', label: 'Our Programs' },
                { href: '/#tlc', label: 'The Life Class' },
                { href: '/#summit', label: 'Global Summit' },
                { href: '/partners', label: 'Partner With Us' },
              ].map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-[#E9F4F1]/75 transition hover:text-[#D4A024]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-montserrat text-sm font-bold uppercase tracking-[0.16em] text-[#8BE08B]">
              Contact
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-[#E9F4F1]/75">
              {site.contact.phones.map((phone) => (
                <li key={phone}>
                  <a
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="transition hover:text-[#D4A024]"
                  >
                    {phone}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="transition hover:text-[#D4A024]"
                >
                  {site.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.contact.altEmail}`}
                  className="transition hover:text-[#D4A024]"
                >
                  {site.contact.altEmail}
                </a>
              </li>
              <li className="pt-2 font-semibold text-white">
                {site.contact.website}
              </li>
            </ul>

            <div className="mt-6 flex gap-3">
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="grid h-10 w-10 place-items-center rounded-full border border-[#E9F4F1]/25 text-xs transition hover:border-[#D4A024] hover:text-[#D4A024]"
              >
                IG
              </a>
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noreferrer"
                className="grid h-10 w-10 place-items-center rounded-full border border-[#E9F4F1]/25 text-xs transition hover:border-[#D4A024] hover:text-[#D4A024]"
              >
                FB
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-[#E9F4F1]/15 pt-8 text-xs text-[#E9F4F1]/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>
            {site.social.instagramHandle} · {site.social.facebookHandle} ·{' '}
            {site.contact.altEmail}
          </p>
        </div>
      </div>
    </footer>
  );
}