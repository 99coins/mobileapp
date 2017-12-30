import React, { Component, PropTypes } from 'react';
import {
  AsyncStorage,
  Modal,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import { StyleSheet } from 'react-native';
import Colors from '@assets/colors.js';
import { Input } from './common';
const Smooch = require('react-native-smooch');

export default class FirstChatModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      disabled: false,
      name: ''
    };
  }
  componentDidMount() {
    // AsyncStorage.getItem(this.props.pagekey, (err, result) => {
    //   if (err) {
    //       console.log(err);
    //   } else if (result == null) {
    //       console.log('null value recieved', result);
    //       this.setModalVisible(true);
    //     } else {
    //       console.log('result', result);
    //     }
    //   });
    // AsyncStorage.setItem(this.props.pagekey, JSON.stringify({ value: true }), (err, result) => {
    //         console.log('error', err, 'result', result);
    // });

    this.setModalVisible(true);
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  setName(text) {
    this.setState({ name: text });
  }

  onStartChat() {
     Smooch.setFirstName(this.state.name); 
     Smooch.show();
     this.setModalVisible(false);
  }
    render() {
    return (
      //<View>
        <Modal
          animationType={'slide'}
          transparent
          visible={this.state.modalVisible}
          onRequestClose={() => {
            //alert('Modal has been closed.');
          }}
        >
        <View style={styles.containerStyle}>
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
                  this.onStartChat();
                }}
                disabled={this.state.disabled}
                
            >
                <View style={styles.buttonContainer}>
                  <Text style={styles.buttonText}>Start Chat!</Text>
                </View>
            </TouchableOpacity>
         </View>
        </View>
        </Modal>
      //</View>
    );
  }
}

const styles = StyleSheet.create({
containerStyle: {
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
},

ftreContainer: { 
		// backgroundColor: 'white',
        // flex: 0.5,  
		// marginTop: 150,
		// marginBottom: 200,
		// marginLeft: 20,
		// marginRight: 20,
		// borderRadius: 20,
		// borderWidth: 2,
		// borderColor: Colors.themeRed
	},
	ftreTitle: {
		color: Colors.gray900,
        fontWeight: 'bold',
		fontSize: 20,
		textAlign: 'center',
        marginTop: 32
	},
	ftreDescription: {
		color: Colors.gray500,
        fontSize: 15,
        marginTop: 32,
		marginRight: 16,
        marginLeft: 16,
        textAlign: 'center',

	},
	ftreCloseIcon: {
		alignSelf: 'flex-end',
		flex: 0.5,
		marginRight: 10
	},
	ftreTitleContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	ftreDescriptionContainer: {
		flex: 4
	},
	ftreExitContainer: {
		flex: 2,
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	ftreExitButtonContainer: {
		width: 200,
		height: 40,
		backgroundColor: Colors.themeRed,
		borderRadius: 10,
		justifyContent: 'center',
	},
	ftreExitButtonText: {
		color: 'white',
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center'
	}
});
