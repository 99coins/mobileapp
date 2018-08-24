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
    justifyContent: 'center',
    position: 'absolute',
    alignSelf: 'center',
    padding: 4,
    borderRadius: 4,
    top: 16,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 0 }
  }
};

export default LoadingBar;

