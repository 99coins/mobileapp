import React, { Component } from 'react';
import { WebView, ActivityIndicatorIOS, BackHandler, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';

class NewsWebView extends Component {

componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => this.backAndroid()); // Listen for the hardware back button on Android to be pressed
}

componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () => this.backAndroid()); // Remove listener
 }
backAndroid() {
    Actions.pop(); // Return to previous screen
    return true;// Needed so BackHandler knows that you are overriding the default action and that it should not close the app
}
renderLoadingView() {
  return (
    <ActivityIndicatorIOS
          style={[styles.centering, styles.gray, { height: 40 }]}
          color="white"
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

var styles = StyleSheet.create({
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gray: {
    backgroundColor: '#cccccc',
  }
});

export default NewsWebView;
