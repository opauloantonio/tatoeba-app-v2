import { uniqBy } from 'lodash';
import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import Error from '@components/Error';
import SentenceList from '@components/SentenceList';

import useHeaderTitle from '@hooks/useHeaderTitle';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';

import { Sentence } from '@interfaces/api';
import { useGetSearchResultsQuery } from '@services/tatoebaApi';
import { setCurrentSearchParams, submitSearchParams } from '@slices/search';

function SearchResults() {
  const dispatch = useAppDispatch();

  const [page, setPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [results, setResults] = useState<Sentence[]>([]);

  const { submittedSearchParams } = useAppSelector((state) => state.search);

  const {
    data,
    isError,
    isFetching,
    refetch,
  } = useGetSearchResultsQuery(submittedSearchParams);

  useHeaderTitle(`Results for "${submittedSearchParams.query}"`);

  useEffect(() => {
    if (submittedSearchParams.page > page) {
      if (data?.results) {
        setResults(uniqBy([...results, ...data.results], (s) => s.id));
      }

      if (data?.paging) {
        const { count, perPage, page: currentPage } = data.paging.Sentences;
        const numberOfPages = Math.ceil(count / perPage);
        setHasNextPage(numberOfPages > page);
        setPage(currentPage);
      }
    }
    // eslint-disable-next-line
  }, [data, submittedSearchParams.page]);

  const fetchMore = () => {
    if (hasNextPage && !isFetching) {
      dispatch(setCurrentSearchParams({ page: submittedSearchParams.page + 1 }));
      dispatch(submitSearchParams());
    }
  };

  if (isError) {
    return (
      <Error
        retry={refetch}
        message="There was an error while trying to fetch your search results"
      />
    );
  }

  return (
    <View style={styles.container}>
      <SentenceList
        showTranslations
        sentences={results}
        onEndReached={fetchMore}
      />

      {isFetching && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator animating />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    left: 0,
    right: 0,
    padding: 16,
    position: 'absolute',
  },
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
});

export default SearchResults;
