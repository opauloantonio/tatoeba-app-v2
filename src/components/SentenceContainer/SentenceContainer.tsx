import { isEmpty } from 'lodash';

import {
  View,
  StyleSheet,
} from 'react-native';

import {
  Card,
  Text,
  Button,
  Divider,
} from 'react-native-paper';

import useToggle from '@hooks/useToggle';
import Sentence from '@components/Sentence/Sentence';
import { Translation } from '@interfaces/api';

import { SentenceContainerProps } from './types';

const NON_EXPANDED_LIST_LIMIT = 5;

function SentenceContainer({ sentence }: SentenceContainerProps) {
  const [isExpanded, toggleIsExpanded] = useToggle(false);

  const directTranslations = sentence.translations[0];
  const indirectTranslations = sentence.translations[1];

  const hasDirectTranslations = !isEmpty(directTranslations);
  const hasIndirectTranslations = !isEmpty(indirectTranslations);

  const allTranslations = [...directTranslations, ...indirectTranslations];

  const visibleTranslations = isExpanded
    ? allTranslations
    : allTranslations.slice(0, NON_EXPANDED_LIST_LIMIT);

  const renderTranslation = (item: Translation, index: number) => (
    <View key={item.id.toString()}>
      {!item.isDirect && index === directTranslations.length && (
        <View style={styles.labelContainer}>
          <Text variant="labelMedium">Translations of translations:</Text>
        </View>
      )}

      <View style={styles.translation}>
        <Sentence showDetailsOnPress sentence={item} />
      </View>
    </View>
  );

  return (
    <Card style={styles.container}>
      <Sentence showDetailsOnPress={false} sentence={sentence} />

      <View style={styles.labelContainer}>
        <Divider />
      </View>

      {!hasDirectTranslations && hasIndirectTranslations && (
        <View style={styles.labelContainer}>
          <Text variant="labelMedium">No direct translations</Text>
        </View>
      )}

      {!hasDirectTranslations && !hasIndirectTranslations && (
      <View style={styles.labelContainer}>
        <Text variant="labelMedium">This sentence has no translations</Text>
      </View>
      )}

      {visibleTranslations.map(renderTranslation)}

      {allTranslations.length > NON_EXPANDED_LIST_LIMIT && (
        <View style={styles.buttonContainer}>
          <Button mode="outlined" onPress={toggleIsExpanded}>
            SHOW {isExpanded ? 'LESS' : 'MORE'}
          </Button>
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  translation: {
    marginVertical: 5,
  },
  labelContainer: {
    marginVertical: 10,
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default SentenceContainer;
