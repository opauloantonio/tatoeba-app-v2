import { ReactNode } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import useColorScheme from '@hooks/useColorScheme';
import themes from '../../themes';

type ThemeProviderProps = {
  children: ReactNode;
};

function ThemeProvider({ children }: ThemeProviderProps) {
  const colorScheme = useColorScheme();
  const theme = themes[colorScheme];

  return (
    <PaperProvider theme={theme}>
      {children}
    </PaperProvider>
  );
}

export default ThemeProvider;
