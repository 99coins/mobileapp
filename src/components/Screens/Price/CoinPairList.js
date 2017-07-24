import React, { Component } from 'react';
import { Text, View, StyleSheet, ListView } from 'react-native';
import axios from 'axios';
import CoinPairRow from './CoinPairRow';

//create comonent
class CoinPairList extends Component {

    componentWillMount() {

        console.log('componentWillMount in CoidPairlist');
        //set initail datsource
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
            this.setState({ 
              dataSource: ds
        });

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
        this.setState({ 
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
               dataSource={this.state.dataSource}
               renderRow={this.renderRow}
               renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}

            />
        );
    }

    render() {
        console.log(this.state);

        return (
          <View>
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

