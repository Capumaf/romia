"use client";

import { useActionState } from "react";
import { changePassword, type ChangePasswordState } from "./actions";

const initialState: ChangePasswordState = { ok: false, message: "" };

const fields = [
  { name: "current", label: "Clave actual", autoComplete: "current-password" },
  { name: "next", label: "Clave nueva (12 caracteres o más)", autoComplete: "new-password" },
  { name: "confirm", label: "Repite la clave nueva", autoComplete: "new-password" },
];

export default function ChangePasswordForm() {
  const [state, formAction, pending] = useActionState(changePassword, initialState);

  return (
    <form
      action={formAction}
      className="max-w-md space-y-5 rounded-2xl border p-6"
      style={{ borderColor: "var(--pink-line)", background: "var(--bg-card)" }}
    >
      {fields.map((field) => (
        <div key={field.name}>
          <label
            htmlFor={field.name}
            className="mb-2 block text-sm"
            style={{ color: "var(--ink-mute)" }}
          >
            {field.label}
          </label>
          <input
            id={field.name}
            name={field.name}
            type="password"
            autoComplete={field.autoComplete}
            required
            className="w-full rounded-xl border bg-transparent px-4 py-3 text-sm outline-none"
            style={{ borderColor: "var(--pink-line)", color: "var(--ink)" }}
          />
        </div>
      ))}

      <p
        aria-live="polite"
        className="text-sm"
        style={{ color: state.ok ? "var(--green, #34d399)" : "var(--red)" }}
      >
        {state.message}
      </p>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl py-3 text-sm font-semibold disabled:opacity-50"
        style={{ background: "var(--pink)", color: "#fff" }}
      >
        {pending ? "Guardando..." : "Cambiar clave"}
      </button>
    </form>
  );
}
