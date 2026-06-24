"use client";

import { motion } from "framer-motion";
import type { getDictionary } from "@/lib/getDictionary";
import type { Locale } from "@/i18n";
import FadeIn from "@/components/FadeIn";

type Dict = Awaited<ReturnType<typeof getDictionary>>;

const ease: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

function FlowGrid({ label, items }: { label: string; items: { number: string; label: string }[] }) {
  const row1 = items.slice(0, 3);
  const row2 = items.slice(3, 6);

  return (
    <div className="rounded-3xl border p-8 md:p-10" style={{ borderColor: "var(--pink-line)", background: "var(--bg-card)" }}>
      <p className="mb-10 font-mono text-xs uppercase tracking-[0.3em]" style={{ color: "var(--pink)" }}>
        {label}
      </p>

      {/* ROW 1 — left to right */}
      <div className="flex items-center">
        {row1.map((item, i) => (
          <div key={item.number} className="flex flex-1 items-center">
            <motion.div
              className="flex-1 rounded-2xl border p-5"
              style={{ borderColor: "var(--pink-line)", background: "rgba(255,255,255,0.02)" }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: "var(--pink)" }}>
                {item.number}
              </p>
              <p className="mt-2 text-sm font-medium">{item.label}</p>
            </motion.div>

            {i < row1.length - 1 && (
              <div className="flex shrink-0 items-center px-2">
                <div className="h-px w-4" style={{ background: "var(--pink-line)" }} />
                <svg width="6" height="6" viewBox="0 0 6 6">
                  <path d="M0 3 L6 3 M3.5 0.5 L6 3 L3.5 5.5" stroke="var(--pink)" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* DOWN connector — from right end of row1 to right end of row2 */}
      {row2.length > 0 && (
        <div className="flex justify-end">
          <div className="flex flex-col items-center" style={{ width: "calc(33.33%)" }}>
            <div className="flex flex-col items-center py-1">
              <div className="h-5 w-px" style={{ background: "var(--pink-line)" }} />
              <svg width="6" height="6" viewBox="0 0 6 6">
                <path d="M3 0 L3 6 M0.5 3.5 L3 6 L5.5 3.5" stroke="var(--pink)" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* ROW 2 — right to left (serpentine) */}
      {row2.length > 0 && (
        <div className="flex flex-row-reverse items-center">
          {[...row2].reverse().map((item, i) => (
            <div key={item.number} className="flex flex-1 flex-row-reverse items-center">
              <motion.div
                className="flex-1 rounded-2xl border p-5"
                style={{ borderColor: "var(--pink-line)", background: "rgba(255,255,255,0.02)" }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: "var(--pink)" }}>
                  {item.number}
                </p>
                <p className="mt-2 text-sm font-medium">{item.label}</p>
              </motion.div>

              {i < row2.length - 1 && (
                <div className="flex shrink-0 flex-row-reverse items-center px-2">
                  <div className="h-px w-4" style={{ background: "var(--pink-line)" }} />
                  <svg width="6" height="6" viewBox="0 0 6 6">
                    <path d="M6 3 L0 3 M2.5 0.5 L0 3 L2.5 5.5" stroke="var(--pink)" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function CoreEngine({ dict }: { locale: Locale; dict: Dict }) {
  return (
    <section id="engine" className="relative py-32">
      <div className="container-romia">

        {/* HEADER */}
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
          <div className="mt-24">
            <FlowGrid
              label={dict.coreEngine.flowLabel}
              items={dict.coreEngine.flow.map((step, i) => ({
                number: String(i + 1).padStart(2, "0"),
                label: step,
              }))}
            />
          </div>
        </FadeIn>

      </div>
    </section>
  );
}