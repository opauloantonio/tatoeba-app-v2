import React from 'react';
import { StatusBarProps, StatusBar as RNStatusBar } from 'react-native';

import useTheme from '@hooks/useTheme';
import { isIOS } from '@utils/platform';

function StatusBar(props: StatusBarProps) {
  const theme = useTheme();

  return (
    <RNStatusBar
      barStyle={`${isIOS ? 'dark' : 'light'}-content`}
      backgroundColor={theme.colors.statusBar}
      {...props}
    />
  );
}

export default StatusBar;
