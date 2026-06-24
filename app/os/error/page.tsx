"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ErrorContent() {
  const params = useSearchParams();
  const error = params.get("error");

  return (
    <div
      className="flex min-h-screen items-center justify-center"
      style={{ background: "var(--bg)" }}
    >
      <div className="text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: "var(--pink)" }}>
          Error de autenticación
        </p>
        <p className="mt-4 text-sm" style={{ color: "var(--ink-mute)" }}>
          {error ?? "Error desconocido"}
        </p>
        <a href="/os/login" className="mt-6 inline-block text-sm" style={{ color: "var(--pink)" }}>
          Volver al login
        </a>
      </div>
    </div>
  );
}

export default function ErrorPage() {
  return (
    <Suspense>
      <ErrorContent />
    </Suspense>
  );
}