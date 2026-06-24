"use client";

import { motion } from "framer-motion";
import type { getDictionary } from "@/lib/getDictionary";
import type { Locale } from "@/i18n";
import FadeIn from "@/components/FadeIn";

type Dict = Awaited<ReturnType<typeof getDictionary>>;

const ease: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

export default function Framework({ dict }: { locale: Locale; dict: Dict }) {
  return (
    <section id="framework" className="relative py-32">
      <div className="container-romia">

        {/* HEADER */}
        <FadeIn direction="left">
          <div className="max-w-4xl">
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em]" style={{ color: "var(--pink)" }}>
              {dict.framework.eyebrow}
            </p>
            <h2 className="text-4xl font-bold leading-tight md:text-7xl">
              {dict.framework.title}
              <br />
              {dict.framework.titleHighlight}
            </h2>
            <p className="mt-8 max-w-2xl text-lg" style={{ color: "var(--ink-dim)", textAlign: "justify",}}>
              {dict.framework.description.split("\n").map((line, index) => (
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
          {dict.framework.phases.map((phase, i) => (
            <motion.div
              key={phase.number}
              className="rounded-3xl border p-8"
              style={{ borderColor: "var(--pink-line)", background: "var(--bg-card)" }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease, delay: i * 0.08 }}
              whileHover={{ y: -4, boxShadow: "0 0 30px rgba(255,45,142,0.08)", transition: { duration: 0.2 } }}
            >
              <div className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: "var(--pink)" }}>
                {phase.number}
              </div>
              <h3 className="mt-4 text-3xl font-semibold">{phase.title}</h3>
              <p className="mt-4 leading-relaxed" style={{ color: "var(--ink-dim)" }}>
                {phase.description}
              </p>
            </motion.div>
          ))}
        </div>

       {/* FLOW */}
<FadeIn direction="up" delay={0.2}>
  <div
    className="mt-20 rounded-3xl border p-6 md:p-8"
    style={{
      borderColor: "var(--pink-line)",
      background: "var(--bg-card)",
    }}
  >
    <div
      className="font-mono text-xs uppercase tracking-[0.3em]"
      style={{ color: "var(--pink)" }}
    >
      {dict.framework.flowLabel}
    </div>

    <div className="mt-8 grid gap-4 md:grid-cols-3 lg:grid-cols-6">
      {dict.framework.flow.map((step, i) => (
        <div key={step} className="relative">
          <div
            className="rounded-2xl border p-4"
            style={{
              borderColor: "var(--pink-line)",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            <p
              className="font-mono text-[10px] uppercase tracking-[0.25em]"
              style={{ color: "var(--pink)" }}
            >
              {String(i + 1).padStart(2, "0")}
            </p>

            <p
              className="mt-3 text-sm font-medium leading-snug"
              style={{ color: "var(--ink)" }}
            >
              {step}
            </p>
          </div>

          {i < dict.framework.flow.length - 1 && (
            <div
              className="absolute left-1/2 top-full hidden h-4 w-px md:block lg:left-full lg:top-1/2 lg:h-px lg:w-4"
              style={{ background: "var(--pink-line)" }}
            />
          )}
        </div>
      ))}
    </div>
  </div>
</FadeIn>

      </div>
    </section>
  );
}