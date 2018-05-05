import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import CoinPairRow from './CoinPairRow';
import CoinListHeader from './CoinListHeader';
import { connect } from 'react-redux';
import Colors from '@assets/colors.js';
import { COIN_MARKET_CAP_BASE_ICON_URL } from './../../../Utils/Constants';
import { Actions } from 'react-native-router-flux';

import fetchPriceData from './../../../Actions/FetchPriceData';
//import { fetchPriceData } from './../../../Actions/FetchCoinList';

import firebase from 'react-native-firebase';


const ITEM_HEIGHT = 56;

//create comonent
class CoinPairList extends Component {

    componentDidMount() {
        console.log('componentDidMount prices');
        //this.props.fetchCoinList();
        this.props.fetchPriceData();
    }
    shouldComponentUpdate(nextProps) {
        //return (this.props.coinList.data !== nextProps.coinList.data) || (this.props.priceData.data !== nextProps.priceData.data);
        return true;
    }
    onRefresh() {
        this.props.fetchPriceData();
    }
    getImageURLForCoin(symbol) {
        const { coinList } = this.props;
        if (coinList.isFetching === false && coinList.hasError === false) {
            const baseImageURL = coinList.data.BaseImageUrl;
            let coin = coinList.data.Data[symbol];
            if (symbol === 'MIOTA') {
                coin = coinList.data.Data.IOT;
            }
            if (symbol === 'BCC') {
                coin = coinList.data.Data.BCCOIN;
            }
            if (coin) {
                return baseImageURL + coin.ImageUrl;
            }
            return;
        }
        return;
    }
    keyExtractor = (item) => item.id;

    
    renderItem = ({ item }) => (
      <CoinPairRow 
                key={item.id}
                coinName={item.name}
                symbol={item.symbol}
                priceUsd={item.quotes.USD.price} /*.toFixed(2)*/
                percentChange24h={item.quotes.USD.percent_change_24h}  /*.toFixed(2)*/
                imageUrl={`${COIN_MARKET_CAP_BASE_ICON_URL}/${item.id}.png`} 
                //imageUrl={'https://s2.coinmarketcap.com/static/img/coins/200x200/4.png'}
                onPressItem={() => {
                    firebase.analytics().logEvent('click_coin', { coin: item.symbol });
                    //Actions.coin({ coin: item });
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
        const { priceData } = this.props;
        console.log(priceData.data);

        return (
          <FlatList
            onRefresh={() => {
                firebase.analytics().logEvent('pull_to_refresh_pricelist', {});
                this.onRefresh();
            }}
            refreshing={priceData.isFetching}
            data={priceData.data}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={CoinListHeader}
            getItemLayout={(data, index) => (
                 { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index }
            )}
            backgroundColor={'white'}

          />
    );
   }
}
function mapStateToProps(state) {
    return {
        priceData: state.priceData,
        //coinList: state.coinList
    };
}
export default connect(mapStateToProps, { fetchPriceData })(CoinPairList);
