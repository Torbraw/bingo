export const LANGUAGES = {
  fr: 'Français',
  en: 'English',
} as const;

export const DEFAULT_LANGUAGE = 'en' satisfies LangKeys;

export type LangKeys = keyof typeof LANGUAGES;

export const baseUrl = 'bingo';

export const BINGO = 'BINGO';

export const STORAGE_NAME = 'maxNumber';

export const MIN_VALUE = 75;
export const MAX_VALUE = 200;
export const DEFAULT_VALUE = 75;
