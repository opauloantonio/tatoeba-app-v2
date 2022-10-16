import { createStackNavigator } from '@react-navigation/stack';
import { defaultStackScreenOptions } from '@routes/constants';
import About from '@screens/About';

const { Navigator, Screen } = createStackNavigator();

function AboutTab() {
  return (
    <Navigator screenOptions={defaultStackScreenOptions}>
      <Screen
        name="About"
        component={About}
        options={{ headerTitle: 'About' }}
      />
    </Navigator>
  );
}

export default AboutTab;
