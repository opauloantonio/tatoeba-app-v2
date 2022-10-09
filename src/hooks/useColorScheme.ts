import { useEffect, useState } from 'react';

import { AppState, Appearance } from 'react-native';

import { store } from '../store';

function useColorScheme(): 'light' | 'dark' {
  const [userSetting] = useState(store.getState().settings.theme);

  const [scheme, setScheme] = useState(
    userSetting === 'system' ? Appearance.getColorScheme() || 'light' : userSetting,
  );

  const setThemeFromSettings = () => {
    const systemTheme = Appearance.getColorScheme();
    const settingsTheme = store.getState().settings.theme;

    if (settingsTheme === 'system') {
      if (!systemTheme) {
        setScheme('light');
      } else {
        setScheme(systemTheme);
      }
    } else {
      setScheme(settingsTheme);
    }
  };

  useEffect(() => {
    const systemThemeSubscription = AppState.addEventListener('change', () => {
      setThemeFromSettings();
    });

    const unsubscribeFromStore = store.subscribe(setThemeFromSettings);

    return () => {
      systemThemeSubscription.remove();
      unsubscribeFromStore();
    };
  }, []);

  return scheme;
}

export default useColorScheme;
