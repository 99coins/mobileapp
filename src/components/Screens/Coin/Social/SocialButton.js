// @flow

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import Colors from '@assets/colors.js';

export default class SocialButton extends Component {

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
      icon,
      active,
    } = this.props;
    return (
      <TouchableOpacity style={styles.container} onPress={this.onPress}>
        <Text style={[styles.text, active ? styles.active : {}]}>{name}</Text>
      </TouchableOpacity>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  text: {
    color: Colors.gray900,
    fontFamily: 'Avenir',
    fontSize: 12,
  },
  active: {
    color: '#FFFFFF',
  },
});
