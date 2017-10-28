import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableHighlight, Linking } from 'react-native';
import Images from '@assets/images.js';

class NewsItemRow extends Component {

  openUrl = (url) => {
    console.log(url);
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  }

    stripHtmlTags = (str) => {
       if ((str === null) || (str === '')) {
           return false;
       } 
       const strip = str.toString();
       return strip.replace(/<[^>]*>/g, ''); 
    }

    render() {
    console.log('render in NewsItemRow');

    let title = this.props.item.title[0];
    title = this.stripHtmlTags(title);
    console.log(title);

    return (
        <TouchableHighlight onPress={() => this.openUrl(this.props.item.link[0])}>
            <View style={styles.container}>
              <View style={styles.firstLine}>
                   <Text style={styles.titleStyle}>{title}</Text>
              </View>
              <View style={styles.secondLine}>
                 <Text style={styles.dateStyle}>OCT 18, 2017</Text>
                 <Text style={styles.sourceStyle}>www.cryptocompare.com</Text>
              </View>
            </View>
        </TouchableHighlight>
    );
    }
}

//styling

const styles = StyleSheet.create({
  container: {
    height: 80,
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'rgb(238, 238, 238)',
    paddingTop: 10,
    paddingBottom: 10
  },
  firstLine: {
    flex: 0.6,
    flexDirection: 'column',
    justifyContent: 'center',

  },
  secondLine: {
    flex: 0.4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingLeft: 16,
    paddingRight: 16
  },
  titleStyle: {
   flexWrap: 'wrap',
   fontSize: 16,
   fontWeight: '600',
   color: 'rgb(33, 33, 33)',
   paddingLeft: 16,
   paddingRight: 10
  },
  dateStyle: {
   fontSize: 13,
   color: 'rgb(97, 97, 97)'
  },
  sourceStyle: {
   fontSize: 12,
   color: 'rgb(97, 97, 97)'
  },
  imageStyle: {
   flex: 0.08,
  },
});

export default NewsItemRow;
