"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/os/dashboard", icon: "⬡" },
  { label: "Clients", href: "/os/clients", icon: "◈" },
  { label: "Implementations", href: "/os/implementations", icon: "◎" },
  { label: "Demo Studio", href: "/os/demo", icon: "▷" },
  { label: "Flows", href: "/os/flows", icon: "⟳" },
  { label: "Agents", href: "/os/agents", icon: "◆" },
  { label: "Prompts", href: "/os/prompts", icon: "❯" },
  { label: "Templates", href: "/os/templates", icon: "▣" },
  { label: "Knowledge", href: "/os/knowledge", icon: "◉" },
  { label: "Analytics", href: "/os/analytics", icon: "▲" },
];

export default function OsSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="flex w-60 flex-col border-r"
      style={{
        background: "var(--bg-card)",
        borderColor: "var(--pink-line)",
        minHeight: "100vh",
      }}
    >
      {/* Logo */}
      <div
        className="flex items-center border-b px-5"
        style={{ borderColor: "var(--pink-line)", height: "64px" }}
      >
        <div>
          <p
            className="font-mono text-[10px] uppercase tracking-[0.3em]"
            style={{ color: "var(--pink)" }}
          >
            ROMIA
          </p>
          <p
            className="text-lg font-bold leading-none"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            OS
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors"
              style={{
                background: isActive ? "var(--pink-soft)" : "transparent",
                color: isActive ? "var(--pink)" : "var(--ink-dim)",
              }}
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Settings */}
      <div
        className="border-t px-3 py-4"
        style={{ borderColor: "var(--pink-line)" }}
      >
        <Link
          href="/os/settings"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors"
          style={{ color: "var(--ink-mute)" }}
        >
          <span>⚙</span>
          <span>Settings</span>
        </Link>
      </div>
    </aside>
  );
}