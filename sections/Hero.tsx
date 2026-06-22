"use client";

import type { getDictionary } from "@/lib/getDictionary";
import Link from "next/link";
import type { Locale } from "@/i18n";
import { motion } from "framer-motion";

type Dict = Awaited<ReturnType<typeof getDictionary>>;

type HeroProps = {
  locale: Locale;
  dict: Dict;
};

const ease: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

export default function Hero({ locale, dict }: HeroProps) {
  return (
    <main className="relative flex min-h-screen items-center pt-40">
      {/* Grid background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="container-romia relative z-10">
        <div className="max-w-4xl">

          {/* Badge */}
          <motion.div
            className="mb-8 inline-flex items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
          >
            <span className="h-px w-8" style={{ background: "var(--pink)" }} />
            <span className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: "var(--pink)" }}>
              {dict.hero.badge}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="mb-6 text-[clamp(4rem,12vw,9rem)] font-black leading-none tracking-tight"
            style={{ fontFamily: "var(--font-orbitron)" }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.2 }}
          >
            {dict.hero.title}
          </motion.h1>

          {/* Description */}
          <motion.p
            className="mb-12 max-w-xl text-lg leading-relaxed"
            style={{ color: "rgba(255,255,255,0.5)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.35 }}
          >
            {dict.hero.description}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.5 }}
          >
            <Link
              href={`/${locale}#contact`}
              className="rounded-xl px-7 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ background: "var(--pink)", color: "#fff" }}
            >
              {dict.hero.primaryCta}
            </Link>
            <Link
              href={`/${locale}#framework`}
              className="flex items-center gap-2 rounded-xl border px-7 py-3 text-sm font-medium opacity-70 transition-opacity hover:opacity-100"
              style={{ borderColor: "var(--pink-line)" }}
            >
              {dict.hero.secondaryCta}
              <span className="font-mono text-xs">→</span>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mt-20 flex flex-wrap items-center gap-8 border-t pt-8"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease, delay: 0.7 }}
          >
            {[
              { label: "Latency", value: "< 2s" },
              { label: "Integrations", value: "WhatsApp · CRM · AI" },
              { label: "Qualification rate", value: "+40%" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="flex flex-col gap-1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease, delay: 0.7 + i * 0.1 }}
              >
                <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>
                  {stat.label}
                </span>
                <span className="text-sm font-medium">{stat.value}</span>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </main>
  );
}