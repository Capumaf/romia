import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import OsSidebar from "@/components/os/OsSidebar";
import OsHeader from "@/components/os/OsHeader";

export default async function OsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="os-root flex min-h-screen"
      style={{ background: "var(--bg)" }}
    >
      {children}
    </div>
  );
}