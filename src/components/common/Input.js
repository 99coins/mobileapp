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
        placeholderTextColor={Colors.gray300}
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
    paddingRight: 26,
    paddingLeft: 26,
    lineHeight: 23,
    flex: 2,
    color: Colors.gray900,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  labelStyle: {
    fontSize: 14,
    paddingLeft: 20,
    flex: 1
  },
  containerStyle: {
    height: 40,
    width: 247,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.gray50,
    borderWidth: 1,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 24,
    borderRadius: 2
  }
};

export { Input };
