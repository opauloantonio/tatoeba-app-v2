import { createStackNavigator } from '@react-navigation/stack';
import { defaultStackScreenOptions, ScreenName } from '@routes/constants';

import SearchResults from '@screens/SearchResults';
import History from '@screens/History';

import { HistoryStackParamList } from './types';

const { Navigator, Screen } = createStackNavigator<HistoryStackParamList>();

function HistoryTab() {
  return (
    <Navigator screenOptions={defaultStackScreenOptions}>
      <Screen
        component={History}
        name={ScreenName.History}
        options={{ headerTitle: 'History' }}
      />

      <Screen
        name={ScreenName.SearchResults}
        component={SearchResults}
      />
    </Navigator>
  );
}

export default HistoryTab;
