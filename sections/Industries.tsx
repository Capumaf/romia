"use client";

import { motion } from "framer-motion";
import type { getDictionary } from "@/lib/getDictionary";
import type { Locale } from "@/i18n";
import FadeIn from "@/components/FadeIn";

type Dict = Awaited<ReturnType<typeof getDictionary>>;

const ease: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

export default function Industries({ dict }: { locale: Locale; dict: Dict }) {
  return (
    <section id="industries" className="relative py-32">
      <div className="container-romia">

        <FadeIn direction="left">
          <div className="max-w-4xl">
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em]" style={{ color: "var(--pink)" }}>
              {dict.industries.eyebrow}
            </p>
            <h2 className="text-4xl font-bold leading-tight md:text-7xl">
              {dict.industries.title}
              <br />
              {dict.industries.titleHighlight}
            </h2>
            <p className="mt-8 max-w-3xl text-lg md:text-xl" style={{ color: "var(--ink-dim)", textAlign: "justify", }}>
              {dict.industries.description.split("\n").map((line, index) => (
              <span key={index}>
              {line}
              <br />
              </span>
              ))}
            </p>
          </div>
        </FadeIn>

        {/* GRID */}
        <div className="mt-24 grid gap-6 lg:grid-cols-2">
          {dict.industries.items.map((industry, i) => (
            <motion.div
              key={industry.title}
              className="rounded-3xl border p-8 md:p-10"
              style={{ borderColor: "var(--pink-line)", background: "var(--bg-card)" }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease, delay: i * 0.1 }}
              whileHover={{ y: -6, boxShadow: "0 0 40px rgba(255,45,142,0.1)", transition: { duration: 0.2 } }}
            >
              <div className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: "var(--pink)" }}>
                {industry.number}
              </div>
              <h3 className="mt-4 text-3xl font-semibold">{industry.title}</h3>
              <p className="mt-6 leading-relaxed" style={{ color: "var(--ink-dim)" }}>{industry.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CURRENT FOCUS */}
        <FadeIn direction="up" delay={0.2}>
          <div className="mt-20 rounded-3xl border p-10 md:p-14" style={{ borderColor: "var(--pink-line)", background: "var(--bg-card)" }}>
            <p className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: "var(--pink)" }}>
              {dict.industries.focusLabel}
            </p>
            <h3 className="mt-6 text-3xl font-bold leading-tight md:text-5xl">
              {dict.industries.focusTitle}
            </h3>
            <p className="mt-6 max-w-3xl text-lg" style={{ color: "var(--ink-dim)",  }}>
              {dict.industries.focusBody}
            </p>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}