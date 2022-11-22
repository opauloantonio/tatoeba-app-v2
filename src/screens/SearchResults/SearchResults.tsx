import { View, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper';

import Error from '@components/Error';
import SentenceList from '@components/SentenceList';

import useHeaderTitle from '@hooks/useHeaderTitle';
import useSearchResults from '@hooks/useSearchResults';

import { SearchResultsRouteProps } from './types';

function SearchResults() {
  const route = useRoute<SearchResultsRouteProps>();

  const { searchParams } = route.params;

  const {
    data,
    isError,
    refetch,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useSearchResults(searchParams);

  useHeaderTitle(`Results for "${searchParams.query}"`);

  const fetchMore = () => {
    if (hasNextPage && !isFetching) {
      fetchNextPage();
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
        sentences={data}
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
