import Hero from "@/sections/Hero";
import Problem from "@/sections/Problem";
import Solution from "@/sections/Solution";
import Industries from "@/sections/Industries";
import Framework from "@/sections/Framework";
import HowItWorks from "@/sections/HowItWorks";
import CoreEngine from "@/sections/CoreEngine";
import Dashboard from "@/sections/Dashboard";
import CTA from "@/sections/CTA";

import { getDictionary } from "@/lib/getDictionary";
import type { Locale } from "@/i18n";

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

      <Problem locale={locale} dict={dict} />
      <Solution locale={locale} dict={dict} />
      <Industries locale={locale} dict={dict} />

      <Framework locale={locale} dict={dict} />
      <HowItWorks locale={locale} dict={dict} />
      <CoreEngine locale={locale} dict={dict} />
      <Dashboard locale={locale} dict={dict} />

      <CTA locale={locale} dict={dict} />
    </>
  );
}