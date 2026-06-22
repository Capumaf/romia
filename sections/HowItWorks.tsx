import type { getDictionary } from "@/lib/getDictionary";
import type { Locale } from "@/i18n";

type Dict = Awaited<ReturnType<typeof getDictionary>>;

export default function HowItWorks({ dict }: { locale: Locale; dict: Dict }) {
  return (
    <section id="how-it-works" className="py-32">
      <div className="container-romia">
        <div className="max-w-4xl">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em]" style={{ color: "var(--pink)" }}>
            {dict.howItWorks.eyebrow}
          </p>
          <h2 className="text-5xl font-bold leading-none md:text-7xl">
            {dict.howItWorks.title}
            <br />
            {dict.howItWorks.titleHighlight}
          </h2>
          <p className="mt-8 max-w-2xl text-lg" style={{ color: "var(--ink-dim)" }}>
            {dict.howItWorks.description}
          </p>
        </div>

        <div className="mt-24 grid gap-6 lg:grid-cols-3">
          {dict.howItWorks.steps.map((step) => (
            <div
              key={step.number}
              className="rounded-3xl border p-8"
              style={{ borderColor: "var(--pink-line)", background: "var(--bg-card)" }}
            >
              <div className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: "var(--pink)" }}>
                {step.number}
              </div>
              <h3 className="mt-4 text-2xl font-semibold">{step.title}</h3>
              <p className="mt-4 leading-relaxed" style={{ color: "var(--ink-dim)" }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}