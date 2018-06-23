// @flow

import React, { Component } from 'react';
import {
  Dimensions,
  LayoutAnimation,
  StyleSheet,
  View
} from 'react-native';
import {
  Group,
  Path,
  Surface,
  Shape
} from 'react-native/Libraries/ART/ReactNativeART';

import Colors from '@assets/colors.js';
import ArrowBubble from './ArrowBubble';
import { connect } from 'react-redux';


const numeral = require('numeral');

class Line extends Component {

  props: {
    fillColor: string,
    strokeColor: string,
    strokeWidth: number,
  };

  static defaultProps = {
    fillColor: Colors.chartOrange,       // solid violet color
    strokeColor: Colors.chartBorderOrange,  // semi-transparent violet
    strokeWidth: 1,
  };

  // state = 
  //   // set initial width to screen width so when animated it stays constant,
  //   // try setting it to zero and see what happens on initial load
  //   width: Dimensions.get('window').width - 50,
  //   // set initial height to zero so when updated to actual height and
  //   // animated, the chart raises from the bottom to the top of the container
  //   height: 0,

  //   highPoint: { x: 0, y: 0 },
  //   lowPoint: { x: 0, y: 0 },
  //   path: null
  // };

  // componentWillReceiveProps(nextProps) {
  //   //this.setState({ path: this.buildPath(nextProps.values) });
  //   this.buildPath(nextProps.values);
  //   console.log('Path:', this.state.path);
  //   console.log('highPoint', this.state.path);
  // }
  // shouldComponentUpdate(nextProps, nextState) {
  //     return (this.state.path !== nextState.path);
  // }
  componentWillUpdate() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }
  // Handle container view's onLayout event to get its width and height after rendered and
  // update the state so the component can render the chart using actual width and height
  // onLayout = (event: Object) => {
  //   // pull out width and height out of event.nativeEvent.layout
  //   const {
  //     nativeEvent: {
  //       layout: {
  //         width,
  //     height
  //       }
  //     }
  //   } = event;
  //   // update the state
  //   this.setState({
  //     width,
  //     height,
  //   });
  // };

  // buildPath = (values: Array<number>) => {
  //   const {
  //     strokeWidth,
  //   } = this.props;
  //   const {
  //     width,
  //     height,
  //   } = this.state;

  //   let firstPoint: boolean = true;
  //     // holds x and y coordinates of the previous point when iterating
  //   let previous: { x: number, y: number };

  //   const minValue = Math.min(...values);
  //   const maxValue = Math.max(...values) - minValue;
  //     // step between each value point on horizontal (x) axis
  //   const stepX = width / (values.length - 1 || 1);
  //     // step between each value point on vertical (y) axis
  //   const stepY = maxValue ? (height - (strokeWidth * 2)) / maxValue : 0;
  //     // adjust values so that min value becomes 0 and goes to the bottom edge
  //   const adjustedValues = values.map(value => value - minValue)
  //     ;
  //   // start from the left bottom corner so we could fill the area with color
  //   const path = Path().moveTo(-strokeWidth, strokeWidth);

  //   let high: { x: number, y: number };
  //   let low: { x: number, y: number };

  //   adjustedValues.forEach((number, index) => {
  //     const x = index * stepX;
  //     const y = (-number * stepY) - strokeWidth;

  //     if (number === maxValue) {
  //         high = { x, y };
  //     }
  //     if (number === 0) {
  //         low = { x, y };
  //     }
  //     if (firstPoint) {
  //       // straight line to the first point
  //       path.lineTo(-strokeWidth, y);
  //     } else {
  //       // make curved line
  //       path.curveTo(previous.x + (stepX / 3), previous.y, x - (stepX / 3), y, x, y);
  //     }
  //     // save current x and y coordinates for the next point
  //     previous = { x, y };
  //     firstPoint = false;
  //   });

  //   this.setState({
  //         highPoint: high,
  //         lowPoint: low,
  //         path: path.lineTo(width + strokeWidth, strokeWidth).close()
  //   }); 
  //     // line to the right bottom corner so we could fill the area with color
  // };

  render() {
    const {
      fillColor,
      strokeColor,
      strokeWidth
    } = this.props;

    const {
      high,
      low,
      highPoint,
      lowPoint,
      path,
    } = this.props.chartData;

    console.log('LINE', highPoint);

    return (
      <View
        style={styles.container}
        onLayout={this.onLayout}
      >
        <Surface style={{ borderRadius: 8 }} width={Dimensions.get('window').width - 50} height={200}>
          <Group style={{ borderRadius: 8 }} x={0} y={200}>
            <Shape
              d={path}
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />
          </Group>
        </Surface>
        <ArrowBubble
          backgroundColor={Colors.themeGreen}
          title={high}
          point={highPoint}
          style={{
            left: highPoint.x < 250 ? highPoint.x : highPoint.x - 50,
            bottom: -highPoint.y - 26
          }}
        />
        <ArrowBubble
          backgroundColor={Colors.themeRed}
          title={low}
          style={{
            left: lowPoint.x < 250 ? lowPoint.x : lowPoint.x - 50,
            bottom: -lowPoint.y + 10
          }}
        />
        <View
          style={[styles.badge, {
            left: highPoint.x,
            bottom: -highPoint.y,
            backgroundColor: Colors.themeGreen,
          }]} 
        />
        <View 
          style={[styles.badge, {
            left: lowPoint.x,
            bottom: -lowPoint.y,
            backgroundColor: Colors.themeRed,
          }]}
        />
        

      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // align at the bottom of the container so when animated it rises to the top
    justifyContent: 'flex-end',
    borderRadius: 8
  },
  badge: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 8,
    height: 8,
    borderRadius: 4,
    borderColor: Colors.gray100,
    borderWidth: 1
  }
});

function mapStateToProps(state) {
  return {
    chartData: state.coinState.chartData
  };
}

export default connect(mapStateToProps, { })(Line);
