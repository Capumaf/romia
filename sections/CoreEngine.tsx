import type { getDictionary } from "@/lib/getDictionary";
import type { Locale } from "@/i18n";

type Dict = Awaited<ReturnType<typeof getDictionary>>;

type CoreEngineProps = {
  locale: Locale;
  dict: Dict;
};

export default function CoreEngine({ dict }: CoreEngineProps) {
  return (
    <section id="engine" className="relative py-32">
      <div className="container-romia">

        {/* HEADER */}
        <div className="max-w-4xl">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em]" style={{ color: "var(--pink)" }}>
            {dict.coreEngine.eyebrow}
          </p>
          <h2 className="text-5xl font-bold leading-none md:text-7xl">
            {dict.coreEngine.title}
            <br />
            {dict.coreEngine.titleHighlight}
          </h2>
          <p className="mt-8 max-w-2xl text-lg" style={{ color: "var(--ink-dim)" }}>
            {dict.coreEngine.description}
          </p>
        </div>

        {/* PIPELINE */}
        <div className="mx-auto mt-24 max-w-5xl">
          {dict.coreEngine.modules.map((module, index) => (
            <div key={module.number}>
              <div
                className="rounded-3xl border p-8 md:p-10"
                style={{ borderColor: "var(--pink-line)", background: "var(--bg-card)" }}
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
              </div>

              {index !== dict.coreEngine.modules.length - 1 && (
                <div className="flex justify-center py-6">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-full border"
                    style={{ borderColor: "var(--pink-line)", color: "var(--pink)", background: "var(--bg-elev)" }}
                  >
                    ↓
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* FLOW */}
        <div
          className="mt-24 rounded-3xl border p-8 md:p-12"
          style={{ borderColor: "var(--pink-line)", background: "var(--bg-card)" }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: "var(--pink)" }}>
            {dict.coreEngine.flowLabel}
          </p>
          <div className="mt-8 flex flex-wrap gap-4 text-sm md:text-base" style={{ color: "var(--ink-dim)" }}>
            {dict.coreEngine.flow.map((step, i) => (
             <span key={i}>
              {step}{i < dict.coreEngine.flow.length - 1 ? " → " : ""}
              </span> 
               ))}
          </div>
        </div>

      </div>
    </section>
  );
}