import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import Colors from '@assets/colors.js';

const PriceHeader = ({ price, symbol }) => {
    return (
      <View style={styles.container}>
        <Text style={styles.priceStyle}>{price}</Text>
        <Text style={styles.symbolStyle}>{symbol}</Text>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 73,
    flex: 1, 
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    top: 10
  },
  priceStyle: {
    fontSize: 48,
    color: Colors.gray900
  },
  symbolStyle: {
    fontSize: 48,
    color: Colors.gray300
  }
});

export default PriceHeader;
