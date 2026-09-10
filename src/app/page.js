import Link from 'next/link';

import TestimonialSlider from './components/TestimonialCarousel';
import PartnerTiers from './components/  PartnerTiers';
import SectionHeading from './components/SectionHeading';
import { site } from '@/lib/site';
import {
  stats,
  vision,
  mission,
  values,
  weeklyTrainings,
  quarterlyTrainings,
  annualSummit,
  tlcPillars,
  testimonials,
  partners,

} from '@/lib/data';
import Navbar from './components/structural/Navbar';
import Footer from './components/structural/Footer';

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#F9F2ED]">
      <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-[#E9F4F1] blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-[#D4A024]/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-12 lg:grid-cols-2 lg:gap-10 lg:px-8 lg:pb-28 lg:pt-20">
        <div className="animate-fade-up"> 

          <div className="relative mt-8 inline-block">
            <h1 className="font-montserrat font-extrabold leading-[0.86] tracking-tight">
              <span className="block text-[64px] text-[#1FA97F] sm:text-[86px] lg:text-[96px]">
                Stop
              </span>
              <span className="block text-[64px] text-[#5A6472] sm:text-[86px] lg:text-[96px]">
                Cycle
              </span>
            </h1>
            <span className="absolute left-1/2 top-[38%] -translate-x-1/2 rounded-full bg-[#8BE08B] px-4 py-1.5 font-montserrat text-sm font-extrabold text-[#172546] shadow-lg shadow-[#217A4B]/20 sm:px-5 sm:py-2 sm:text-lg">
              The
            </span>
            <span className="mt-1 block h-2 w-40 rounded-full bg-[#1FA97F] sm:w-56" />
          </div>

          <p className="mt-8 max-w-xl text-base leading-relaxed text-[#172546]/75 sm:text-lg">
            A non-governmental initiative powered by{' '}
            <span className="font-semibold text-[#217A4B]">
              Uche Juan Foundation
            </span>
            . We have empowered over{' '}
            <span className="font-semibold text-[#172546]">10,000 youths</span>{' '}
            since 2016 to break free from identity crisis, irresponsibility,
            unproductivity, mental health challenges, substance abuse, crime and
            other vices ravaging our societies.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href={site.registerUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#217A4B] px-7 py-4 font-montserrat text-sm font-bold text-white shadow-xl shadow-[#217A4B]/30 transition hover:-translate-y-0.5 hover:bg-[#172546]"
            >
              Register for the Summit →
            </a>
        
          </div>
        </div>

        <div className="relative animate-fade-up">
          <div className="absolute -left-4 -top-4 hidden h-full w-full rounded-4xl border-2 border-[#D4A024]/30 lg:block" />
          <img
            src="/imgs/visionary-portrait.jpg"
            alt="Engr. Uche Juan Augustine, Visionary of Stop The Cycle Initiative"
            label="Engr. Uche Juan Augustine — Visionary"
            className="relative aspect-4/5 w-full rounded-4xl shadow-2xl shadow-[#172546]/20"
            
          />
          <div className="absolute -bottom-6 -left-4 rounded-2xl bg-white p-5 shadow-2xl shadow-[#172546]/15 sm:-left-8">
            <p className="font-montserrat text-2xl font-extrabold text-[#217A4B]">
              17+ Years
            </p>
            <p className="text-xs text-[#172546]/70">
              Youth Empowerment & Rehabilitation
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ImpactBar() {
  return (
    <section className="bg-[#172546]">
      <div className="mx-auto grid max-w-5xl gap-8 px-5 py-14 sm:grid-cols-2 lg:grid-cols-3 lg:px-8">
        {stats.map((s) => (
          <div key={s.label} className="border-l-2 border-[#217A4B] pl-5">
            <p className="font-montserrat text-3xl font-extrabold text-[#D4A024] sm:text-4xl">
              {s.value}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[#E9F4F1]/75">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function WhoWeAre() {
  return (
    <section className="bg-[#F9F2ED] py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-2 lg:items-center lg:px-8">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Who We Are"
            title="Stop the cycle."
          />
          <div className="mt-7 space-y-5 text-[15px] leading-relaxed text-[#172546]/75 sm:text-base">
            <p>
              Stop the Cycle Initiative is a non-governmental initiative powered
              by Uche Juan Foundation. We have empowered over{' '}
              <strong className="font-semibold text-[#172546]">
                10,000 youths since 2016
              </strong>{' '}
              to break free from identity crisis, irresponsibility,
              unproductivity, mental health challenges, substance abuse, crime,
              and other vices ravaging the societies.
            </p>
            <p>
              It is currently convened by{' '}
              <strong className="font-semibold text-[#172546]">
                Engr. Uche Juan Augustine
              </strong>{' '}
              who has been in the path of Youth Empowerment and Rehabilitation
              for 17 years and counting.
            </p>
            <p>
              We believe that the youth and the middle aged are the key to
              heralding National transformation. Having kicked off for the past
              ten years in the city of Port Harcourt City, Nigeria, Stop the
              Cycle Initiative has learnt and mastered the requisite approaches,
              strategies and programs for putting a halt to cycles that impede
              the National Development of youths.
            </p>
            <p>
              Through our events and youth development training, the Initiative
              has been able to discover, build and instill{' '}
              <strong className="font-semibold text-[#217A4B]">
                care, confidence, compassion, character, competence and
                contribution
              </strong>{' '}
              amongst the youth.
            </p>
          </div>

      
        </div>

        <div className="grid grid-cols-2 gap-4">
          <img
            src="/imgs/gallery/tlc-1.jpg"
            label="The Life Class Community"
            className="col-span-2 aspect-[16/10] rounded-3xl shadow-xl shadow-[#172546]/10"
          />
          <img
            src="/imgs/gallery/public-speaking-1.jpg"
            label="Public Speaking Masterclass"
            className="aspect-square rounded-3xl shadow-xl shadow-[#172546]/10"
          />
          <img
            src="/imgs/gallery/annual-summit-1.jpg"
            label="Annual Summit"
            className="aspect-square rounded-3xl shadow-xl shadow-[#172546]/10"
          />
        </div>
      </div>
    </section>
  );
}

function VisionMissionValues() {
  return (
    <section className="bg-[#E9F4F1] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Our Compass"
          title="Vision, Mission & Values"
          description="Everything we do is anchored on a clear picture of the future we are building and the character we are building it with."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl bg-[#217A4B] p-9 text-white shadow-xl shadow-[#217A4B]/20">
            <span className="font-montserrat text-xs font-bold uppercase tracking-[0.22em] text-[#8BE08B]">
              Our Vision
            </span>
            <p className="mt-5 font-montserrat text-xl font-bold leading-snug sm:text-2xl">
              {vision}
            </p>
          </div>

          <div className="rounded-3xl bg-white p-9 shadow-xl shadow-[#172546]/5">
            <span className="font-montserrat text-xs font-bold uppercase tracking-[0.22em] text-[#217A4B]">
              Our Mission
            </span>
            <p className="mt-5 text-[15px] leading-relaxed text-[#172546]/85">
              {mission}
            </p>
          </div>

          <div className="rounded-3xl bg-[#172546] p-9 text-white shadow-xl shadow-[#172546]/20">
            <span className="font-montserrat text-xs font-bold uppercase tracking-[0.22em] text-[#D4A024]">
              Our Values
            </span>
            <div className="mt-5 flex flex-wrap gap-2">
              {values.map((v) => (
                <span
                  key={v}
                  className="rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm text-[#E9F4F1]"
                >
                  {v}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Programs() {
  return (
    <section id="programs" className="scroll-mt-24 bg-[#F9F2ED] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="What We Do"
          title="We train, empower, collaborate and build."
          description="Using our weekly classes, quarterly vocational trainings and annual national summit for youth development and national transformation."
        />

        <div className="mt-14">
          <h3 className="font-montserrat text-xl font-extrabold text-[#172546]">
            Weekly Trainings
          </h3>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {weeklyTrainings.map((t) => (
              <div
                key={t.title}
                className="group rounded-3xl border border-[#217A4B]/12 bg-white p-8 shadow-lg shadow-[#172546]/5 transition hover:-translate-y-1 hover:shadow-2xl"
              >
                <span className="inline-flex rounded-full bg-[#E9F4F1] px-4 py-1.5 font-montserrat text-[11px] font-bold uppercase tracking-[0.16em] text-[#217A4B]">
                  {t.schedule}
                </span>
                <h4 className="mt-5 font-montserrat text-xl font-extrabold text-[#172546]">
                  {t.title}
                </h4>
                <p className="mt-3 text-sm leading-relaxed text-[#172546]/70">
                  {t.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h3 className="font-montserrat text-xl font-extrabold text-[#172546]">
            Quarterly Trainings
          </h3>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {quarterlyTrainings.map((t, i) => (
              <div
                key={t.title}
                className="rounded-3xl bg-white p-7 shadow-lg shadow-[#172546]/5 ring-1 ring-[#217A4B]/10"
              >
                <span className="font-montserrat text-sm font-extrabold text-[#D4A024]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h4 className="mt-3 font-montserrat text-lg font-bold text-[#172546]">
                  {t.title}
                </h4>
                <p className="mt-3 text-sm leading-relaxed text-[#172546]/70">
                  {t.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 overflow-hidden rounded-[32px] bg-[#217A4B] p-9 text-white sm:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <span className="font-montserrat text-xs font-bold uppercase tracking-[0.22em] text-[#8BE08B]">
                Annual Summit
              </span>
              <h3 className="mt-4 font-montserrat text-2xl font-extrabold sm:text-3xl">
                {annualSummit.title}
              </h3>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
                {annualSummit.description}
              </p>
            </div>
            <div className="flex justify-start lg:justify-end">
              <a
                href={site.registerUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#D4A024] px-7 py-4 font-montserrat text-sm font-bold text-[#172546] shadow-xl transition hover:-translate-y-0.5 hover:bg-white"
              >
                Register Now →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TLC() {
  return (
    <section id="tlc" className="scroll-mt-24 bg-[#172546] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading
              align="left"
              light
              eyebrow="Weekly Engagement"
              title="The Life Class Community"
              description="TLC is the weekly arm of Stop The Cycle Initiative — a safe haven where young people find answers, grow in confidence and discover their worth."
            />

            <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-[#E9F4F1]/75">
              <p>
                Every Thursday, The Life Class Community gathers people who are
                searching — for identity, purpose, direction and community. It
                is where self-love is taught, self-esteem is rebuilt and purpose
                is uncovered.
              </p>
              <p>
                Members describe TLC as a{' '}
                <em className="text-[#8BE08B] not-italic">
                  &ldquo;safe haven for communication&rdquo;
                </em>{' '}
                and a place where they are{' '}
                <em className="text-[#8BE08B] not-italic">
                  &ldquo;stretched beyond barriers&rdquo;
                </em>{' '}
                to do more.
              </p>
            </div>

            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              {tlcPillars.map((p) => (
                <div
                  key={p.title}
                  className="rounded-2xl border border-white/12 bg-white/5 p-5"
                >
                  <h4 className="font-montserrat text-sm font-extrabold text-[#8BE08B]">
                    {p.title}
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-[#E9F4F1]/75">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap gap-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-white">
                🗓 Every Thursday
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-white">
                📍 Port Harcourt City, Nigeria
              </span>
              <a
                href={site.registerUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#217A4B] px-6 py-3 font-montserrat text-sm font-bold text-white transition hover:bg-[#D4A024] hover:text-[#172546]"
              >
                Join TLC
              </a>
            </div>
          </div>

          <div>
       
          </div>
        </div>
      </div>
    </section>
  );
}

function Summit() {
  const highlights = [
    'Over 3,000 delegates on ground',
    'Skill acquisition & vocational training',
    'Keynotes, panels & masterclasses',
    'Networking with leaders across sectors',
    'Awards & recognition for Nation Builders',
    'National TV & radio coverage',
  ];

  return (
    <section id="summit" className="scroll-mt-24 bg-[#F9F2ED] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-[#172546] via-[#172546] to-[#217A4B] p-9 text-white shadow-2xl shadow-[#172546]/25 sm:p-14">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#D4A024]/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-[#8BE08B]/15 blur-3xl" />

          <div className="relative grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            <div>

              <h2 className="mt-6 font-montserrat text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                The Stop The Cycle
                <br />
                <span className="text-[#8BE08B]">Global Summit</span>
              </h2>

              <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-white/80 sm:text-base">
                Our flagship annual gathering for youth development and national
                transformation — bringing together leaders, professionals,
                entrepreneurs, speakers and over 3,000 delegates from every
                sector for training, skill acquisition, networking and national
                conversations.
              </p>

              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-3 text-sm text-white/85"
                  >
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#D4A024]" />
                    {h}
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href={site.registerUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#D4A024] px-8 py-4 font-montserrat text-sm font-extrabold text-[#172546] shadow-xl transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Register to Attend →
                </a>
              
              </div>
            </div>

            <div className="relative">
              <img
                src="/imgs/gallery/annual-summit-2.jpg"
                label="Stop The Cycle National Summit"
                className="aspect-[4/5] w-full rounded-[28px] shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section className="bg-[#E9F4F1] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="In Pictures"
          title="Moments from our community"
          description="Masterclasses, summits, community service and the everyday work of breaking cycles."
        />
        <div className="mt-14">
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="bg-[#F9F2ED] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Testimonials"
          title="Lives that have been changed"
          description="Real stories from people who found direction, confidence and purpose through Stop The Cycle Initiative and The Life Class Community."
        />
        <div className="mt-14">
          <TestimonialSlider items={testimonials} />
        </div>
      </div>
    </section>
  );
}

function Partnership() {
  return (
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
  );
}

function PartnersStrip() {
  const doubled = [...partners, ...partners];
  return (
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
  );
}

function FinalCTA() {
  return (
    <section className="bg-[#217A4B] py-20 lg:py-24">
      <div className="mx-auto max-w-4xl px-5 text-center lg:px-8">
        <h2 className="font-montserrat text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
          Help us stop the cycle.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-white/80 sm:text-base">
          Whether you register for the summit, join The Life Class Community or
          partner with us — you are helping a young person break free and become
          an agent of national transformation.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href={site.registerUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#D4A024] px-8 py-4 font-montserrat text-sm font-extrabold text-[#172546] shadow-xl transition hover:-translate-y-0.5 hover:bg-white"
          >
            Register Now →
          </a>
       
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
    <Navbar/>
      <Hero />
      <ImpactBar />
      <WhoWeAre />
      <VisionMissionValues />
      <Programs />
      <TLC />
      <Summit />
      <Gallery />
      <Testimonials />
      <Partnership />
      <PartnersStrip />
      <FinalCTA />
      <Footer/>
    </>
  );
}