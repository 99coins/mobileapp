import React from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import CoinPairList from './CoinPairList';
import Colors from '@assets/colors.js';


const Rates = () => {
     return (
    <View style={styles.container}>
           <StatusBar
         backgroundColor={Colors.gray200}
         barStyle="light-content"
          />
     <CoinPairList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(238, 238, 238)'
  }
});

export default Rates;
