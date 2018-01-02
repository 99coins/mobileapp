import React, { Component } from 'react';
import { View, StyleSheet, Modal, Dimensions, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
//import ChatButton from '../../ChatButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import { chatButtonTapped } from '../../../Actions/ChatActions';
import { connect } from 'react-redux';
import ActionButton from 'react-native-action-button';
const chatIcon = (<Icon name="comments" size={30} color='white' />);
import Colors from '@assets/colors.js';
import { Input } from '../../common';


const Smooch = require('react-native-smooch');

class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
              modalVisible: false,
              userNickName: '',
              chatWindowOpen: false
         };
    }

    componentWillMount() {
        console.log('componentWillMount in Chat');
    }
    setName(text) {
        this.setState({ userNickName: text });
    }

    onChatButtonTap =() => {
        this.setModalVisible(true);
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    openChat = () => {
        console.log('open chat');
        const nickname = this.state.userNickName;
        if (nickname.length > 0) { 
           console.log(nickname);
           //Smooch.setEmail(nickname);
           Smooch.setFirstName(nickname);
        }

        this.restoreInitialState();

        // Smooch.show();
        setTimeout(() => Smooch.show(), 1000);
    }

    restoreInitialState = () => {
        this.setState({ 
            modalVisible: false,
            userNickName: ''
         });
    }
    
    render() {
        console.log(this.state);

        // if (this.state.chatWindowOpen) {
        //     Smooch.show();
        // }     

        return (

            <View style={styles.containerStyle} pointerEvents='box-none' >
              <ActionButton
                 buttonColor={Colors.themeRed}
                 onPress={() => { this.onChatButtonTap(); }}
                 icon={chatIcon}
              />
                 <Modal
                    animationType={'fade'}
                    transparent
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(false);
                    }}
                 >
                    <View style={styles.modalStyle}>
                        <View style={styles.cardStyle}>
                            <View style={styles.textContainerStyle}>
                             <Text style={styles.titleStyle}>Meet Your Personal Bitcoin Mentor!</Text>
                             <Text style={styles.decriptionStyle} allowFontScaling >
                                 New to the crypto world? Wer'e here to help.
                                 Ask us anything and one of our team members will answer shortly.
                             </Text>
                            </View>
                        <Input
                             label="Nickname"
                             placeholder="Enter a nickname to begin.."
                             onChangeText={(text) => {
                                this.setName(text);
                             }}
                        />
                        <TouchableOpacity
                             onPress={() => {
                              //this.setModalVisible(!this.state.modalVisible);
                              this.openChat();
                             }}
                             disabled={this.state.userNickName.length === 0}
                
                        >
                            <View style={styles.buttonContainer}>
                             <Text style={styles.buttonText}>Start Chat!</Text>
                            </View>
                        </TouchableOpacity>
                     </View>
                    </View>
                </Modal>
            </View>

        );
    }
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
containerStyle: { 
    position: 'absolute', 
    top: 0, 
    left: 0, 
    height: windowHeight, 
    width: windowWidth 
},
buttonContainerStyle: {
    backgroundColor: 'rgba(33,33,33,0.5)',
    // position: 'relative',
     flex: 0.5,
      //flexDirection: 'column'
    //flexDirection: 'column',
    //justifyContent: 'flex-end'
},
modalStyle: {
    backgroundColor: 'rgba(33,33,33,0.5)',
    position: 'relative',
    flex: 1,
    justifyContent: 'flex-end'
},
cardStyle: {
    backgroundColor: 'white',
    height: 260,
    marginLeft: 16,
    marginRight: 16, 
    alignItems: 'center',
    borderRadius: 4,
    marginBottom: 250
},
textContainerStyle: {
   padding: 16
},
titleStyle: {
    textAlign: 'center',
    color: Colors.gray900,
    fontWeight: 'bold',
	fontSize: 20
},

decriptionStyle: {
    textAlign: 'center',
    color: Colors.gray500,
    fontSize: 15,
    paddingTop: 16

},

inputContainerStyle: {
    //padding: 16
},
buttonContainer: {
		width: 200,
		height: 40,
		backgroundColor: Colors.themeRed,
		borderRadius: 10,
        justifyContent: 'center',
        marginBottom: 16,
        marginTop: 16
},
buttonText: {
		color: 'white',
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center'
}
});

const mapStateToProps = state => {
    return {
        chatState: state.chatState
    };
};

export default connect(mapStateToProps, { 
    chatButtonTapped, 
})(Chat);
