import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, Dimensions } from 'react-native';
import Images from '@assets/images.js';
import Colors from '@assets/colors.js';
import moment from 'moment';
import { capitalizeFirstLetter } from '../../common';
import * as Progress from 'react-native-progress';
import Image from 'react-native-image-progress';

class NewsItemRow extends Component {

  shouldComponentUpdate(nextProps) {
    const update = (this.props.id !== nextProps.id);
    return update;
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
  isToday = (date) => {
    const today = new Date();

    return today.toDateString() === date.toDateString();
  }
  _onPress = () => {
    this.props.onPressItem(this.props.item);
  };
  render() {
    let title = this.props.item.title;
    title = this.stripHtmlTags(title);

    const pubDate = this.props.item.published_on;
    const date = new Date(pubDate * 1000);
    let displayDate;
    if (this.isToday(date)) {
      displayDate = moment(date).format('HH:mm');
    } else {
      displayDate = moment(date).format('ddd, MMM DD, YYYY');
    }
    console.log('Render News Item Row');
    if (this.props.item.sponsored) {
      console.log(this.props.item.imageurl);
    }

    return (
      <TouchableHighlight onPress={this._onPress}>
        <View style={[styles.container, this.props.item.sponsored && styles.sponsored]}>
          <Image
            style={styles.image}
            source={{ uri: this.props.item.imageurl }}
            cache='force-cache'
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
             <Text style={styles.sourceStyle}>{capitalizeFirstLetter(this.props.item.source)}</Text>
              <Text style={[styles.dateStyle, this.props.item.sponsored && styles.sponsoredSource]}>{this.props.item.sponsored ? 'Sponsored' : displayDate}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

//styling
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    height: 128,
    width: windowWidth,
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 16,
    paddingTop: 16,
    paddingBottom: 16,
    paddingRight: 16,
    backgroundColor: Colors.gray50
  },
  sponsored: {
    //backgroundColor: Colors.sponsoredYellow
  },
  image: {
    width: 96,
    height: 96,
    borderRadius: 4
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-end',
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
    alignItems: 'flex-end',
    paddingBottom: 7,

  },
  titleStyle: {
    flexWrap: 'wrap',
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.gray900,
    lineHeight: 24,
    paddingBottom: 16,

  },
  dateStyle: {
    fontSize: 12,
    color: Colors.gray700
  },
  sourceStyle: {
    fontSize: 12,
    color: Colors.gray700,
  },
  sponsoredSource: {
    backgroundColor: Colors.sponsoredYellow,
    top: 4,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 4,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 16,  
  },
  imageStyle: {
    flex: 0.08,
  },
});

export default NewsItemRow;
