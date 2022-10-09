import { ReactNode } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import useTheme from '@hooks/useTheme';

type NavigationProviderProps = {
  children: ReactNode;
};

function NavigationProvider({ children }: NavigationProviderProps) {
  const theme = useTheme();

  return (
    <NavigationContainer theme={theme}>
      {children}
    </NavigationContainer>
  );
}

export default NavigationProvider;
