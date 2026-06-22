"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import type { Locale } from "@/i18n";
import type { getDictionary } from "@/lib/getDictionary";

type Dict = Awaited<ReturnType<typeof getDictionary>>;

type NavbarProps = {
  locale: Locale;
  dict: Dict;
};

export default function Navbar({ locale, dict }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const oppositeLocale = locale === "en" ? "es" : "en";

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    if (latest > prev && latest > 80) setHidden(true);
    else setHidden(false);
  });

  const links = [
    { href: "#framework", label: dict.nav.framework },
    { href: "#engine", label: dict.nav.engine },
    { href: "#how-it-works", label: dict.nav.implementation },
    { href: "#dashboard", label: dict.nav.dashboard },
    { href: "#contact", label: dict.nav.contact },
  ];

  return (
    <motion.header
      className="fixed top-0 left-0 z-50 w-full"
      animate={{ y: hidden ? "-120%" : "0%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="container-romia">
        <nav
          className="mt-4 rounded-2xl border backdrop-blur-md md:mt-6"
          style={{
            borderColor: "var(--pink-line)",
            background: "rgba(10,10,14,.85)",
          }}
        >
          {/* TOP ROW */}
          <div className="flex items-center justify-between px-5 py-4">

            {/* LEFT */}
            <div className="flex items-center gap-3">
              <div
                className="h-3 w-3 rounded-full"
                style={{ background: "var(--pink)", boxShadow: "0 0 20px var(--pink)" }}
              />
              <Link
                href={`/${locale}`}
                className="font-mono text-sm uppercase tracking-[0.25em]"
                style={{ fontFamily: "var(--font-orbitron)" }}
              >
                ROMIA
              </Link>
            </div>

            {/* CENTER — desktop only */}
            <div className="hidden items-center gap-8 md:flex">
              {links.map((item) => (
                <Link
                  key={item.href}
                  href={`/${locale}${item.href}`}
                  className="text-sm opacity-70 transition-opacity hover:opacity-100"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-2">
              <Link
                href={`/${oppositeLocale}`}
                className="rounded-xl border px-3 py-2 text-sm font-medium opacity-70 transition-opacity hover:opacity-100"
                style={{ borderColor: "var(--pink-line)" }}
              >
                {dict.nav.locale}
              </Link>
              <Link
                href={`/${locale}#contact`}
                className="hidden rounded-xl px-4 py-2 text-sm font-medium md:block"
                style={{ background: "var(--pink)", color: "#fff" }}
              >
                {dict.nav.cta}
              </Link>

              {/* HAMBURGER */}
              <button
                onClick={() => setOpen(!open)}
                aria-label={open ? "Close Menu" : "Open Menu"}
                className="relative flex h-9 w-9 items-center justify-center rounded-xl border md:hidden"
                style={{
                  borderColor: "var(--pink-line)",
                  background: open ? "rgba(255,45,142,.05)" : "transparent",
                }}
              >
                <span
                  className="absolute h-px w-3.5 transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,.8)",
                    transform: open ? "rotate(45deg)" : "translateY(-4px)",
                  }}
                />
                <span
                  className="absolute h-px w-3.5 transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,.8)",
                    opacity: open ? 0 : 1,
                  }}
                />
                <span
                  className="absolute h-px w-3.5 transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,.8)",
                    transform: open ? "rotate(-45deg)" : "translateY(4px)",
                  }}
                />
              </button>
            </div>
          </div>

          {/* MOBILE MENU */}
          {open && (
            <div
              className="border-t px-5 pb-5 md:hidden"
              style={{ borderColor: "var(--pink-line)" }}
            >
              <div className="flex flex-col gap-1 pt-4">
                {links.map((item) => (
                  <Link
                    key={item.href}
                    href={`/${locale}${item.href}`}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-3 text-sm opacity-70 transition-opacity hover:opacity-100"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href={`/${locale}#contact`}
                  onClick={() => setOpen(false)}
                  className="mt-3 rounded-xl px-4 py-3 text-center text-sm font-medium"
                  style={{ background: "var(--pink)", color: "#fff" }}
                >
                  {dict.nav.cta}
                </Link>
              </div>
            </div>
          )}
        </nav>
      </div>
    </motion.header>
  );
}