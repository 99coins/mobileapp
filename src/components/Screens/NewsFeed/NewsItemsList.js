import React, { Component } from 'react';
import { Text, View, StyleSheet, ListView } from 'react-native';
import axios from 'axios';
import NewsItemRow from './NewsItemRow';

//create comonente
class NewsItemList extends Component {

    componentWillMount() {

        console.log('componentWillMount in CoidPairlist');
        //set initail datsource
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
            this.setState({ 
              dataSource: ds
        });

        // fetch stories
        axios({
              method: 'get',
              url: 'https://www.cryptocompare.com/api/external/newsletter/',
              responseType: 'text'
        })
       .then(response => {
        //parse response object
        console.log(response.data);

        const fastXmlParser = require('fast-xml-parser');
        const jsonObj = fastXmlParser.parse(response.data);
        const items = jsonObj.rss.channel.item;
        console.log(items);

        this.setState({ 
            dataSource: ds.cloneWithRows(items.slice(0,5)),
        });
      });
    }

    renderRow(item) {
        console.log('renderRow in NewsItemList');
        return (
            <NewsItemRow key={item.title} item={item} />
        );
    }
    renderList() {
        console.log('renderList in NewsItemList');
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

  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});

export default NewsItemList;

