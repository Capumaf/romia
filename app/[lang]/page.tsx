import Hero from "@/sections/Hero";
import Framework from "@/sections/Framework";
import CoreEngine from "@/sections/CoreEngine";
import { getDictionary } from "@/lib/getDictionary";
import type { Locale } from "@/i18n";
import HowItWorks from "@/sections/HowItWorks";
import Dashboard from "@/sections/Dashboard";
import Industries from "@/sections/Industries";
import CTA from "@/sections/CTA";
import Problem from "@/sections/Problem";
import Solution from "@/sections/Solution";

export default async function LangPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = (lang === "es" ? "es" : "en") satisfies Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <Hero locale={locale} dict={dict} />
      <Framework locale={locale} dict={dict} />
      <CoreEngine locale={locale} dict={dict} />
      <HowItWorks locale={locale} dict={dict} />
      <Dashboard locale={locale} dict={dict} />\
      <Problem locale={locale} dict={dict} />
      <Solution locale={locale} dict={dict} />
      <Industries locale={locale} dict={dict} />
      <CTA locale={locale} dict={dict} />
    </>
  );
}