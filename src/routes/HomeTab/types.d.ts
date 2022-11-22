import { SearchParameters } from '@interfaces/search';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScreenName } from '@routes/constants';

export type HomeStackParamList = {
  [ScreenName.Home]: undefined;
  [ScreenName.SentenceDetails]: { sentenceId: number };
  [ScreenName.ChooseLanguage]: { target: 'from' | 'to' };
  [ScreenName.SearchResults]: { searchParams: SearchParameters };
};

export type HomeNavigationProps = StackNavigationProp<HomeStackParamList>;
