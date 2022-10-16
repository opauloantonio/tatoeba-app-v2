import { Translation, Sentence } from '@interfaces/api';

export type SentenceProps = {
  sentence: Sentence | Translation;
  showDetailsOnPress: boolean;
};
