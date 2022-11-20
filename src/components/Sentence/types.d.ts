import { Translation, Sentence } from '@interfaces/api';

export type SentenceProps = {
  canBookmark?: boolean;
  sentence: Sentence | Translation;
};
