import { useCallback, useMemo } from 'react';

import {
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RNSelectDropdown, { SelectDropdownProps } from 'react-native-select-dropdown';

import useTheme from '@hooks/useTheme';

function SelectDropdown(props: SelectDropdownProps) {
  const { colors } = useTheme();

  const containerStyle: StyleProp<ViewStyle> = useMemo(() => ({
    borderRadius: 8,
    backgroundColor: colors.background,
  }), [colors.background]);

  const textStyle: StyleProp<TextStyle> = useMemo(() => ({
    color: colors.text,
  }), [colors.text]);

  const dropDownIcon = useCallback(() => (
    <Icon name="chevron-down" size={20} color={colors.text} />
  ), [colors.text]);

  return (
    <RNSelectDropdown
      rowTextStyle={textStyle}
      buttonTextStyle={textStyle}
      buttonStyle={containerStyle}
      dropdownStyle={containerStyle}
      renderDropdownIcon={dropDownIcon}
      {...props}
    />
  );
}

export default SelectDropdown;
