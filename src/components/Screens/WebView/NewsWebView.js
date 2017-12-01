import React, { Component } from 'react';
import { WebView, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Share } from 'react-native';


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
