import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { type LangKeys, LANGUAGES, DEFAULT_LANGUAGE, BINGO, DEFAULT_VALUE, STORAGE_NAME } from './config';
import { ui } from './i18n';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getLangFromUrl = (url: URL) => {
  const [, lang] = url.pathname.split('/');
  if (lang in LANGUAGES) return lang as LangKeys;
  return DEFAULT_LANGUAGE;
};

export const useTranslations = (lang: LangKeys) => {
  return function t(key: keyof (typeof ui)[typeof DEFAULT_LANGUAGE]) {
    return ui[lang][key];
  };
};

export const buildBingoCombinaisons = (): string[] => {
  const storedValue = localStorage.getItem(STORAGE_NAME) ?? DEFAULT_VALUE.toString();
  const maxNumber = Number.parseInt(storedValue);

  const combinaisons = [];
  const columnAmount = Math.ceil(maxNumber / 5);
  for (let i = 0, currentNumber = 1; i < 5; i++) {
    for (let j = 1; j <= columnAmount; j++) {
      combinaisons.push(`${BINGO[i]}-${currentNumber++}`);
    }
  }
  return combinaisons;
};
