import { LanguageCode, languages } from '@constants/languages';

export const getLanguageName = (code: LanguageCode) => (
  code === 'und' || code === ''
    ? 'Any Language'
    : languages.find((language) => language.code === code)!.name
);
