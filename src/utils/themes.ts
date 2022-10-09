import { Appearance } from 'react-native';
import { ThemeName } from '@themes/types';
import { store } from '../store';
import themes from 'themes';

export const getCurrentTheme = () => {
  const systemColorScheme = Appearance.getColorScheme();
  const userSettingsTheme = store.getState().settings.theme;

  return userSettingsTheme === 'system'
    ? themes[systemColorScheme || 'light']
    : themes[userSettingsTheme];
};

export const getNextTheme = (currentTheme: ThemeName) => {
  if (currentTheme === 'system') return 'light';
  if (currentTheme === 'light') return 'dark';
  if (currentTheme === 'dark') return 'system';
  return 'light';
};
