import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const Chat = () => {
     return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Chat Screen
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
});

export default Chat;
