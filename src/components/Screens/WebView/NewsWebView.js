import React, { Component } from 'react';
import { WebView, ActivityIndicator, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Share } from 'react-native';
import FetchWebView from './FetchWebView';


//const url = 'https://www.google.com/';

class NewsWebView extends Component {

  renderLoadingView() {
    return (
      <ActivityIndicator
        color='rgb(33, 33, 33)'
        size='small'
        style={{ padding: 20 }}
      />
    );
  }
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
  render() {
    console.log('RENDER WEB VIEW');
    console.log(this.props);
    if (this.props.webview) {
        console.log('FOUND PRE LOADED WEBVIEW');
        return this.props.webview;
    }
    return (
      <View style={{ height: 0, width: 0 }}>
        <WebView
          source={{ uri: this.props.url }}
          //source={{ uri: url }}
          renderLoading={this.renderLoadingView}
          startInLoadingState
          onLoad={() => {
            this.setState({ isLoaded: true });
          }}
        />
      </View>
    );
  }
}

export default NewsWebView;
