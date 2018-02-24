import React, { Component } from 'react';
import { ActivityIndicator, WebView, Share } from 'react-native';
//const TestHTML = require('./test.html');

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
    return (
      <WebView
        source={{ html: this.props.html, baseUrl: this.props.source }}
        renderLoading={this.renderLoadingView}
        //startInLoadingState
        onLoad={() => {
          console.log('On load event');
        }}
      />
    );
  }
}
export default NewsWebView;
