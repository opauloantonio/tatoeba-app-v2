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
import useHeaderTitle from '@hooks/useHeaderTitle';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { SearchParameters } from '@interfaces/search';

import {
  submitSearchParams,
  setCurrentSearchParams,
} from '@slices/search';

import { getLanguageName } from '@utils/languages';

import { ScreenName } from '@routes/constants';
import { HomeNavigationProps } from '@routes/HomeTab/types';

function Home() {
  useHeaderTitle('Tatoeba');

  const theme = useTheme();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<HomeNavigationProps>();

  const { currentSearchParams } = useAppSelector((state) => state.search);

  const handleUpdateSearch = (params: Partial<SearchParameters>) => {
    dispatch(setCurrentSearchParams(params));
  };

  const handleSubmitSearch = () => {
    dispatch(setCurrentSearchParams({ ...currentSearchParams, page: 1 }));
    dispatch(submitSearchParams());
    navigation.navigate(ScreenName.SearchResults);
  };

  const swapLanguages = () => {
    const { to, from } = currentSearchParams;
    dispatch(setCurrentSearchParams({ to: from, from: to }));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Searchbar
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
          <Text style={{ ...styles.languageChoice, color: theme.colors.primary }}>
            {getLanguageName(currentSearchParams.from)}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={swapLanguages}>
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
