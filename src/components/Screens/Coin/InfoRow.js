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
        <View style={badge != null ? styles.badge : styles.nobadge}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    height: 104,
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // flexDirection: 'row'

  },
  internalContainer: {
    backgroundColor: 'white',
    height: 88,
    flex: 1,
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 24,
    marginRight: 24,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.gray100,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 16,
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
    position: 'absolute',
    marginTop: 0,
    marginLeft: 16,
    backgroundColor: Colors.gray900,
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 24,
    borderRadius: 12,
    borderColor: Colors.gray100,
    borderWidth: 1
  },
  nobadge: {
    height: 0
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '800'
  },
});

export default InfoRow;