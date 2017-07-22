import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const CoinPairDetail = (props) => {

    //const { fromStyle, toStyle, priceStyle } = styles;

    return (
        <View style={styles.container}>
            <View style={styles.pairContainer}>
                <Text style={styles.fromStyle}>{props.pair.fromSymbol}</Text>
                <Text style={styles.toStyle}>{props.pair.toSymbol}</Text>
            </View>
            <View>
                <Text style={styles.priceStyle}>${props.pair.price}</Text>
            </View>
        </View>
    );

};

//styling

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white'

  },
  pairContainer: {
   	flex: 0.6
  },
  fromStyle: {
   fontSize: 20,
   paddingLeft: 16,
   paddingTop: 16
  },
  toStyle: {
   fontSize: 16,
   color: '#71737C',
   paddingLeft: 16,
   paddingBottom: 16
  },
  priceStyle: {
   fontSize: 20,
   paddingRight: 16
  },
});

export default CoinPairDetail;
