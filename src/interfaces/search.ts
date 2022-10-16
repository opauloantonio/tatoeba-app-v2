import { LanguageCode } from '@constants/languages';

export type NoOption = 'no';
export type YesOption = 'yes';
export type AnyOption = 'any';
export type LimitOption = 'limit';
export type ExcludeOption = 'exclude';

export type YesOrNoOption = YesOption | NoOption;
export type YesOrNoOrAnyOption = YesOption | NoOption | AnyOption;

export type LimitOrExcludeOption = LimitOption | ExcludeOption;

export type TranslationLinkOption = 'direct' | 'indirect' | AnyOption;

export type SortOption = 'relevance' | 'words' | 'created' | 'modified' | 'random';

export interface SearchParameters {
  /** Restrict results to sentences from this language */
  from: LanguageCode;
  /** Restrict results to sentences with this audio filter */
  has_audio?: YesOrNoOrAnyOption;
  /** Restrict results to sentences from a particular list */
  list?: number;
  /** Restrict results to sentences owned by self-identified native speaker */
  native?: YesOrNoOption;
  /** Orphan sentences are not owned by any specific user,
   * they are more are likely to be incorrect. */
  orphans?: YesOrNoOrAnyOption;
  /** Apply different sorting strategies to the query */
  sort_relevance?: SortOption;
  /** Whether to reverse the order of results */
  sort_reverse?: YesOrNoOption;
  /** The text for the search */
  query: string;
  /** Current results page */
  page: number;
  /** Restrict results by a comma separated list of tags */
  tags?: string;
  /** Exclude or limit translations to specific filters */
  trans_filter?: LimitOrExcludeOption;
  /** Restrict translations to sentences with this audio filter */
  trans_has_audio?: YesOrNoOrAnyOption;
  /** Apply different translation link options */
  trans_link?: TranslationLinkOption;
  /** Orphan translations are not owned by any specific user,
   * they are more are likely to be incorrect. */
  trans_orphan?: YesOrNoOrAnyOption;
  /** Restrict translations to this language */
  trans_to?: LanguageCode;
  /** Unapproved translations are more are likely to be incorrect. */
  trans_unapproved?: YesOrNoOrAnyOption;
  /** Restrict results to translations from a specific user by their username */
  trans_user?: string;
  /** Unapproved sentences are more are likely to be incorrect. */
  unapproved?: YesOrNoOrAnyOption;
  /** Restrict results to sentences from a specific user by their username */
  user?: string;
  /** Show translations in this language */
  to: LanguageCode;
}
