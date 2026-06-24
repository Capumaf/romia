"use client";

import { motion } from "framer-motion";
import type { getDictionary } from "@/lib/getDictionary";
import type { Locale } from "@/i18n";
import FadeIn from "@/components/FadeIn";

type Dict = Awaited<ReturnType<typeof getDictionary>>;

const ease: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

export default function Problem({ dict }: { locale: Locale; dict: Dict }) {
  return (
    <section id="problem" className="relative py-32">
      <div className="container-romia">

        <FadeIn direction="left">
          <div className="max-w-4xl">
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em]" style={{ color: "var(--pink)" }}>
              {dict.problem.eyebrow}
            </p>
            <h2 className="text-4xl font-bold leading-tight md:text-7xl">
              {dict.problem.title}
            </h2>
            <h3 className="mt-6 text-3xl font-semibold md:text-5xl" style={{ color: "var(--pink)" }}>
              {dict.problem.highlight}
            </h3>
            <p className="mt-10 max-w-4xl text-lg leading-relaxed md:text-xl" style={{ color: "var(--ink-dim)", textAlign: "justify",}}>
              {dict.problem.body}
            </p>
          </div>
        </FadeIn>

        {/* GRID */}
        <div className="mt-24 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {dict.problem.items.map((item, i) => (
            <motion.div
              key={item.title}
              className="rounded-3xl border p-8"
              style={{ borderColor: "var(--pink-line)", background: "var(--bg-card)" }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease, delay: i * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-4 leading-relaxed" style={{ color: "var(--ink-dim)", textAlign: "justify", }}>{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* STATEMENT */}
        <FadeIn direction="up" delay={0.2}>
          <div className="mt-20 rounded-3xl border p-8 md:p-14" style={{ borderColor: "var(--pink-line)", background: "var(--bg-card)" }}>
            <p className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: "var(--pink)", }}>
              {dict.problem.perspectiveLabel}
            </p>
            <h3 className="mt-6 text-2xl font-bold leading-tight md:text-5xl">
              {dict.problem.statement.split("\n").map((line, index) => (
              <span key={index}>
              {line}
              <br />
              </span>
              ))}
            </h3>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}