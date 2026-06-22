import type { getDictionary } from "@/lib/getDictionary";
import Link from "next/link";
import type { Locale } from "@/i18n";

type Dict = Awaited<ReturnType<typeof getDictionary>>;

type HeroProps = {
  locale: Locale;
  dict: Dict;
};

export default function Hero({ locale, dict }: HeroProps) {
  return (
    <main className="relative min-h-screen flex items-center pt-40">
      {/* Subtle grid background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="container-romia relative z-10">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-3">
            <span
              className="h-px w-8"
              style={{ background: "var(--pink)" }}
            />
            <span
              className="font-mono text-xs uppercase tracking-[0.2em]"
              style={{ color: "var(--pink)" }}
            >
              {dict.hero.badge}
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-6 text-[clamp(4rem,12vw,9rem)] font-black leading-none tracking-tight">
            {dict.hero.title}
          </h1>

          {/* Description */}
          <p
            className="mb-12 max-w-xl text-lg leading-relaxed"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            {dict.hero.description}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={`/${locale}#contact`}
              className="rounded-xl px-7 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ background: "var(--pink)", color: "#fff" }}
            >
              {dict.hero.primaryCta}
            </Link>
            <Link
              href={`/${locale}#framework`}
              className="flex items-center gap-2 rounded-xl border px-7 py-3 text-sm font-medium transition-opacity hover:opacity-100 opacity-70"
              style={{ borderColor: "var(--pink-line)" }}
            >
              {dict.hero.secondaryCta}
              <span className="font-mono text-xs">→</span>
            </Link>
          </div>

          {/* Bottom metadata strip */}
          <div
            className="mt-20 flex flex-wrap items-center gap-8 border-t pt-8"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}
          >
            {[
              { label: "Latency", value: "< 2s" },
              { label: "Integrations", value: "WhatsApp · CRM · AI" },
              { label: "Qualification rate", value: "+40%" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span
                  className="font-mono text-[10px] uppercase tracking-widest"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  {stat.label}
                </span>
                <span className="text-sm font-medium">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}