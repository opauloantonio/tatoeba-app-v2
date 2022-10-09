import { useTheme as usePaperTheme } from 'react-native-paper';
import { Theme } from '../themes';

function useTheme() {
  const theme: Theme = usePaperTheme();
  return theme;
}

export default useTheme;
