import type { getDictionary } from "@/lib/getDictionary";
import type { Locale } from "@/i18n";

type Dict = Awaited<ReturnType<typeof getDictionary>>;

export default function Dashboard({ dict }: { locale: Locale; dict: Dict }) {
  return (
    <section id="dashboard" className="relative py-32">
      <div className="container-romia">

        <div className="max-w-4xl">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em]" style={{ color: "var(--pink)" }}>
            {dict.dashboard.eyebrow}
          </p>
          <h2 className="text-5xl font-bold leading-none md:text-7xl">
            {dict.dashboard.title}
            <br />
            {dict.dashboard.titleHighlight}
          </h2>
          <p className="mt-8 max-w-2xl text-lg" style={{ color: "var(--ink-dim)" }}>
            {dict.dashboard.description}
          </p>
        </div>

        {/* DASHBOARD */}
        <div className="mt-20 overflow-hidden rounded-3xl border" style={{ borderColor: "var(--pink-line)", background: "var(--bg-card)" }}>

          {/* TOP BAR */}
          <div className="flex items-center justify-between border-b px-8 py-5" style={{ borderColor: "var(--pink-line)" }}>
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full" style={{ background: "var(--pink)" }} />
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
              {dict.dashboard.kpis.map(([title, value]) => (
                <div key={title} className="rounded-2xl border p-6" style={{ borderColor: "var(--pink-line)", background: "var(--bg-elev)" }}>
                  <p className="text-xs uppercase tracking-[0.2em]" style={{ color: "var(--ink-mute)" }}>{title}</p>
                  <h3 className="mt-4 text-3xl font-bold">{value}</h3>
                </div>
              ))}
            </div>

            {/* LEADS + MODULES */}
            <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr]">

              <div className="rounded-2xl border p-6" style={{ borderColor: "var(--pink-line)", background: "var(--bg-elev)" }}>
                <h3 className="font-semibold">{dict.dashboard.queueLabel}</h3>
                <div className="mt-6 space-y-4">
                  {dict.dashboard.leads.map(([name, score, budget]) => (
                    <div key={name} className="flex items-center justify-between rounded-xl border p-4" style={{ borderColor: "var(--pink-line)" }}>
                      <div>
                        <p>{name}</p>
                        <p className="text-sm" style={{ color: "var(--ink-mute)" }}>{dict.dashboard.budgetLabel} {budget}</p>
                      </div>
                      <div className="rounded-full px-3 py-1 text-sm" style={{ background: "var(--pink-soft)", color: "var(--pink)" }}>
                        {score}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border p-6" style={{ borderColor: "var(--pink-line)", background: "var(--bg-elev)" }}>
                <h3 className="font-semibold">{dict.dashboard.modulesLabel}</h3>
                <div className="mt-6 space-y-4">
                  {dict.dashboard.modules.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full" style={{ background: "var(--pink)" }} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}