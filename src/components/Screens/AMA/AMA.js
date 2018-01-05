import React, { Component } from 'react';
import { View, StyleSheet, Modal, Dimensions, Text, TouchableOpacity, AsyncStorage, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { chatButtonTapped } from '../../../Actions/ChatActions';
import { connect } from 'react-redux';
import ActionButton from 'react-native-action-button';
import Colors from '@assets/colors.js';
import { Input } from '../../common';

const chatIcon = (<Icon name="comments" size={30} color='white' />);

const Smooch = require('react-native-smooch');

class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
              modalVisible: false,
              userNickName: '',
              shouldShowModal: true
         };
    }

    componentWillMount() {
        console.log('componentWillMount in Chat');
    }
    componentDidMount() {
       console.log('componentDidMount in Chat');
       this.checkIfNameWasSet();
    }

    async checkIfNameWasSet() {
        try {
        const value = await AsyncStorage.getItem('@didSetNickName');
        if (value !== null) {
            console.log(value);
            this.setState({ shouldShowModal: false });
        }
        } catch (error) {
             console.log(error);
        }
    }

    setName(text) {
        this.setState({ userNickName: text });
    }

    onChatButtonTap =() => {

        if (this.state.shouldShowModal) {
            this.setModalVisible(true);
        } else { 
            this.openChat();
        }
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    async openChat (){

        console.log('open chat');
        const nickname = this.state.userNickName;

        if (nickname.length > 0) { 
           //only first time
           console.log(nickname);
           Smooch.setFirstName(nickname);

          try {
             await AsyncStorage.setItem('@didSetNickName', 'true');
          } catch (error) {
            console.log(error);
          }

          this.restoreInitialState();

         setTimeout(() => Smooch.show(), 1000);
        } else {
            Smooch.show();
        }
    }

    restoreInitialState = () => {
        this.setState({ 
            modalVisible: false,
            userNickName: '',
            shouldShowModal: false
         });
    }
    
    render() {
        console.log(this.state);

        return (
            //pointerEvents='box-none'
            <View style={styles.containerStyle} pointerEvents='box-none'>
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
                <TouchableWithoutFeedback onPress={() => this.setState({ modalVisible: false })}>

                    <View style={styles.modalStyle}> 
                        <View style={styles.cardStyle} >
                            <View style={styles.textContainerStyle} >
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
                             style={styles.inputStyle}
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
                 </TouchableWithoutFeedback>

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
    position: 'absolute',
    flex: 1,
    justifyContent: 'flex-end',
    height: windowHeight, 
    width: windowWidth 
},
cardStyle: {
    backgroundColor: 'white',
    height: 260,
    marginLeft: 16,
    marginRight: 16, 
    alignItems: 'center',
    borderRadius: 4,
    marginBottom: 300
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

inputStyle: {
    height: 30
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
