import React, { Component } from 'react';
import { WebView } from 'react-native';

class FetchWebView extends Component {

  render() {
    console.log('Render FetchWebView', this.props.url);
    return (
      <WebView
        source={{ uri: this.props.url }}
      />
    );
  }
}
export default FetchWebView;
