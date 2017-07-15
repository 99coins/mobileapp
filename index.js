import React from 'react';
import moment from 'moment';
import Header from './src/components/Header';

// Create a component
const App = () => (
    <Header titleText={'TOP NEWS STORIES'} subtitleText={moment().format('MMMM Do, YYYY')} />
);

export default App;

