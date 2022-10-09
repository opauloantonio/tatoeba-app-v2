// import { useEffect, useState } from 'react';
import { Stack } from '@mobily/stacks';
import {
  // Button,
  Text,
} from 'react-native-paper';
// import { useGetSentenceByIdQuery } from '@services/tatoebaApi';

import { languages } from '@constants/languages';
import { Image } from 'react-native';

const { name, icon } = languages.find((l) => l.code === 'bal')!;

function Home() {
  /**
  const getId = () => Math.floor(Math.random() * (300000 - 1) + 1);

  const [id, setId] = useState(getId);

  const {
    error,
    isFetching,
    data: sentence,
  } = useGetSentenceByIdQuery(id);

  useEffect(() => {
    if (sentence) {
      console.log(JSON.stringify(sentence, null, 2));
    }
  }, [sentence]);

  useEffect(() => {
    if (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  }, [error]);

  const getAnother = () => setId(getId());
   */

  return (
    <Stack space={20} style={{ paddingHorizontal: 20 }}>
      <Text>Home Screen</Text>

      {/**
      <Text>sentence ID: {id}</Text>
      <Text>{`is Fetching ? ${isFetching}`}</Text>

      <Button onPress={getAnother} mode="contained">
        GET ANOTHER
      </Button>
       */}

      <Text>{name}</Text>

      <Image style={{ width: 30, height: 20 }} source={icon} />
    </Stack>
  );
}

export default Home;
