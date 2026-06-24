"use client";

import type { getDictionary } from "@/lib/getDictionary";
import type { Locale } from "@/i18n";
import FadeIn from "@/components/FadeIn";
import DashboardDemoDesktop from "@/components/dashboard-demo/DashboardDemoDesktop";
import DashboardDemoMobile from "@/components/dashboard-demo/DashboardDemoMobile";

type Dict = Awaited<ReturnType<typeof getDictionary>>;

export default function Dashboard({
  dict,
}: {
  locale: Locale;
  dict: Dict;
}) {
  return (
    <section id="dashboard" className="relative py-24">
      <div className="container-romia">
        <FadeIn direction="right">
          <div className="max-w-4xl">
            <p
              className="mb-6 font-mono text-xs uppercase tracking-[0.3em]"
              style={{ color: "var(--pink)" }}
            >
              {dict.dashboard.eyebrow}
            </p>
            <h2 className="text-3xl font-bold leading-tight md:text-4xl">
              {dict.dashboard.title}
              <br />
              {dict.dashboard.titleHighlight}
            </h2>
            <p
              className="mt-8 max-w-2xl text-lg"
              style={{ color: "var(--ink-dim)" }}
            >
              {dict.dashboard.description}
            </p>
          </div>
        </FadeIn>

        <div className="hidden md:block">
          <DashboardDemoDesktop />
        </div>
        <div className="md:hidden">
          <DashboardDemoMobile />
        </div>
      </div>
    </section>
  );
}