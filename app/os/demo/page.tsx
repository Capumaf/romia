"use client";

import Link from "next/link";
import { useState } from "react";

const initialDemos = [
  {
    id: "galeon",
    title: "Galeón Inmobiliaria",
    client: "Galeón",
    industry: "Real Estate",
    status: "active",
    file: "/demos/galeon.html",
  },
  {
    id: "galeon-v2",
    title: "Galeón Inmobiliaria v2",
    client: "Galeón",
    industry: "Real Estate",
    status: "active",
    file: "/demos/galeon-v2.html",
  },
];

export default function DemoPage() {
  const [demos, setDemos] = useState(initialDemos);

  const toggleStatus = (id: string) => {
    setDemos((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, status: d.status === "active" ? "inactive" : "active" } : d
      )
    );
  };

  return (
    <div>
      <div className="mb-8">
        <p className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: "var(--pink)" }}>
          Demo Studio
        </p>
        <h1 className="mt-2 text-2xl font-bold" style={{ fontFamily: "var(--font-orbitron)" }}>
          Demos
        </h1>
      </div>

      <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "var(--pink-line)" }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: "var(--bg-card)", borderBottom: "1px solid var(--pink-line)" }}>
              <th className="px-6 py-3 text-left font-mono text-xs uppercase tracking-[0.2em]" style={{ color: "var(--ink-mute)" }}>Demo</th>
              <th className="px-6 py-3 text-left font-mono text-xs uppercase tracking-[0.2em]" style={{ color: "var(--ink-mute)" }}>Cliente</th>
              <th className="px-6 py-3 text-left font-mono text-xs uppercase tracking-[0.2em]" style={{ color: "var(--ink-mute)" }}>Industria</th>
              <th className="px-6 py-3 text-left font-mono text-xs uppercase tracking-[0.2em]" style={{ color: "var(--ink-mute)" }}>Estado</th>
              <th className="px-6 py-3 text-right font-mono text-xs uppercase tracking-[0.2em]" style={{ color: "var(--ink-mute)" }}>Acción</th>
            </tr>
          </thead>
          <tbody>
            {demos.map((demo, i) => (
              <tr
                key={demo.id}
                style={{
                  background: i % 2 === 0 ? "var(--bg)" : "var(--bg-card)",
                  borderBottom: "1px solid rgba(255,45,142,0.1)",
                }}
              >
                <td className="px-6 py-4 font-medium">{demo.title}</td>
                <td className="px-6 py-4" style={{ color: "var(--ink-dim)" }}>{demo.client}</td>
                <td className="px-6 py-4" style={{ color: "var(--ink-dim)" }}>{demo.industry}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => toggleStatus(demo.id)}
                    className="rounded-full px-3 py-1 text-xs font-medium transition-all"
                    style={{
                      background: demo.status === "active" ? "rgba(52,211,153,.12)" : "rgba(251,113,133,.12)",
                      color: demo.status === "active" ? "var(--green)" : "var(--red)",
                    }}
                  >
                    {demo.status === "active" ? "Activo" : "Inactivo"}
                  </button>
                </td>
                <td className="px-6 py-4 text-right">
                  {demo.status === "active" ? (
                    <Link
                      href={demo.file}
                      target="_blank"
                      className="text-xs font-medium"
                      style={{ color: "var(--pink)" }}
                    >
                      Abrir demo →
                    </Link>
                  ) : (
                    <span className="text-xs" style={{ color: "var(--ink-mute)" }}>—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}