import { View, StyleSheet, Alert } from 'react-native';
import { Text, Button } from 'react-native-paper';

import RealmContext from '@database/index';
import { Bookmark as BookmarkModel } from '@database/models/Bookmark';
import { Sentence } from '@interfaces/api';
import SentenceList from '@components/SentenceList';

const { useQuery, useRealm } = RealmContext;

function Bookmarks() {
  const realm = useRealm();
  const bookmarks = useQuery(BookmarkModel).sorted('timestamp', true);
  const sentences: Sentence[] = bookmarks.map((b) => JSON.parse(b.data));

  const clearBookmarks = () => {
    Alert.alert(
      'Clear bookmarks?',
      'This will erase all your bookmarks, this action cannot be undone!',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          style: 'destructive',
          onPress: () => {
            realm.write(() => {
              realm.delete(bookmarks);
            });
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      {bookmarks.isEmpty() && (
        <View style={styles.emptyBookmarks}>
          <Text>Your bookmarks will appear here</Text>
        </View>
      )}

      {!bookmarks.isEmpty() && (
        <>
          <View style={styles.listContainer}>
            <SentenceList showTranslations={false} sentences={sentences} />
          </View>

          <View style={styles.buttonContainer}>
            <Button onPress={clearBookmarks} mode="contained">
              <Text style={styles.buttonText}>CLEAR BOOKMARKS</Text>
            </Button>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  listContainer: {
    flex: 1,
  },
  emptyBookmarks: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Bookmarks;
