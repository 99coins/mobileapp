/* eslint-disable global-require */

import React, {
  Component
} from 'react';
import { Scene, Router, Actions, Overlay } from 'react-native-router-flux';
import Images from '@assets/images.js';
import Colors from '@assets/colors.js';
import Price from './Screens/Price/Price';
import NewsFeed from './Screens/NewsFeed/NewsFeed';
import NewsWebView from './Screens/WebView/NewsWebView';
import ChatForm from './Screens/AMA/ChatForm';
import ChatButton from './Screens/AMA/ChatButton';
import UnreadBadge from './Screens/AMA/UnreadBadge';
import EventHandler from './EventHandler';

import { connect } from 'react-redux';
import fetchNewsList from '../Actions/FetchNewsList';
import fetchPriceData from '../Actions/FetchPriceData';
import { getUnreadCount } from '../Actions/ChatActions';
import firebase from 'react-native-firebase';

class RouterComponent extends Component {
  constructor() {
    super();
    firebase.analytics().setAnalyticsCollectionEnabled(true);
  }
  onBackPress = () => {
    console.log('back press');
    if (Actions.currentScene === 'article') {
      Actions.pop();
      return true;
    }
    return false;
  }
  render() {
    return (
      <Router backAndroidHandler={this.onBackPress}>
        <Overlay key="overlay">
          <Scene
            key="root"
            navigationBarTitleImage={Images.logo}
            navigationBarTitleImageStyle={{
              resizeMode: 'contain',
              width: 180,
              marginTop: 8
            }}
            navigationBarStyle={{
              backgroundColor: Colors.gray100,
              paddingLeft: 8,
              shadowOpacity: 0,
              justifyContent: 'center',
              elevation: 0,
              borderBottomColor: 'transparent'
            }}
            backButtonTintColor={Colors.themeRed}
          >

            <Scene
              key="tabbar"
              tabs
              tabBarStyle={{ backgroundColor: Colors.gray100 }}
              tabBarPosition={'top'}
              swipeEnabled
              wrap={false}
              activeTintColor={Colors.themeRed}
              inactiveTintColor={Colors.gray700}
              labelStyle={{ fontWeight: 'bold' }}
              focused
              indicatorStyle={{ backgroundColor: Colors.themeRed }}
            //navBar={Header}
            >
              {/* Tab and it's scenes */}
              <Scene
                key="News"
                //icon={TabIcon} 
                component={NewsFeed}
                /* onEnter={() => this.onEnterNews()} */

                onEnter={() => {
                  console.log('on enter news');
                  this.props.fetchNewsList();
                  this.props.getUnreadCount();
                  firebase.analytics().logEvent(`page_${Actions.currentScene.toLowerCase()}`, {});
                }}

                lazy
              />

              {/* Tab and it's scenes */}
              <Scene
                key="Price"
                component={Price}
                //onEnter={() => this.onEnterPrices()}
                onEnter={() => {
                  console.log('on enter prices');
                  this.props.fetchPriceData();
                  this.props.getUnreadCount();
                  firebase.analytics().logEvent(`page_${Actions.currentScene.toLowerCase()}`, {});
                }}

                lazy
                initial

              />
            </Scene>
            <Scene
              key="article"
              component={NewsWebView}
              rightButtonImage={Images.shareIcon}
              onRight={(scene) => {
                console.log(scene);
                scene.component.prototype.onShare(scene.url);
              }}
              onEnter={(scene) => {
                firebase.analytics().logEvent(`page_${Actions.currentScene}`, { url: scene.url });
              }}
              back
              navigationBarTitleImage={null}
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


export default connect(null, { fetchNewsList, fetchPriceData, getUnreadCount })(RouterComponent);
