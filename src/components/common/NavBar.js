import {
    View, Image, StatusBar, TouchableWithoutFeedback, Text, Dimensions, Platform, Share
} from 'react-native';
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import Images from '@assets/images.js';
import firebase from 'react-native-firebase';

class NavBar extends Component {


  onShare(url) {
    firebase.analytics().logEvent('click_share_article', { url });
    Share.share({
      message: `${url}\n\nYou can download 99Bitcoins at: https://tg55j.app.goo.gl/99bit`,
      url,
      title: 'Found this interesting article on the 99Bitcoins App'
    }, {
        // Android only:
        dialogTitle: url,
        // iOS only:
      });
  } 
    render() {
        return (
            <View style={styles.backgroundStyle}>
                <StatusBar />
                <View style={styles.barItems}>
                    <TouchableWithoutFeedback onPress={() => Actions.pop()} >
                    <Image
                        source={Images.backArrow}
                        style={styles.leftIcon}
                    />
                    </TouchableWithoutFeedback>
                     <View style={[styles.titleContainer, isIphoneX() && styles.titleContainerIphoneX]}>
                        <Image
                            source={{ uri: this.props.icon }}
                            style={styles.icon}
                        /> 
                        <Text style={styles.title}>{this.props.title}</Text> 
                    </View>
                    {this.props.share && 
                    <TouchableWithoutFeedback onPress={() => this.onShare(this.props.url)} >
                        <Image
                        source={Images.shareIcon}
                        style={styles.rightIcon}
                        />
                    </TouchableWithoutFeedback> 
                    }

                </View>
                <Image
                    style={styles.headerSeperator}
                    source={Images.headerSeperator}
                />
            </View>
        );
    }
}
const d = Dimensions.get('window');
const isIphoneX = () => {
    
    const { height, width } = d;

    return (
        // This has to be iOS duh
        Platform.OS === 'ios' &&

        // Accounting for the height in either orientation
        (height === 812 || width === 812)
    );
};

const navbarHeight = isIphoneX() ? 84 : 64;
//const statusBarHeight = Platform.OS === 'ios' ? 20 : 0;

const styles = {
    backgroundStyle: {
        backgroundColor: 'white',
        height: navbarHeight,
        flexDirection: 'column',
        justifyContent: 'space-between',
        //justifyContent: 'space-between'
    },
    barItems: {
        top: 20,
        height: navbarHeight - 21,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    leftIcon: {
        resizeMode: 'contain',
        width: 24,
        height: 24,
        marginLeft: 16,
        alignSelf: 'center'
    },
    rightIcon: {
        resizeMode: 'contain',
        width: 24,
        height: 24,
        marginLeft: 16,
       // marginRight: 16,
        alignSelf: 'center'
    },
    headerSeperator: {
        alignSelf: 'center',
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: d.width - 100
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
