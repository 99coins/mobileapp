import React, { Component } from 'react';
import { View, StyleSheet, Modal, Dimensions, Text, TouchableOpacity, TouchableWithoutFeedback, Image, KeyboardAvoidingView } from 'react-native';
import Colors from '@assets/colors.js';
import Images from '@assets/images.js';
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
        return (this.props.chatState.modalVisible !== nextProps.chatState.modalVisible) || (this.props.chatState.userNickName !== nextProps.chatState.userNickName);
    }

    onStartChat() {
        if (this.props.chatState.userNickName.length > 0) { 
            this.props.openChat(this.props.chatState.userNickName);
        }
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
                        <KeyboardAvoidingView style={styles.cardStyle} behavior="padding" enabled>
                            <View style={styles.closeButtonContainerStyle}>
                                <TouchableOpacity onPress={() => this.props.closeChatForm()}>
                                    <Image source={Images.closeIcon} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.backgroundContainer}>
                                <Image source={Images.imgCoins} />
                                <Image source={Images.imgHands} style={styles.handsImageStyle} />
                            </View>                   
                            <View style={styles.textContainerStyle} >
                                <Text style={styles.titleStyle}>Meet Your Personal Bitcoin Mentor!</Text>
                                <Text style={styles.decriptionStyle} allowFontScaling >
                                    Ask us anything and one of our team members will answer shortly.
                                </Text>
                            </View>
                            <Input
                                placeholder="Enter a nickname to begin.."
                                returnKeyType="go"
                                onSubmitEditing={() => { this.onStartChat(); }}
                                onChangeText={(text) => {
                                this.props.setNickName(text);
                                }}
                            />
                            <TouchableOpacity
                                onPress={() => { this.onStartChat(); }}
                            >
                                <View style={[styles.buttonContainer, this.props.chatState.userNickName.length > 0 && styles.buttonContainerEnabled]}>
                                    <Text style={[styles.buttonText, this.props.chatState.userNickName.length > 0 && styles.buttonTextEnabled]}>START CHAT</Text>
                                </View>
                            </TouchableOpacity>
                        </KeyboardAvoidingView>
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
    justifyContent: 'flex-start',
    height: windowHeight, 
    width: windowWidth 
},
cardStyle: {
    backgroundColor: 'white',
    height: windowWidth - 32,
    marginLeft: 16,
    marginRight: 16, 
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 4,
    marginTop: 16
},
closeButtonContainerStyle: {
    marginTop: 16,
    width: windowWidth - 64,
    alignItems: 'flex-end',
},
handsImageStyle: {
    position: 'absolute'
},
textContainerStyle: {
   marginLeft: 16,
   marginRight: 16
},
titleStyle: {
    textAlign: 'center',
    color: Colors.gray900,
    fontWeight: 'bold',
	fontSize: 16
},
backgroundContainer: {
    width: windowWidth - 32,
    height: 80.4,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
},
decriptionStyle: {
    textAlign: 'center',
    color: Colors.gray700,
    fontSize: 14,
    marginTop: 8
},
buttonContainer: {
		width: 188,
        height: 48,
        borderColor: Colors.themeRed,
        borderWidth: 1,
		borderRadius: 4,
        justifyContent: 'center',
        marginBottom: 16
    },
buttonContainerEnabled: {
    backgroundColor: Colors.themeRed
},
buttonText: {
		color: Colors.themeRed,
		fontSize: 16,
		fontWeight: 'bold',
		textAlign: 'center'
},
buttonTextEnabled: {
    color: 'white'
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
