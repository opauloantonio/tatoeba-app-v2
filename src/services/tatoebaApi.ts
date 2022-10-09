import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SearchResponse, Sentence } from 'interfaces/api';

export const tatoebaApi = createApi({
  reducerPath: 'tatoebaApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://tatoeba.org/eng/api_v0/' }),
  endpoints: (builder) => ({
    getSentenceById: builder.query<Sentence, number>({
      query: (sentenceId) => `sentence/${sentenceId}`,
    }),
    searchSentences: builder.query<SearchResponse, void>({
      query: () => 'sentences/',
    }),
  }),
});

export const { useGetSentenceByIdQuery, useSearchSentencesQuery } = tatoebaApi;
