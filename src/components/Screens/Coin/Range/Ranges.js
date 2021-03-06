import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import { connect } from 'react-redux';
import { selectRange } from './../../../../Actions/CoinActions';
import Switcher from './Switcher';
import { RANGES } from './../../../../Utils/Constants';
import Colors from '@assets/colors.js';


class Ranges extends Component {

  render() {
    const {
      range,
      selectRange,
    } = this.props;

    console.log('RANGES CURRENT', range);
    return (
      <View style={styles.container}>
        <Switcher
          ranges={RANGES}
          current={range}
          onSelectRange={selectRange}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.clear,
    marginLeft: 24,
    marginRight: 24,
  },
});

function mapStateToProps(state) {
    return {
        range: state.coinState.chartData.range
    };
}

export default connect(mapStateToProps, { selectRange })(Ranges);
