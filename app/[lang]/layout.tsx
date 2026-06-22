import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getDictionary } from "@/lib/getDictionary";
import type { Locale } from "@/i18n";

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }];
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = (lang === "es" ? "es" : "en") satisfies Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <Navbar locale={locale} dict={dict} />
      {children}
      <Footer dict={dict} />
    </>
  );
}