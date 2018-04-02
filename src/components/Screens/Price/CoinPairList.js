import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import CoinPairRow from './CoinPairRow';
import CoinListHeader from './CoinListHeader';
import { connect } from 'react-redux';
import Colors from '@assets/colors.js';
import { NNBITCOINS_PRICE_BASE_URL } from './../../../Utils/Constants';

import fetchPriceData from './../../../Actions/FetchPriceData';
import firebase from 'react-native-firebase';


const ITEM_HEIGHT = 56;

//create comonent
class CoinPairList extends Component {

    componentDidMount() {
        console.log('componentDidMount prices');
        this.props.fetchPriceData();
    }
    shouldComponentUpdate(nextProps) {
        return (this.props.priceData.data !== nextProps.priceData.data);
    }
    onRefresh() {
        this.props.fetchPriceData();
    }
    // getImageURLForCoin(symbol) {
    //     const { coinList } = this.props;
    //     if (coinList.isFetching === false && coinList.hasError === false) {
    //         const baseImageURL = coinList.data.BaseImageUrl;
    //         let coin = coinList.data.Data[symbol];
    //         if (symbol === 'MIOTA') {
    //             coin = coinList.data.Data.IOT;
    //         }
    //         if (symbol === 'BCC') {
    //             coin = coinList.data.Data.BCCOIN;
    //         }
    //         if (coin) {
    //             return baseImageURL + coin.ImageUrl;
    //         }
    //         return;
    //     }
    //     return;
    // }
    keyExtractor = (item, index) => item.id;

    
    renderItem = ({ item }) => (
      <CoinPairRow 
                key={item.id}
                coinName={item.name}
                symbol={item.symbol}
                priceUsd={item.price_usd.toFixed(2)}
                percentChange24h={item.percent_change_usd_7d.toFixed(2)}
                imageUrl={NNBITCOINS_PRICE_BASE_URL + item.icon}
                onPressItem={() => {
                    firebase.analytics().logEvent('click_coin', { coin: item.symbol });
                }}
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
        console.log('RENDERING COIN LIST');
        const { priceData, coinList } = this.props;
        return (
          <FlatList
            onRefresh={() => {
                firebase.analytics().logEvent('pull_to_refresh_pricelist', {});
                this.onRefresh();
            }}
            refreshing={priceData.isFetching}
            data={priceData.data}
            extraData={coinList.data}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={CoinListHeader}
            getItemLayout={(data, index) => (
                 { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index }
            )}

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
export default connect(mapStateToProps, { fetchPriceData })(CoinPairList);
