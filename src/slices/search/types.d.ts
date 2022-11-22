import { LanguageCode } from '@constants/languages';
import { SearchParameters } from '@interfaces/search';

export type SearchState = {
  currentSearchParams: SearchParameters;
  favoriteLanguages: LanguageCode[];
};
