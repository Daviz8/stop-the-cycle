"use client"

import PartnerTiers from "../components/  PartnerTiers";
import SectionHeading from "../components/SectionHeading";
import { partners } from "@/lib/data";
import { site } from '@/lib/site';

export default function Partnership() {
      const doubled = [...partners, ...partners];
  return (
    <>
    <section id="partner" className="scroll-mt-24 bg-[#E9F4F1] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Partner With Us"
          title="Your partnership empowers the next generation"
          description="Your partnership, collaboration and support enable us to reach, develop and empower more youths, women and families."
        />

        <div className="mt-14">
          <PartnerTiers />
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl bg-[#172546] p-9 text-white">
            <h3 className="font-montserrat text-lg font-extrabold">
              To Partner With Us
            </h3>
            <p className="mt-3 text-sm text-[#E9F4F1]/75">
              Kindly choose a partnership package and make payment here:
            </p>
            <div className="mt-6 space-y-2 rounded-2xl border border-white/15 bg-white/5 p-6">
              <p className="font-montserrat text-2xl font-extrabold tracking-wide text-[#D4A024]">
                {site.bank.accountNumber}
              </p>
              <p className="text-sm font-semibold text-white">
                {site.bank.accountName}
              </p>
              <p className="text-sm text-[#E9F4F1]/70">{site.bank.bank}</p>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-9 shadow-xl shadow-[#172546]/5">
            <h3 className="font-montserrat text-lg font-extrabold text-[#172546]">
              For further enquiries
            </h3>
            <p className="mt-3 text-sm text-[#172546]/70">
              Kindly reach out to us:
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {site.contact.phones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="rounded-xl bg-[#E9F4F1] px-4 py-3 text-sm font-semibold text-[#217A4B] transition hover:bg-[#217A4B] hover:text-white"
                >
                  {phone}
                </a>
              ))}
            </div>
            <div className="mt-4 space-y-2 text-sm">
              <a
                href={`mailto:${site.contact.email}`}
                className="block font-semibold text-[#172546] hover:text-[#217A4B]"
              >
                {site.contact.email}
              </a>
              <p className="font-semibold text-[#172546]">
                {site.contact.website}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
       <section className="overflow-hidden bg-[#F9F2ED] py-16">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="text-center font-montserrat text-xs font-bold uppercase tracking-[0.3em] text-[#172546]/50">
          Partners
        </p>
      </div>
      <div className="relative mt-8">
        <div className="flex w-max animate-marquee gap-4">
          {doubled.map((p, i) => (
            <span
              key={`${p}-${i}`}
              className="flex h-20 w-48 shrink-0 items-center justify-center rounded-2xl border border-[#217A4B]/12 bg-white px-4 text-center font-montserrat text-xs font-bold uppercase tracking-wider text-[#172546]/70"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}

