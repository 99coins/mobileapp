import React from 'react';
import Colors from '@assets/colors.js';
import { View, StyleSheet, StatusBar } from 'react-native';
import NewsItemsList from './NewsItemsList';


const NewsFeed = () => {
     return (
    <View style={styles.container}>
      <StatusBar
         backgroundColor={Colors.gray200}
         barStyle="light-content"
      />
      <NewsItemsList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray50
  }
});

export default NewsFeed;
