import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ErrorProps } from './types';

function Error({ message, retry }: ErrorProps) {
  return (
    <View style={styles.container}>
      <Icon name="alert" color="#8B0000" size={100} />

      <Text style={styles.text}>
        {message}
      </Text>

      {!!retry && (
        <Button mode="contained" onPress={retry}>
          <Text style={styles.buttonText}>
            RETRY
          </Text>
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginVertical: 20,
  },
  buttonText: {
    color: 'white',
  },
});

export default Error;
