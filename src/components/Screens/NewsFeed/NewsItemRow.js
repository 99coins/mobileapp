import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableHighlight, Linking } from 'react-native';
import Images from '@assets/images.js';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';

class NewsItemRow extends Component {

  openUrl = (url) => {
    console.log(url);
   // Linking.openURL(url).catch(err => console.error('An error occurred', err));

    Actions.News_2({ url: url });
  }

    stripHtmlTags = (str) => {
       if ((str === null) || (str === '')) {
           return false;
       } 
       const strip = str.toString();
       return strip.replace(/<[^>]*>/g, ''); 
    }
    
   isFromLast24Hours = (date) => {
    const timeStamp = Math.round(new Date().getTime() / 1000);
    const timeStampYesterday = timeStamp - (24 * 3600);
    const is24 = date >= new Date(timeStampYesterday).getTime();
    return is24;
   }

    render() {
    let title = this.props.item.title;
    title = this.stripHtmlTags(title);

   const pubDate = this.props.item.published_on;
   const date = new Date(pubDate * 1000);
   let displayDate;
    if (this.isFromLast24Hours(date)) {
        displayDate = moment(date).format('HH:mm');
    } else {
      displayDate = moment(date).format('ddd, MMM DD, YYYY');
    }
    return (
        <TouchableHighlight onPress={() => this.openUrl(this.props.item.url)}>
            <View style={styles.container}>
              <View style={styles.firstLine}>
                   <Text numberOfLines={2} style={styles.titleStyle}>{title}</Text>
              </View>
              <View style={styles.secondLine}>
                 <Text style={styles.dateStyle}>{displayDate}</Text>
                 <Text style={styles.sourceStyle}>{this.props.item.source}</Text>
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
