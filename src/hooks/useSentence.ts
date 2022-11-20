import { useMemo } from 'react';
import { Sentence } from '@interfaces/api';
import RealmContext from '@database/index';
import { Bookmark } from '@database/models/Bookmark';
import { useGetSentenceByIdQuery } from '@services/tatoebaApi';

const { useQuery } = RealmContext;

function useSentence(sentenceId: number) {
  const bookmark = useQuery(Bookmark).filtered('sentenceId = $0', sentenceId);
  const { data, ...query } = useGetSentenceByIdQuery(sentenceId);

  const sentence: Sentence | undefined = useMemo(() => {
    if (data) return data;

    if (!bookmark.isEmpty()) {
      return JSON.parse(bookmark[0].data);
    }

    return undefined;
  }, [data, bookmark]);

  return { data: sentence, ...query };
}

export default useSentence;
