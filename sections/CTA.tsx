"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { getDictionary } from "@/lib/getDictionary";
import type { Locale } from "@/i18n";
import FadeIn from "@/components/FadeIn";

type Dict = Awaited<ReturnType<typeof getDictionary>>;

const ease: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

export default function CTA({ locale, dict }: { locale: Locale; dict: Dict }) {
  return (
    <section id="contact" className="relative py-32">
      <div className="container-romia">
        <motion.div
          className="overflow-hidden rounded-[40px] border p-12 md:p-20"
          style={{ borderColor: "var(--pink-line)", background: "var(--bg-card)" }}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
        >
          <FadeIn direction="up">
            <div className="max-w-4xl">
              <p className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: "var(--pink)" }}>
                {dict.cta.eyebrow}
              </p>
              <h2 className="mt-6 text-4xl font-bold leading-none md:text-7xl">
                {dict.cta.title}
              </h2>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed md:text-xl" style={{ color: "var(--ink-dim)" }}>
                {dict.cta.description}
              </p>
              <div className="mt-12 flex flex-wrap gap-4">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href={`mailto:${dict.footer.email}`}
                    className="block rounded-2xl px-8 py-4 font-medium"
                    style={{ background: "var(--pink)", color: "#fff" }}
                  >
                    {dict.cta.primaryCta}
                  </Link>
                </motion.div>
                <Link
                  href={`/${locale}#framework`}
                  className="rounded-2xl border px-8 py-4 font-medium opacity-70 transition-opacity hover:opacity-100"
                  style={{ borderColor: "var(--pink-line)" }}
                >
                  {dict.cta.secondaryCta}
                </Link>
              </div>
            </div>
          </FadeIn>

          {/* Stats */}
          <div className="mt-20 grid gap-6 md:grid-cols-3">
            {dict.cta.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="rounded-2xl border p-6"
                style={{ borderColor: "var(--pink-line)", background: "var(--bg-elev)" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease, delay: 0.3 + i * 0.1 }}
              >
                <p className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: "var(--pink)" }}>{stat.label}</p>
                <h3 className="mt-4 text-2xl font-semibold">{stat.value}</h3>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}