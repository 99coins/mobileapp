import React from 'react';
import { View, Image } from 'react-native';
import Images from '@assets/images.js';
import Colors from '@assets/colors.js';

//create comonent
const Header = () => {
    const { viewStyle, imageStyle } = styles;
    return (
        <View style={viewStyle} >
            <Image source={Images.logo} style={imageStyle} />
        </View>
    );
};

//styling

const styles = {
    viewStyle: {
        height: 86,
        backgroundColor: { backgroundColor: Colors.gray100 },
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 8
    },
    imageStyle: {
        resizeMode: 'contain',
        width: 180
    }
};

//export to other areas of the app

export default Header;
