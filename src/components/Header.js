import React from 'react';
import { Text, View } from 'react-native';

//create comonent
const Header = (props) => {
    const { textStyle, viewStyle, subtitleStyle } = styles;
    return (
        <View style={viewStyle}>
             <Text style={textStyle} >{props.titleText}</Text>
             <Text style={subtitleStyle} >{props.subtitleText}</Text>

        </View>
    );
};

//styling

const styles = {
    viewStyle: {
        height: 86,
        backgroundColor: '#B91121',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20
    },
    textStyle: {
        fontSize: 20,
        color: '#FFFFFF'
    },
    subtitleStyle: {
        fontSize: 16,
        color: '#676977'
    }
};

//export to other areas of the app

export default Header;
