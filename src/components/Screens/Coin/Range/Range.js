// @flow

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import Colors from '@assets/colors.js';

export default class Range extends Component {

  props: {
    name: string,
    active: boolean,
    onPress: (range: string) => void,
  };

  onPress = () => {
    const {
      name,
      onPress
    } = this.props;
    onPress(name);
  };

  render() {
    const {
      name,
      active,
    } = this.props;
    return (
      <TouchableOpacity style={[styles.container, active && styles.containerActive]} onPress={this.onPress}>
        <Text style={[styles.text, active && styles.active]}>{name}</Text>
      </TouchableOpacity>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    padding: 4,
    margin: 4,
    borderWidth: 1,
    borderColor: Colors.gray100,
    borderRadius: 2
  },
  containerActive: {
    backgroundColor: Colors.gray900
  },
  text: {
    color: Colors.gray100,
    fontSize: 12,
    fontWeight: 'bold'
  },
  active: {
    color: 'white'
    //padding: 4
  },
});
