import { uniqBy } from 'lodash';
import { useEffect, useState } from 'react';

import { Sentence } from '@interfaces/api';
import { SearchParameters } from '@interfaces/search';
import { useGetSearchResultsQuery } from '@services/tatoebaApi';

function useSearchResults(params: SearchParameters) {
  const [page, setPage] = useState(params.page);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [results, setResults] = useState<Sentence[]>([]);

  const { data, ...query } = useGetSearchResultsQuery({ ...params, page });

  useEffect(() => {
    setResults([]);
  }, [params]);

  useEffect(() => {
    if (data?.results) {
      setResults((currentResults) => uniqBy([...currentResults, ...data.results], (s) => s.id));
    }

    if (data?.paging) {
      setHasNextPage(data.paging.Sentences.pageCount > page);
    }
  }, [data, page]);

  const fetchNextPage = () => {
    setPage((currentPage) => currentPage + 1);
  };

  return {
    data: results,
    fetchNextPage,
    hasNextPage,
    ...query,
  };
}

export default useSearchResults;
