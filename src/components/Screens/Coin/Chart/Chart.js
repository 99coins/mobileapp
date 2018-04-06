import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import Line from './Line';
import Colors from '@assets/colors.js';

export default class Chart extends Component {

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.internalContainer}>
            <Line values={[40, 30, 70, 60, 100, 70, 40, 70, 50]} />
          </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 200,
    flex: 1
  },
  internalContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 41,
    marginLeft: 24,
    marginRight: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.gray100,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 16,
  }
});
