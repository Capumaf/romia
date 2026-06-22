export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p
          className="mb-4 uppercase tracking-[0.3em]"
          style={{ color: "var(--pink)" }}
        >
          AI-Powered Lead Intelligence Platform
        </p>

        <h1 className="text-7xl font-bold">
          ROMIA
        </h1>

        <p
          className="mt-4 max-w-xl"
          style={{ color: "var(--ink-dim)" }}
        >
          Transform conversations into qualified sales opportunities.
        </p>
      </div>
    </main>
  );
}