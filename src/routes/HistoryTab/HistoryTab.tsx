import { createStackNavigator } from '@react-navigation/stack';
import { defaultStackScreenOptions } from '@routes/constants';
import History from '@screens/History';

const { Navigator, Screen } = createStackNavigator();

function HistoryTab() {
  return (
    <Navigator screenOptions={defaultStackScreenOptions}>
      <Screen
        name="History"
        component={History}
        options={{ headerTitle: 'History' }}
      />
    </Navigator>
  );
}

export default HistoryTab;
