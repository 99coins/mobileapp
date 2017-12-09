import React, { Component } from 'react';
import { View, StyleSheet, ListView, RefreshControl, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import NewsItemRow from './NewsItemRow';
import { connect } from 'react-redux';
import FetchNewsList from './../../../Actions/FetchNewsList';

const parseString = require('react-native-xml2js').parseString;


//create comonente
class NewsItemList extends Component {    

     componentWillMount() {
        console.log('componentWillMount news');
        this.props.FetchNewsList();
     }

    // componentWillMount() {
    //     console.log('componentWillMount in NewsItemlist');
    //      //set initail datsource
    //     const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    //         this.setState({ 
    //           dataSource: ds,
    //           refreshing: false
    //     });
    //     this.onRefresh();
    // }
    // componentWillUnmount() {
    //     console.log('componentWillUnmount in NewsItemlist');
    // }
    onRefresh() {
         this.props.FetchNewsList();
    }
    fetchStories = () => {
         // fetch stories
        axios({
              method: 'get',
              //url: 'https://www.cryptocompare.com/api/external/newsletter/?full=true',
              url: 'https://min-api.cryptocompare.com/data/news/'
             // responseType: 'text'
        })
       .then(response => { 
           this.parseResponse(response);
      });
    }
    parseResponse = (response) => {
       //parse response object
        const data = response.data;
        console.log('data_____________________');

        console.log(data);

        this.updateDatasource(data);
   
        // const self = this;
        // parseString(response.data, (err, result) => self.updateDatasource(result));
    }

    updateDatasource = (items) => {
        // console.log('xml2js: __________________');
        //    const items = result.rss.channel[0].item;
        //   console.log(items);

        const ds = this.state.dataSource;
  
         if (this.refs.newsList) {
                     console.log('renderrrrrrr');

              this.setState({ 
                refreshing: false,
                dataSource: ds.cloneWithRows(items),
               });
         } else {
            console.log('un mounted');
         }
    }

    renderRow(item) {
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
               //renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}

            />
        );
    }

    renderItem = ({ item }) => (
        <NewsItemRow key={item.title} item={item} />
    );

    render() {
        console.log('RENDERING NEWS');

        const { newsList } = this.props;
        console.log(newsList);

    //    if (newsList.isFetching === true) {
    //         return (
    //              <ActivityIndicator
    //                 color='rgb(33, 33, 33)'
    //                 size='small'
    //                  style={{ padding: 20 }}
    //              />
    //         );
    //     }
        return (
          <FlatList
            onRefresh={() => this.onRefresh()}
            refreshing={newsList.isFetching}
            data={newsList.data}
            keyExtractor={item => item.id}
            renderItem={this.renderItem}
          />
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

function mapStateToProps(state) {
    return {
        newsList: state.newsList
    };
}
export default connect(mapStateToProps, { FetchNewsList })(NewsItemList);
