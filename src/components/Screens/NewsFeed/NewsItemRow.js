import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import Image from 'react-native-image-progress';
import Images from '@assets/images.js';
import Colors from '@assets/colors.js';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';

import * as Progress from 'react-native-progress';

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
            <Image
                style={styles.image}
                 source={{ uri: this.props.item.imageurl }}
                 indicator={Progress.CircleSnail}
                 indicatorProps={{
                  color: Colors.themeRed,
                  }}
            />
            <View style={styles.textContainer}>
              <View style={styles.firstLine}>
                   <Text numberOfLines={2} style={styles.titleStyle}>{title}</Text>
              </View>
              <View style={styles.secondLine}>
                 <Text style={styles.dateStyle}>{displayDate}</Text>
                 <Text style={styles.sourceStyle}>{this.props.item.source}</Text>
              </View>
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
    flexDirection: 'row',
    paddingLeft: 8,
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 8,
    backgroundColor: Colors.gray50

  },
  image: {
    width: 74, 
    height: 64
  },
  textContainer: {
    flex: 0.6,
    justifyContent: 'space-between',
    paddingLeft: 10
    },
  firstLine: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  secondLine: {
    flex: 0.4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
    },
  titleStyle: {
   flexWrap: 'wrap',
   fontSize: 16,
   fontWeight: 'bold',
   color: Colors.gray900
  },
  dateStyle: {
   fontSize: 13,
   color: Colors.gray700
  },
  sourceStyle: {
   fontSize: 12,
   color: Colors.gray700
  },
  imageStyle: {
   flex: 0.08,
  },
});

export default NewsItemRow;
