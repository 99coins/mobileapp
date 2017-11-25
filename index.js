import React from 'react';
import Store from './src/Store';
import { Provider } from 'react-redux';
import RouterComponent from './src/components/RouterComponent';

// Create a component
const App = () => (
    <Provider store={Store}>
        <RouterComponent />
    </Provider>
);

export default App;

