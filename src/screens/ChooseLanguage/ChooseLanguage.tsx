import { useMemo, useState } from 'react';

import {
  Image,
  View,
  FlatList,
  StyleSheet,
  ListRenderItem,
  TouchableOpacity,
} from 'react-native';

import { Searchbar, Text, Divider } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  Language,
  languages,
  LanguageCode,
} from '@constants/languages';

import useDebounce from '@hooks/useDebounce';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import useHeaderTitle from '@hooks/useHeaderTitle';

import {
  toggleFavoriteLanguage,
  setCurrentSearchParams,
} from '@slices/search';

import { HomeNavigationProps } from '@routes/HomeTab/types';
import { ChooseLanguageRouteProps } from './types';

function ChooseLanguage() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);

  const dispatch = useAppDispatch();
  const route = useRoute<ChooseLanguageRouteProps>();
  const navigation = useNavigation<HomeNavigationProps>();
  const { favoriteLanguages } = useAppSelector((state) => state.search);

  const { target } = route.params;

  useHeaderTitle(`Translate ${target}`);

  const handleSearch = (text: string) => setSearch(text);

  const toggleFavorite = (code: LanguageCode) => {
    dispatch(toggleFavoriteLanguage(code));
  };

  const handleOnSelectLanguage = (code: LanguageCode) => {
    dispatch(setCurrentSearchParams({ [target]: code }));
    navigation.goBack();
  };

  const renderLanguage: ListRenderItem<Language> = ({ item }) => (
    <TouchableOpacity
      style={styles.language}
      onPress={() => handleOnSelectLanguage(item.code)}
    >
      <Image source={item.icon} style={styles.flag} />

      <Text style={styles.languageName}>{item.name}</Text>

      <TouchableOpacity onPress={() => toggleFavorite(item.code)}>
        <Icon
          size={22}
          name="heart"
          style={{ paddingRight: 10 }}
          color={favoriteLanguages.includes(item.code) ? 'red' : 'grey'}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const languageList = useMemo(() => {
    // if we have favorites, we display them above the others
    const favorites = languages.filter((l) => favoriteLanguages.includes(l.code));
    const others = languages.filter((l) => !favoriteLanguages.includes(l.code));

    return [...favorites, ...others]
      .filter((l) => l.code !== 'unknown')
      .filter((l) => (
        debouncedSearch.length === 0
          ? l
          : l.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      ));
  }, [favoriteLanguages, debouncedSearch]);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search for a language"
          onChangeText={handleSearch}
          value={search}
        />
      </View>

      <Divider style={styles.divider} />

      <View>
        <TouchableOpacity
          style={{ ...styles.language, marginBottom: 10 }}
          onPress={() => handleOnSelectLanguage('und')}
        >
          <Icon name="earth" size={30} color="#757575" />

          <Text style={styles.languageName}>Any Language</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={languageList}
        renderItem={renderLanguage}
        keyExtractor={(item) => item.code}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    flex: 1,
  },
  searchContainer: {
    marginTop: 16,
  },
  divider: {
    marginTop: 10,
  },
  language: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  languageName: {
    marginLeft: 20,
    flex: 1,
  },
  flag: {
    width: 30,
    height: 20,
  },
});

export default ChooseLanguage;
