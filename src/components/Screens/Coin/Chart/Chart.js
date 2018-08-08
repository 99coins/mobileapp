import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View
} from 'react-native';
import Line from './Line';
import Colors from '@assets/colors.js';
import { connect } from 'react-redux';
import { updateChartPrices } from './../../../../Actions/CoinActions';


class Chart extends Component {

  render() {
    const { chartData } = this.props;
    return (
      <View style={styles.container}>
        {chartData.loading && <View pointerEvents="box-none" style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>}
        <View style={styles.internalContainer}>
          {chartData.prices.length > 0 && <Line values={chartData.prices} />}
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 200,
    flex: 1,
    borderRadius: 8
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
    overflow: 'hidden'  
  }
});

function mapStateToProps(state) {
  return {
    chartData: state.coinState.chartData,
  };
}

export default connect(mapStateToProps, { updateChartPrices })(Chart);

