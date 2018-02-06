import React, { Component } from 'react';
import { WebView, ActivityIndicator, View, StyleSheet } from 'react-native';
import { Share } from 'react-native';
import FetchWebView from './FetchWebView';

class NewsWebView extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     isLoaded: false
  //   };
  // }
  shouldComponentUpdate(nextProps) {
      return false;
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
    console.log(this.props);

    if (this.props.webview) {
        console.log('FOUND PRE LOADED WEBVIEW');
        return this.props.webview;
    }
    return (
      // <View style={styles.container}>
      //   <View style={{ height: 0, width: 0 }}>
      
      //   </View>
      // </View>

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
