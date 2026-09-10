"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Megaphone, Sparkles } from "lucide-react";
import Footer from "../components/structural/Footer";
import Navbar from "../components/structural/Navbar";

const reveal = {
  hidden: { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0 },
};

export default function NewsFeedClient() {
  const [theme, setTheme] = useState(null);
  const [weeklyNews, setWeeklyNews] = useState([]);
  const [outreaches, setOutreaches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/feed", { cache: "no-store" })
      .then((response) => response.json())
      .then((data) => {
        setTheme(data.theme || null);
        setWeeklyNews(data.weeklyNews || []);
        setOutreaches(data.outreaches || []);
      })
      .catch(() => {
        setTheme(null);
        setWeeklyNews([]);
        setOutreaches([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar />

      <main className="overflow-hidden bg-white text-[#172546]">
        {/* HERO */}
        <section className="relative isolate overflow-hidden bg-[#217A4B] px-4 py-24 text-white sm:px-6 lg:px-8">
          <div className="absolute -left-32 top-10 size-[400px] rounded-full bg-[#D4A024]/40 blur-[110px]" />
          <div className="absolute -right-32 bottom-0 size-[430px] rounded-full bg-[#E9F4F1]/20 blur-[120px]" />

          <motion.div
            initial="hidden"
            animate="visible"
            variants={reveal}
            transition={{ duration: 0.7 }}
            className="relative mx-auto max-w-[1180px]"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#D4A024]/50 bg-[#D4A024]/15 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#D4A024] backdrop-blur">
              <Sparkles className="size-4 text-[#D4A024]" />
              News Feed
            </span>

            <h1 className="mt-7 max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.055em] sm:text-6xl lg:text-8xl">
              <span className="block text-[#dbe3ee]">stay connected.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-base font-medium leading-8 text-white/85 sm:text-lg">
              Discover announcements, outreaches
              programmes and trainings.
            </p>
          </motion.div>
        </section>

        {loading ? (
          <div className="mx-auto max-w-[1180px] px-4 py-24 text-center">
            <p className="font-bold text-[#217A4B]">Loading updates...</p>
          </div>
        ) : (
          <>
            {/* WEEKLY NEWS */}
            <section className="bg-[#F9F2ED] px-4 py-20 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-[1180px]">
                <SectionLabel>Weekly News</SectionLabel>

                <div className="mt-7 flex flex-col justify-between gap-5 md:flex-row md:items-end">
                  <div>
                    <h2 className="text-4xl font-black tracking-[-0.05em] text-[#172546] sm:text-5xl">
                      This week
                    </h2>

                    <p className="mt-4 max-w-xl leading-7 text-[#172546]/70">
                      Important announcements, events, updates, and
                      opportunities to serve.
                    </p>
                  </div>

                  <Megaphone className="size-12 text-[#D4A024]" />
                </div>

                {weeklyNews.length ? (
                  <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                    {weeklyNews.map((item, index) => (
                      <motion.article
                        key={item._id || `${item.title}-${index}`}
                        initial={{ opacity: 0, y: 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.08 }}
                        whileHover={{ y: -8 }}
                        className="group overflow-hidden rounded-[28px] bg-white shadow-[0_18px_50px_rgba(23,37,70,0.08)]"
                      >
                        <div className="h-[230px] overflow-hidden bg-[#E9F4F1]">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.title}
                              className="size-full object-cover transition duration-700 group-hover:scale-105"
                            />
                          ) : (
                            <div className="grid size-full place-items-center bg-[#217A4B]">
                              <Megaphone className="size-16 text-[#D4A024]" />
                            </div>
                          )}
                        </div>

                        <div className="p-6">
                          <p className="text-xs font-black uppercase tracking-[0.17em] text-[#D4A024]">
                            Weekly Update
                          </p>

                          <h3 className="mt-3 text-2xl font-black tracking-[-0.04em] text-[#172546]">
                            {item.title}
                          </h3>

                          <p className="mt-3 line-clamp-4 leading-7 text-[#172546]/70">
                            {item.excerpt}
                          </p>

                          <div className="mt-6 inline-flex items-center gap-2 font-black text-[#217A4B]">
                            Stay informed
                            <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                          </div>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                ) : (
                  <EmptyState text="Weekly news will appear here." />
                )}
              </div>
            </section>

            {/* OUTREACHES */}
            {outreaches.length > 0 && (
              <section className="bg-[#E9F4F1] px-4 py-20 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-[1180px]">
                  <SectionLabel>Outreaches</SectionLabel>

                  <h2 className="mt-7 text-4xl font-black tracking-[-0.05em] text-[#172546] sm:text-5xl">
                    Serving our community
                  </h2>

                  <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                    {outreaches.map((item, index) => (
                      <motion.article
                        key={item._id || `${item.title}-${index}`}
                        initial={{ opacity: 0, y: 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.08 }}
                        className="overflow-hidden rounded-[28px] bg-white shadow-[0_18px_50px_rgba(23,37,70,0.08)]"
                      >
                        <div className="h-[230px] overflow-hidden bg-[#F9F2ED]">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.title}
                              className="size-full object-cover"
                            />
                          ) : (
                            <div className="grid size-full place-items-center bg-[#D4A024]">
                              <Sparkles className="size-16 text-[#172546]" />
                            </div>
                          )}
                        </div>

                        <div className="p-6">
                          <h3 className="text-2xl font-black tracking-[-0.04em] text-[#172546]">
                            {item.title}
                          </h3>

                          <p className="mt-3 line-clamp-4 leading-7 text-[#172546]/70">
                            {item.excerpt}
                          </p>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* THEME OF THE MONTH */}
            {theme && (
              <section className="bg-[#F9F2ED] px-4 py-20 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-[1180px] rounded-[32px] bg-[#172546] p-10 text-white sm:p-14">
                  <SectionLabel light>Theme of the Month</SectionLabel>
                  <h2 className="mt-6 text-3xl font-black tracking-[-0.04em] sm:text-4xl">
                    {theme.title}
                  </h2>
                  {theme.description && (
                    <p className="mt-5 max-w-3xl leading-7 text-white/80">
                      {theme.description}
                    </p>
                  )}
                </div>
              </section>
            )}
          </>
        )}
      </main>

      <Footer />
    </>
  );
}

function SectionLabel({ children, light = false }) {
  return (
    <p
      className={`text-xs font-black uppercase tracking-[0.2em] ${
        light ? "text-[#fffdf7]" : "text-[#217A4B]"
      }`}
    >
      {children}
    </p>
  );
}

function EmptyState({ text }) {
  return (
    <div className="mt-10 rounded-[28px] border border-dashed border-[#217A4B]/25 bg-[#E9F4F1] p-10 text-center font-bold text-[#172546]/60">
      {text}
    </div>
  );
}