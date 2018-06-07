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

export default class Line extends Component {

  props: {
    values: Array<number>,
    fillColor: string,
    strokeColor: string,
    strokeWidth: number,
  };

  static defaultProps = {
    fillColor: Colors.chartOrange,       // solid violet color
    strokeColor: Colors.chartBorderOrange,  // semi-transparent violet
    strokeWidth: 1,
  };

  state = {
    // set initial width to screen width so when animated it stays constant,
    // try setting it to zero and see what happens on initial load
    width: Dimensions.get('window').width - 50,
    // set initial height to zero so when updated to actual height and
    // animated, the chart raises from the bottom to the top of the container
    height: 0,

    highPoint: { x: 0, y: 0 },
    lowPoint: { x: 0, y: 0 },
    path: null
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.values !== this.props.values) {
      this.setState({ path: this.buildPath(nextProps.values) });
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
      return (this.state.path !== nextState.path);
  }
  componentWillUpdate() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }
  // Handle container view's onLayout event to get its width and height after rendered and
  // update the state so the component can render the chart using actual width and height
  onLayout = (event: Object) => {
    // pull out width and height out of event.nativeEvent.layout
    const {
      nativeEvent: {
        layout: {
          width,
      height
        }
      }
    } = event;
    // update the state
    this.setState({
      width,
      height,
    });
  };

  buildPath = (values: Array<number>): Path => {
    const {
      strokeWidth,
    } = this.props;
    const {
      width,
      height,
    } = this.state;

    let firstPoint: boolean = true;
      // holds x and y coordinates of the previous point when iterating
    let previous: { x: number, y: number };

    const minValue = Math.min(...values);
    const maxValue = Math.max(...values) - minValue;
      // step between each value point on horizontal (x) axis
    const stepX = width / (values.length - 1 || 1);
      // step between each value point on vertical (y) axis
    const stepY = maxValue ? (height - (strokeWidth * 2)) / maxValue : 0;
      // adjust values so that min value becomes 0 and goes to the bottom edge
    const adjustedValues = values.map(value => value - minValue)
      ;
    // start from the left bottom corner so we could fill the area with color
    const path = Path().moveTo(-strokeWidth, strokeWidth);

    let high: { x: number, y: number };
    let low: { x: number, y: number };

    adjustedValues.forEach((number, index) => {
      const x = index * stepX;
      const y = (-number * stepY) - strokeWidth;

      if (number === maxValue) {
          high = { x, y };
      }
      if (number === 0) {
          low = { x, y };
      }
      if (firstPoint) {
        // straight line to the first point
        path.lineTo(-strokeWidth, y);
      } else {
        // make curved line
        path.curveTo(previous.x + (stepX / 3), previous.y, x - (stepX / 3), y, x, y);
      }
      // save current x and y coordinates for the next point
      previous = { x, y };
      firstPoint = false;
    });

    this.setState({
          highPoint: high,
          lowPoint: low
    }); 

    return path
      // line to the right bottom corner so we could fill the area with color
      .lineTo(width + strokeWidth, strokeWidth)
      .close();
  };

  render() {
    const {
      values,
      fillColor,
      strokeColor,
      strokeWidth
    } = this.props;
    const {
      width,
      height,
      path
    } = this.state;

    console.log('MAX:', Math.max(...values));
    console.log('MIN:', Math.min(...values));

    console.log('HIGH POINT:', this.state.highPoint);
    console.log('LOW POINT:', this.state.lowPoint);

    return (
      <View
        style={styles.container}
        onLayout={this.onLayout}
      >
        <Surface width={width} height={height}>
          <Group x={0} y={height}>
            <Shape
              d={path}
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />
          </Group>
        </Surface>
        <View 
          style={[styles.badge, {
            left: this.state.highPoint.x,
            bottom: -this.state.highPoint.y,
            backgroundColor: Colors.themeGreen,
          }]} 
        />
        <View 
          style={[styles.badge, {
            left: this.state.lowPoint.x,
            bottom: -this.state.lowPoint.y,
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
