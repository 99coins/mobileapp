import React from 'react';
import { AppRegistry } from 'react-native';
import moment from 'moment';
import Header from './src/components/Header';

// Create a component
const App = () => (
    <Header titleText={'TOP NEWS STORIES'} subtitleText={moment().format('MMMM Do, YYYY')} />
);

// Render it to the device
AppRegistry.registerComponent('NNBitcoins', () => App);
