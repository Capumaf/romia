"use client";

import { useDemo } from "./DemoProvider";

export default function LeadProfile() {
  const { leadProfile, dict } = useDemo();
  const t = dict.dashboardDemo;

  return (
    <div
      className="rounded-2xl border p-5"
      style={{
        borderColor: "var(--pink-line)",
        background: "var(--bg-elev)",
      }}
    >
      <p className="font-mono text-xs uppercase tracking-[0.2em]">
        {t.profileTitle}
      </p>

      <div className="mt-6 space-y-4 text-sm">

        {leadProfile.name && (
          <div>
            <p style={{ color: "var(--ink-mute)" }}>{t.profileClient}</p>
            <p>{leadProfile.name}</p>
          </div>
        )}

        {leadProfile.district && (
          <div>
            <p style={{ color: "var(--ink-mute)" }}>{t.profileZone}</p>
            <p>{leadProfile.district}</p>
          </div>
        )}

        {leadProfile.budget && (
          <div>
            <p style={{ color: "var(--ink-mute)" }}>{t.profileBudget}</p>
            <p>{leadProfile.budget}</p>
          </div>
        )}

        {leadProfile.bedrooms && (
          <div>
            <p style={{ color: "var(--ink-mute)" }}>{t.profileBedrooms}</p>
            <p>{leadProfile.bedrooms}</p>
          </div>
        )}

        {leadProfile.leadStatus && (
          <div>
            <p style={{ color: "var(--ink-mute)" }}>{t.profileStatus}</p>
            <p className="font-bold" style={{ color: "#f59e0b" }}>
              🔥 {leadProfile.leadStatus}
            </p>
          </div>
        )}

      </div>
    </div>
  );
}