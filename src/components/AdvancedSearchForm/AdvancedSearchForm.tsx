import { Stack } from '@mobily/stacks';
import { StyleSheet, View, Pressable } from 'react-native';
import { Card, Text, Checkbox, Divider, TextInput } from 'react-native-paper';

import useAppSelector from '@hooks/useAppSelector';
import useAppDispatch from '@hooks/useAppDispatch';
import SelectDropdown from '@components/SelectDropdown';

import { languages } from '@constants/languages';
import { SearchParameters } from '@interfaces/search';
import { setCurrentSearchParams } from '@slices/search';

import {
  AnyValue,
  SortValue,
  LanguageValue,
  TransLinkValue,
  TransFilterValue,
} from './types';

const sortOptions: SortValue[] = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'words', label: 'Fewest words first' },
  { value: 'created', label: 'Last created first' },
  { value: 'modified', label: 'Last modified first' },
  { value: 'random', label: 'Random' },
];

const anyOptions: AnyValue[] = [
  { value: 'any', label: 'Any' },
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
];

const transFilterOptions: TransFilterValue[] = [
  { label: 'Limit to', value: 'limit' },
  { label: 'Exclude', value: 'exclude' },
];

const languageOptions: LanguageValue[] = [
  { label: 'Any', value: 'und' },
  ...(languages.map((l) => ({ label: l.name, value: l.code }))),
];

const linkOptions: TransLinkValue[] = [
  { label: 'Any', value: 'any' },
  { label: 'Direct', value: 'direct' },
  { label: 'Indirect', value: 'indirect' },
];

