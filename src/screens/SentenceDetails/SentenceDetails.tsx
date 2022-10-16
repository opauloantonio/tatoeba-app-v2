import { StyleSheet, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper';

import Error from '@components/Error';
import useHeaderTitle from '@hooks/useHeaderTitle';
import SentenceContainer from '@components/SentenceContainer';
import { useGetSentenceByIdQuery } from '@services/tatoebaApi';

import { SentenceDetailsRouteProps } from './types';

function SentenceDetails() {
  const route = useRoute<SentenceDetailsRouteProps>();
  const { sentenceId } = route.params;

  useHeaderTitle(`Sentence #${sentenceId}`);

  const {
    data,
    isError,
    refetch,
    isFetching,
  } = useGetSentenceByIdQuery(sentenceId);

  if (isFetching) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator animating />
      </View>
    );
  }

  if (isError || !data) {
    return (
      <Error
        retry={refetch}
        message="There was an error while trying to fetch this sentence"
      />
    );
  }

  return (
    <View style={styles.container}>
      <SentenceContainer sentence={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SentenceDetails;
