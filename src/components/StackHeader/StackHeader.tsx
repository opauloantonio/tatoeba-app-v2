import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackHeaderProps } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import useTheme from '@hooks/useTheme';
import { closest } from '@utils/arrays';
import { isAndroid } from '@utils/platform';

const PADDINGS = [0, 10, 20, 30, 40];

function StackHeader(props: StackHeaderProps) {
  const theme = useTheme();
  const navigation = useNavigation();
  const { top } = useSafeAreaInsets();

  const { headerTitle } = props.options;

  const canGoBack = props.navigation.canGoBack()
    && headerTitle !== 'Tatoeba'
    && headerTitle !== 'Bookmarks'
    && headerTitle !== 'History'
    && headerTitle !== 'About';

  const handleGoBack = () => {
    navigation.goBack();
  };

  const paddingTop = closest(top, PADDINGS) + (isAndroid ? 10 : 6) + 6;

  return (
    <View
      style={{
        paddingTop,
        paddingBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        backgroundColor: theme.colors.primary,
      }}
    >
      {canGoBack && (
        <TouchableOpacity onPress={handleGoBack} style={{ paddingRight: 5 }}>
          <Icon color="white" name="chevron-left" size={30} />
        </TouchableOpacity>
      )}

      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>
        {headerTitle as string}
      </Text>
    </View>
  );
}

export default StackHeader;
