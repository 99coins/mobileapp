import React, { Component } from 'react';
import { FlatList } from 'react-native';
import NewsItemRow from './NewsItemRow';
import { connect } from 'react-redux';
import FetchNewsList from './../../../Actions/FetchNewsList';
import { Actions } from 'react-native-router-flux';

//create comonente
class NewsItemList extends React.PureComponent {    

   state = { selected: (new Map(): Map<string, boolean>),
             disableTouch: false };

   keyExtractor = (item, index) => item.id;

    componentWillMount() {
        console.log('componentWillMount news');
        this.props.FetchNewsList();
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps news');
        console.log(nextProps);
    }

    componentDidUpdate() {
        console.log('componentDidUpdate news');
    }
    onRefresh() {
         this.props.FetchNewsList();
    }
    onPressItem = (item) => {
        if (this.state.disableTouch === false) {
            this.state.disableTouch = true;
            Actions.News_2({ url: item.url });

             setTimeout(() => {
                this.state.disableTouch = false;
             }, 2000);

            // this.setState((state) => {
            //     const selected = new Map(state.selected);
            //     selected.set(item.id, !selected.get(item.id)); // toggle
            //     return { selected };
            // });
        } else {
            console.log('touch disabled');
        }
    }
    renderItem = ({ item }) => (
        <NewsItemRow 
            id={item.id}
            item={item}
            onPressItem={this.onPressItem}
            selected={!!this.state.selected.get(item.id)}
        />
    );

    render() {
        console.log('RENDERING NEWS');

        const { newsList } = this.props;
        console.log(newsList);
        return (
          <FlatList
            onRefresh={() => this.onRefresh()}
            refreshing={newsList.isFetching}
            data={newsList.data}
            extraData={this.state}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
          />
        );
   }
}
function mapStateToProps(state) {
    return {
        newsList: state.newsList
    };
}
export default connect(mapStateToProps, { FetchNewsList })(NewsItemList);
