import React from 'react';
import { StatusBarProps, StatusBar as RNStatusBar } from 'react-native';

import useTheme from '@hooks/useTheme';

function StatusBar(props: StatusBarProps) {
  const theme = useTheme();

  return (
    <RNStatusBar
      backgroundColor={theme.colors.statusBar}
      barStyle="light-content"
      {...props}
    />
  );
}

export default StatusBar;
