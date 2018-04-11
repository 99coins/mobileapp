import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import Colors from '@assets/colors.js';
import { CachedImage } from 'react-native-img-cache';


const CoinHeader = ({ iconUrl, coinName }) => {
    return (
      <View style={styles.container}>
        <CachedImage 
            style={styles.image} 
            source={{ uri: iconUrl }} 
        />
        <Text style={styles.symbolStyle}>{coinName}</Text>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 83,
    flex: 1, 
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
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

export default CoinHeader;
