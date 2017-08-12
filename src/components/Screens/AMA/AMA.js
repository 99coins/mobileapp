import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

class Chat extends Component {

    componentWillMount() {

        console.log('componentWillMount in Chat');
    }

    render() {
        console.log(this.state);
        
        return (
        <View>
        </View>
        );
    }
}

export default Chat;
