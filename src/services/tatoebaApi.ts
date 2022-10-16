import { query } from 'urlcat';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_TATOEBA_API_URL } from '@constants/endpoints';
import { SearchResponse, Sentence } from '@interfaces/api';
import { SearchParameters } from '@interfaces/search';

export const tatoebaApi = createApi({
  reducerPath: 'tatoebaApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_TATOEBA_API_URL }),
  endpoints: (builder) => ({
    getSentenceById: builder.query<Sentence, number>({
      query: (sentenceId) => `sentence/${sentenceId}`,
    }),
    getSearchResults: builder.query<SearchResponse, Partial<SearchParameters>>({
      query: (params) => `search?${query(params)}`,
    }),
  }),
});

export const {
  useGetSentenceByIdQuery,
  useGetSearchResultsQuery,
} = tatoebaApi;
