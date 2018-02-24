import React, { Component } from 'react';
import { ActivityIndicator, WebView, Share, Platform } from 'react-native';
//const TestHTML = require('./test.html');
import WKWebView from 'react-native-wkwebview-reborn';

class NewsWebView extends Component {
  onShare(url) {
    Share.share({
      message: 'Found this intresteing article on the 99Bitcoins App ',
      url,
      title: 'Wow, did you see that?'
    }, {
        // Android only:
        dialogTitle: url,
        // iOS only:
      });
  }
  getBaseURL(url) {
    const pathArray = url.split('/');
    const protocol = pathArray[0];
    const host = pathArray[2];
    const baseUrl = protocol + '//' + host;
    return baseUrl;
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
    console.log(this.props.url);
    const baseUrl = this.getBaseURL(this.props.url);
    if (Platform.OS === 'ios') {
      return (
        <WKWebView
          source={{ html: this.props.html, baseUrl }}
          //renderLoading={this.renderLoadingView}
          startInLoadingState
          onLoad={() => {
            console.log('On load event');
          }}
        />
      );
    }
    return (
      <WebView
        source={{ html: this.props.html, baseUrl }}
        //renderLoading={this.renderLoadingView}
        startInLoadingState
        onLoad={() => {
          console.log('On load event');
        }}
      />
    );
  }
}
export default NewsWebView;
