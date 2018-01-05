import React from 'react';
import { TextInput, View } from 'react-native';
import Colors from '@assets/colors.js';

const Input = ({ value, onChangeText, placeholder, secureTextEntry }) => {
  const { inputStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false}
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
        autoFocus
      />
    </View>
  );
};

const styles = {
  inputStyle: {
    paddingRight: 16,
    paddingLeft: 16,
    lineHeight: 23,
    flex: 2,
    color: Colors.gray700,
    fontSize: 16,
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
};

export { Input };
