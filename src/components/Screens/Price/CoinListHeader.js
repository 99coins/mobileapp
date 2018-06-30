import React from 'react';
import { View, Text, TextInput } from 'react-native';
import Colors from '@assets/colors.js';
import Icon from 'react-native-vector-icons/Feather';


//create comonent
const CoinListHeader = (props) => {
    const { container, searchIcon, search, inputStyle, price, change, priceContainer } = styles;
    return (
        <View style={container} >
            <View style={search}>
                <Icon style={searchIcon} name="search" size={20} />
                <TextInput
                    placeholder={'Search Coins..'}
                    placeholderTextColor={Colors.gray300}
                    autoCorrect={false}
                    style={inputStyle}
                    onChangeText={(text) => {
                        props.onChangeText(text);
                    }}
                    returnKeyType="done"
                //autoFocus
                />
            </View>
            <View style={priceContainer}>
                <Text style={price}>PRICE</Text>
                <Text style={change}>24H</Text>
            </View>
        </View>
    );
};

//styling

const styles = {
    container: {
        height: 40,
        backgroundColor: Colors.gray50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 16
    },
    searchIcon: {
        position: 'absolute'
    },
    search: {      
        flexDirection: 'row',
        backgroundColor: Colors.gray100,
        height: 24,
        width: 120,
        alignItems: 'center',
        borderRadius: 4

    },
    priceContainer: {
        flexDirection: 'row',
        //justifyContent: 'flex-end',

    },
    inputStyle: {
        fontSize: 12,
        fontWeight: '400',
        paddingLeft: 24,
        //alignSelf: 'flex-end'
    },
    price: {
        fontSize: 10,
        fontWeight: '400',
    },
    change: {
        fontSize: 10,
        fontWeight: '400',
        width: 60,
        textAlign: 'right'
    }

};

//export to other areas of the app

export default CoinListHeader;
