import React, { Component } from 'react';
import { WebView, Alert } from 'react-native';

//const url = 'https://www.google.com/';

class FetchWebView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
        console.log(this.state, nextProps, nextState);
        return !this.state.isLoaded;
  }

  render() {
    console.log('Render FetchWebView', this.props.url);

    var renderTime = Date.now();

    return (
      <WebView
        source={{ uri: this.props.url }}
        style={{ marginTop: 20, flex: 1 }}
        onLoad={() => {
          console.log('On load event', `Loading time : ${Date.now() - renderTime}`);
          this.setState({ isLoaded: true });
        }}
      />
    );
  }
}
export default FetchWebView;
