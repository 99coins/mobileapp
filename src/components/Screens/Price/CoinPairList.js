import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
import CoinPairRow from './CoinPairRow';
import CoinListHeader from './CoinListHeader';
import { connect } from 'react-redux';
import Colors from '@assets/colors.js';


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
            let coin = coinList.data.Data[symbol];
            if (symbol === 'MIOTA') {
                coin = coinList.data.Data.IOT;
            }
            if (symbol === 'BCC') {
                coin = coinList.data.Data.BCCOIN;
            }
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
    renderSeparator = () => {
        return (
            <View
             style={{
             height: 1,
             width: '95%',
             backgroundColor: Colors.gray100,
             marginLeft: 16
            }}
            />
        );
    };
    render() {
        console.log('RENDERING COINS');

        const { priceData, coinList } = this.props;

        console.log(coinList);

       if (priceData.isFetching) {
            return (
                 <ActivityIndicator
                    color='rgb(33, 33, 33)'
                    size='small'
                     style={{ padding: 20 }}
                 />
            );
        }
        return (
          <FlatList
            data={priceData.data}
            extraData={coinList.data}
            keyExtractor={item => item.id}
            renderItem={this.renderItem}
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={CoinListHeader}

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
