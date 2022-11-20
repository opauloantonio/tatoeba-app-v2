import { createStackNavigator } from '@react-navigation/stack';

import Bookmarks from '@screens/Bookmarks';
import SentenceDetails from '@screens/SentenceDetails';
import { defaultStackScreenOptions, ScreenName } from '@routes/constants';

import { BookmarksStackParamList } from './types';

const { Navigator, Screen } = createStackNavigator<BookmarksStackParamList>();

function BookmarksTab() {
  return (
    <Navigator screenOptions={defaultStackScreenOptions}>
      <Screen
        component={Bookmarks}
        name={ScreenName.Bookmarks}
        options={{ headerTitle: 'Bookmarks' }}
      />

      <Screen
        component={SentenceDetails}
        name={ScreenName.SentenceDetails}
      />
    </Navigator>
  );
}

export default BookmarksTab;
