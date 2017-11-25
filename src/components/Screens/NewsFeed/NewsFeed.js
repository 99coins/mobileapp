import React from 'react';
import { View, StyleSheet, Text, StatusBar } from 'react-native';
import moment from 'moment';
import NewsItemsList from './NewsItemsList';
import Colors from '@assets/colors.js';


const NewsFeed = () => {
     return (
    <View style={styles.container}>
      <StatusBar
         backgroundColor={Colors.gray200}
         barStyle="light-content"
      />
      <Text style={styles.subtitleStyle} >{moment().format('MMMM Do, YYYY')}</Text>
      <NewsItemsList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(238, 238, 238)',
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