function AdvancedSearchForm() {
  const dispatch = useAppDispatch();
  const { currentSearchParams } = useAppSelector((state) => state.search);

  const toggleYesOrNoOption = (option: keyof SearchParameters) => {
    // TODO I wanted to do keyof SearchParams if this key has a typeof YesOrNoOption
    // but I couldn't figure it out after some time so I'll just leave it like this for now...
    const newValue = currentSearchParams[option] === 'yes' ? 'no' : 'yes';
    dispatch(setCurrentSearchParams({ [option]: newValue }));
  };

  const getDefaultAnyOption = (field: keyof SearchParameters): AnyValue => (
    anyOptions.find((option) => option.value === (currentSearchParams[field] || 'any'))!
  );

  const getDefaultSortOption = (): SortValue => (
    sortOptions.find(
      (option) => option.value === (currentSearchParams.sort_relevance || 'relevance'),
    )!
  );

  const getDefaultTransFilterOption = (): TransFilterValue => (
    transFilterOptions.find(
      (option) => option.value === (currentSearchParams.trans_filter || 'limit'),
    )!
  );

  const getDefaultTransToOption = (): LanguageValue => (
    languageOptions.find(
      (option) => option.value === (currentSearchParams.trans_to || 'und'),
    )!
  );

  const getDefaultTransLinkOption = (): TransLinkValue => (
    linkOptions.find(
      (option) => option.value === (currentSearchParams.trans_link || 'any'),
    )!
  );

  return (
    <Card style={styles.advancedContainer}>
      <Stack space={16}>
        <Text variant="labelMedium">Sentences</Text>

        <View style={styles.row}>
          <Text style={styles.rowText}>Is orphan?</Text>

          <SelectDropdown
            data={anyOptions}
            rowTextForSelection={(item) => item.label}
            defaultValue={getDefaultAnyOption('orphans')}
            buttonTextAfterSelection={(item) => item.label}
            onSelect={(item) => dispatch(setCurrentSearchParams({ orphans: item.value }))}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.rowText}>Is unapproved?</Text>

          <SelectDropdown
            data={anyOptions}
            rowTextForSelection={(item) => item.label}
            buttonTextAfterSelection={(item) => item.label}
            defaultValue={getDefaultAnyOption('unapproved')}
            onSelect={(item) => dispatch(setCurrentSearchParams({ unapproved: item.value }))}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.rowText}>Has audio?</Text>

          <SelectDropdown
            data={anyOptions}
            rowTextForSelection={(item) => item.label}
            buttonTextAfterSelection={(item) => item.label}
            defaultValue={getDefaultAnyOption('has_audio')}
            onSelect={(item) => dispatch(setCurrentSearchParams({ has_audio: item.value }))}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.rowText}>Owner:</Text>

          <View style={styles.textInputContainer}>
            <TextInput
              mode="outlined"
              value={currentSearchParams.user}
              onChangeText={(user) => dispatch(setCurrentSearchParams({ user }))}
            />
          </View>
        </View>

        <Pressable style={styles.row} onPress={() => toggleYesOrNoOption('native')}>
          <View style={styles.checkbox}>
            <Checkbox
              onPress={() => toggleYesOrNoOption('native')}
              status={currentSearchParams.native === 'yes' ? 'checked' : 'unchecked'}
            />
          </View>

          <Text>Owned by a self-identified native?</Text>
        </Pressable>

        <Divider />

        <Text variant="labelMedium">Translations</Text>

        <View style={styles.row}>
          <Text style={styles.rowText}>Filter:</Text>

          <SelectDropdown
            data={transFilterOptions}
            rowTextForSelection={(item) => item.label}
            defaultValue={getDefaultTransFilterOption()}
            buttonTextAfterSelection={(item) => item.label}
            onSelect={(item) => dispatch(setCurrentSearchParams({ trans_filter: item.value }))}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.rowText}>Language:</Text>

          <SelectDropdown
            search
            data={languageOptions}
            defaultValue={getDefaultTransToOption()}
            rowTextForSelection={(item) => item.label}
            buttonTextAfterSelection={(item) => item.label}
            onSelect={(item) => dispatch(setCurrentSearchParams({ trans_to: item.value }))}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.rowText}>Link:</Text>

          <SelectDropdown
            data={linkOptions}
            defaultValue={getDefaultTransLinkOption()}
            rowTextForSelection={(item) => item.label}
            buttonTextAfterSelection={(item) => item.label}
            onSelect={(item) => dispatch(setCurrentSearchParams({ trans_link: item.value }))}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.rowText}>Is orphan?</Text>

          <SelectDropdown
            data={anyOptions}
            rowTextForSelection={(item) => item.label}
            defaultValue={getDefaultAnyOption('trans_orphan')}
            buttonTextAfterSelection={(item) => item.label}
            onSelect={(item) => dispatch(setCurrentSearchParams({ trans_orphan: item.value }))}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.rowText}>Is unapproved?</Text>

          <SelectDropdown
            data={anyOptions}
            rowTextForSelection={(item) => item.label}
            buttonTextAfterSelection={(item) => item.label}
            defaultValue={getDefaultAnyOption('trans_unapproved')}
            onSelect={(item) => dispatch(setCurrentSearchParams({ trans_unapproved: item.value }))}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.rowText}>Has audio?</Text>

          <SelectDropdown
            data={anyOptions}
            rowTextForSelection={(item) => item.label}
            buttonTextAfterSelection={(item) => item.label}
            defaultValue={getDefaultAnyOption('trans_has_audio')}
            onSelect={(item) => dispatch(setCurrentSearchParams({ trans_has_audio: item.value }))}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.rowText}>Owner:</Text>

          <View style={styles.textInputContainer}>
            <TextInput
              mode="outlined"
              value={currentSearchParams.user}
              onChangeText={(trans_user) => dispatch(setCurrentSearchParams({ trans_user }))}
            />
          </View>
        </View>

        <Divider />

        <Text variant="labelMedium">Sort</Text>

        <View style={styles.row}>
          <Text style={styles.rowText}>Order by:</Text>

          <SelectDropdown
            data={sortOptions}
            defaultValue={getDefaultSortOption()}
            rowTextForSelection={(item) => item.label}
            buttonTextAfterSelection={(item) => item.label}
            onSelect={(item) => dispatch(setCurrentSearchParams({ sort_relevance: item.value }))}
          />
        </View>

        <Pressable style={styles.row} onPress={() => toggleYesOrNoOption('sort_reverse')}>
          <View style={styles.checkbox}>
            <Checkbox
              onPress={() => toggleYesOrNoOption('sort_reverse')}
              status={currentSearchParams.sort_reverse === 'yes' ? 'checked' : 'unchecked'}
            />
          </View>

          <Text>Reverse order?</Text>
        </Pressable>
      </Stack>
    </Card>
  );
}

const styles = StyleSheet.create({
  advancedContainer: {
    padding: 16,
    marginTop: 16,
  },
  checkbox: {
    marginRight: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowText: {
    flex: 1,
  },
  textInputContainer: {
    flex: 1,
  },
});

export default AdvancedSearchForm;
