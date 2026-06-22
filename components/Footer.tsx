import Link from "next/link";
import type { getDictionary } from "@/lib/getDictionary";

type Dict = Awaited<ReturnType<typeof getDictionary>>;

export default function Footer({ dict }: { dict: Dict }) {
  return (
    <footer
      className="relative border-t"
      style={{ borderColor: "var(--pink-line)" }}
    >
      <div className="container-romia py-20">
        {/* TOP */}
        <div className="grid gap-12 lg:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <div
                className="h-3 w-3 rounded-full"
                style={{ background: "var(--pink)", boxShadow: "0 0 20px var(--pink)" }}
              />
              <span className="font-mono uppercase tracking-[0.25em]">ROMIA</span>
            </div>
            <p className="mt-6 max-w-md text-sm leading-relaxed" style={{ color: "var(--ink-dim)" }}>
              {dict.footer.description}
            </p>
          </div>

          <div>
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em]" style={{ color: "var(--pink)" }}>
              {dict.footer.frameworkLabel}
            </p>
            <ul className="space-y-3 text-sm" style={{ color: "var(--ink-dim)" }}>
              {dict.footer.frameworkLinks.map((item: String, i: number ) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em]" style={{ color: "var(--pink)" }}>
              {dict.footer.contactLabel}
            </p>
            <div className="space-y-3 text-sm" style={{ color: "var(--ink-dim)" }}>
              <p>{dict.footer.contactCta}</p>
              <Link href={`mailto:${dict.footer.email}`} className="block transition-colors hover:text-white">
                {dict.footer.email}
              </Link>
              <p>{dict.footer.location}</p>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-12 h-px" style={{ background: "var(--pink-line)" }} />

        {/* BOTTOM */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: "var(--ink-mute)" }}>
            {dict.footer.copyright}
          </p>
          <div className="flex gap-6 text-xs uppercase tracking-[0.15em]" style={{ color: "var(--ink-mute)" }}>
            {dict.footer.tags.map((tag: String, i: number) => (
              <span key={i}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}