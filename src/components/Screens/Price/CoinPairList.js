import React, { Component } from 'react';
import { Text, View, StyleSheet, ListView, RefreshControl } from 'react-native';
import axios from 'axios';
import CoinPairRow from './CoinPairRow';

//create comonent
class CoinPairList extends Component {


//   constructor(props) {
//     super(props);
//     this.state = {
//       refreshing: false,
//     };
//   }

    componentWillMount() {
        console.log('componentWillMount in CoinPairlist');
            //set initail datsource
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
            this.setState({ 
              dataSource: ds,
              refreshing: false 
        });
        //this.setState({ refreshing: false });
        this.fetchPairs();  
    }

    onRefresh() {
        this.setState({ refreshing: true });
        this.fetchPairs();
    }

    fetchPairs() {
        // fetch pairs
        axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,LTC,ETH,DASH,XRP&tsyms=USD')
      .then(response => {
        //parse response object
        const entries = Object.entries(response.data);
        console.log(entries);

        const result = entries.map(function(e) {
            //create pair objects
             const pair = {};
             pair.fromSymbol = e[0];
             const toObj = e[1];
             pair.toSymbol = Object.keys(toObj)[0];
             pair.price = toObj[Object.keys(toObj)[0]];
            return pair;
        });

        console.log(result);
        //set updated datasource (will also trigger re-render)
        const ds = this.state.dataSource;
        this.setState({ 
            refreshing: false,
            dataSource: ds.cloneWithRows(result),
        });
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
               renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}

            />
        );
    }

    render() {
        console.log(this.state);

        return (
          <View style={{ flex: 1 }} >
            {this.renderList()}
         </View>
     );
    }
}

const styles = StyleSheet.create({
  /*
   * Removed for brevity
   */
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});

export default CoinPairList;

