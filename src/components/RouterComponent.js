/* eslint-disable global-require */

import React, { 
  Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import { Scene, Router, TabView } from 'react-native-router-flux';
import Images from '@assets/images.js';


import AMA from './Screens/AMA/AMA';
import Price from './Screens/Price/Price';
import NewsFeed from './Screens/NewsFeed/NewsFeed';


const TabIcon = ({ selected, title }) => {
  return (
    <Text style={{ color: selected ? 'red' : 'black' }}>{title}</Text>
  );
};

class RouterComponent extends Component {
    
  openChat = () => {
   console.log('open chat');
   const Smooch = require('react-native-smooch');
   Smooch.show();


  };

  render() {
    return (
     <Router>
        <Scene
          key="tabbar"
          tabs={true}
          tabBarStyle={{ backgroundColor: 'rgb(39, 40, 45)' }}
          swipeEnabled={true}
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
             />

            {/* Tab and it's scenes */}
             <Scene 
             key="Price" 
             title="" 
             icon={TabIcon} 
             component={Price} 
             navigationBarStyle={{ backgroundColor: 'white' }}
             icon={() => (<Image source={Images.priceIcon} />)}
             />
    
             {/* Tab and it's scenes */}
             <Scene 
             key="AMA" 
             title="" 
             icon={TabIcon} 
             component={AMA}
             icon={() => (<Image source={Images.amaIcon} />)}
             onEnter={() => this.openChat()}
             />
        </Scene>

    </Router>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
// });


export default RouterComponent;
