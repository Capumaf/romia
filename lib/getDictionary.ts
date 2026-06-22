import { dictionaries, Locale } from "@/i18n";

export const getDictionary = (locale: Locale) => {
  return dictionaries[locale] ?? dictionaries.en;
};