// These interfaces should match the objects returned by the Tatoeba API
// More information on https://en.wiki.tatoeba.org/articles/show/api

// TODO also need to create interfaces that match the search filter properties
// below are all urls params when we make an advanced query
// need to check all values these string params accept

// from=eng&has_audio=&native=&orphans=no&query=journey
// &sort=relevance&sort_reverse=&tags=&to=
// &trans_filter=limit&trans_has_audio=&trans_link=&trans_orphan=&trans_to=
// &trans_unapproved=&trans_user=&unapproved=no&user=

export interface Audio {
  id: number;
  author: string;
  license: string;
  attribution_url: string;
}

export interface User {
  isNative?: string;
  username: string;
}

// TODO sentence 1 has transcription objects: https://tatoeba.org/pt-br/api_v0/sentence/1
export interface Transcription {}

export interface Sentence {
  id: number;
  user: User | null;
  dir: string;
  lang: string; // TODO 3 letter language code, need to create their type
  text: string;
  audios: Audio[];
  license: string;
  lang_tag: string;
  correctness: number;
  script: string | null;
  base?: Sentence | null;
  /**
   * This field has two arrays of sentences.
   * The first one is an array of direct translations
   * and the second one is an array of indirect translations (translations of other translations)
   */
   translations: [Translation[], Translation[]];
   transcriptions: Transcription[];
}

export interface Translation extends Omit<Sentence, 'translations' | 'license' | 'user' | 'base'> {
  isDirect: boolean;
}

export interface PagingInformation {
  Sentences: {
    finder: string;
    page: number;
    current: number;
    count: number;
    perPage: number;
    start: number;
    end: number;
    prevPage: boolean;
    nextPage: boolean;
    pageCount: number;
    sort: string;
    direction: boolean;
    limit: null;
    sortDefault: boolean;
    directionDefault: boolean;
    scope: null;
    completeSort: [];
  };
}

export interface SearchResponse {
  results: Sentence[];
  paging: PagingInformation;
}
