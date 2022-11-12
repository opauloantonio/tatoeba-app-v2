import { useEffect, useState } from 'react';
import { AppState } from 'react-native';

type UseAppStateProps = {
  /**
   * Optional callback that is called when the app comes into foreground.
   */
  onEnterForeground?: () => void,
  /**
   * Optional callback that is called when the app goes into background.
   */
  onEnterBackground?: () => void,
};

/**
 * This hook detects when the app goes into background and when it returns to the foreground.
 */
function useAppStateChange({ onEnterForeground, onEnterBackground }: UseAppStateProps) {
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      const wasForeground = appState === 'active';
      const wasBackground = appState === 'background';
      const willEnterForeground = nextAppState === 'active';
      const willEnterBackground = nextAppState === 'background';

      if (wasBackground && willEnterForeground && !!onEnterForeground) {
        onEnterForeground();
      }

      if (wasForeground && willEnterBackground && !!onEnterBackground) {
        onEnterBackground();
      }

      if (willEnterBackground || willEnterForeground) {
        setAppState(nextAppState);
      }
    });

    return () => {
      subscription.remove();
    };
  }, [onEnterForeground, onEnterBackground, appState]);
}

export default useAppStateChange;
