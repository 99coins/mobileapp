/* eslint-disable global-require */

import React, {
  Component
} from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  Platform
} from 'react-native';
import { Scene, Router, Actions, Overlay, Reducer } from 'react-native-router-flux';
import Images from '@assets/images.js';
import Colors from '@assets/colors.js';
import Price from './Screens/Price/Price';
import CoinPage from './Screens/Coin/CoinPage';
import NewsFeed from './Screens/NewsFeed/NewsFeed';
import Lessons from './Screens/Lessons/Lessons';
import NewsWebView from './Screens/WebView/NewsWebView';
import ChatForm from './Screens/AMA/ChatForm';
import ChatButton from './Screens/AMA/ChatButton';
import UnreadBadge from './Screens/AMA/UnreadBadge';
import EventHandler from './EventHandler';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import NavBar from './common/NavBar';
import { setCustomText } from 'react-native-global-props';

const customTextProps = {
  style: {
    fontFamily: 'Montserrat'
  }
};

const windowWidth = Dimensions.get('window').width;


class RouterComponent extends Component {
  static propTypes = {
    dispatch: PropTypes.func
  };
  constructor(props) {
    super(props);
    firebase.analytics().setAnalyticsCollectionEnabled(true);
    setCustomText(customTextProps);
  }
  onBackPress = () => {
    if (Actions.currentScene === 'article') {
      Actions.pop();
      return true;
    }
    return false;
  }
  reducerCreate(params) {
    const defaultReducer = Reducer(params);
    return (state, action) => {
      this.props.dispatch(action);
      return defaultReducer(state, action);
    };
  }
  render() {
    return (
      <Router
        createReducer={this.reducerCreate.bind(this)}
        backAndroidHandler={this.onBackPress}
        sceneStyle={{ backgroundColor: 'white' }}
      >
        <Overlay key="overlay">
          <Scene
            key="root"
            navigationBarTitleImage={Images.logo}
            navigationBarTitleImageStyle={{
              resizeMode: Platform.OS === 'android' ? 'center' : 'contain',
              width: windowWidth,
              height: 21,
              top: 8
            }}
            navigationBarStyle={{
              backgroundColor: 'white',
              shadowOpacity: 0,
              elevation: 0,
              borderBottomColor: 'transparent',
            }}
            renderBackButton={() => {
              return (
                <TouchableWithoutFeedback onPress={() => Actions.pop()} >
                  <Image
                    source={Images.backArrow}
                    style={{
                      resizeMode: 'contain',
                      width: 24,
                      height: 24,
                      left: 16,
                    }}
                  />
                </TouchableWithoutFeedback>
              );
            }}
            headerMode='screen'
          >

            <Scene
              key="tabbar"
              tabs
              tabBarStyle={{ backgroundColor: 'white' }}
              tabBarPosition={'top'}
              swipeEnabled
              wrap={false}
              activeTintColor={Colors.themeRed}
              inactiveTintColor={Colors.gray700}
              labelStyle={{ fontWeight: 'bold' }}
              focused
              indicatorStyle={{ backgroundColor: Colors.themeRed }}
              lazy={false}
            >
              {/* Tab and it's scenes */}
              <Scene
                key="News"
                component={NewsFeed}
                onEnter={() => {
                  firebase.analytics().logEvent(`page_${Actions.currentScene.toLowerCase()}`, {});
                }}
              />

              {/* Tab and it's scenes */}
              <Scene
                key="Coins"
                component={Price}
                onEnter={() => {
                  firebase.analytics().logEvent(`page_${Actions.currentScene.toLowerCase()}`, {});
                }}
                initial
              />
              <Scene
                key="Courses"
                component={Lessons}
                onEnter={() => {
                  firebase.analytics().logEvent(`page_${Actions.currentScene.toLowerCase()}`, {});
                }}
                onExit={() => {
                  //this.props.playSelectedLesson(false);
                }}
              />
            </Scene>
            <Scene
              key="article"
              component={NewsWebView}
              onRight={(scene) => {
                scene.component.prototype.onShare(scene.url);
              }}
              onEnter={(scene) => {
                firebase.analytics().logEvent(`page_${Actions.currentScene}`, { url: scene.url });
              }}
              back
              //navigationBarTitleImage={null}
              navBar={NavBar}
            />
            <Scene
              key="coin"
              component={CoinPage}
              onEnter={(coin) => {
                firebase.analytics().logEvent(`page_${Actions.currentScene}`, { coin: coin.symbol });
              }}
              back
              navBar={NavBar}
            />
          </Scene>
          <Scene component={ChatButton} />
          <Scene component={UnreadBadge} />
          <Scene component={ChatForm} />
          <Scene component={EventHandler} />

        </Overlay>
      </Router>
    );
  }
}
export default connect()(RouterComponent);
