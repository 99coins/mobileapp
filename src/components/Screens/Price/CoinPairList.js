import React, { Component } from 'react';
import { Text, View } from 'react-native';
import axios from 'axios';

//create comonent
class CoinPairList extends Component {
    state = { pairs: [] };

    componentWillMount() {
        console.log('componentWillMount in CoidPairlist');

          axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,LTC,ETH,DASH,XRP&tsyms=USD')
      .then(response => {

        const entries = Object.entries(response.data);
        console.log(entries);

        const result = entries.map(function(e) {
             const pair = {};
             pair.from = e[0];
             const toObj = e[1];
             pair.to = Object.keys(toObj)[0];
             pair.price = toObj[Object.keys(toObj)[0]];
            return pair;
        });

        console.log(result);

        this.setState({ pairs: result });
      });
    }

    renderPairs() {
        console.log('renderPairs in CoinPairlist');

        return this.state.pairs.map(pair => <Text>{pair.from}</Text>);
    }

    render() {
        console.log(this.state);

        return (
          <View>
            {this.renderPairs()}
         </View>
     );
    }
}

export default CoinPairList;

