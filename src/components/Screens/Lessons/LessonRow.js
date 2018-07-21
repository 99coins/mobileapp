import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, Dimensions } from 'react-native';
import Images from '@assets/images.js';
import Colors from '@assets/colors.js';
import moment from 'moment';
import { capitalizeFirstLetter } from '../../common';
import * as Progress from 'react-native-progress';
import Image from 'react-native-image-progress';

class LessonRow extends Component {

  shouldComponentUpdate(nextProps) {
    const update = (this.props.id !== nextProps.id || this.props.selected !== nextProps.selected);
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
    this.props.onPressItem(this.props.id);
  };
  render() {
    return (
      <TouchableHighlight onPress={this._onPress}>
        <View style={[styles.container, this.props.selected && styles.selected]}>
          <Image
            style={styles.image}
            source={{ uri: `https://img.youtube.com/vi/${this.props.item.youtubeVideoId}/hqdefault.jpg` }}
            cache='force-cache'
            indicator={Progress.CircleSnail}
            indicatorProps={{
              color: Colors.themeRed,
            }}
            //resizeMode='contain'
          />
          <View style={styles.textContainer}>
            <View style={styles.firstLine}>
              <Text style={styles.titleStyle}>{this.props.item.title}</Text>
            </View>
            <View style={styles.secondLine}>
              <Text style={styles.sourceStyle}>{this.props.item.duration}</Text>
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
    height: 88,
    width: windowWidth,
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 16,
    paddingTop: 16,
    paddingBottom: 16,
    paddingRight: 20,
    backgroundColor: Colors.gray50
  },
  selected: {
    backgroundColor: Colors.gray100
  },
  image: {
    width: 100,
    height: 56,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: Colors.gray300,
    overflow: 'hidden'
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
    paddingBottom: 5,

  },
  titleStyle: {
    flexWrap: 'wrap',
    fontSize: 14,
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

export default LessonRow;
