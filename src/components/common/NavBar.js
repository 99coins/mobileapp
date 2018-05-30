import {
    View, Image, StatusBar, TouchableWithoutFeedback, Text
} from 'react-native';
import React, { Component } from 'react';
import { Actions, Router, Scene } from 'react-native-router-flux';
import Images from '@assets/images.js';

class NavBar extends Component {
    componentDidMount() {
        console.log(this.props);
    }
    render() {
        return (
            <View style={styles.backgroundStyle}>
                <StatusBar />
                <TouchableWithoutFeedback onPress={() => Actions.pop()} >
                <Image
                    source={Images.backArrow}
                    style={styles.backarrowStyle}
                />
                </TouchableWithoutFeedback>
                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                <Image
                    source={{ uri: this.props.icon }}
                    style={styles.icon}
                />
                <Text style={styles.title}>{this.props.title}</Text>
                </View>
                <Image
                    style={styles.headerSeperator}
                    source={Images.headerSeperator}
                />
            </View>
        );
    }

}
const styles = {
    backgroundStyle: {
        backgroundColor: 'white',
        height: 64,
        justifyContent: 'space-between'
    },
    backarrowStyle: {
        resizeMode: 'contain',
        flexDirection: 'row',
        width: 24,
        height: 24,
        left: 16,
        top: 30,
        justifyContent: 'flex-start'
    },
    headerSeperator: {
        alignSelf: 'center',
    },
    title: {
        left: 5,
        alignSelf: 'center',
        fontSize: 16,
        fontWeight: '700'

    },
    icon: {
        resizeMode: 'contain',
        width: 24,
        height: 24
    }
};

export default NavBar;
