"use client";

import { useDemo } from "./DemoProvider";

export default function LeadStatus() {
  const { leadProfile } = useDemo();

  const status =
    leadProfile.leadStatus || "Calificando lead";

  const getColor = () => {
    if (status.includes("caliente"))
      return "#f97316";

    if (status.includes("Alta"))
      return "#22c55e";

    return "#eab308";
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
        Estado del Lead
      </p>

      <div
        className="mt-4 text-lg font-semibold"
        style={{ color: getColor() }}
      >
        {status === "Calificando lead"
          ? "🟡 Calificando lead"
          : status === "Alta intención"
          ? "🟢 Alta intención"
          : `🔥 ${status}`}
      </div>
    </div>
  );
}