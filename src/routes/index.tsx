import { useCallback } from 'react';

import {
  createMaterialBottomTabNavigator,
} from '@react-navigation/material-bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import useTheme from '@hooks/useTheme';
import useHideSplashScreen from '@hooks/useHideSplashScreen';

import HomeTab from './HomeTab';
import AboutTab from './AboutTab';
import HistoryTab from './HistoryTab';
import BookmarksTab from './BookmarksTab';

import { ScreenName, BottomTabLabel } from './constants';
import { BottomTabIconProps } from './types';

const { Navigator, Screen } = createMaterialBottomTabNavigator();

function BottomTabs() {
  useHideSplashScreen();
  const theme = useTheme();

  const HomeIcon = useCallback(({ color }: BottomTabIconProps) => (
    <Icon size={25} color={color} name="home" testID="home-tab" />
  ), []);

  const BookmarksIcon = useCallback(({ color }: BottomTabIconProps) => (
    <Icon size={25} color={color} name="bookmark" testID="bookmarks-tab" />
  ), []);

  const HistoryIcon = useCallback(({ color }: BottomTabIconProps) => (
    <Icon size={25} color={color} name="history" testID="history-tab" />
  ), []);

  const AboutIcon = useCallback(({ color }: BottomTabIconProps) => (
    <Icon size={25} color={color} name="information" testID="about-tab" />
  ), []);

  return (
    <Navigator activeColor={theme.colors.primary}>
      <Screen
        name={ScreenName.HomeTab}
        component={HomeTab}
        options={{
          tabBarLabel: BottomTabLabel.Home,
          tabBarIcon: HomeIcon,
        }}
      />

      <Screen
        name={ScreenName.BookmarksTab}
        component={BookmarksTab}
        options={{
          tabBarLabel: BottomTabLabel.Bookmarks,
          tabBarIcon: BookmarksIcon,
        }}
      />

      <Screen
        name={ScreenName.HistoryTab}
        component={HistoryTab}
        options={{
          tabBarLabel: BottomTabLabel.History,
          tabBarIcon: HistoryIcon,
        }}
      />

      <Screen
        name={ScreenName.AboutTab}
        component={AboutTab}
        options={{
          tabBarLabel: BottomTabLabel.About,
          tabBarIcon: AboutIcon,
        }}
      />
    </Navigator>
  );
}

export default BottomTabs;
