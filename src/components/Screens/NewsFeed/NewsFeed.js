import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import moment from 'moment';
import NewsItemsList from './NewsItemsList';


const NewsFeed = () => {
     return (
    <View style={styles.container}>
      <Text style={styles.subtitleStyle} >{moment().format('MMMM Do, YYYY')}</Text>
      <NewsItemsList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
    subtitleStyle: {
        height: 0,
        fontSize: 16,
        color: '#676977',
        backgroundColor: 'rgb(167, 0, 26)',
        textAlign: 'center'

    }
});

export default NewsFeed;
