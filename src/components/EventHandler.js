import { Component } from 'react';
import { AppState, NotificationsIOS } from 'react-native';
import { Actions } from 'react-native-router-flux';
import fetchNewsList from '../Actions/FetchNewsList';
import fetchPriceData from '../Actions/FetchPriceData';
import { getUnreadCount } from '../Actions/ChatActions';
import { connect } from 'react-redux';

const ReactNative = require('react-native');

class EventHandler extends Component {

  state = {
    appState: AppState.currentState
  }
  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
    try {
      ReactNative.I18nManager.allowRTL(false);
    } catch (e) {
      console.log(e);
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (this.props.routes.scene !== nextProps.routes.scene) {
        this.props.getUnreadCount();
    }
  }
  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!');
      console.log('Currentscene:', Actions.currentScene);
      this.props.getUnreadCount();
      if (Actions.currentScene === 'Coins') {
        this.props.fetchPriceData();
      } else if (Actions.currentScene === 'News') {
        this.props.fetchNewsList();
      }
    }
    this.setState({ appState: nextAppState });
  }

  render() { return null; }

} 
function mapStateToProps(state) {
  return {
      routes: state.routes
  };
}

export default connect(mapStateToProps, { fetchNewsList, fetchPriceData, getUnreadCount })(EventHandler);
