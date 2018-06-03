import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import Range from './Range';

export default class Switcher extends Component {

  render() {
    const {
      ranges,
      current,
      onSelectRange,
    } = this.props;

    console.log('CURRENT RANGE', current)
    return (
      <View style={styles.container}>
        {ranges.map((name, index) =>
          <Range
            name={name}
            active={current === name}
            onPress={onSelectRange}
            key={index}
          />)}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
});