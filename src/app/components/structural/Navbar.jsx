"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Heart, Menu, Sparkles, X } from "lucide-react";
import { navLinks } from "@/lib";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function isActive(url) {
    if (url === "/") {
      return pathname === "/";
    }

    return pathname === url || pathname.startsWith(`${url}/`);
  }

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "border-b border-[#217A4B]/15 bg-[#F9F2ED]/85 shadow-[0_12px_35px_rgba(23,37,70,0.09)] backdrop-blur-2xl"
            : "border-b border-[#217A4B]/10 bg-[#F9F2ED]/70 backdrop-blur-xl"
        }`}
      >
        <nav className="mx-auto flex h-[82px] max-w-[1240px] items-center px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-3"
            aria-label="Stop The Cycle home"
          >
            <span className="relative grid size-12 place-items-center overflow-hidden rounded-2xl text-white shadow-[0_10px_28px_rgba(33,122,75,0.25)] transition duration-300 group-hover:rotate-3 group-hover:scale-105">
              <img
                src="/images/stop the cycle.webp"
                className="size-11"
                strokeWidth={2.2}
                alt="TSM Logo"
              />

              <span className="absolute -right-2 -top-2 size-6 rounded-full bg-white/25 blur-sm" />
            </span>

            <span className="hidden sm:block">
              <span className="block text-[18px] font-black leading-none tracking-[-0.04em] text-[#172546]">
                Stop The Cycle
              </span>

              <span className="mt-1 block text-[10px] font-black uppercase tracking-[0.18em] text-[#217A4B]">
                It . Starts . With . You
              </span>
            </span>
          </Link>

          <div className="mx-auto hidden items-center gap-1 rounded-full border border-[#217A4B]/15 bg-white/60 p-1.5 shadow-sm backdrop-blur-xl lg:flex">
            {navLinks.map((item) => {
              const active = isActive(item.url);
              const prayerLink = item.slug === "prayer";

              return (
                <Link
                  key={item.slug || item.name}
                  href={item.url}
                  className={`relative rounded-full px-4 py-2.5 text-[14px] font-black transition duration-300 ${
                    active
                      ? "bg-[#217A4B] text-white shadow-[0_8px_22px_rgba(33,122,75,0.25)]"
                      : prayerLink
                        ? "text-[#217A4B] hover:bg-[#E9F4F1]"
                        : "text-[#172546]/70 hover:bg-white hover:text-[#217A4B]"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="ml-auto grid size-12 place-items-center rounded-2xl border border-[#217A4B]/20 bg-white/75 text-[#217A4B] shadow-sm backdrop-blur-xl transition hover:bg-[#217A4B] hover:text-white lg:hidden"
            aria-label="Open navigation menu"
            aria-expanded={open}
          >
            <Menu className="size-6" />
          </button>
        </nav>
      </header>

      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[90] bg-[#172546]/55 backdrop-blur-sm transition duration-300 lg:hidden ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed right-0 top-0 z-[100] h-full w-[88%] max-w-[390px] overflow-y-auto border-l border-[#217A4B]/15 bg-[#F9F2ED]/95 p-6 shadow-[-25px_0_80px_rgba(23,37,70,0.22)] backdrop-blur-2xl transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3"
          >
            <span className="grid size-12 place-items-center rounded-2xl text-white">
              <img
                src="/images/stop the cycle.webp"
                className="size-11"
                strokeWidth={2.2}
                alt="TSM Logo"
              />
            </span>

            <span>
              <span className="block text-[17px] font-black text-[#172546]">
                Stop The Cycle
              </span>

              <span className="block text-[10px] font-black uppercase tracking-[0.16em] text-[#217A4B]">
                It . Starts . With . You
              </span>
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="grid size-11 place-items-center rounded-full bg-[#E9F4F1] text-[#217A4B] transition hover:bg-[#217A4B] hover:text-white"
            aria-label="Close navigation menu"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="mt-8 space-y-2">
          {navLinks.map((item) => {
            const active = isActive(item.url);

            return (
              <Link
                key={item.slug || item.name}
                href={item.url}
                onClick={() => setOpen(false)}
                className={`flex min-h-14 items-center justify-between rounded-2xl px-5 text-[16px] font-black transition ${
                  active
                    ? "bg-[#217A4B] text-white"
                    : "bg-white/65 text-[#172546]/80 hover:bg-[#E9F4F1] hover:text-[#217A4B]"
                }`}
              >
                {item.name}

                <span
                  className={`size-2 rounded-full ${
                    active ? "bg-[#D4A024]" : "bg-[#172546]/25"
                  }`}
                />
              </Link>
            );
          })}
        </div>
      </aside>
    </>
  );
}