import type { getDictionary } from "@/lib/getDictionary";
import type { Locale } from "@/i18n";

type Dict = Awaited<ReturnType<typeof getDictionary>>;

export default function Solution({ dict }: { locale: Locale; dict: Dict }) {
  return (
    <section id="solution" className="relative py-32">
      <div className="container-romia">

        {/* HEADER */}
        <div className="max-w-4xl">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em]" style={{ color: "var(--pink)" }}>
            {dict.solution.eyebrow}
          </p>
          <h2 className="text-5xl font-bold leading-none md:text-7xl">
            {dict.solution.title}
            <br />
            {dict.solution.titleHighlight}
          </h2>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed md:text-xl" style={{ color: "var(--ink-dim)" }}>
            {dict.solution.description}
          </p>
        </div>

        {/* PILLARS */}
        <div className="mt-24 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {dict.solution.pillars.map((pillar) => (
            <div key={pillar.title} className="rounded-3xl border p-8" style={{ borderColor: "var(--pink-line)", background: "var(--bg-card)" }}>
              <h3 className="font-mono text-sm uppercase tracking-[0.2em]" style={{ color: "var(--pink)" }}>
                {pillar.title}
              </h3>
              <p className="mt-4 leading-relaxed" style={{ color: "var(--ink-dim)" }}>
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        {/* STATEMENT */}
        <div className="mt-20 rounded-3xl border p-10 md:p-14" style={{ borderColor: "var(--pink-line)", background: "var(--bg-card)" }}>
          <p className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: "var(--pink)" }}>
            {dict.solution.principleLabel}
          </p>
          <h3 className="mt-6 text-3xl font-bold leading-tight md:text-5xl">
            {dict.solution.statement}
          </h3>
          <p className="mt-6 max-w-3xl text-lg" style={{ color: "var(--ink-dim)" }}>
            {dict.solution.statementBody}
          </p>
        </div>

      </div>
    </section>
  );
}