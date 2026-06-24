"use client";

import { useDemo } from "./DemoProvider";

export default function IntelligencePanel() {
  const { leadProfile, currentScore, dict } = useDemo();
  const t = dict.dashboardDemo;

  return (
    <div
      className="rounded-2xl border p-5"
      style={{
        borderColor: "rgba(251,191,36,.25)",
        background: "rgba(251,191,36,.08)",
      }}
    >
      <p
        className="font-mono text-xs uppercase tracking-[0.2em]"
        style={{ color: "var(--yellow)" }}
      >
        ROMIA AI
      </p>

      <div className="mt-6">
        <div className="text-5xl font-bold">
          {currentScore}%
        </div>

        <p
          className="mt-1 text-sm"
          style={{ color: "var(--ink-mute)" }}
        >
          {t.scoreLabel}
        </p>
      </div>

      <div className="mt-8 space-y-3 text-sm">

        {leadProfile.district && (
          <div>{t.districtDetected}</div>
        )}

        {leadProfile.budget && (
          <div>{t.budgetDetected}</div>
        )}

        {leadProfile.bedrooms && (
          <div>{t.bedroomsDetected}</div>
        )}

        {leadProfile.leadStatus && (
          <div>{leadProfile.leadStatus}</div>
        )}

      </div>
    </div>
  );
}