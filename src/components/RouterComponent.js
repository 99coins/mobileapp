import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Scene, Router } from 'react-native-router-flux';

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
        >
             {/* Tab and it's scenes */}
             <Scene 
             key="News" 
             title="TOP NEWS STORIES" 
             icon={TabIcon} 
             component={Stories}                     
             navigationBarStyle={{ backgroundColor: 'rgb(167, 0, 26)' }}
             titleStyle={{ color: 'white' }}
             />

            {/* Tab and it's scenes */}
             <Scene key="Price" title="" icon={TabIcon} component={Rates} />
    
             {/* Tab and it's scenes */}
             <Scene key="AMA" title="" icon={TabIcon} component={Chat} />
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
