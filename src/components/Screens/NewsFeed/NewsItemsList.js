import React, { Component } from 'react';
import { Text, View, StyleSheet, ListView, RefreshControl } from 'react-native';
import axios from 'axios';
import NewsItemRow from './NewsItemRow';

let _isMounted = false;

//create comonente
class NewsItemList extends Component {    
    componentWillMount() {
        console.log('componentWillMount in NewsItemlist');
        _isMounted = true;
        console.log(_isMounted);

         //set initail datsource
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
            this.setState({ 
              dataSource: ds,
              refreshing: false
        });
        this.fetchStories();
    }
    componentWillUnmount() {
        console.log('componentWillUnmount in NewsItemlist');
         _isMounted = false;
    }
    onRefresh() {
        this.setState({ refreshing: true });
        this.fetchStories();
    }
    fetchStories = () => {
         // fetch stories
        axios({
              method: 'get',
              url: 'https://www.cryptocompare.com/api/external/newsletter/',
              responseType: 'text'
        })
       .then(response => { 
            console.log(_isMounted);
           this.parseResponse(response);
      });
    }
    parseResponse = (response) => {
       //parse response object
        console.log(response.data);

        const fastXmlParser = require('fast-xml-parser');
        const jsonObj = fastXmlParser.parse(response.data);
        const items = jsonObj.rss.channel.item;
        console.log(items);

        const ds = this.state.dataSource;
  
        if (this.refs.newsList) {
            this.setState({ 
              refreshing: false,
              dataSource: ds.cloneWithRows(items.slice(0, 5)),
            });
        } else {
            console.log('un mounted');
        }
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
             refreshControl={
                     <RefreshControl
                         refreshing={this.state.refreshing}
                          onRefresh={this.onRefresh.bind(this)}
                     />}
               dataSource={this.state.dataSource}
               renderRow={this.renderRow}
               renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}

            />
        );
    }

    render() {
        console.log(this.state);

        return (
          <View ref='newsList'>
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

