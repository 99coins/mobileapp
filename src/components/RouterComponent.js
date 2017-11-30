/* eslint-disable global-require */

import React, { 
  Component } from 'react';
import {
  Text,
  Image
} from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';
import Images from '@assets/images.js';
import Colors from '@assets/colors.js';

import AMA from './Screens/AMA/AMA';
import Price from './Screens/Price/Price';
import NewsFeed from './Screens/NewsFeed/NewsFeed';
import NewsWebView from './Screens/WebView/NewsWebView';

import { connect } from 'react-redux';

import FetchCoinList from './../Actions/FetchCoinList';
import Header from './Header.js';

const Smooch = require('react-native-smooch');

const TabIcon = ({ selected, title }) => {
  return (
    <Text style={{ color: selected ? 'red' : 'black' }}>{title}</Text>
  );
};


class RouterComponent extends Component {

  constructor() {
      super();        
      this.selectedTab = 'Price';      
  }  
  componentDidMount() {
   // this.props.FetchCoinList();
  }  

  onEnterNews = () => {
    console.log('enter news');
     this.selectedTab = 'News';
  }

  onEnterPrices = () => {
     console.log('enter prices');
      this.selectedTab = 'News';
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

  openChat = () => {
   console.log('open chat');
   Smooch.show();
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
       <Scene
          key="root"
          navigationBarTitleImage={Images.logo}
          navigationBarTitleImageStyle={{
            resizeMode: 'contain',
            width: 180 }}
          navigationBarStyle={{ 
            backgroundColor: Colors.gray100,
            paddingTop: 16,
            paddingLeft: 8,
            shadowOpacity: 0,
            elevation: 0
          }}
       >

        <Scene
          key="tabbar"
          tabs
          tabBarStyle={{ backgroundColor: Colors.gray100 }}
          tabBarPosition={'top'}
          swipeEnabled
          lazy
          wrap={false}
          //navBar={Header}
        >
             {/* Tab and it's scenes */}
             <Scene 
             key="News" 
             icon={TabIcon} 
             lazy
             initial
             component={NewsFeed}
             onEnter={() => this.onEnterNews()}
             />

            {/* Tab and it's scenes */}
             <Scene 
             key="Price" 
             //title="LATEST PRICES" 
             icon={TabIcon} 
             component={Price} 
             onEnter={() => this.onEnterPrices()}
             lazy
             />
    
             {/* Tab and it's scenes */}
             <Scene 
             key="AMA" 
             title="" 
             icon={TabIcon} 
             component={AMA}
             onEnter={() => this.onEnterChat()}
             lazy
             />
        </Scene>
        <Scene
            key="News_2"
            component={NewsWebView}
            back
        /> 
       </Scene>
    </Router>
    );
  }
}

function mapStateToProps(state) {
    return {
        crypto: state.crypto
    }
}

export default connect(mapStateToProps, { FetchCoinList })(RouterComponent);

