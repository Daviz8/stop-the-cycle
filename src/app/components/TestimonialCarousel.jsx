'use client';

import { useEffect, useState } from 'react';

export default function TestimonialSlider({ items = [] }) {
  const [index, setIndex] = useState(0);
  const [perView, setPerView] = useState(1);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const update = () => setPerView(mq.matches ? 2 : 1);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const pages = Math.max(1, Math.ceil(items.length / perView));
  const page = Math.min(index, pages - 1);

  useEffect(() => {
    if (pages <= 1) return undefined;
    const timer = setInterval(() => setIndex((v) => (v + 1) % pages), 7000);
    return () => clearInterval(timer);
  }, [pages]);

  if (!items.length) return null;

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${page * 100}%)` }}
        >
          {items.map((item, i) => (
            <div
              key={`${item.name}-${i}`}
              className="w-full shrink-0 px-2 lg:w-1/2"
            >
              <figure className="flex h-full flex-col justify-between rounded-3xl border border-[#217A4B]/10 bg-white p-7 shadow-xl shadow-[#172546]/5 sm:p-9">
                <div>
                  <span className="font-montserrat text-4xl leading-none text-[#D4A024]">
                    &ldquo;
                  </span>
                  <blockquote className="mt-3 text-[15px] leading-relaxed text-[#172546]/85 sm:text-base">
                    {item.quote}
                  </blockquote>
                </div>
                <figcaption className="mt-7 flex items-center gap-4 border-t border-[#217A4B]/10 pt-5">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#217A4B] font-montserrat text-sm font-bold text-white">
                    {item.name
                      .split(' ')
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join('')}
                  </span>
                  <span>
                    <span className="block font-montserrat text-sm font-bold text-[#172546]">
                      {item.name}
                    </span>
                    <span className="block text-xs text-[#217A4B]">
                      {item.role}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-3">
        <button
          type="button"
          aria-label="Previous testimonial"
          onClick={() => setIndex((v) => (v - 1 + pages) % pages)}
          className="grid h-11 w-11 place-items-center rounded-full border border-[#217A4B]/30 bg-white text-lg text-[#217A4B] transition hover:bg-[#217A4B] hover:text-white"
        >
          ‹
        </button>

        <div className="flex items-center gap-2">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === page ? 'w-7 bg-[#217A4B]' : 'w-2 bg-[#217A4B]/25'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Next testimonial"
          onClick={() => setIndex((v) => (v + 1) % pages)}
          className="grid h-11 w-11 place-items-center rounded-full border border-[#217A4B]/30 bg-white text-lg text-[#217A4B] transition hover:bg-[#217A4B] hover:text-white"
        >
          ›
        </button>
      </div>
    </div>
  );
}