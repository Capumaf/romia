import Link from "next/link";
import type { getDictionary } from "@/lib/getDictionary";
import type { Locale } from "@/i18n";

type Dict = Awaited<ReturnType<typeof getDictionary>>;

export default function CTA({ locale, dict }: { locale: Locale; dict: Dict }) {
  return (
    <section id="contact" className="relative py-32">
      <div className="container-romia">
        <div className="overflow-hidden rounded-[40px] border p-12 md:p-20" style={{ borderColor: "var(--pink-line)", background: "var(--bg-card)" }}>
          <div className="max-w-4xl">
            <p className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: "var(--pink)" }}>
              {dict.cta.eyebrow}
            </p>
            <h2 className="mt-6 text-5xl font-bold leading-none md:text-7xl">
              {dict.cta.title}
            </h2>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed md:text-xl" style={{ color: "var(--ink-dim)" }}>
              {dict.cta.description}
            </p>
            <div className="mt-12 flex flex-wrap gap-4">
              <Link
                href={`mailto:${dict.footer.email}`}
                className="rounded-2xl px-8 py-4 font-medium transition-all duration-300 hover:scale-[1.02]"
                style={{ background: "var(--pink)", color: "#fff" }}
              >
                {dict.cta.primaryCta}
              </Link>
              <Link
                href={`/${locale}#framework`}
                className="rounded-2xl border px-8 py-4 font-medium transition-opacity hover:opacity-100 opacity-70"
                style={{ borderColor: "var(--pink-line)" }}
              >
                {dict.cta.secondaryCta}
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid gap-6 md:grid-cols-3">
            {dict.cta.stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border p-6" style={{ borderColor: "var(--pink-line)", background: "var(--bg-elev)" }}>
                <p className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: "var(--pink)" }}>{stat.label}</p>
                <h3 className="mt-4 text-2xl font-semibold">{stat.value}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}