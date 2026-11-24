import ChangePasswordForm from "./ChangePasswordForm";

export default function SettingsPage() {
  return (
    <div>
      <div className="mb-8">
        <p
          className="font-mono text-xs uppercase tracking-[0.3em]"
          style={{ color: "var(--pink)" }}
        >
          Settings
        </p>
        <h1
          className="mt-2 text-2xl font-bold"
          style={{ fontFamily: "var(--font-orbitron)" }}
        >
          Cambiar clave
        </h1>
      </div>

      <ChangePasswordForm />
    </div>
  );
}
