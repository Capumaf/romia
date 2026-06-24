"use client";

import { motion } from "framer-motion";
import type { getDictionary } from "@/lib/getDictionary";
import type { Locale } from "@/i18n";
import FadeIn from "@/components/FadeIn";

type Dict = Awaited<ReturnType<typeof getDictionary>>;

const ease: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

export default function CoreEngine({ dict }: { locale: Locale; dict: Dict }) {
  return (
    <section id="engine" className="relative py-32">
      <div className="container-romia">

        <FadeIn direction="right">
          <div className="max-w-4xl">
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em]" style={{ color: "var(--pink)" }}>
              {dict.coreEngine.eyebrow}
            </p>
            <h2 className="text-4xl font-bold leading-tight md:text-7xl">
              {dict.coreEngine.title}
              <br />
              {dict.coreEngine.titleHighlight}
            </h2>
            <p className="mt-8 max-w-2xl text-lg" style={{ color: "var(--ink-dim)" }}>
              {dict.coreEngine.description}
            </p>
          </div>
        </FadeIn>

        {/* PIPELINE */}
        <div className="mx-auto mt-24 max-w-5xl">
          {dict.coreEngine.modules.map((module, index) => (
            <div key={module.number}>
              <motion.div
                className="rounded-3xl border p-8 md:p-10"
                style={{ borderColor: "var(--pink-line)", background: "var(--bg-card)" }}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease, delay: index * 0.07 }}
                whileHover={{ x: 4, boxShadow: "0 0 30px rgba(255,45,142,0.08)", transition: { duration: 0.2 } }}
              >
                <div className="grid gap-6 md:grid-cols-[120px_1fr]">
                  <div className="font-mono text-sm uppercase tracking-[0.3em]" style={{ color: "var(--pink)" }}>
                    {module.number}
                  </div>
                  <div>
                    <h3 className="text-3xl font-semibold">{module.title}</h3>
                    <p className="mt-4 max-w-2xl leading-relaxed" style={{ color: "var(--ink-dim)" }}>
                      {module.description}
                    </p>
                  </div>
                </div>
              </motion.div>

              {index !== dict.coreEngine.modules.length - 1 && (
                <motion.div
                  className="flex justify-center py-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.07 + 0.2 }}
                >
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-full border"
                    style={{ borderColor: "var(--pink-line)", color: "var(--pink)", background: "var(--bg-elev)" }}
                  >
                    ↓
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* FLOW */}
        <FadeIn direction="up" delay={0.2}>
          <div
            className="mt-20 rounded-3xl border p-6 md:p-8"
            style={{ borderColor: "var(--pink-line)", background: "var(--bg-card)" }}
          >
            <div
              className="font-mono text-xs uppercase tracking-[0.3em]"
              style={{ color: "var(--pink)" }}
            >
              {dict.coreEngine.flowLabel}
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3 lg:grid-cols-6">
              {dict.coreEngine.flow.map((step, i) => (
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

                  {i < dict.coreEngine.flow.length - 1 && (
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