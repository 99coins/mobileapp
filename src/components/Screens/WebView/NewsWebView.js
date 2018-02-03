import React, { Component } from 'react';
import { WebView, ActivityIndicator, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Share } from 'react-native';
import FetchWebView from './FetchWebView';

class NewsWebView extends Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     isLoaded: false,
  //   };
  // }

  shouldComponentUpdate(nextProps, nextState) {
        //console.log(this.state, nextProps, nextState);
        return false;
  }

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
        <WebView
          source={{ uri: this.props.url }}
          renderLoading={this.renderLoadingView}
          //startInLoadingState
          onLoad={() => {
            console.log('On load event', this.props.url);
            //this.setState({ isLoaded: true });
          }}
        />
    );
  }
}

export default NewsWebView;
