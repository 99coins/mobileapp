import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, ListView, RefreshControl } from 'react-native';
import CoinPairRow from './CoinPairRow';
import moment from 'moment';
import { connect } from 'react-redux';

import FetchPriceData from './../../../Actions/FetchPriceData';

//create comonent
class CoinPairList extends Component {

    componentWillMount() {
        console.log('componentwillmount prices');
        this.props.FetchPriceData();
    }    
    renderItem = ({ item }) => (
      <CoinPairRow 
                key={item.id}
                coinName={item.name}
                symbol={item.symbol}
                priceUsd={item.price_usd}
                percentChange24h={item.percent_change_24h}
      />
  );

    renderFooter() {
        let lastUpdateText = '';
        if (this.state.lastUpdate) {
            lastUpdateText = lastUpdateText.concat(' (last update: ', moment(this.state.lastUpdate).format('HH:mm:ss'), ')');
        }

        console.log('renderFooter in CoinPairlist');
        return (
            <Footer text={lastUpdateText} />
        );
    }

    render() {
        console.log('RENDERING COINS');

        const { priceData } = this.props;

        console.log(priceData);

       if (priceData.isFetching) {
            return (
                <View>
                   <Text>refreshing</Text>
                </View>
            );
        }
        return (
          <FlatList
            data={priceData.data}
             extraData={priceData}
             //keyExtractor={this._keyExtractor}
            renderItem={this.renderItem}
          />
    );
   }
}

const Footer = (props) => (
  <View>
    <TouchableOpacity style={styles.button} onPress={() => console.log('load more')}>
        <View style={styles.footer}>
            <Text style={styles.text}>Pull down to refresh</Text>
            <Text style={styles.footerUpdateLabel}>{props.text}</Text>
        </View>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
 container: {
    flex: 1,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
 footer: {
    flex: 1,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerUpdateLabel: {
    fontSize: 11,
    color: 'rgb(33,33,33)'
  }
});

function mapStateToProps(state) {
    return {
        priceData: state.priceData
    };
}
export default connect(mapStateToProps, { FetchPriceData })(CoinPairList);
