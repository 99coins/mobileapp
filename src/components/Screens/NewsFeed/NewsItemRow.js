import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Images from '@assets/images.js';

const NewsItemRow = (props) => {

    return (
        <View style={styles.container}>
             <Text style={styles.titleStyle}>{props.item.title}</Text>
             <View style={styles.imageStyle}>
                <Image source={Images.chevronIcon} />
             </View>
        </View>
    );
};

//styling

const styles = StyleSheet.create({
  container: {
    height: 60,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white'

  },
  titleStyle: {
   fontSize: 18,
   paddingLeft: 16
  },
  imageStyle: {
   paddingRight: 16
  },
});

export default NewsItemRow;
