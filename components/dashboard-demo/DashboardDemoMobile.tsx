"use client";

import DemoProvider from "./DemoProvider";
import ChatWindow from "./ChatWindow";
import LeadStatus from "./LeadStatus";
import IntelligencePanel from "./IntelligencePanel";
import LeadProfile from "./LeadProfile";
import type { getDictionary } from "@/lib/getDictionary";
import type { Locale } from "@/i18n";

type Dict = Awaited<ReturnType<typeof getDictionary>>;

export default function DashboardDemoMobile({
  dict,
  locale,
}: {
  dict: Dict;
  locale: Locale;
}) {
  const t = dict.dashboardDemo;

  return (
    <DemoProvider dict={dict} locale={locale}>
      <div
        className="mt-10 rounded-3xl border"
        style={{
          borderColor: "var(--pink-line)",
          background: "var(--bg-card)",
        }}
      >
        <div
          className="flex items-center justify-between border-b px-4 py-4"
          style={{ borderColor: "rgba(255,255,255,.08)" }}
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em]">
              {t.title}
            </p>

            <p
              className="mt-1 text-xs"
              style={{ color: "var(--ink-mute)" }}
            >
              {t.subtitle}
            </p>
          </div>

          <span
            className="rounded-full px-3 py-1 text-[10px]"
            style={{
              background: "var(--pink-soft)",
              color: "var(--pink)",
            }}
          >
            Demo mode
          </span>
        </div>

        <div className="space-y-4 p-4">
          <ChatWindow />
          <LeadStatus />
          <IntelligencePanel />
          <LeadProfile />
        </div>
      </div>
    </DemoProvider>
  );
}