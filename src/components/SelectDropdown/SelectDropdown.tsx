import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RNSelectDropdown, { SelectDropdownProps } from 'react-native-select-dropdown';

const dropDownIcon = () => <Icon name="chevron-down" size={20} />;

function SelectDropdown(props: SelectDropdownProps) {
  return (
    <RNSelectDropdown
      buttonStyle={styles.buttonStyle}
      renderDropdownIcon={dropDownIcon}
      dropdownStyle={styles.dropdownStyle}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius: 8,
  },
  dropdownStyle: {
    borderRadius: 8,
  },
});

export default SelectDropdown;
