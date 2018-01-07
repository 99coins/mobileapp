import React from 'react';
import { Text, View } from 'react-native';
import Colors from '@assets/colors.js';

const Badge = ({ number }) => {
  const { badgeStyle, textStyle } = styles;

  return (
    <View style={badgeStyle}>
      <Text style={textStyle}>
        {number}
      </Text>
    </View>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: Colors.themeRed,
    fontSize: 12,
    fontWeight: '600'
  },
  badgeStyle: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.themeRed,
    width: 20,
    height: 20,
    right: 30,
    bottom: 70,
    justifyContent: 'center'
  }
};

export { Badge };
