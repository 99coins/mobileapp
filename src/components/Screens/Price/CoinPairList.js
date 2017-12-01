import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import CoinPairRow from './CoinPairRow';
import { connect } from 'react-redux';

import FetchPriceData from './../../../Actions/FetchPriceData';
import FetchCoinList from './../../../Actions/FetchCoinList';

//create comonent
class CoinPairList extends Component {

  componentDidMount() {
        console.log('componentDidMount prices');
         this.props.FetchCoinList();
         this.props.FetchPriceData();
  }
    getImageURLForCoin(symbol) {
        const { coinList } = this.props;
        if (coinList.isFetching === false && coinList.hasError === false) {
            console.log('getImageForCoin' + symbol);
            const baseImageURL = coinList.data.BaseImageUrl;
            const coin = coinList.data.Data[symbol];
            if (coin) {
                console.log(coin.ImageUrl);
                  return baseImageURL + coin.ImageUrl;
            }
            return;
        }
        return;
    }
    
    renderItem = ({ item }) => (
      <CoinPairRow 
                key={item.id}
                coinName={item.name}
                symbol={item.symbol}
                priceUsd={item.price_usd}
                percentChange24h={item.percent_change_24h}
                imageUrl={this.getImageURLForCoin(item.symbol)}
      />
  );
    render() {
        console.log('RENDERING COINS');

        const { priceData, coinList } = this.props;

        console.log(coinList);

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
             extraData={coinList.data}
             //keyExtractor={this._keyExtractor}
            renderItem={this.renderItem}
          />
    );
   }
}
function mapStateToProps(state) {
    return {
        priceData: state.priceData,
        coinList: state.coinList
    };
}
export default connect(mapStateToProps, { FetchPriceData, FetchCoinList })(CoinPairList);
