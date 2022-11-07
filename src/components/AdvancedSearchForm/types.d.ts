import { LanguageCode } from '@constants/languages';

import {
  SortOption,
  YesOrNoOrAnyOption,
  LimitOrExcludeOption,
  TranslationLinkOption,
} from '@interfaces/search';

type SortValue = { value: SortOption, label: string };

type AnyValue = { value: YesOrNoOrAnyOption, label: string };

type TransFilterValue = { value: LimitOrExcludeOption, label: string };

type LanguageValue = { value: LanguageCode, label: string };

type TransLinkValue = { value: TranslationLinkOption, label: string };
