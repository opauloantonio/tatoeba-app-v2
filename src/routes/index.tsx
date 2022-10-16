import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import useTheme from '@hooks/useTheme';
import useHideSplashScreen from '@hooks/useHideSplashScreen';

import HomeTab from './HomeTab';
import AboutTab from './AboutTab';
import HistoryTab from './HistoryTab';
import BookmarksTab from './BookmarksTab';

import { ScreenName, BottomTabLabel } from './constants';

const { Navigator, Screen } = createMaterialBottomTabNavigator();

function BottomTabs() {
  useHideSplashScreen();
  const theme = useTheme();

  return (
    <Navigator activeColor={theme.colors.primary}>
      <Screen
        name={ScreenName.HomeTab}
        component={HomeTab}
        options={{
          tabBarLabel: BottomTabLabel.Home,
          tabBarIcon: ({ color }) => <Icon size={25} color={color} name="home" />,
        }}
      />

      <Screen
        name={ScreenName.BookmarksTab}
        component={BookmarksTab}
        options={{
          tabBarLabel: BottomTabLabel.Bookmarks,
          tabBarIcon: ({ color }) => <Icon size={25} color={color} name="bookmark" />,
        }}
      />

      <Screen
        name={ScreenName.HistoryTab}
        component={HistoryTab}
        options={{
          tabBarLabel: BottomTabLabel.History,
          tabBarIcon: ({ color }) => <Icon size={25} color={color} name="history" />,
        }}
      />

      <Screen
        name={ScreenName.AboutTab}
        component={AboutTab}
        options={{
          tabBarLabel: BottomTabLabel.About,
          tabBarIcon: ({ color }) => <Icon size={25} color={color} name="information" />,
        }}
      />
    </Navigator>
  );
}

export default BottomTabs;
