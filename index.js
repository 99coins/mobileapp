import React from 'react';
import Store from './src/Store';
import { Provider } from 'react-redux';
import RouterComponent from './src/components/RouterComponent';
import { View, StatusBar, StyleSheet } from 'react-native';

// Create a component
const App = () => (
    <Provider store={Store}>
        <View style={styles.application}>
            <StatusBar />
            <RouterComponent />
        </View>
    </Provider>
);
const styles = StyleSheet.create({
    application: {
      flexDirection: 'column',
      flex: 1,
    },

  });

export default App;

