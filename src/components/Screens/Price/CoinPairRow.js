import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

const CoinPairRow = ({ symbol, coinName, priceUsd, percentChange24h }) => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} />
            <Text style={styles.coinSymbol}>{symbol}</Text>
            <Text style={styles.seperator}>|</Text>
            <Text style={styles.coinName}>{coinName}</Text>
            <Text style={styles.coinPrice}>{priceUsd}
                <Text style={styles.moneySymbol}> $ </Text>
            </Text>
            <Text style={styles.priceChange}>{percentChange24h}</Text>

        </View>
    );
};

//styling

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 20,
        borderBottomColor: '#e5e5e5',
        borderBottomWidth: 3,
        padding: 20
    },
    upperRow: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 15
    },
    coinSymbol: {
        marginTop: 10,
        marginLeft: 20,
        marginRight: 5,
        fontWeight: 'bold',        
    },
    coinName: {
        marginTop: 10,
        marginLeft: 5,
        marginRight: 20
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
        width: 35,
        height: 35,
    },
    moneySymbol: {
        fontWeight: 'bold',
    },
    percentChangePlus: {
        color: '#00BFA5',
        fontWeight: 'bold',
        marginLeft: 5
    },
    percentChangeMinus: {
        color: '#DD2C00',
        fontWeight: 'bold',
        marginLeft: 5
    }
});

export default CoinPairRow;
