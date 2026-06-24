import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import OsSidebar from "@/components/os/OsSidebar";
import OsHeader from "@/components/os/OsHeader";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/os/login");
  }

  return (
    <>
      <OsSidebar />
      <div className="flex flex-1 flex-col">
        <OsHeader user={session.user ?? { name: null, email: null }} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </>
  );
}