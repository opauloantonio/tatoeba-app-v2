import { StackNavigationProp } from '@react-navigation/stack';
import { ScreenName } from '@routes/constants';

export type BookmarksStackParamList = {
  [ScreenName.Bookmarks]: undefined;
  [ScreenName.SentenceDetails]: { sentenceId: number };
};

export type BookmarksNavigationProps = StackNavigationProp<BookmarksStackParamList>;
