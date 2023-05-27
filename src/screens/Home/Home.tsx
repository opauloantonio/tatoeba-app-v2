import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {
  Text,
  Button,
  Searchbar,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import useTheme from '@hooks/useTheme';
import useToggle from '@hooks/useToggle';
import useHeaderTitle from '@hooks/useHeaderTitle';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';

import RealmContext from '@database/index';
import { History } from '@database/models/History';

import {
  resetSearchParams,
  setCurrentSearchParams,
  clearAdvancedSearchParams,
} from '@slices/search';

import { getSearchURL } from '@utils/search';
import { ScreenName } from '@routes/constants';
import { getLanguageName } from '@utils/languages';
import { SearchParameters } from '@interfaces/search';
import { HomeNavigationProps } from '@routes/HomeTab/types';
import AdvancedSearchForm from '@components/AdvancedSearchForm';

const { useRealm } = RealmContext;

function Home() {
  useHeaderTitle('Tatoeba');

  const theme = useTheme();
  const realm = useRealm();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<HomeNavigationProps>();

  const [showAdvancedSearch, toggleShowAdvancedSearch] = useToggle(false);

  const { currentSearchParams } = useAppSelector((state) => state.search);

  const handleUpdateSearch = (params: Partial<SearchParameters>) => {
    dispatch(setCurrentSearchParams(params));
  };

  const handleSubmitSearch = () => {
    const searchParams: SearchParameters = {
      ...currentSearchParams,
      query: currentSearchParams.query.trim(),
      page: 1,
    };

    dispatch(setCurrentSearchParams(searchParams));

    realm.write(() => {
      new History(realm, {
        timestamp: new Date(),
        url: getSearchURL(searchParams),
      });
    });

    navigation.navigate(ScreenName.SearchResults, { searchParams });
  };

  const swapLanguages = () => {
    const { to, from } = currentSearchParams;
    dispatch(setCurrentSearchParams({ to: from, from: to }));
  };

  useEffect(() => {
    dispatch(clearAdvancedSearchParams());
  }, [dispatch]);

  const searchUrl = __DEV__ ? (
    <Text style={{ marginTop: 16 }}>
      (Dev only): {getSearchURL(currentSearchParams)}
    </Text>
  ) : null;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Searchbar
          accessibilityLabel="search input"
          value={currentSearchParams.query}
          placeholder="Search for sentences"
          onSubmitEditing={handleSubmitSearch}
          onChangeText={(query) => handleUpdateSearch({ query })}
        />
      </View>

      <View style={styles.languagesRow}>
        <TouchableOpacity
          style={styles.languageChoiceWrapper}
          onPress={() => navigation.navigate(ScreenName.ChooseLanguage, { target: 'from' })}
        >
          <Text
            testID="fromLang"
            style={{ ...styles.languageChoice, color: theme.colors.primary }}
          >
            {getLanguageName(currentSearchParams.from)}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={swapLanguages} testID="switchLangs">
          <Text style={styles.swapLanguagesIcon}>
            <Icon
              size={25}
              name="swap-horizontal"
              color={theme.colors.primary}
            />
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.languageChoiceWrapper}
          onPress={() => navigation.navigate(ScreenName.ChooseLanguage, { target: 'to' })}
        >
          <Text
            testID="toLang"
            style={{
              ...styles.languageChoice,
              color: theme.colors.primary,
              textAlign: 'right',
            }}>
            {getLanguageName(currentSearchParams.to)}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Button mode="contained" onPress={handleSubmitSearch}>
          <Text style={styles.searchButtonText}>SEARCH</Text>
        </Button>
      </View>

      <View>
        <Button
          mode="text"
          onPress={toggleShowAdvancedSearch}
          icon={showAdvancedSearch ? 'chevron-up' : 'chevron-down'}
        >
          {!showAdvancedSearch ? 'SHOW' : 'HIDE'} ADVANCED SEARCH OPTIONS
        </Button>
      </View>

      {showAdvancedSearch && (
        <>
          <AdvancedSearchForm />

          {searchUrl}

          <View style={{ marginVertical: 16 }}>
            <Button mode="contained" onPress={() => dispatch(resetSearchParams())}>
              <Text style={styles.searchButtonText}>RESET SEARCH OPTIONS</Text>
            </Button>
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  content: {
    marginVertical: 16,
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  languagesRow: {
    flexDirection: 'row',
    marginVertical: 16,
    alignItems: 'center',
  },
  languageChoice: {
    fontSize: 20,
  },
  languageChoiceWrapper: {
    flex: 1,
  },
  swapLanguagesIcon: {
    paddingHorizontal: 20,
  },
});

export default Home;
