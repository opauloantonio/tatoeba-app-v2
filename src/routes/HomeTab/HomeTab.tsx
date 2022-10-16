import { createStackNavigator } from '@react-navigation/stack';

import Home from '@screens/Home';
import SearchResults from '@screens/SearchResults';
import ChooseLanguage from '@screens/ChooseLanguage';
import SentenceDetails from '@screens/SentenceDetails';

import {
  ScreenName,
  defaultStackScreenOptions,
} from '@routes/constants';

import { HomeStackParamList } from './types';

const { Navigator, Screen } = createStackNavigator<HomeStackParamList>();

function HomeTab() {
  return (
    <Navigator screenOptions={defaultStackScreenOptions}>
      <Screen
        name={ScreenName.Home}
        component={Home}
      />

      <Screen
        name={ScreenName.SearchResults}
        component={SearchResults}
      />

      <Screen
        name={ScreenName.SentenceDetails}
        component={SentenceDetails}
      />

      <Screen
        name={ScreenName.ChooseLanguage}
        component={ChooseLanguage}
      />
    </Navigator>
  );
}

export default HomeTab;
