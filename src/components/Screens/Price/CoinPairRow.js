import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Colors from '@assets/colors.js';

const CoinPairRow = ({ symbol, coinName, priceUsd, percentChange24h, imageUrl }) => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: imageUrl }} />
            <Text style={styles.coinSymbol}>{symbol}</Text>
            <Text style={styles.seperator}>|</Text>
            <Text style={styles.coinName}>{coinName}</Text>
            <Text style={styles.coinPrice}>${priceUsd}</Text>
            <Text style={percentChange24h < 0 ? styles.priceChangeMinus : styles.priceChangePlus}>{percentChange24h}%</Text>

        </View>
    );
};

//styling

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: Colors.gray50
    },
    coinSymbol: {
        marginTop: 10,
        marginLeft: 16,
        marginRight: 5,
        fontWeight: 'bold',        
    },
    coinName: {
        marginTop: 10,
        marginLeft: 5,
        marginRight: 16
    },
    seperator: {
        marginTop: 10,
    },
    coinPrice: {
        marginTop: 10,
        marginLeft: 'auto',
        marginRight: 10,
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
        marginLeft: 5,
        marginTop: 10,
        fontWeight: '400',
    },
    priceChangeMinus: {
        color: '#DD2C00',
        marginLeft: 5,
        marginTop: 10,
        fontWeight: '400',
    }
});

export default CoinPairRow;
