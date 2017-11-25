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


const Smooch = require('react-native-smooch');

const TabIcon = ({ selected, title }) => {
  return (
    <Text style={{ color: selected ? 'red' : 'black' }}>{title}</Text>
  );
};


class RouterComponent extends Component {

  constructor() {
      super();        
      this.selectedTab = 'News';      
  }  
  componentDidMount() {
    this.props.FetchCoinList();
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
          key="tabbar"
          tabs
          tabBarStyle={{ backgroundColor: Colors.gray200 }}
          tabBarPosition={'bottom'}
          swipeEnabled
          lazy
          headerTintColor='white'
        >
             {/* Tab and it's scenes */}
             <Scene 
             key="News" 
             title="NEWS" 
             icon={TabIcon} 
             navigationBarStyle={{ backgroundColor: Colors.gray200 }}
             titleStyle={{ color: 'white' }}
             icon={() => (<Image source={Images.newsIcon} style={{ width: 24, height: 24 }} />)}
             lazy
             >
              <Scene
                key="News_1"
                component={NewsFeed}
                onEnter={() => this.onEnterNews()}

              />
              <Scene
                key="News_2"
                component={NewsWebView}
                back
              />
             </Scene>
            {/* Tab and it's scenes */}
             <Scene 
             key="Price" 
             title="LATEST PRICES" 
             icon={TabIcon} 
             component={Price} 
             navigationBarStyle={{ backgroundColor: Colors.gray200 }}
             titleStyle={{ color: 'white' }}
             icon={() => (<Image source={Images.priceIcon} style={{ width: 24, height: 24 }} />)}
             onEnter={() => this.onEnterPrices()}
             lazy
             />
    
             {/* Tab and it's scenes */}
             <Scene 
             key="AMA" 
             title="" 
             icon={TabIcon} 
             component={AMA}
             icon={() => (<Image source={Images.amaIcon} style={{ width: 30, height: 24 }} />)}
             onEnter={() => this.onEnterChat()}
             lazy
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

