import { useCallback, useEffect, useState } from 'react';
import { useColorScheme as useDeviceColorScheme } from 'react-native';

import useAppSelector from './useAppSelector';
import useAppStateChange from './useAppStateChange';

function useColorScheme(): 'light' | 'dark' {
  const deviceColorScheme = useDeviceColorScheme();
  const { theme } = useAppSelector((state) => state.settings);

  const [scheme, setScheme] = useState(
    theme === 'system' ? deviceColorScheme || 'light' : theme
  );

  const updateColorScheme = useCallback(() => {
    setScheme(theme === 'system' ? deviceColorScheme || 'light' : theme);
  }, [theme, deviceColorScheme]);

  useEffect(() => {
    updateColorScheme();
  }, [updateColorScheme]);

  useAppStateChange({
    onEnterForeground() {
      updateColorScheme();
    },
  });

  return scheme;
}

export default useColorScheme;
