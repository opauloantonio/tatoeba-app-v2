import { createStackNavigator } from '@react-navigation/stack';
import { defaultStackScreenOptions } from '@routes/constants';
import Bookmarks from '@screens/Bookmarks';

const { Navigator, Screen } = createStackNavigator();

function BookmarksTab() {
  return (
    <Navigator screenOptions={defaultStackScreenOptions}>
      <Screen
        name="Bookmarks"
        component={Bookmarks}
        options={{ headerTitle: 'Bookmarks' }}
      />
    </Navigator>
  );
}

export default BookmarksTab;
