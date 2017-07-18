/* eslint-disable global-require */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import { Scene, Router } from 'react-native-router-flux';
import Images from '@assets/images.js';

import Chat from './Screens/Chat';
import Rates from './Screens/Rates';
import Stories from './Screens/Stories';


const TabIcon = ({ selected, title }) => {
  return (
    <Text style={{ color: selected ? 'red' : 'black' }}>{title}</Text>
  );
};

const RouterComponent = () => {
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
             component={Stories}                     
             navigationBarStyle={{ backgroundColor: 'rgb(167, 0, 26)' }}
             titleStyle={{ color: 'white' }}
             icon={() => (<Image source={Images.newsIcon} />)}
             />

            {/* Tab and it's scenes */}
             <Scene 
             key="Price" 
             title="" 
             icon={TabIcon} 
             component={Rates} 
             icon={() => (<Image source={Images.priceIcon} />)}

             />
    
             {/* Tab and it's scenes */}
             <Scene 
             key="AMA" 
             title="" 
             icon={TabIcon} 
             component={Chat}
             icon={() => (<Image source={Images.amaIcon} />)}
 
             />
        </Scene>

    </Router>
    );
};

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
