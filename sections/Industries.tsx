import type { getDictionary } from "@/lib/getDictionary";
import type { Locale } from "@/i18n";

type Dict = Awaited<ReturnType<typeof getDictionary>>;

export default function Industries({ dict }: { locale: Locale; dict: Dict }) {
  return (
    <section id="industries" className="relative py-32">
      <div className="container-romia">

        {/* HEADER */}
        <div className="max-w-4xl">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em]" style={{ color: "var(--pink)" }}>
            {dict.industries.eyebrow}
          </p>
          <h2 className="text-5xl font-bold leading-none md:text-7xl">
            {dict.industries.title}
            <br />
            {dict.industries.titleHighlight}
          </h2>
          <p className="mt-8 max-w-3xl text-lg md:text-xl" style={{ color: "var(--ink-dim)" }}>
            {dict.industries.description}
          </p>
        </div>

        {/* GRID */}
        <div className="mt-24 grid gap-6 lg:grid-cols-2">
          {dict.industries.items.map((industry) => (
            <div
              key={industry.title}
              className="rounded-3xl border p-8 transition-all duration-300 hover:-translate-y-1 md:p-10"
              style={{ borderColor: "var(--pink-line)", background: "var(--bg-card)" }}
            >
              <div className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: "var(--pink)" }}>
                {industry.number}
              </div>
              <h3 className="mt-4 text-3xl font-semibold">{industry.title}</h3>
              <p className="mt-6 leading-relaxed" style={{ color: "var(--ink-dim)" }}>{industry.description}</p>
            </div>
          ))}
        </div>

        {/* CURRENT FOCUS */}
        <div className="mt-20 rounded-3xl border p-10 md:p-14" style={{ borderColor: "var(--pink-line)", background: "var(--bg-card)" }}>
          <p className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: "var(--pink)" }}>
            {dict.industries.focusLabel}
          </p>
          <h3 className="mt-6 text-3xl font-bold leading-tight md:text-5xl">
            {dict.industries.focusTitle}
          </h3>
          <p className="mt-6 max-w-3xl text-lg" style={{ color: "var(--ink-dim)" }}>
            {dict.industries.focusBody}
          </p>
        </div>

      </div>
    </section>
  );
}