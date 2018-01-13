import React, { Component } from 'react';
import { SectionList, Text } from 'react-native';
import NewsItemRow from './NewsItemRow';
import { connect } from 'react-redux';
import FetchNewsList from './../../../Actions/FetchNewsList';
import { Actions } from 'react-native-router-flux';
import VideoPlayer from 'react-native-video-player';


//create comonente
class NewsItemList extends React.PureComponent {       
    componentWillMount() {
        console.log('componentWillMount news');
        this.props.FetchNewsList();
    }
    onRefresh() {
        console.log('onRefresh news');
         this.props.FetchNewsList();
    }
    onPressItem = (item) => {
        if (this.state.disableTouch === false) {
            this.state.disableTouch = true;
            Actions.News_2({ url: item.url });

             setTimeout(() => {
                this.state.disableTouch = false;
             }, 2000);

        } else {
            console.log('touch disabled');
        }
    }
    keyExtractor = (item, index) => item.id;

    renderItem = ({ item }) => (
        <NewsItemRow 
            id={item.id}
            item={item}
            onPressItem={this.onPressItem}
        />
    );

    renderVideo= ({ item }) => (
       <VideoPlayer
          //endWithThumbnail
          //thumbnail={{ uri: item }}
          video={{ uri: item }}
          videoWidth={200}
          videoHeight={100}
          duration={20/* I'm using a hls stream here, react-native-video
            //can't figure out the length, so I pass it here from the vimeo config */}
       />
    );

    render() {
        console.log('RENDERING NEWS');

        const { newsList } = this.props;
        console.log(newsList);
        return (
        //   <SectionList
        //     onRefresh={() => this.onRefresh()}
        //     refreshing={false}
        //     data={newsList.data}
        //     extraData={this.state}
        //     keyExtractor={this.keyExtractor}
        //     renderItem={this.renderItem}
        //   />
          <SectionList
            onRefresh={() => this.onRefresh()}
            refreshing={false}
            sections={[ // heterogeneous rendering between sections
             { data: ['https://www.youtube.com/watch?v=KlIFQ7GIdBA'], renderItem: this.renderVideo },
             { data: newsList.data, renderItem: this.renderItem }
       
            ]}
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
