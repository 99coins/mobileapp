import React from 'react';
import { AppRegistry } from 'react-native';
import Header from './src/components/Header';

// Create a component
const App = () => (
    <Header titleText={'TOP NEWS STORIES'} subtitleText={'July 2nd, 2017'} />
);

// Render it to the device
AppRegistry.registerComponent('NNBitcoins', () => App);
