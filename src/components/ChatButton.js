import React, { Component } from 'react';
import ActionButton from 'react-native-action-button';
//import Icon from 'react-native-vector-icons/Ionicons';
//import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';


import Colors from '@assets/colors.js';

const Smooch = require('react-native-smooch');
const chatIcon = (<Icon name="comments" size={30} color='white' />);

class ChatButton extends Component {

  openChat = () => {
    console.log('open chat');
    Smooch.show();
  }

  render() {
        return (
            <ActionButton
                 buttonColor={Colors.themeRed}
                 onPress={() => { this.openChat(); }}
                 icon={chatIcon}
            />
        );
   }

} 

export default ChatButton;
