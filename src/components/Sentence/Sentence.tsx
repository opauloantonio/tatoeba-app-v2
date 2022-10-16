import urlcat from 'urlcat';
import { isEmpty } from 'lodash';
import { useState } from 'react';
import Share from 'react-native-share';
import { useNavigation } from '@react-navigation/native';

import {
  Text,
  Menu,
  ActivityIndicator,
} from 'react-native-paper';

import {
  Image,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import useSound from '@hooks/useSound';
import { ScreenName } from '@routes/constants';
import { languages } from '@constants/languages';
import { HomeNavigationProps } from '@routes/HomeTab/types';

import {
  BASE_TATOEBA_AUDIO_URL,
  BASE_TATOEBA_SENTENCE_URL,
} from '@constants/endpoints';

import { SentenceProps } from './types';

function Sentence({ sentence, showDetailsOnPress }: SentenceProps) {
  const navigation = useNavigation<HomeNavigationProps>();

  const shareTitle = `Tatoeba sentence #${sentence.id}`;

  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const openMenu = () => setIsMenuVisible(true);
  const closeMenu = () => setIsMenuVisible(false);

  const copyLink = () => {
    Share.open({
      title: `Tatoeba sentence #${sentence.id}`,
      message: `${urlcat(`${BASE_TATOEBA_SENTENCE_URL}:id`, { id: sentence.id })}`,
    });

    closeMenu();
  };

  const copySentence = () => {
    Share.open({
      title: shareTitle,
      message: sentence.text,
    });

    closeMenu();
  };

  const getFlag = () => {
    try {
      return languages.find((l) => l.code === sentence.lang)!.icon;
    } catch {
      return languages.find((l) => l.code === 'unknown')!.icon;
    }
  };

  const showLanguageName = () => {
    const language = languages.find((l) => l.code === sentence.lang);
    ToastAndroid.show(language?.name || 'Unknown', 500);
  };

  const handleOnPress = () => {
    if (showDetailsOnPress) {
      navigation.navigate(ScreenName.SentenceDetails, { sentenceId: sentence.id });
    }
  };

  const menuAnchor = (
    <TouchableOpacity onPress={openMenu}>
      <Icon size={20} name="information" />
    </TouchableOpacity>
  );

  const hasAudio = !isEmpty(sentence.audios);

  const audioURL = !hasAudio
    ? undefined
    : urlcat(`${BASE_TATOEBA_AUDIO_URL}:id`, { id: sentence.audios[0].id });

  const { play, isLoading } = useSound({ path: audioURL });

  return (
    <TouchableOpacity style={styles.sentence} onPress={handleOnPress}>
      <TouchableOpacity onPress={showLanguageName}>
        <Image source={getFlag()} style={styles.flags} />
      </TouchableOpacity>

      <Text style={styles.text} selectable>{sentence.text}</Text>

      {hasAudio && (
        <TouchableOpacity onPress={play} style={styles.audioIcon}>
          {!isLoading && <Icon size={22} name="volume-high" />}

          {isLoading && <ActivityIndicator animating />}
        </TouchableOpacity>
      )}

      <Menu
        anchor={menuAnchor}
        onDismiss={closeMenu}
        visible={isMenuVisible}
      >
        <Menu.Item
          leadingIcon="link-variant"
          onPress={copyLink}
          title="Get link"
        />

        <Menu.Item
          title="Copy text"
          onPress={copySentence}
          leadingIcon="content-copy"
        />
      </Menu>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  sentence: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    flex: 1,
  },
  audioIcon: {
    marginHorizontal: 5,
  },
  flags: {
    width: 30,
    height: 20,
    marginRight: 16,
  },
});

export default Sentence;
