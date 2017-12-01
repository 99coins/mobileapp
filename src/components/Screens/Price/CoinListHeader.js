import React from 'react';
import { View, Text } from 'react-native';
import Colors from '@assets/colors.js';

//create comonent
const CoinListHeader = () => {
    const { container, crypto, price, change } = styles;
    return (
        <View style={container} >
            <Text style={crypto}>CRYPTO</Text>
            <Text style={price}>PRICE</Text>
            <Text style={change}>24H</Text>
        </View>
    );
};

//styling

const styles = {
    container: {
        height: 30,
        backgroundColor: Colors.gray50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 16
    },
    crypto: {
      fontSize: 10,
      fontWeight: '400'
    },
    price: {
      fontSize: 10,
      fontWeight: '400',
      marginLeft: 170
    },
    change: {
       fontSize: 10,
      fontWeight: '400'
    }

};

//export to other areas of the app

export default CoinListHeader;
