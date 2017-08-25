import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import CoinPairList from './CoinPairList';

const Rates = () => {
     return (
    <View style={styles.container}>
     <CoinPairList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  }
});

export default Rates;
