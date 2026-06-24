"use client";

import { signOut } from "next-auth/react";

type Props = {
  user: {
    name?: string | null;
    email?: string | null;
  };
};

export default function OsHeader({ user }: Props) {
  return (
    <header
      className="flex items-center justify-between px-6 py-4 border-b"
      style={{
        background: "var(--bg-card)",
        borderColor: "var(--pink-line)",
        height: "64px",
      }}
    >
      <div />

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-medium">{user?.name ?? "Admin"}</p>
          <p className="text-xs" style={{ color: "var(--ink-mute)" }}>
            {user?.email}
          </p>
        </div>

        <button
          onClick={() => signOut({ callbackUrl: "/os/login" })}
          className="rounded-xl border px-4 py-2 text-xs transition-colors"
          style={{
            borderColor: "var(--pink-line)",
            color: "var(--ink-mute)",
          }}
        >
          Sign out
        </button>
      </div>
    </header>
  );
}