import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { Dict, Lang, LANGS, detectLang, translations } from './translations';
import { JobListing, StateCode, WorkType } from '../data/types';

interface I18n {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
  months: string[];
  monthsShort: string[];
  stateNames: Record<StateCode, string>;
  workTypeLabels: Record<WorkType, string>;
  resources: Dict['resources'];
  donateOptions: Dict['donateOptions'];
  monthRangeLabel: (j: JobListing) => string;
  localizedName: (j: JobListing) => string;
  localizedCrop: (j: JobListing) => string;
  localizedDescription: (j: JobListing) => string;
  localizedAccommodation: (j: JobListing) => string;
}

const Ctx = createContext<I18n | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(detectLang);

  useEffect(() => {
    try {
      window.localStorage.setItem('farmates.lang', lang);
      document.documentElement.lang = lang;
    } catch {
      // almacenamiento no disponible
    }
  }, [lang]);

  const dict: Dict = translations[lang];

  const i18n = useMemo<I18n>(() => {
    const t = (key: string, vars?: Record<string, string | number>): string => {
      let s = dict.ui[key] ?? translations.es.ui[key] ?? key;
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          s = s.replaceAll(`{${k}}`, String(v));
        }
      }
      return s;
    };

    const pick = <T,>(base: T, en?: T, pt?: T): T => {
      if (lang === 'en' && en !== undefined) return en;
      if (lang === 'pt' && pt !== undefined) return pt;
      return base;
    };

    return {
      lang,
      setLang,
      t,
      months: dict.months,
      monthsShort: dict.monthsShort,
      stateNames: dict.stateNames,
      workTypeLabels: dict.workTypeLabels,
      resources: dict.resources,
      donateOptions: dict.donateOptions,
      monthRangeLabel: (j: JobListing) => {
        const s = j.seasonStart;
        const e = j.seasonEnd;
        if (s === 0 && e === 11) return t('season.allYear');
        return `${dict.monthsShort[s]} \u2013 ${dict.monthsShort[e]}`;
      },
      localizedName: (j: JobListing) => pick(j.name, j.nameEn, j.namePt),
      localizedCrop: (j: JobListing) => pick(j.crop, j.cropEn, j.cropPt),
      localizedDescription: (j: JobListing) => pick(j.description, j.descriptionEn, j.descriptionPt),
      localizedAccommodation: (j: JobListing) => pick(j.accommodation, j.accommodationEn, j.accommodationPt),
    };
  }, [lang, dict]);

  return <Ctx.Provider value={i18n}>{children}</Ctx.Provider>;
}

export function useI18n(): I18n {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useI18n must be used within LanguageProvider');
  return ctx;
}

export { LANGS };
