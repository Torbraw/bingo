import type { LangKeys } from './config';

export const ui = {
  fr: {
    '404': '404 Page non trouvée',
    home: 'Accueil',
    index: 'Index',
  },
  en: {
    '404': '404 Page not found',
    home: 'Home',
    index: 'Index',
  },
} as const satisfies Record<LangKeys, Record<string, string>>;
