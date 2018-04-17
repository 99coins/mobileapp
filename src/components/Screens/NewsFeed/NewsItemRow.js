import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, Dimensions } from 'react-native';
import Images from '@assets/images.js';
import Colors from '@assets/colors.js';
import moment from 'moment';
import { capitalizeFirstLetter } from '../../common';
import * as Progress from 'react-native-progress';
import { CachedImage } from 'react-native-img-cache';


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
    return (
      <TouchableHighlight onPress={this._onPress}>
        <View style={styles.container}>
          <CachedImage
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
              <Text style={styles.dateStyle}>{displayDate}</Text>
              <Text style={styles.sourceStyle}>{capitalizeFirstLetter(this.props.item.source)}</Text>
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
    height: 80,
    width: windowWidth,
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
    flex: 1,
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
