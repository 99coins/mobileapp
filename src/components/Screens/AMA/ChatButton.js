import React, { Component } from 'react';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { chatButtonTapped } from '../../../Actions/ChatActions';
import { connect } from 'react-redux';
import Colors from '@assets/colors.js';

const chatIcon = (<Icon name="comments" size={30} color='white' />);

class ChatButton extends Component {

    shouldComponentUpdate() {
        return false;
    }

    render() {
        console.log('RENDER CHAT BUTTON');
        return (
               <ActionButton
                    buttonColor={Colors.themeRed}
                    onPress={() => { this.props.chatButtonTapped(); }}
                    renderIcon={() => chatIcon}
               /> 
        );
    }
}
export default connect(null, { 
    chatButtonTapped, 
})(ChatButton);
