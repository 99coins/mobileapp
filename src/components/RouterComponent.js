/* eslint-disable global-require */

import React, { 
  Component } from 'react';
import { Scene, Router, Actions, Overlay } from 'react-native-router-flux';
import Images from '@assets/images.js';
import Colors from '@assets/colors.js';
import Price from './Screens/Price/Price';
import NewsFeed from './Screens/NewsFeed/NewsFeed';
import NewsWebView from './Screens/WebView/NewsWebView';
import Chat from './Screens/AMA/AMA';
import { connect } from 'react-redux';
import FetchNewsList from '../Actions/FetchNewsList';
import FetchPriceData from '../Actions/FetchPriceData';

class RouterComponent extends Component {

  componentDidUpdate() {
    console.log('componentDidUpdate');
  }
  onBackPress = () => {
    console.log('back press');
    if (Actions.currentScene === 'News_2') {
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
             name="NewsFeed" 
             //icon={TabIcon} 
             component={NewsFeed}
             /* onEnter={() => this.onEnterNews()} */

             onEnter={() => {
              console.log('on enter news');
              this.props.FetchNewsList();
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
              this.props.FetchPriceData();
             }}

             lazy
             initial

             />
        </Scene>
        <Scene
            key="News_2"
            component={NewsWebView}
            rightButtonImage={Images.shareIcon}
            onRight={(scene) => {
              console.log(scene);
               scene.component.prototype.onShare(scene.url);
            }}
            back
        />
       </Scene>
        <Scene component={Chat} />        
      </Overlay>
    </Router>
    );
  }
}   


export default connect(null, { FetchNewsList, FetchPriceData })(RouterComponent);
