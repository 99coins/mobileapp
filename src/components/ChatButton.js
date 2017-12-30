import React, { Component } from 'react';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '@assets/colors.js';
import { chatButtonTapped } from '../Actions/ChatActions';
import { connect } from 'react-redux';
import FirstChatModal from './FirstChatModal';


const chatIcon = (<Icon name="comments" size={30} color='white' />);
const Smooch = require('react-native-smooch');

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

export default connect(null, { 
    chatButtonTapped, 
})(ChatButton);
