import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View
} from 'react-native';
import Line from './Line';
import Colors from '@assets/colors.js';
import { connect } from 'react-redux';
import { updateChartPrices } from './../../../../Actions/ChartActions';


class Chart extends Component {

  state = {
    viewHeight: 0,
    prices: [],
  };

  componentWillMount() {
    this.props.updateChartPrices();
  }
  componentWillReceiveProps(nextProps) {
    // Update chart data if range was changed
    console.log('componentWillReceiveProps', nextProps, nextProps.prices);

    if (nextProps.chartState.range !== this.props.chartState.range) {
      this.props.updateChartPrices();
    }
    this.setState({ prices: nextProps.chartState.prices });
  }

  // shouldComponentUpdate(nextProps) {
  //       //const shouldUpdate = (this.props.newsList.data !== nextProps.newsList.data) || (this.props.weeklyVideo.video !== nextProps.weeklyVideo.video);
  //       console.log('ShoulUpdateChart', nextProps);
  //       return true;
  //  }

  render() {

    const { chartState } = this.props;

    console.log('RENDER CHART');
    console.log(chartState.loading, chartState.prices);

    return (
      <View style={styles.container}>
        {chartState.loading && <View pointerEvents="box-none" style={styles.loading}>
          <ActivityIndicator size="large" />
                    </View>}
          <View style={styles.internalContainer}>
             {chartState.prices.length > 0 && <Line values={this.state.prices} />}
          </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 200,
    flex: 1
  },
  loading: {
    ...StyleSheet.absoluteFillObject, // overlay the chart
    alignItems: 'center',             // center horizontally
    justifyContent: 'center',         // center vertically
    zIndex: 1,                        // show in front of the chart
  },
  internalContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 41,
    marginLeft: 24,
    marginRight: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.gray100,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 16,
  }
});

function mapStateToProps(state) {
    return {
        chartState: state.chartState,
    };
}

export default connect(mapStateToProps, { updateChartPrices })(Chart);

