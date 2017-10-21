import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

const CoinPairRow = (props) => {

    const baseImageUrl = 'https://www.cryptocompare.com';

    return (
        <View style={styles.container}>
            <Image
                style={{ width: 50, height: 50 }}
                 source={{ uri: baseImageUrl + props.pair.imageUrl }}
            />
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
    paddingLeft: 16,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white'

  },
  pairContainer: {
   	flex: 0.6
  },
  fromStyle: {
   fontSize: 16,
   fontWeight: '600',
   paddingLeft: 16,
   paddingTop: 16
  },
  toStyle: {
   fontSize: 14,
   color: '#71737C',
   paddingLeft: 16,
   paddingBottom: 16
  },
  priceStyle: {
   fontSize: 18,
   fontWeight: '500',
   paddingRight: 16
  },
});

export default CoinPairRow;
