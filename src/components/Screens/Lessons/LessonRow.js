import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, Dimensions } from 'react-native';
import Images from '@assets/images.js';
import Colors from '@assets/colors.js';
import moment from 'moment';
import * as Progress from 'react-native-progress';
import Image from 'react-native-image-progress';

class LessonRow extends Component {

  onPress = () => {
    this.props.onPressItem(this.props.id);
  };
  render() {
    return (
      <TouchableHighlight onPress={this.onPress}>
        <View style={[styles.container, this.props.selected && styles.selected]}>
          <Image
            style={styles.image}
            source={{ uri: this.props.item.snippet.thumbnails.default.url }}
            cache='force-cache'
            indicator={Progress.CircleSnail}
            indicatorProps={{
              color: Colors.themeRed,
            }}
          />
          <View style={styles.textContainer}>
              <Text numberOfLines={2} style={styles.titleStyle}>{this.props.item.snippet.title}</Text>
              <Text style={styles.sourceStyle}>{moment.duration(this.props.item.contentDetails.duration).humanize()}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

//styling
const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    height: 88,
    flexDirection: 'row',
    padding: 16,
    backgroundColor: Colors.gray50,
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
    justifyContent: 'space-around',
    flex: 1,
    left: 16,
    marginRight: 16
  },
  titleStyle: {
    flexWrap: 'wrap',
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.gray900
  },
  dateStyle: {
    fontSize: 12,
    color: Colors.gray700
  },
  sourceStyle: {
    fontSize: 12,
    color: Colors.gray700,
  },
  imageStyle: {
    flex: 0.08,
  },
});

export default LessonRow;
