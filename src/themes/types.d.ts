import { Theme as NavigationTheme } from '@react-navigation/native';
import { MD3Colors, MD3Theme } from 'react-native-paper/lib/typescript/types';

export type AppColors = MD3Colors &
  Pick<NavigationTheme, 'colors'> & {
    statusBar: string;
    links: string;
  };

export type Theme = MD3Theme &
  NavigationTheme & {
    name: 'dark' | 'light';
    colors: AppColors;
  };

export type ThemeName = 'light' | 'dark' | 'system';
