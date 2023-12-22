import type { LangKeys } from './config';

export const ui = {
  fr: {
    '404': '404 Page non trouvée',
    draw: 'Tirage',
    card: 'Carte',
    allDrawned: 'Toutes les combinaisons ont été tirées.',
    reset: 'Réinitialiser',
  },
  en: {
    '404': '404 Page not found',
    draw: 'Draw',
    card: 'Card',
    allDrawned: 'All combinations have been drawn.',
    reset: 'Reset',
  },
} as const satisfies Record<LangKeys, Record<string, string>>;
