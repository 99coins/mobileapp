import React, { Component } from 'react';
import { ActivityIndicator, WebView, Share, Platform, View } from 'react-native';
//const TestHTML = require('./test.html');
import Colors from '@assets/colors.js';


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
    const renderTime = Date.now();
    const baseUrl = this.getBaseURL(this.props.url);
    return (
        <WebView
        source={{ html: this.props.html, baseUrl }}
        //renderLoading={this.renderLoadingView}
        //startInLoadingState
        onLoad={() => {
          console.log('WebView On load event', `Loading time : ${Date.now() - renderTime}`);
        }}
        />
    );
  }
}
export default NewsWebView;
