import { RouteProp } from '@react-navigation/native';
import { HomeStackParamList } from '@routes/HomeTab/types';
import { ScreenName } from '@routes/constants';

export type SearchResultsRouteProps = RouteProp<HomeStackParamList, ScreenName.SearchResults>;
