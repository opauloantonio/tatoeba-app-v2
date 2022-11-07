import { RouteProp } from '@react-navigation/native';
import { HomeStackParamList } from '@routes/HomeTab/types';
import { ScreenName } from '@routes/constants';
import { Language } from '@constants/languages';

export type ChooseLanguageRouteProps = RouteProp<HomeStackParamList, ScreenName.ChooseLanguage>;

type IRenderLanguage = { item: Language };
