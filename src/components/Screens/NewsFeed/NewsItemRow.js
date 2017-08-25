import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableHighlight, Linking } from 'react-native';
import Images from '@assets/images.js';

class NewsItemRow extends Component {

  openUrl = (url) => {
    console.log(url);
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  }

    render() {
      
     console.log('render in NewsItemRow');
    let desc = this.props.item.description.replace('<p><strong>', '');
    desc = desc.replace('</strong></p>', '');
    console.log(desc);

    return (
        <TouchableHighlight onPress={() => this.openUrl(this.props.item.link)}>
            <View style={styles.container}>
             <Text style={styles.titleStyle}>{desc}</Text>
             <View style={styles.imageStyle}>
                <Image source={Images.chevronIcon} />
             </View>
            </View>
        </TouchableHighlight>
    );
    }
}

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
