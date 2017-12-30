import React, { Component } from 'react';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
const Smooch = require('react-native-smooch');


class ChatButton extends Component {

  openChat = () => {
    console.log('open chat');
    Smooch.show();
  }

  render() {
        return (
            <ActionButton
                 buttonColor="rgba(231,76,60,1)"
                 onPress={() => { this.openChat(); }}
            />
        );
   }

} 

export default ChatButton;
