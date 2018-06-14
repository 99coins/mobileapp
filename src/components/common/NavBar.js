import {
    View, Image, StatusBar, TouchableWithoutFeedback, Text, Dimensions, Platform
} from 'react-native';
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import Images from '@assets/images.js';

class NavBar extends Component {
    componentDidMount() {
        console.log(this.props);
    }
    render() {
        return (
            <View style={[styles.backgroundStyle, isIphoneX() && styles.backgroundStyleIphoneX]}>
                <StatusBar />
                <TouchableWithoutFeedback onPress={() => Actions.pop()} >
                    <Image
                        source={Images.backArrow}
                        style={[styles.backarrowStyle, isIphoneX() && styles.backarrowStyleIphoneX]}
                    />
                </TouchableWithoutFeedback>
                <View style={[styles.titleContainer, isIphoneX() && styles.titleContainerIphoneX]}>
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
const isIphoneX = () => {
    let d = Dimensions.get('window');
    const { height, width } = d;

    return (
        // This has to be iOS duh
        Platform.OS === 'ios' &&

        // Accounting for the height in either orientation
        (height === 812 || width === 812)
    );
};

const styles = {
    backgroundStyle: {
        backgroundColor: 'white',
        height: 64,
        justifyContent: 'space-between'
    },
    backgroundStyleIphoneX: {
        height: 84,
    },
    backarrowStyle: {
        resizeMode: 'contain',
        width: 24,
        height: 24,
        left: 16,
        top: 30,
        //justifyContent: 'flex-end',
    },
    backarrowStyleIphoneX: {
        top: 52,
    },
    headerSeperator: {
        alignSelf: 'center',
    },
    titleContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
    },
    titleContainerIphoneX: {
        bottom: -8
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
