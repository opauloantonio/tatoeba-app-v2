import { StackNavigationProp } from '@react-navigation/stack';
import { ScreenName } from './constants';

export type RootStackParamList = {
  [ScreenName.HomeTab]: undefined;
  [ScreenName.AboutTab]: undefined;
  [ScreenName.HistoryTab]: undefined;
  [ScreenName.BookmarksTab]: undefined;

  [ScreenName.Home]: undefined;
  [ScreenName.About]: undefined;
  [ScreenName.History]: undefined;
  [ScreenName.Bookmarks]: undefined;
};

export type RootNavigationProps = StackNavigationProp<RootStackParamList>;
