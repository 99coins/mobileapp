import React, { Component } from 'react';
import { Text, View, StyleSheet, ListView, RefreshControl, TouchableOpacity } from 'react-native';
import axios from 'axios';
import CoinPairRow from './CoinPairRow';
import moment from 'moment';


//create comonent
class CoinPairList extends Component {

    componentWillMount() {
        //set initail datsource
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
            this.setState({
              dataSource: ds,
              refreshing: false,
              lastUpdate: null 
        }); 
    }

    componentDidMount() {
       this.fetchData();
    }
    onRefresh() {
        this.fetchData();
    }
    fetchData() {
        this.setState({ refreshing: true });

        if (!this.state.coinList) {
            this.fetchCoinList();
        } else {
            this.fetchPairs();
        }
    }

    fetchCoinList() {
        axios.get('https://www.cryptocompare.com/api/data/coinlist/')
        .then(response => {
            const entries = Object.entries(response.data);
            const coinList = entries[5][1];
            console.log('fecthed coins');
            console.log(coinList);

            if (this.refs.coinPairList) {
                console.log('REF FOUND');

                console.log('set coins state');

                  this.setState({ 
                       coinList: coinList
                  });

                this.fetchPairs();
            }
        });    
    }

    fetchPairs() {
        // fetch pairs
        axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,LTC,ETH,DASH,XRP&tsyms=USD')
      .then(response => {
        //parse response object
        const entries = Object.entries(response.data);

        if (this.refs.coinPairList) {
            if (this.state.coinList) {
                const list = this.state.coinList;
                const result = entries.map(function (e) {
                //create pair objects
                  const pair = {};
                  pair.fromSymbol = e[0];
                  const toObj = e[1];
                  pair.toSymbol = Object.keys(toObj)[0];
                  pair.price = toObj[Object.keys(toObj)[0]];
                  const coin = list[pair.fromSymbol];
                  pair.imageUrl = coin.ImageUrl;

                 return pair;
                 });
                console.log(result);
                const ds = this.state.dataSource;
                this.setState({ 
                     refreshing: false,
                     dataSource: ds.cloneWithRows(result),
                     lastUpdate: new Date()
                });
            } else {
                console.log('missing coin data');
                this.setState({ refreshing: false });
            }
        } else {
             console.log('component not mounted');
            this.setState({ refreshing: false });
        }
      });
    }
    renderRow(pair) {
        console.log('renderRow in CoinPairlist');
        return (
            <CoinPairRow key={pair.fromSymbol} pair={pair} />
        );
    }
    renderList() {
        console.log('renderList in CoinPairlist');
        console.log(this.state);
        //return this.state.pairs.map(pair => <CoidPairDetail key={pair.fromSymbol} pair={pair} />);
        return (
         
            <ListView
               refreshControl={
                <RefreshControl
                   refreshing={this.state.refreshing}
                   onRefresh={this.onRefresh.bind(this)}
                />
        }
               dataSource={this.state.dataSource}
               renderRow={this.renderRow}
               renderFooter={this.renderFooter.bind(this)}
               renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}

            />
        );
    }

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

        return (
          <View style={{ flex: 1 }} ref='coinPairList'>
            {this.renderList()}
         </View>
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

export default CoinPairList;

