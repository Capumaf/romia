import Link from "next/link";

const demos = [
  {
    id: "galeon",
    title: "Galeón Inmobiliaria",
    description: "Demo conversacional WhatsApp para proyecto inmobiliario en Lima.",
    industry: "Real Estate",
    status: "active",
  },
];

export default function DemoPage() {
  return (
    <div>
      <div className="mb-8">
        <p
          className="font-mono text-xs uppercase tracking-[0.3em]"
          style={{ color: "var(--pink)" }}
        >
          Demo Studio
        </p>
        <h1
          className="mt-2 text-2xl font-bold"
          style={{ fontFamily: "var(--font-orbitron)" }}
        >
          Demos
        </h1>
        <p className="mt-1 text-sm" style={{ color: "var(--ink-mute)" }}>
          Demos de conversación ROMIA listos para presentar.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {demos.map((demo) => (
          <Link
            key={demo.id}
            href={`/demos/${demo.id}.html`}
            target="_blank"
            className="block rounded-2xl border p-6 transition-colors hover:border-pink-500"
            style={{
              borderColor: "var(--pink-line)",
              background: "var(--bg-card)",
            }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p
                  className="font-mono text-[10px] uppercase tracking-[0.25em]"
                  style={{ color: "var(--pink)" }}
                >
                  {demo.industry}
                </p>
                <h2 className="mt-2 text-lg font-semibold">{demo.title}</h2>
                <p
                  className="mt-2 text-sm leading-relaxed"
                  style={{ color: "var(--ink-dim)" }}
                >
                  {demo.description}
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <span
                className="rounded-full px-3 py-1 text-xs"
                style={{
                  background: "rgba(52,211,153,.12)",
                  color: "var(--green)",
                }}
              >
                {demo.status === "active" ? "Activo" : "Borrador"}
              </span>
              <span
                className="text-xs"
                style={{ color: "var(--pink)" }}
              >
                Abrir demo →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}