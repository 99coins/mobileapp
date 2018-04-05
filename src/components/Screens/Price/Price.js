import React from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import CoinPairList from './CoinPairList';

import Colors from '@assets/colors.js';


const Rates = () => {
     return (   
      <View>
        <StatusBar
         backgroundColor={Colors.gray50}
         barStyle="dark-content"
        />
    <CoinPairList />
    </View>
  );
};

export default Rates;
