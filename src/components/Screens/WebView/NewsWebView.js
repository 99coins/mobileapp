import React, { Component } from 'react';
import { ActivityIndicator, View, StyleSheet, Platform, WebView } from 'react-native';
import { Share } from 'react-native';
import WKWebView from 'react-native-wkwebview-reborn';


class NewsWebView extends Component {

  onShare(url) {
    Share.share({
      message: 'Found this intresteing article on the 99Bitcoins App ',
      url: url,
      title: 'Wow, did you see that?'
    }, {
        // Android only:
        dialogTitle: url,
        // iOS only:
      });
  }
  renderLoadingView() {
    return (
      <ActivityIndicator
        color='rgb(33, 33, 33)'
        size='small'
        style={{ padding: 20, overflow: 'hidden' }}
      />
    );
  }
  render() {
    console.log('RENDER WEB VIEW');

    if (Platform.OS === 'ios') {
    return (
          <WKWebView
            source={{ uri: this.props.url }}
            renderLoading={this.renderLoadingView}
            startInLoadingState={!this.props.hideIndicator}
            onLoad={() => {
              console.log('On load event', this.props.url);
            }}
          />
    );
    }
      return (
          <WebView
            source={{ uri: this.props.url }}
            renderLoading={this.renderLoadingView}
            startInLoadingState={!this.props.hideIndicator}
            onLoad={() => {
              console.log('On load event', this.props.url);
            }}
          />
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
   // justifyContent: 'center',
     alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  },
});

export default NewsWebView;
