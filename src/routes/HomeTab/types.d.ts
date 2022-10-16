import { StackNavigationProp } from '@react-navigation/stack';
import { ScreenName } from '@routes/constants';

export type HomeStackParamList = {
  [ScreenName.Home]: undefined;
  [ScreenName.SearchResults]: undefined;
  [ScreenName.ChooseLanguage]: { target: 'from' | 'to' };
  [ScreenName.SentenceDetails]: { sentenceId: number };
};

export type HomeNavigationProps = StackNavigationProp<HomeStackParamList>;
