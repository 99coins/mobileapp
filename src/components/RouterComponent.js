/* eslint-disable global-require */

import React, { 
  Component } from 'react';
import {
  Text,
  Image
} from 'react-native';
import { Scene, Router, TabView, Actions } from 'react-native-router-flux';
import Images from '@assets/images.js';


import AMA from './Screens/AMA/AMA';
import Price from './Screens/Price/Price';
import NewsFeed from './Screens/NewsFeed/NewsFeed';

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
    setTimeout(() => this.openLastSeletedTab(),
    1000);
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
    
  openChat = () => {
   console.log('open chat');
   Smooch.show();
  }

  render() {
    return (
     <Router>
        <Scene
          key="tabbar"
          tabs
          tabBarStyle={{ backgroundColor: 'rgb(39, 40, 45)' }}
          swipeEnabled
          lazy
        >
             {/* Tab and it's scenes */}
             <Scene 
             key="News" 
             title="TOP NEWS STORIES" 
             icon={TabIcon} 
             component={NewsFeed}                     
             navigationBarStyle={{ backgroundColor: 'rgb(167, 0, 26)' }}
             titleStyle={{ color: 'white' }}
             icon={() => (<Image source={Images.newsIcon} />)}
             onEnter={() => this.onEnterNews()}
             lazy
             />

            {/* Tab and it's scenes */}
             <Scene 
             initial
             key="Price" 
             title="LATEST PRICES" 
             icon={TabIcon} 
             component={Price} 
             navigationBarStyle={{ backgroundColor: 'rgb(167, 0, 26)' }}
             titleStyle={{ color: 'white' }}
             icon={() => (<Image source={Images.priceIcon} />)}
             onEnter={() => this.onEnterPrices()}
             lazy
             />
    
             {/* Tab and it's scenes */}
             <Scene 
             key="AMA" 
             title="" 
             icon={TabIcon} 
             component={AMA}
             icon={() => (<Image source={Images.amaIcon} />)}
             onEnter={() => this.onEnterChat()}
             lazy
             />
        </Scene>

    </Router>
    );
  }
}
export default RouterComponent;
