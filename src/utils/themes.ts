import { ThemeName } from '@themes/types';

export const getNextTheme = (currentTheme: ThemeName) => {
  if (currentTheme === 'system') return 'light';
  if (currentTheme === 'light') return 'dark';
  if (currentTheme === 'dark') return 'system';
  return 'light';
};
