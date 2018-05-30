import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import Colors from '@assets/colors.js';
import { connect } from 'react-redux';
import { Range, RANGE_1D, RANGE_1W, RANGE_1M, RANGE_3M, RANGE_6M, RANGE_1Y, RANGE_MAX } from './../../../Utils/Constants';

const rangeDescription = (range: Range): string => {

  let description = 'this hour';

  switch (range) {
    case RANGE_1D:
      description = 'today';
      break;
    case RANGE_1W:
      description = 'this week';
      break;
    case RANGE_1M:
      description = 'this month';
      break;
    case RANGE_3M:
      description = 'past 3 months';
      break;
    case RANGE_6M:
      description = 'past 6 months';
      break;
    case RANGE_1Y:
      description = 'this year';
      break;
    case RANGE_MAX:
      description = 'all time';
      break;
    default:
      description = 'today';
      break;
  }

  return description;
};

const getPercentageChange = (first, last) => {
    const decreaseValue = last - first;
    let change = ((decreaseValue / first) * 100)
    return change;
};

class ChangeRow extends Component {

  render() {
    const { coinState } = this.props;
    const prices = coinState.prices;
    const change = getPercentageChange(prices[0], prices[prices.length - 1]);
    const chnageDisplay = change.toFixed(2) + '%';

    console.log('RENDER ChangeRow');
    return (
      <View style={styles.container}>
        <View style={[styles.changeContainer, change < 0 && styles.changeContainerMinus]}>
          <Text style={[styles.priceChangePlus, change < 0 && styles.priceChangeMinus]}>{chnageDisplay}</Text>
        </View>
        <Text style={styles.periodStyle}>{rangeDescription(coinState.range)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 50,
    flex: 1, 
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  changeContainer: {
    backgroundColor: Colors.themeGreenT,
    borderRadius: 4,
    paddingRight: 7,
    paddingLeft: 7,
    paddingTop: 3,
    paddingBottom: 3,
  },
  changeContainerMinus: {
     backgroundColor: Colors.themeRedT,
  },
  priceChangePlus: {
    color: Colors.themeGreen,
    fontSize: 14,
    fontWeight: '800'
  },
  priceChangeMinus: {
    color: Colors.themeRed
  },
  periodStyle: {
    fontSize: 14,
    paddingLeft: 4,
  }
});

function mapStateToProps(state) {
    return {
        coinState: state.coinState,
    };
}

export default connect(mapStateToProps)(ChangeRow);
