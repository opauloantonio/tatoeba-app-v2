import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import useTheme from '@hooks/useTheme';

import Home from '@screens/Home';
import About from '@screens/About';
import History from '@screens/History';
import Bookmarks from '@screens/Bookmarks';
import { getCurrentTheme } from '@utils/themes';

const HomeStack = createStackNavigator();
const AboutStack = createStackNavigator();
const BookmarksStack = createStackNavigator();
const HistoryStack = createStackNavigator();

const appTheme = getCurrentTheme();

const defaultStackScreenOptions = {
  headerStyle: { backgroundColor: appTheme.colors.primary },
  headerTintColor: 'white',
  headerStatusBarHeight: 0,
};

function HomeTab() {
  return (
    <HomeStack.Navigator screenOptions={defaultStackScreenOptions}>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: 'Tatoeba',
        }}
      />

      {/**
      <HomeStack.Screen
        name="SearchResults"
        component={SearchResults}
        options={({ route }) => ({
          title: `Results for "${route.params.text}"`,
        })}
      />

      <HomeStack.Screen
        name="SentenceDetails"
        component={SentenceDetails}
        options={({ route }) => ({
          title: `Sentence #${route.params.id}`,
        })}
      />

      <HomeStack.Screen
        name="ChooseLanguage"
        component={ChooseLanguage}
        options={{
          headerTitle: 'Language Selection',
        }}
      />
       */}
    </HomeStack.Navigator>
  );
}

function AboutTab() {
  return (
    <AboutStack.Navigator screenOptions={defaultStackScreenOptions}>
      <AboutStack.Screen name="About" component={About} />
    </AboutStack.Navigator>
  );
}

function HistoryTab() {
  return (
    <HistoryStack.Navigator screenOptions={defaultStackScreenOptions}>
      <AboutStack.Screen name="History" component={History} />
    </HistoryStack.Navigator>
  );
}

function BookmarksTab() {
  return (
    <BookmarksStack.Navigator screenOptions={defaultStackScreenOptions}>
      <AboutStack.Screen name="Bookmarks" component={Bookmarks} />
    </BookmarksStack.Navigator>
  );
}

const { Navigator, Screen } = createMaterialBottomTabNavigator();

function BottomTabs() {
  const theme = useTheme();

  return (
    <Navigator activeColor={theme.colors.primary}>
      <Screen
        name="HomeTab"
        component={HomeTab}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <Icon size={25} color={color} name="home" />,
        }}
      />

      <Screen
        name="BookmarksTab"
        component={BookmarksTab}
        options={{
          tabBarLabel: 'Bookmarks',
          tabBarIcon: ({ color }) => <Icon size={25} color={color} name="bookmark" />,
        }}
      />

      <Screen
        name="HistoryTab"
        component={HistoryTab}
        options={{
          tabBarLabel: 'History',
          tabBarIcon: ({ color }) => <Icon size={25} color={color} name="history" />,
        }}
      />

      <Screen
        name="AboutTab"
        component={AboutTab}
        options={{
          tabBarLabel: 'About',
          tabBarIcon: ({ color }) => <Icon size={25} color={color} name="information" />,
        }}
      />
    </Navigator>
  );
}

export default BottomTabs;
