import React, { Component } from 'react';
import { ActivityIndicator, WebView, Share, Platform, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '@assets/colors.js';
import Spinner from 'react-native-loading-spinner-overlay';
import firebase from 'react-native-firebase';

const shareIcon = (<Icon name="share-square" size={30} color={Colors.themeRed} />);

class NewsWebView extends Component {
  constructor(props) {
    super();
    this.state = {
      loading: true
    };
  }
  componentDidMount() {
    this.mounted = true;
    setInterval(() => {
      if (this.mounted) {
        this.setState({
          loading: false
        });
      }
    }, 4000);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (this.state.loading !== nextState.loading) || (this.props.html !== nextProps.html);
  }
  componentWillUnmount() {
    this.mounted = false;
  }

  onShare(url) {
    firebase.analytics().logEvent('click_share_article', { url });
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

  hidden(props) {
    const renderTime = Date.now();
    if (props.sponsored) {
    return (
      <WebView
        source={{ url: props.url }}
         onLoad={() => {
            console.log('Hidden webview On load event', `Loading time : ${Date.now() - renderTime}`);
            firebase.analytics().logEvent('sponsored_article_loaded', { url: props.url });
         }}
      />
    );
    }
  return null;
  }
  render() {
    console.log('RENDER WEB VIEW');
    console.log(this.props.url);
    const renderTime = Date.now();
    const baseUrl = this.getBaseURL(this.props.url);

    const hiddenWebView = 
      <WebView
        source={{ url: this.props.url }}
         onLoad={() => {
            console.log('Hidden webview On load event', `Loading time : ${Date.now() - renderTime}`);
            firebase.analytics().logEvent('sponsored_article_loaded', { url: this.props.url });
         }}
      />;
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 0 }}>
          {this.props.sponsored ? hiddenWebView : null }
        </View>
        <Spinner
          visible={this.state.loading}
          cancelable
          color={Colors.gray200}
          overlayColor={Colors.gray100T}
          animation={'fade'}
        />
        <WebView
          ref={webview => (this.webview = webview)}
          source={{ html: this.props.html, baseUrl }}
          onLoad={() => {
            console.log('WebView On load event', `Loading time : ${Date.now() - renderTime}`);
            if (this.mounted) {
              this.setState({
                loading: false
              });
            }
          }}
        />
      </View>

    );
  }
}
export default NewsWebView;
