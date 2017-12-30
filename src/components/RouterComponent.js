/* eslint-disable global-require */

import React, { 
  Component } from 'react';
import {
  Text,
  Image,
  View
} from 'react-native';
import { Scene, Router, Actions, Overlay } from 'react-native-router-flux';
import Images from '@assets/images.js';
import Colors from '@assets/colors.js';
import AMA from './Screens/AMA/AMA';
import Price from './Screens/Price/Price';
import NewsFeed from './Screens/NewsFeed/NewsFeed';
import NewsWebView from './Screens/WebView/NewsWebView';
import ChatButton from './ChatButton';

class RouterComponent extends Component {

  constructor() {
      super();        
      this.selectedTab = 'Price';      
  }
  onEnterNews = () => {
    console.log('enter news');
     this.selectedTab = 'News';
  }

  onEnterPrices = () => {
     console.log('enter prices');
      this.selectedTab = 'Price';
  }

  onEnterChat = () => {
    this.openChat();

    this.openLastSeletedTab();
    // setTimeout(() => this.openLastSeletedTab(),
    // 1000);
  }  
  onBackPress = () => {
    console.log('back press');
    if (Actions.currentScene === 'News_2') {
      Actions.pop();
      return true;
    }

     return false;
  }
  openLastSeletedTab = () => {
    //const selectedTab = this.state.selected;
    if (this.selectedTab === 'News') {
      console.log('selected news');
      Actions.News();
    } else {
     console.log('selected price');

      Actions.Price();
    }
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
             onEnter={() => this.onEnterNews()}
             lazy
             />

            {/* Tab and it's scenes */}
             <Scene 
             key="Price" 
             //title="LATEST PRICES" 
             //icon={TabIcon} 
             component={Price} 
             onEnter={() => this.onEnterPrices()}
             lazy
             initial

             />
    
              {/* Tab and it's scenes 
             <Scene 
             key="AMA" 
             title="LIVE CHAT" 
             //icon={TabIcon} 
             component={AMA}
             onEnter={() => this.onEnterChat()}
             lazy
             /> */}
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
const styles = {
    tab: {
      backgroundColor: Colors.gray100,
      color: 'red'
    }
};    
export default RouterComponent;
