import { StackNavigationProp } from '@react-navigation/stack';
import { SearchParameters } from '@interfaces/search';
import { ScreenName } from '@routes/constants';

export type HistoryStackParamList = {
  [ScreenName.History]: undefined;
  [ScreenName.SearchResults]: { searchParams: SearchParameters };
};

export type HistoryNavigationProps = StackNavigationProp<HistoryStackParamList>;
