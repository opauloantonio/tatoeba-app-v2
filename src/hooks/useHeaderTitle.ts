import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

function useHeaderTitle(headerTitle : string) {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerTitle });
  }, [navigation, headerTitle]);
}

export default useHeaderTitle;
