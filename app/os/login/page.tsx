"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Credenciales incorrectas.");
      setLoading(false);
      return;
    }

    router.push("/os/dashboard");
  }

  return (
    <div
      className="os-root flex min-h-screen items-center justify-center px-4"
      style={{ background: "var(--bg)" }}
    >
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <p
            className="font-mono text-xs uppercase tracking-[0.3em]"
            style={{ color: "var(--pink)" }}
          >
            ROMIA
          </p>
          <h1
            className="mt-2 text-2xl font-bold"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            OS
          </h1>
          <p className="mt-2 text-sm" style={{ color: "var(--ink-mute)" }}>
            Plataforma interna de operaciones
          </p>
        </div>

        <div
          className="rounded-3xl border p-8"
          style={{
            borderColor: "var(--pink-line)",
            background: "var(--bg-card)",
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                className="mb-2 block font-mono text-xs uppercase tracking-[0.2em]"
                style={{ color: "var(--ink-mute)" }}
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border bg-transparent px-4 py-3 text-sm outline-none"
                style={{ borderColor: "var(--pink-line)", color: "var(--ink)" }}
                placeholder="tu@romia.io"
              />
            </div>

            <div>
              <label
                className="mb-2 block font-mono text-xs uppercase tracking-[0.2em]"
                style={{ color: "var(--ink-mute)" }}
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-xl border bg-transparent px-4 py-3 text-sm outline-none"
                style={{ borderColor: "var(--pink-line)", color: "var(--ink)" }}
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-sm" style={{ color: "var(--red)" }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl py-3 text-sm font-semibold disabled:opacity-50"
              style={{ background: "var(--pink)", color: "#fff" }}
            >
              {loading ? "Entrando..." : "Iniciar Sesión"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}