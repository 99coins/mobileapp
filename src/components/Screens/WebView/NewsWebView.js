import React, { Component } from 'react';
import { WebView, ActivityIndicator } from 'react-native';

class NewsWebView extends Component {

renderLoadingView() {
  return (
    <ActivityIndicator
      color='rgb(33, 33, 33)'
      size='large'
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
