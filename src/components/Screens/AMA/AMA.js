import React, { Component } from 'react';
import { View, StyleSheet, Modal, Dimensions, Text, TouchableOpacity, AsyncStorage, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import ActionButton from 'react-native-action-button';
import Colors from '@assets/colors.js';
import { Input } from '../../common';
import LiveChat from 'react-native-livechat'
import { init } from "@livechat/livechat-visitor-sdk";
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

var Intercom = require('react-native-intercom');

const chatIcon = (<Icon name="comments" size={30} color='white' />);

//const Smooch = require('react-native-smooch');

class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
              modalVisible: false,
              userNickName: '',
              shouldShowModal: true,
              messages: [],
              onlineStatus: false,
              typingText: null,
                users: {
                     system: {
                       name: 'system',
                   _id: 'system',
                 }
                }
        };
        this.visitorSDK = init({
            license: 9424965
         });
            this.visitorSDK.on('new_message', this.handleNewMessage.bind(this));
            this.visitorSDK.on('agent_changed', this.handleAgentChanged.bind(this));
            this.visitorSDK.on('status_changed', this.handleStateChange.bind(this));
            this.visitorSDK.on('typing_indicator', this.handleTypingIndicator.bind(this));
            this.visitorSDK.on('chat_ended', this.handleChatEnded.bind(this));
            this.visitorSDK.on('visitor_data', this.hendleVisitorData.bind(this));
            this.handleInputTextChange = this.handleInputTextChange.bind(this);
            this.handleSend = this.handleSend.bind(this);
            this.renderFooter = this.renderFooter.bind(this);
            this.getRenderInputToolbar = this.getRenderInputToolbar.bind(this);
    //Intercom.registerUnidentifiedUser();
    //    Intercom.setLauncherVisibility('VISIBLE');   
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
renderFooter(props) {
    if (this.state.typingText) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            {this.state.typingText}
          </Text>
        </View>
      );
    }
    return null;
  }
  handleAgentChanged(newAgent) {
    this.addUser(newAgent, 'agent');
  }

  hendleVisitorData(visitorData) {
    this.addUser(visitorData, 'visitor') ;
  }

  addUser(newUser, type) {
    this.setState({
      users: Object.assign({}, this.state.users, {
        [newUser.id]: {
          _id: newUser.id,
          type: type,
          name: newUser.name || newUser.type,
          avatar: newUser.avatarUrl ? 'https://' + newUser.avatarUrl : null,
        }
      })  
    });
  }

  handleStateChange(statusData) {
    this.setState({
      onlineStatus: statusData.status === 'online',
    });
  }

  handleInputTextChange(text) {
    this.visitorSDK.setSneakPeek({ text: text });
  }

  handleChatEnded() {
    this.setState({
      messages: [{
        text: 'Chat is closed',
        _id: String(Math.random()),
        createdAt: Date.now(),
        user: {
          _id: 'system',
        },
      }, ...this.state.messages]
    });
  }

  handleTypingIndicator(typingData) {
    this.setState({
      typingText: typingData.isTyping ? 'Agent is typing...' : null,
    });
  }

  handleSend(messages) {
    this.visitorSDK.sendMessage({
      customId: String(Math.random()),
      text: messages[0].text,
    });
  }

  handleNewMessage(newMessage) {
    this.addMessage(newMessage);
  }

  addMessage(message) {
    this.setState({
      messages: [{
        text: message.text,
        _id: message.id,
        createdAt: message.timestamp,
        user: this.state.users[message.authorId],
      }, ...this.state.messages]
    });
  }

  getVisitor() {
    const visitorId = Object.keys(this.state.users).find((userId) => this.state.users[userId].type === 'visitor');
    return this.state.users[visitorId];
  }

  getRenderInputToolbar() {
    return this.state.onlineStatus ? null : () => null;
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

           //Intercom.registerIdentifiedUser({ userId: nickname });


          try {
             await AsyncStorage.setItem('@didSetNickName', 'true');
          } catch (error) {
            console.log(error);
          }

          this.restoreInitialState();
          setTimeout(() => Intercom.displayMessageComposer(), 1000);
        } else {
            Intercom.displayMessenger();
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
                {/* <ActionButton
                     buttonColor={Colors.themeRed}
                     onPress={() => { this.onChatButtonTap(); }}
                    icon={chatIcon}
                /> */}
                {/* <Modal
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
                </Modal> */}
               <GiftedChat
                    messages={this.state.messages}
                    renderActions={this.renderCustomActions}
                    renderFooter={this.renderFooter}
                     renderInputToolbar={this.getRenderInputToolbar()}
                     onSend={this.handleSend}
                     onInputTextChanged={this.handleInputTextChange}
                     user={this.getVisitor()}
               />
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
},
container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  navigation: {
    flex: 1,
  },
  systemMessage: {
    backgroundColor: '#fff',
    alignSelf: 'center', 
  },
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#aaa',
  },
  status: {
    textAlign: 'center',
    padding: 5,
  }
});

export default Chat;
