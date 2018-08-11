import React from 'react';
import { Text, View } from 'react-native';
import Colors from '@assets/colors.js';

const LoadingBar = ({ title }) => {
  const { containerStyle, textStyle } = styles;

  return (
    <View style={containerStyle}>
      <Text style={textStyle}>
        {title}
      </Text>
    </View>
  );
};

const styles = {
  textStyle: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600'
  },
  containerStyle: {
    backgroundColor: Colors.themeRed,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center'
  }
};

export default LoadingBar;

