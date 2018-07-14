import React from 'react';
import Colors from '@assets/colors.js';
import { View, StyleSheet, StatusBar } from 'react-native';
import LessonList from './LessonList';


const Lessons = () => {
     return (
    <View style={styles.container}>
      <StatusBar
         backgroundColor={Colors.gray200}
         barStyle="dark-content"
      />
      <LessonList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray50
  }
});

export default Lessons;
