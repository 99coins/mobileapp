import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import Colors from '@assets/colors.js';


const ChangeRow = ({ change, period }) =>  {

    return (
      <View style={styles.container}>
        <Text style={styles.changeStyle}>{change}</Text>
        <Text style={styles.periodStyle}>{period}</Text>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 50,
    flex: 1, 
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  changeStyle: {
    backgroundColor: Colors.themeGreenT,
    color: Colors.themeGreen,
    fontSize: 14,
    fontWeight: '800',
    borderRadius: 4,
    paddingRight: 7,
    paddingLeft: 7,
    paddingTop: 3,
    paddingBottom: 3,
  },
  periodStyle: {
    fontSize: 14,
    paddingLeft: 4,
  }
});

export default ChangeRow;
