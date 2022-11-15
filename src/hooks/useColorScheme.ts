import { useCallback, useEffect, useState } from 'react';
import { useColorScheme as useDeviceColorScheme } from 'react-native';

import useAppSelector from './useAppSelector';

function useColorScheme(): 'light' | 'dark' {
  const deviceColorScheme = useDeviceColorScheme();
  const { theme } = useAppSelector((state) => state.settings);

  const getUserScheme = useCallback(() => (
    theme === 'system' ? deviceColorScheme || 'light' : theme
  ), [deviceColorScheme, theme]);

  const [scheme, setScheme] = useState(getUserScheme());

  useEffect(() => {
    setScheme(getUserScheme());
  }, [getUserScheme]);

  return scheme;
}

export default useColorScheme;
