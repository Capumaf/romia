"use client";

import { useDemo } from "./DemoProvider";

export default function LeadStatus() {
  const { leadProfile, dict } = useDemo();
  const t = dict.dashboardDemo;

  const status = leadProfile.leadStatus || t.leadStatusQualifying;

  const getColor = () => {
    if (status.toLowerCase().includes("hot") || status.toLowerCase().includes("caliente"))
      return "#f97316";
    if (status.toLowerCase().includes("high") || status.toLowerCase().includes("alta"))
      return "#22c55e";
    return "#eab308";
  };

  const getLabel = () => {
    if (status === t.leadStatusQualifying) return `🟡 ${t.leadStatusQualifying}`;
    if (status === t.leadStatusHighIntent) return `🟢 ${t.leadStatusHighIntent}`;
    return `🔥 ${status}`;
  };

  return (
    <div
      className="rounded-2xl border p-5"
      style={{
        borderColor: "var(--pink-line)",
        background: "var(--bg-elev)",
      }}
    >
      <p
        className="font-mono text-xs uppercase tracking-[0.2em]"
        style={{ color: "var(--ink-mute)" }}
      >
        {t.leadStatusLabel}
      </p>

      <div
        className="mt-4 text-lg font-semibold"
        style={{ color: getColor() }}
      >
        {getLabel()}
      </div>
    </div>
  );
}