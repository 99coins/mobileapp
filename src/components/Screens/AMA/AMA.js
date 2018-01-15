import React, { Component } from 'react';
import { View, StyleSheet, Modal, Dimensions, Text, TouchableOpacity, AsyncStorage, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import ActionButton from 'react-native-action-button';
import Colors from '@assets/colors.js';
import { Input, Badge } from '../../common';

const chatIcon = (<Icon name="comments" size={30} color='white' />);

//const Smooch = require('react-native-smooch');

class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
              modalVisible: false,
              userNickName: '',
              shouldShowModal: true,
         };
    }

    componentWillMount() {
        console.log('componentWillMount in Chat');
       // this.props.getUnreadCount();
    }
    componentDidMount() {
       console.log('componentDidMount in Chat');
       this.checkIfNameWasSet();

    //    Smooch.getUnreadCount().then(res => {
    //         console.log(res);
    //         this.setState({ BadgeCount: res });
    //    });
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

    async openChat() {
        console.log('open chat');
        const nickname = this.state.userNickName;

        if (nickname.length > 0) { 
           //only first time
           console.log(nickname);
           //Smooch.setFirstName(nickname);

          try {
             await AsyncStorage.setItem('@didSetNickName', 'true');
          } catch (error) {
            console.log(error);
          }

          this.restoreInitialState();

        //  setTimeout(() => Smooch.show(), 1000);
        // } else {
        //     Smooch.show();
        //     //this.setState({ BadgeCount: 0 });
        }
    }

    restoreInitialState = () => {
        this.setState({ 
            modalVisible: false,
            userNickName: '',
            shouldShowModal: false
        });
    }

    // renderBadge =() => {
    //     const { chatState } = this.props;
    //     if (chatState.badgeCount > 0) {
    //         return <Badge number={chatState.badgeCount} />;
    //     }
    //     return null;
    // }
    
    render() {
        console.log(this.state);

        return (
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
                                placeholder="Enter a nickname to begin.."
                                onChangeText={(text) => {
                                this.setName(text);
                                }}
                            />
                            <TouchableOpacity
                                onPress={() => { this.openChat(); }}
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

export default Chat;
