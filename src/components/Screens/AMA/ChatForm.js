import React, { Component } from 'react';
import { View, StyleSheet, Modal, Dimensions, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Colors from '@assets/colors.js';
import { Input } from '../../common';
import { closeChatForm, setNickName, openChat, checkIfNameWasSet } from '../../../Actions/ChatActions';
import { connect } from 'react-redux';

class ChatForm extends Component {

    componentWillMount() {
        console.log('componentWillMount in ChatForm');
        this.props.checkIfNameWasSet();
    }
    componentDidMount() {
       console.log('componentDidMount in ChatForm');
    }
    shouldComponentUpdate(nextProps) {
        console.log(this.props.chatState, nextProps.chatState);
        console.log(this.props.chatState.userNickName);
        return (this.props.chatState.modalVisible !== nextProps.chatState.modalVisible);
    }
 
    render() {
        console.log('RENDER CHAT FORM');
        const { chatState } = this.props;
        console.log(chatState.userNickName);

        return (
            <View style={styles.containerStyle} pointerEvents='box-none'>
                <Modal
                    animationType={'fade'}
                    transparent
                    visible={chatState.modalVisible}
                    onRequestClose={() => {
                        this.props.closeChatForm();
                    }}
                >
                <TouchableWithoutFeedback onPress={() => this.props.closeChatForm()}> 

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
                                placeholder="Enter a nickname to begin.."
                                onChangeText={(text) => {
                                this.props.setNickName(text);
                                }}
                            />
                            <TouchableOpacity
                                onPress={() => { this.props.openChat(this.props.chatState.userNickName); }}
                                //disabled={this.state.userNickName.length === 0}
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
    width: windowWidth,
    flexDirection: 'column',
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
},
chatButtonContainerStyle: {
   alignSelf: 'flex-end',
   top: 100

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
    justifyContent: 'space-between',
    borderRadius: 4,
    marginBottom: 290
},
textContainerStyle: {
   marginTop: 16,
   marginLeft: 16,
   marginRight: 16
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
    //paddingTop: 16
    marginTop: 8

},
buttonContainer: {
		width: 200,
		height: 40,
		backgroundColor: Colors.themeRed,
		borderRadius: 10,
        justifyContent: 'center',
        marginBottom: 16,
       // marginTop: 16
},
buttonText: {
		color: 'white',
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center'
}
});

function mapStateToProps(state) {
    return {
        chatState: state.chatState
    };
}
export default connect(mapStateToProps, { 
    checkIfNameWasSet,
    closeChatForm,
    setNickName,
    openChat 
})(ChatForm);
