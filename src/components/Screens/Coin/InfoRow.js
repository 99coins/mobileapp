import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import Colors from '@assets/colors.js';


const InfoRow = ({ title, subtile, badge }) => {
    return (
      <View style={styles.container}>
        <View style={styles.internalContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtile}>{subtile}</Text>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'gray',
    height: 104,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'

  },
  internalContainer: {
    backgroundColor: 'white',
    height: 88,
    flex: 1,
    marginLeft: 24,
    marginRight: 24,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.gray100
  },
  title: {
    fontSize: 32,
    color: Colors.gray900

  },
  subtile: {
    fontSize: 16,
    color: Colors.gray300

  },
  badge: {

  }
});

export default InfoRow;