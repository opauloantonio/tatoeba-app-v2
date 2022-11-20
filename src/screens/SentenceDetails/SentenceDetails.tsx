import { useRoute } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper';
import { StyleSheet, View, ScrollView } from 'react-native';

import Error from '@components/Error';
import SentenceContainer from '@components/SentenceContainer';

import useSentence from '@hooks/useSentence';
import useHeaderTitle from '@hooks/useHeaderTitle';

import { SentenceDetailsRouteProps } from './types';

function SentenceDetails() {
  const route = useRoute<SentenceDetailsRouteProps>();
  const { sentenceId } = route.params;

  useHeaderTitle(`Sentence #${sentenceId}`);
  const { data, isFetching, refetch } = useSentence(sentenceId);

  if (data) {
    return (
      <ScrollView style={styles.container}>
        <SentenceContainer showTranslations sentence={data} />
      </ScrollView>
    );
  }

  if (isFetching) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator animating />
      </View>
    );
  }

  return (
    <Error
      retry={refetch}
      message="There was an error while trying to fetch this sentence"
    />
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
