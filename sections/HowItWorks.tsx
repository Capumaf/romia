"use client";

import { motion } from "framer-motion";
import type { getDictionary } from "@/lib/getDictionary";
import type { Locale } from "@/i18n";
import FadeIn from "@/components/FadeIn";

type Dict = Awaited<ReturnType<typeof getDictionary>>;

const ease: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

export default function HowItWorks({ dict }: { locale: Locale; dict: Dict }) {
  return (
    <section id="how-it-works" className="py-32">
      <div className="container-romia">

        <FadeIn direction="left">
          <div className="max-w-4xl">
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em]" style={{ color: "var(--pink)" }}>
              {dict.howItWorks.eyebrow}
            </p>
            <h2 className="text-4xl font-bold leading-tight md:text-7xl">
              {dict.howItWorks.title}
              <br />
              {dict.howItWorks.titleHighlight}
            </h2>
            <p className="mt-8 max-w-2xl text-lg" style={{ color: "var(--ink-dim)" }}>
              {dict.howItWorks.description}
            </p>
          </div>
        </FadeIn>

        <div className="mt-24 grid gap-6 lg:grid-cols-3">
          {dict.howItWorks.steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="rounded-3xl border p-8"
              style={{ borderColor: "var(--pink-line)", background: "var(--bg-card)" }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease, delay: i * 0.08 }}
              whileHover={{ y: -4, boxShadow: "0 0 30px rgba(255,45,142,0.08)", transition: { duration: 0.2 } }}
            >
              <div className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: "var(--pink)" }}>
                {step.number}
              </div>
              <h3 className="mt-4 text-2xl font-semibold">{step.title}</h3>
              <p className="mt-4 leading-relaxed" style={{ color: "var(--ink-dim)" }}>
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}