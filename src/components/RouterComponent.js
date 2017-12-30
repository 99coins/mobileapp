/* eslint-disable global-require */

import React, { 
  Component } from 'react';
import { Scene, Router, Actions, Overlay } from 'react-native-router-flux';
import Images from '@assets/images.js';
import Colors from '@assets/colors.js';
import Price from './Screens/Price/Price';
import NewsFeed from './Screens/NewsFeed/NewsFeed';
import NewsWebView from './Screens/WebView/NewsWebView';
import ChatButton from './ChatButton';

class RouterComponent extends Component {

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
             //icon={TabIcon} 
             component={NewsFeed}
             //onEnter={() => this.onEnterNews()}
             lazy
             />

            {/* Tab and it's scenes */}
             <Scene 
             key="Price" 
             component={Price} 
             //onEnter={() => this.onEnterPrices()}
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
        <Scene component={ChatButton} />
      </Overlay>
    </Router>
    );
  }
}   
export default RouterComponent;
