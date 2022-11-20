import { Sentence } from '@interfaces/api';
import { ListRenderItem, View, FlatList } from 'react-native';
import SentenceContainer from '@components/SentenceContainer';
import { SentenceListProps } from './types';
import { useCallback } from 'react';

function SentenceList({ sentences, showTranslations, onEndReached }: SentenceListProps) {
  const renderSearchResult: ListRenderItem<Sentence> = useCallback(({ item, index }) => (
    <View style={{ marginBottom: 20, marginTop: index === 0 ? 20 : 0 }}>
      <SentenceContainer showTranslations={showTranslations} sentence={item} />
    </View>
  ), [showTranslations]);

  const keyExtractor = useCallback((item: Sentence) => item.id.toString(), []);

  return (
    <FlatList
      data={sentences}
      keyExtractor={keyExtractor}
      onEndReached={onEndReached}
      renderItem={renderSearchResult}
    />
  );
}

export default SentenceList;
