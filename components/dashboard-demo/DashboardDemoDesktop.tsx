"use client";

import DemoProvider from "./DemoProvider";
import ChatWindow from "./ChatWindow";
import IntelligencePanel from "./IntelligencePanel";
import LeadProfile from "./LeadProfile";
import LeadStatus from "./LeadStatus";

export default function DashboardDemo() {
  return (
    <DemoProvider>
      <div
        className="mt-10 overflow-hidden rounded-3xl border"
        style={{
          borderColor: "var(--pink-line)",
          background: "var(--bg-card)",
        }}
      >
        <div
          className="flex items-center justify-between border-b px-5 py-4"
          style={{ borderColor: "rgba(255,255,255,.08)" }}
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em]">
              ROMIA Live Demo
            </p>
            <p className="mt-1 text-sm" style={{ color: "var(--ink-mute)" }}>
              Cliente → ROMIA → Asesor
            </p>
          </div>

          <span
            className="rounded-full px-3 py-1 text-xs"
            style={{
              background: "var(--pink-soft)",
              color: "var(--pink)",
            }}
          >
            Demo mode
          </span>
        </div>

        <div className="grid h-[700px] gap-0 lg:grid-cols-[1.6fr_0.75fr_0.8fr]">
          <div className="border-r p-5" style={{ borderColor: "rgba(255,255,255,.08)" }}>
            <ChatWindow />
          </div>

          <div
             className="border-r p-5"
             style={{ borderColor: "rgba(255,255,255,.08)" }}
             >
             <div className="space-y-4">
             <LeadStatus />
             <IntelligencePanel />
        </div>
    </div>

<div className="p-5">
  <LeadProfile />
</div>
        </div>
      </div>
    </DemoProvider>
  );
}