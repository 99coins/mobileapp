import React from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Colors from '@assets/colors.js';
import * as Progress from 'react-native-progress';
import Image from 'react-native-image-progress';


const CoinPairRow = ({ symbol, coinName, priceUsd, percentChange24h, imageUrl, onPressItem }) => {
    return (
     <TouchableWithoutFeedback onPress={onPressItem}>

        <View style={styles.container}>
            <View style={styles.coinContainer}>
                <View style={styles.circleContainer}>
                    <Image 
                        style={styles.image} 
                        source={{ uri: imageUrl }} 
                        cache='force-cache'
                        indicator={Progress.CircleSnail}
                        indicatorProps={{ color: Colors.themeRed }}
                        resizeMode='contain'
                    />
                    <View style={{ position: 'absolute', height: 56, width: 56, borderWidth: 10, borderRadius: 28, borderColor: Colors.gray50 }} />

                </View>
                <View style={styles.textContainer}>
                        <Text style={styles.coinName}>{coinName}</Text>
                        <Text style={styles.coinSymbol}>{symbol}</Text>
                </View>
            
            </View>
            <View style={styles.priceContainer}>
                 <Text style={styles.coinPrice}>${priceUsd}</Text>
                 <Text style={percentChange24h < 0 ? styles.priceChangeMinus : styles.priceChangePlus}>{percentChange24h}%</Text>
             </View>    

        </View>
    </TouchableWithoutFeedback>
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
    circleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        left: 16
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },

    coinSymbol: { 
        fontSize: 14,
        color: Colors.gray600,
        top: 2
      
    },
    seperator: {
        marginTop: 10,
        marginLeft: 2,

    },
    coinName: {
        width: 140,
        fontSize: 14,
        fontWeight: '700',
        color: Colors.gray900,
    },
 
    coinPrice: {
        marginTop: 10,
        fontWeight: '600',        
    },
    image: {
        width: 36,
        height: 36,
        borderRadius: 18,
        overflow: 'hidden'
    },
    moneySymbol: {
        fontWeight: 'bold',
    },
    priceChangePlus: {
        color: Colors.themeGreen,
        marginTop: 10,
        fontWeight: '600',
        width: 60,
        textAlign: 'right'
    },
    priceChangeMinus: {
        color: Colors.themeRed,
        marginTop: 10,
        fontWeight: '600',
        width: 60,
        textAlign: 'right'
    }
});

export default CoinPairRow;
