import React, { Component } from 'react';
import { WebView, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';

class NewsWebView extends Component {

// componentDidMount() {
//   console.log('did mount news webviewwwwwww');
//    BackHandler.addEventListener('hardwareBackPress', () => this.backAndroid()); // Listen for the hardware back button on Android to be pressed
// }

// componentWillUnmount() {
//     BackHandler.removeEventListener('hardwareBackPress', () => this.backAndroid()); // Remove listener
//  }
// backAndroid() {
//    if (Actions.state.index === 0) {
//       return false;
//     }
//     Actions.pop(); // Return to previous screen
//     return true;// Needed so BackHandler knows that you are overriding the default action and that it should not close the app
// }
renderLoadingView() {
  return (
    <ActivityIndicator
      color='rgb(33, 33, 33)'
      size='small'
      style={{ padding: 20 }}
    />
  );
}


  render() {
    console.log(this);
    return (
      <WebView
        source={{ uri: this.props.url }}
        renderLoading={this.renderLoadingView} 
        startInLoadingState
      />
    );
  }
}

export default NewsWebView;
