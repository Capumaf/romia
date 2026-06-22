import type { getDictionary } from "@/lib/getDictionary";
import type { Locale } from "@/i18n";

type Dict = Awaited<ReturnType<typeof getDictionary>>;

export default function Problem({ dict }: { locale: Locale; dict: Dict }) {
  return (
    <section id="problem" className="relative py-32">
      <div className="container-romia">
        <div className="max-w-4xl">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em]" style={{ color: "var(--pink)" }}>
            {dict.problem.eyebrow}
          </p>
          <h2 className="text-5xl font-bold leading-none md:text-7xl">
            {dict.problem.title}
          </h2>
          <h3 className="mt-6 text-3xl font-semibold md:text-5xl" style={{ color: "var(--pink)" }}>
            {dict.problem.highlight}
          </h3>
          <p className="mt-10 max-w-3xl text-lg leading-relaxed md:text-xl" style={{ color: "var(--ink-dim)" }}>
            {dict.problem.body}
          </p>
        </div>

        {/* GRID */}
        <div className="mt-24 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {dict.problem.items.map((item) => (
            <div key={item.title} className="rounded-3xl border p-8" style={{ borderColor: "var(--pink-line)", background: "var(--bg-card)" }}>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-4 leading-relaxed" style={{ color: "var(--ink-dim)" }}>{item.description}</p>
            </div>
          ))}
        </div>

        {/* STATEMENT */}
        <div className="mt-20 rounded-3xl border p-10 md:p-14" style={{ borderColor: "var(--pink-line)", background: "var(--bg-card)" }}>
          <p className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: "var(--pink)" }}>
            {dict.problem.perspectiveLabel}
          </p>
          <h3 className="mt-6 text-3xl font-bold leading-tight md:text-5xl">
            {dict.problem.statement}
          </h3>
        </div>
      </div>
    </section>
  );
}