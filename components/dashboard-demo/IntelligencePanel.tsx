"use client";

import { useDemo } from "./DemoProvider";

export default function IntelligencePanel() {
  const { leadProfile, currentScore } = useDemo();

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
          Lead Match Score
        </p>
      </div>

      <div className="mt-8 space-y-3 text-sm">

        {leadProfile.district && (
          <div>✓ Ubicación detectada</div>
        )}

        {leadProfile.budget && (
          <div>✓ Presupuesto detectado</div>
        )}

        {leadProfile.bedrooms && (
          <div>✓ Dormitorios detectados</div>
        )}

        {leadProfile.leadStatus && (
        <div>
        {leadProfile.leadStatus}
        </div>
        )}

      </div>
    </div>
  );
}