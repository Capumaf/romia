"use client";

import { motion } from "framer-motion";
import type { getDictionary } from "@/lib/getDictionary";
import type { Locale } from "@/i18n";
import FadeIn from "@/components/FadeIn";

type Dict = Awaited<ReturnType<typeof getDictionary>>;

const ease: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

export default function Dashboard({ dict }: { locale: Locale; dict: Dict }) {
  return (
    <section id="dashboard" className="relative py-32">
      <div className="container-romia">

        <FadeIn direction="right">
          <div className="max-w-4xl">
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em]" style={{ color: "var(--pink)" }}>
              {dict.dashboard.eyebrow}
            </p>
            <h2 className="text-4xl font-bold leading-tight md:text-7xl">
              {dict.dashboard.title}
              <br />
              {dict.dashboard.titleHighlight}
            </h2>
            <p className="mt-8 max-w-2xl text-lg" style={{ color: "var(--ink-dim)" }}>
              {dict.dashboard.description}
            </p>
          </div>
        </FadeIn>

        {/* DASHBOARD */}
        <motion.div
          className="mt-20 overflow-hidden rounded-3xl border"
          style={{ borderColor: "var(--pink-line)", background: "var(--bg-card)" }}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
        >
          {/* TOP BAR */}
          <div className="flex items-center justify-between border-b px-8 py-5" style={{ borderColor: "var(--pink-line)" }}>
            <div className="flex items-center gap-3">
              <motion.div
                className="h-3 w-3 rounded-full"
                style={{ background: "var(--pink)" }}
                animate={{ boxShadow: ["0 0 0px var(--pink)", "0 0 16px var(--pink)", "0 0 0px var(--pink)"] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="font-mono text-xs uppercase tracking-[0.3em]">ROMIA OS</span>
            </div>
            <span className="font-mono text-xs uppercase" style={{ color: "var(--ink-mute)" }}>
              {dict.dashboard.osLabel}
            </span>
          </div>

          {/* CONTENT */}
          <div className="p-8">

            {/* KPIs */}
            <div className="grid gap-6 md:grid-cols-4">
              {dict.dashboard.kpis.map(([title, value], i) => (
                <motion.div
                  key={title}
                  className="rounded-2xl border p-6"
                  style={{ borderColor: "var(--pink-line)", background: "var(--bg-elev)" }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease, delay: 0.3 + i * 0.08 }}
                >
                  <p className="text-xs uppercase tracking-[0.2em]" style={{ color: "var(--ink-mute)" }}>{title}</p>
                  <h3 className="mt-4 text-3xl font-bold">{value}</h3>
                </motion.div>
              ))}
            </div>

            {/* LEADS + MODULES */}
            <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr]">

              <motion.div
                className="rounded-2xl border p-6"
                style={{ borderColor: "var(--pink-line)", background: "var(--bg-elev)" }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease, delay: 0.5 }}
              >
                <h3 className="font-semibold">{dict.dashboard.queueLabel}</h3>
                <div className="mt-6 space-y-4">
                  {dict.dashboard.leads.map(([name, score, budget], i) => (
                    <motion.div
                      key={name}
                      className="flex items-center justify-between rounded-xl border p-4"
                      style={{ borderColor: "var(--pink-line)" }}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, ease, delay: 0.6 + i * 0.1 }}
                    >
                      <div>
                        <p>{name}</p>
                        <p className="text-sm" style={{ color: "var(--ink-mute)" }}>{dict.dashboard.budgetLabel} {budget}</p>
                      </div>
                      <div className="rounded-full px-3 py-1 text-sm" style={{ background: "var(--pink-soft)", color: "var(--pink)" }}>
                        {score}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="rounded-2xl border p-6"
                style={{ borderColor: "var(--pink-line)", background: "var(--bg-elev)" }}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease, delay: 0.5 }}
              >
                <h3 className="font-semibold">{dict.dashboard.modulesLabel}</h3>
                <div className="mt-6 space-y-4">
                  {dict.dashboard.modules.map((item, i) => (
                    <motion.div
                      key={item}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.6 + i * 0.07 }}
                    >
                      <div className="h-2 w-2 rounded-full" style={{ background: "var(--pink)" }} />
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}