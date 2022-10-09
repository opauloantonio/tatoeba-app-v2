import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import useTheme from '@hooks/useTheme';
import { changeTheme } from '@slices/settings';

import { StyleSheet, ScrollView, Linking } from 'react-native';
import { Title, Text, Divider, List } from 'react-native-paper';

const ryou = 'https://play.google.com/store/apps/details?id=com.ryouflashcards';
const profile = 'https://github.com/opauloantonio/';

// TODO point to new repo
const repo = 'https://github.com/opauloantonio/tatoebaReactNative';
const scraper = 'https://github.com/opauloantonio/tatoeba-scraper';

function About() {
  const { colors } = useTheme();
  const { primary, links } = colors;

  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.settings);
  const handleTheme = () => dispatch(changeTheme());

  const titleStyle = { ...styles.title, color: primary };
  const linkStyle = { color: links };

  return (
    <ScrollView style={styles.container}>
      <Title style={titleStyle}>
        Settings
      </Title>

      <List.Item
        title="Theme"
        description={theme}
        onPress={handleTheme}
        left={iconProps => <List.Icon {...iconProps} icon="white-balance-sunny" />}
      />

      <Divider />

      <Title style={titleStyle}>
        About Tatoeba
      </Title>

      <Text style={styles.text}>
        Tatoeba is a large database of sentences and translations. Its content is ever-growing and results from the voluntary contributions of thousands of members.
      </Text>

      <Text style={styles.text}>
        Tatoeba provides a tool for you to see examples of how words are used in the context of a sentence. You specify words that interest you, and it returns sentences containing these words with their translations in the desired languages. The name Tatoeba (for example in Japanese) captures this concept.
      </Text>

      <Text style={styles.text}>
        The project was founded by Trang Ho in 2006, hosted on Sourceforge under the codename of multilangdict.
      </Text>

      <Title style={titleStyle}>
        About This App
      </Title>

      <Text style={styles.text}>
        This is an unofficial app made by
        {''} <Text style={linkStyle} onPress={() => Linking.openURL(profile)}>Paulo Antonio</Text>
        .
      </Text>

      <Text style={styles.text}>
        The app is very simple because I made it mostly for learning more about React Native but also as a way to easily look up sentences on Tatoeba on my phone.
      </Text>

      <Text style={styles.text}>
        At the moment I started working on it, the website was not responsive so I had to keep zooming in and out in order to use it on a mobile device.
      </Text>

      <Text style={styles.text}>
        Tatoeba also didn't provide an API so I built a simple web scraper to get the data I needed on the fly. That's why the more complex features are not in the app.
      </Text>

      <Text style={styles.text}>The project is open-source and its code can be found at </Text>

      <Text onPress={() => Linking.openURL(repo)} style={linkStyle}>
        {repo}
      </Text>

      <Text style={styles.text}>
        The code for the web scraper can also be found at
      </Text>

      <Text onPress={() => Linking.openURL(scraper)} style={linkStyle}>
        {scraper}
      </Text>

      <Text style={styles.text}>
        Any contributions or suggestions for any of these projects are welcome!
      </Text>

      <Divider />

      <Text style={styles.text}>
        One more thing, if you're learning Japanese, check out my other app
        {''} <Text onPress={() => Linking.openURL(ryou)} style={linkStyle}>Ryou Flashcards</Text> which
        has many features such as extensive search for kanji, vocabulary and radicals, SRS, practice, TTS and also example sentences from Tatoeba!
      </Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  title: {
    marginTop: 16,
  },
  text: {
    marginVertical: 10,
  },
});

export default About;
