import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';

import {
  MD3LightTheme as PaperLightTheme,
  MD3DarkTheme as PaperDarkTheme,
} from 'react-native-paper';

import { Theme } from './types';

const colors = {
  statusBar: '#2d692f',
  primary: '#4caf50',
  accent: '#4caf50',
  links: '#4fbcff',
};

export const dark: Theme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  // @ts-ignore
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
    ...colors,
  },
  name: 'dark',
};

export const light: Theme = {
  ...PaperLightTheme,
  ...NavigationDefaultTheme,
  // @ts-ignore
  colors: {
    ...PaperLightTheme.colors,
    ...NavigationDefaultTheme.colors,
    ...colors,
  },
  name: 'light',
};

const themes = { light, dark };

export default themes;

export type { Theme };
