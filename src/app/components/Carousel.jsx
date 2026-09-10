'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Photo from './Photo';

export default function Carousel({
  slides = [],
  itemClass = 'w-[85%] sm:w-[58%] lg:w-[32%]',
  aspect = 'aspect-[4/3]',
  rounded = 'rounded-2xl',
  className = '',
  autoplay = true,
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', containScroll: 'trimSnaps' },
    autoplay ? [Autoplay({ delay: 4500, stopOnInteraction: false })] : []
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollTo = useCallback(
    (index) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );

  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return undefined;

    const onInit = () => setScrollSnaps(emblaApi.scrollSnapList());
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());

    onInit();
    onSelect();

    emblaApi.on('reInit', onInit);
    emblaApi.on('select', onSelect);

    return () => {
      emblaApi.off('reInit', onInit);
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  if (!slides.length) return null;

  return (
    <div className={`relative ${className}`}>
      {/* Viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {slides.map((slide, index) => (
            <div
              key={`${slide.src}-${index}`}
              className={`shrink-0 grow-0 ${itemClass}`}
            >
              <Photo
                src={slide.src}
                alt={slide.alt}
                label={slide.label}
                className={`${aspect} w-full ${rounded} shadow-lg shadow-[#172546]/10`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          type="button"
          aria-label="Previous slide"
          onClick={scrollPrev}
          className="grid h-11 w-11 place-items-center rounded-full border border-[#217A4B]/30 bg-white text-lg text-[#217A4B] transition hover:bg-[#217A4B] hover:text-white"
        >
          ‹
        </button>

        <div className="flex max-w-[60%] items-center gap-1.5 overflow-hidden">
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => scrollTo(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === selectedIndex
                  ? 'w-6 bg-[#217A4B]'
                  : 'w-1.5 bg-[#217A4B]/25 hover:bg-[#217A4B]/50'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Next slide"
          onClick={scrollNext}
          className="grid h-11 w-11 place-items-center rounded-full border border-[#217A4B]/30 bg-white text-lg text-[#217A4B] transition hover:bg-[#217A4B] hover:text-white"
        >
          ›
        </button>
      </div>
    </div>
  );
}