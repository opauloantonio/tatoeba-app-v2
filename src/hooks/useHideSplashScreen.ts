import { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';

function useHideSplashScreen() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
}

export default useHideSplashScreen;
