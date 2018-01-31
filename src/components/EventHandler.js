import { Component } from 'react';
import { AppState, NotificationsIOS } from 'react-native';
import { Actions } from 'react-native-router-flux';
import FetchNewsList from '../Actions/FetchNewsList';
import FetchPriceData from '../Actions/FetchPriceData';
import { getUnreadCount } from '../Actions/ChatActions';
import { connect } from 'react-redux';


class EventHandler extends Component {

  state = {
    appState: AppState.currentState
  }

    // onNotificationReceivedForeground(notification) {
  //   console.log("Notification Received - Foreground", notification);
  //   this.props.getUnreadCount();  
  // }

  // onNotificationReceivedBackground(notification) {
  //   console.log("Notification Received - Background", notification);
  //   this.props.getUnreadCount();  
  // }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!');
      console.log('Currentscene:', Actions.currentScene);
      this.props.getUnreadCount();
      if (Actions.currentScene === 'Price') {
         this.props.FetchPriceData();
      } else if (Actions.currentScene === 'News') {
          this.props.FetchNewsList();
      }
    }
    this.setState({ appState: nextAppState });
  }

   render() { return null; }

} export default connect(null, { FetchNewsList, FetchPriceData, getUnreadCount })(EventHandler);
