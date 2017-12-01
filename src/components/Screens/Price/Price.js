import React from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import CoinPairList from './CoinPairList';
import CoinListHeader from './CoinListHeader';

import Colors from '@assets/colors.js';


const Rates = () => {
     return (
    <View>
        <StatusBar
         backgroundColor={Colors.gray200}
         barStyle="light-content"
        />
    <CoinListHeader />
    <CoinPairList />
    </View>
  );
};
export default Rates;
