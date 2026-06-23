"use client";

import DemoProvider from "./DemoProvider";
import ChatWindow from "./ChatWindow";
import LeadStatus from "./LeadStatus";
import IntelligencePanel from "./IntelligencePanel";
import LeadProfile from "./LeadProfile";

export default function DashboardDemoMobile() {
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
          className="flex items-center justify-between border-b px-4 py-4"
          style={{ borderColor: "rgba(255,255,255,.08)" }}
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em]">
              ROMIA Live Demo
            </p>

            <p
              className="mt-1 text-xs"
              style={{ color: "var(--ink-mute)" }}
            >
              Cliente → ROMIA → Asesor
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