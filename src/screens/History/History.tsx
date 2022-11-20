import {
  View,
  Image,
  Alert,
  FlatList,
  StyleSheet,
  ListRenderItem,
  TouchableOpacity,
} from 'react-native';

import { Button, Card, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import useTheme from '@hooks/useTheme';
import useAppDispatch from '@hooks/useAppDispatch';

import RealmContext from '@database/index';
import { History as HistoryModel } from '@database/models/History';

import { SearchParameters } from '@interfaces/search';
import { getSearchParamsFromURL } from '@utils/search';

import { ScreenName } from '@routes/constants';
import { HomeNavigationProps } from '@routes/HomeTab/types';
import { LanguageCode, languages } from '@constants/languages';

import { setCurrentSearchParams } from '@slices/search';

const { useRealm, useQuery } = RealmContext;

function History() {
  const theme = useTheme();
  const realm = useRealm();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<HomeNavigationProps>();

  const searchHistory = useQuery(HistoryModel).sorted('timestamp', true);

  const clearHistory = () => {
    Alert.alert(
      'Clear history?',
      'This will erase all your search history, this action cannot be undone!',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          style: 'destructive',
          onPress: () => {
            realm.write(() => {
              realm.delete(searchHistory);
            });
          },
        },
      ],
    );
  };

  const getFlag = (code: LanguageCode) => {
    const language = languages.find((l) => l.code === code);

    return language
      ? <Image source={language.icon} style={styles.entryFlag} />
      : <Icon name="earth" size={25} color={theme.colors.text} />;
  };

  const deleteEntry = (entry: HistoryModel) => {
    realm.write(() => {
      realm.delete(entry);
    });
  };

  const navigateToSearch = (params: SearchParameters) => {
    dispatch(setCurrentSearchParams(params));
    navigation.navigate(ScreenName.SearchResults);
  };

  const renderItem: ListRenderItem<HistoryModel> = ({ item }) => {
    const params = getSearchParamsFromURL(item.url);
    const { query, from, to } = params;

    return (
      <TouchableOpacity onPress={() => navigateToSearch(params)}>
        <Card style={styles.historyEntry}>
          <View style={styles.entryLanguages}>
            {getFlag(from)}

            <Icon
              size={25}
              name="arrow-right"
              color={theme.colors.primary}
              style={styles.entryLanguagesArrow}
            />

            {getFlag(to)}

            <View style={styles.entryLanguagesOptionsContainer}>
              <TouchableOpacity onPress={() => deleteEntry(item)}>
                <Icon
                  size={25}
                  name="trash-can"
                  color={theme.colors.primary}
                />
              </TouchableOpacity>
            </View>
          </View>

          <Text>{query}</Text>
        </Card>
      </TouchableOpacity>
    );
  };

  const keyExtractor = (item: HistoryModel) => item._id.toHexString();

  return (
    <View style={styles.container}>
      {searchHistory.isEmpty() && (
        <View style={styles.emptyHistory}>
          <Text>Your search history will appear here</Text>
        </View>
      )}

      {!searchHistory.isEmpty() && (
        <>
          <View style={styles.listContainer}>
            <FlatList
              data={searchHistory}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
            />
          </View>

          <Button onPress={clearHistory} mode="contained">
            <Text style={styles.buttonText}>CLEAR HISTORY</Text>
          </Button>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
  emptyHistory: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    flex: 1,
  },
  historyEntry: {
    marginBottom: 16,
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  entryLanguages: {
    marginBottom: 8,
    alignItems: 'center',
    flexDirection: 'row',
  },
  entryLanguagesArrow: {
    marginHorizontal: 8,
  },
  entryFlag: {
    width: 30,
    height: 20,
  },
  entryLanguagesOptionsContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default History;
