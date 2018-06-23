
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
export default class ArrowBubble extends Component {

  render() {
    return (
      <View
        style={[styles.talkBubble, this.props.style]}
      >
        <View
          style={[styles.talkBubbleSquare, {
            backgroundColor: this.props.backgroundColor
          }]}
          /* onLayout={(event: Object) => {
            // pull out width and height out of event.nativeEvent.layout
            const {
           nativeEvent: {
            layout: {
              width,
           }
           }
           } = event;
           const left = this.props.point.x < 250 ? this.props.point.x + 8 : this.props.point.x - width;
            // update the state
            this.setState({
              left,
            });
          }} */
        >
          <Text style={styles.title}>{this.props.title}</Text>
        </View>
        <View style={styles.talkBubbleTriangle} />
      </View >
    );
  }
}
const styles = StyleSheet.create({
  talkBubble: {
    //backgroundColor: 'transparent',
    position: 'absolute',
    overflow: 'visible'
  },
  talkBubbleSquare: {
    //width: 65,
    paddingLeft: 4,
    paddingRight: 4,
    height: 24,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  talkBubbleTriangle: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    borderTopColor: 'transparent',
    borderTopWidth: 13,
    borderRightWidth: 52,
    borderRightColor: 'transparent',
    borderBottomWidth: 13,
    borderBottomColor: 'transparent',
  },
  title: {
    color: 'white',
    fontSize: 14
  }
});
