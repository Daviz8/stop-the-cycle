'use client';

import { useState } from 'react';
import { partnerTiers, coachingCategories } from '@/lib/data';

function BenefitList({ title, items, accent }) {
  if (!items || !items.length) return null;
  return (
    <div>
      <h4
        className={`font-montserrat text-xs font-extrabold uppercase tracking-[0.18em] ${accent}`}
      >
        {title}
      </h4>
      <ul className="mt-4 space-y-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3 text-sm leading-relaxed text-[#172546]/80">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#217A4B]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function PartnerTiers() {
  const [active, setActive] = useState(0);
  const tier = partnerTiers[active];

  return (
    <div>
      {/* Tier selector */}
      <div className="flex flex-wrap justify-center gap-3">
        {partnerTiers.map((t, i) => {
          const isActive = i === active;
          return (
            <button
              key={`${t.name}-${t.price}`}
              type="button"
              onClick={() => setActive(i)}
              className={`group rounded-2xl border px-5 py-3 text-left transition ${
                isActive
                  ? 'border-[#217A4B] bg-[#217A4B] text-white shadow-xl shadow-[#217A4B]/25'
                  : 'border-[#217A4B]/20 bg-white text-[#172546] hover:border-[#217A4B]/60'
              }`}
            >
              <span className="block font-montserrat text-sm font-extrabold">
                {t.name}
              </span>
              <span
                className={`block text-[11px] font-semibold ${
                  isActive ? 'text-[#8BE08B]' : 'text-[#D4A024]'
                }`}
              >
                {t.price}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active tier panel */}
      <div className="mt-10 overflow-hidden rounded-[28px] border border-[#217A4B]/12 bg-white shadow-2xl shadow-[#172546]/5">
        <div className="grid gap-0 lg:grid-cols-[0.9fr_1.6fr]">
          {/* Price side */}
          <div className="relative overflow-hidden bg-[#172546] p-8 text-white sm:p-10">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#217A4B]/40 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-[#D4A024]/25 blur-2xl" />
            <div className="relative">
              <p className="font-montserrat text-xs font-bold uppercase tracking-[0.22em] text-[#8BE08B]">
                Partnership Package
              </p>
              <h3 className="mt-4 font-montserrat text-4xl font-extrabold sm:text-5xl">
                {tier.name}
              </h3>
              <p className="mt-6 font-montserrat text-3xl font-extrabold text-[#D4A024]">
                {tier.price}
              </p>
              <p className="mt-2 text-sm text-[#E9F4F1]/80">
                {tier.usd} / {tier.gbp}
              </p>

              <div className="mt-8 rounded-2xl border border-white/15 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-[#8BE08B]">
                  Coaching & Consulting Categories
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {coachingCategories.map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-white/20 px-3 py-1 text-[11px] text-[#E9F4F1]/85"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Benefits side */}
          <div className="space-y-9 p-8 sm:p-10">
            <BenefitList
              title="Before The Event"
              items={tier.before}
              accent="text-[#D4A024]"
            />
            <div className="h-px w-full bg-[#217A4B]/10" />
            <BenefitList
              title="During The Event"
              items={tier.during}
              accent="text-[#217A4B]"
            />
            {tier.after && tier.after.length > 0 && (
              <>
                <div className="h-px w-full bg-[#217A4B]/10" />
                <BenefitList
                  title="After The Event"
                  items={tier.after}
                  accent="text-[#172546]"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}