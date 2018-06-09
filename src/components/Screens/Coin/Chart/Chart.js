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

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.coinState.range !== this.props.coinState.range || nextProps.coinState.currentCoinId !== this.props.coinState.currentCoinId) {
  //     this.props.updateChartPrices();
  //   }
  // }

  componentWillReceiveProps(nextProps) {
    console.log('PROPS: ', nextProps);
    ///this.props.updateChartPrices();
  }

  render() {
    const { coinState } = this.props;
    return (
      <View style={styles.container}>
        {coinState.loadingChart && <View pointerEvents="box-none" style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>}
        <View style={styles.internalContainer}>
          {coinState.prices.length > 0 && <Line values={coinState.prices} />}
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
  }
});

function mapStateToProps(state) {
  return {
    coinState: state.coinState,
  };
}

export default connect(mapStateToProps, { updateChartPrices })(Chart);

