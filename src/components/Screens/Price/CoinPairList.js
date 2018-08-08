import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import CoinPairRow from './CoinPairRow';
import CoinListHeader from './CoinListHeader';
import { connect } from 'react-redux';
import Colors from '@assets/colors.js';
import { Actions } from 'react-native-router-flux';

//import fetchCoinList from './../../../Actions/FetchPriceData';
import { fetchCoinList, getCachedCoinList, setSearchInput } from './../../../Actions/FetchCoinList';

import firebase from 'react-native-firebase';


const ITEM_HEIGHT = 56;

//create comonent
class CoinPairList extends Component {

    componentDidMount() {
        console.log('componentDidMount prices');
        this.props.getCachedCoinList();
        this.props.fetchCoinList();
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if (this.props.routes.scene !== nextProps.routes.scene && nextProps.routes.scene === 'Coins') {
            this.props.fetchCoinList();
        }
    }
    shouldComponentUpdate(nextProps) {
        return (this.props.coinList.data !== nextProps.coinList.data || this.props.coinList.searchInput !== nextProps.coinList.searchInput);
    }
    onRefresh() {
    // this.props.fetchPriceData();
        this.props.fetchCoinList();
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

    
    renderItem = ({ item, index }) => (
      <CoinPairRow 
                key={item.id}
                coinName={item.name}
                symbol={item.symbol.toUpperCase()}
                priceUsd={item.market_data.current_price.usd < 1 ? item.market_data.current_price.usd.toFixed(5) : item.market_data.current_price.usd.toFixed(2)} /*.toFixed(2)*/
                percentChange24h={item.market_data.price_change_percentage_24h ? Number(item.market_data.price_change_percentage_24h).toFixed(1) : 0}  /*.toFixed(2)*/
                imageUrl={item.image.small} 
                onPressItem={() => {
                    firebase.analytics().logEvent('click_coin', { coin: item.symbol });
                    Actions.coin({ coin: item.id, rank: index + 1, icon: item.image.small, title: `${item.name} (${item.symbol.toUpperCase()})` });
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
    renderHeader = () => {
        return (
            <CoinListHeader
                onChangeText={(text) => {
                    this.props.setSearchInput(text);
                    //console.log('onChangeText');
                }}
            />
        );
    };
    render() {
        console.log('RENDERING COIN LIST');
        const { coinList } = this.props;
        let coinsToShow;
        if (coinList.searchInput !== null) {
            const input = coinList.searchInput.toLowerCase();
            coinsToShow = coinList.data.filter(item => {
                return item.name.toLowerCase().includes(input) || item.symbol.toLowerCase().includes(input);
            });
        } else {
          coinsToShow = coinList.data;
        }
        return (
          <FlatList
            onRefresh={() => {
                firebase.analytics().logEvent('pull_to_refresh_pricelist', {});
                this.onRefresh();
            }}
            refreshing={coinList.isFetching}
            data={coinsToShow}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderHeader}
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
        coinList: state.coinList,
        routes: state.routes
    };
}
export default connect(mapStateToProps, { fetchCoinList, getCachedCoinList, setSearchInput })(CoinPairList);
