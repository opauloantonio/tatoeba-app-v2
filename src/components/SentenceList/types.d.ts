import { Sentence } from '@interfaces/api';

type SentenceListProps = {
  sentences: Sentence[];
  showTranslations: boolean;
  onEndReached?: () => void;
}
