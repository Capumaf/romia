"use client";

import { motion } from "framer-motion";
import type { getDictionary } from "@/lib/getDictionary";
import type { Locale } from "@/i18n";
import FadeIn from "@/components/FadeIn";

type Dict = Awaited<ReturnType<typeof getDictionary>>;

const ease: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

export default function Solution({ dict }: { locale: Locale; dict: Dict }) {
  return (
    <section id="solution" className="relative py-32">
      <div className="container-romia">

        {/* HEADER */}
        <FadeIn direction="right">
          <div className="max-w-4xl">
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em]" style={{ color: "var(--pink)" }}>
              {dict.solution.eyebrow}
            </p>
            <h2 className="text-4xl font-bold leading-tight md:text-7xl">
              {dict.solution.title}
              <br />
              {dict.solution.titleHighlight}
            </h2>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed md:text-xl" style={{ color: "var(--ink-dim)" }}>
              {dict.solution.description}
            </p>
          </div>
        </FadeIn>

        {/* PILLARS */}
        <div className="mt-24 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {dict.solution.pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              className="rounded-3xl border p-8"
              style={{ borderColor: "var(--pink-line)", background: "var(--bg-card)" }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease, delay: i * 0.08 }}
              whileHover={{ y: -4, boxShadow: "0 0 30px rgba(255,45,142,0.1)", transition: { duration: 0.2 } }}
            >
              <h3 className="font-mono text-sm uppercase tracking-[0.2em]" style={{ color: "var(--pink)" }}>
                {pillar.title}
              </h3>
              <p className="mt-4 leading-relaxed" style={{ color: "var(--ink-dim)" }}>
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* STATEMENT */}
        <FadeIn direction="up" delay={0.2}>
          <div className="mt-20 rounded-3xl border p-10 md:p-14" style={{ borderColor: "var(--pink-line)", background: "var(--bg-card)" }}>
            <p className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: "var(--pink)" }}>
              {dict.solution.principleLabel}
            </p>
            <h3 className="mt-6 text-3xl font-bold leading-tight md:text-5xl">
              {dict.solution.statement.split("\n").map((line, index) => (
              <span key={index}>
              {line}
              <br />
              </span>
               ))}
            </h3>
            <p className="mt-6 max-w-3xl text-lg" style={{ color: "var(--ink-dim)" }}>
              {dict.solution.statementBody}
            </p>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}