import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Colors from '@assets/colors.js';

const CoinPairRow = ({ symbol, coinName, priceUsd, percentChange24h, imageUrl }) => {
    return (
        <View style={styles.container}>
            <View style={styles.coinContainer}>
                <Image style={styles.image} source={{ uri: imageUrl }} />
                <Text style={styles.coinSymbol}>{symbol}</Text>
                <Text style={styles.seperator}>|</Text>
                <Text style={styles.coinName}>{coinName}</Text>
            </View>
            <View style={styles.priceContainer}>
                 <Text style={styles.coinPrice}>${priceUsd}</Text>
                 <Text style={percentChange24h < 0 ? styles.priceChangeMinus : styles.priceChangePlus}>{percentChange24h}%</Text>
             </View>    

        </View>
    );
};

//styling

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: Colors.gray50,
        borderBottomWidth: 0,
        justifyContent: 'space-between'
    },
    coinContainer: {
        flexDirection: 'row',

    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },

    coinSymbol: {
        marginTop: 10,
        marginLeft: 8,
        fontWeight: 'bold',        
    },
    seperator: {
        marginTop: 10,
        marginLeft: 2,

    },
    coinName: {
        marginTop: 10,
        marginLeft: 2,

    },
 
    coinPrice: {
        marginTop: 10,
        fontWeight: 'bold',        
    },
    image: {
        width: 36,
        height: 36,
        borderRadius: 18
    },
    moneySymbol: {
        fontWeight: 'bold',
    },
    priceChangePlus: {
        color: '#00BFA5',
        marginTop: 10,
        fontWeight: '400',
        width: 60,
        textAlign: 'right'
    },
    priceChangeMinus: {
        color: '#DD2C00',
        marginTop: 10,
        fontWeight: '400',
        width: 60,
        textAlign: 'right'
    }
});

export default CoinPairRow;
