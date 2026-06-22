import type { getDictionary } from "@/lib/getDictionary";
import type { Locale } from "@/i18n";

type Dict = Awaited<ReturnType<typeof getDictionary>>;

type FrameworkProps = {
  locale: Locale;
  dict: Dict;
};

export default function Framework({ dict }: FrameworkProps) {
  return (
    <section id="framework" className="relative py-32">
      <div className="container-romia">
        {/* HEADER */}
        <div className="max-w-4xl">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em]" style={{ color: "var(--pink)" }}>
            {dict.framework.eyebrow}
          </p>
          <h2 className="text-5xl font-bold leading-none md:text-7xl">
            {dict.framework.title}
            <br />
            {dict.framework.titleHighlight}
          </h2>
          <p className="mt-8 max-w-2xl text-lg" style={{ color: "var(--ink-dim)" }}>
            {dict.framework.description}
          </p>
        </div>

        {/* GRID */}
        <div className="mt-24 grid gap-6 lg:grid-cols-2">
          {dict.framework.phases.map((phase) => (
            <div
              key={phase.number}
              className="group rounded-3xl border p-8 transition-all duration-300"
              style={{ borderColor: "var(--pink-line)", background: "var(--bg-card)" }}
            >
              <div className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: "var(--pink)" }}>
                {phase.number}
              </div>
              <h3 className="mt-4 text-3xl font-semibold">{phase.title}</h3>
              <p className="mt-4 leading-relaxed" style={{ color: "var(--ink-dim)" }}>
                {phase.description}
              </p>
            </div>
          ))}
        </div>

        {/* FLOW */}
        <div
          className="mt-20 rounded-3xl border p-8"
          style={{ borderColor: "var(--pink-line)", background: "var(--bg-card)" }}
        >
          <div className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: "var(--pink)" }}>
            {dict.framework.flowLabel}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4 text-sm md:text-base" style={{ color: "var(--ink-dim)" }}>
            {dict.framework.flow.map((step, i) => (
               <span key={i}>
               {step}{i < dict.framework.flow.length - 1 ? " → " : ""}
               </span>
               ))}
          </div>
        </div>
      </div>
    </section>
  );
}