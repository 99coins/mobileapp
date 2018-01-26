import React, { Component } from 'react';
import { FlatList, Text, Button, View, Dimensions } from 'react-native';
import NewsItemRow from './NewsItemRow';
import { connect } from 'react-redux';
import FetchNewsList from './../../../Actions/FetchNewsList';
import FetchWeeklyUpdateVideo from './../../../Actions/FetchWeeklyUpdateVideo';
import { Actions } from 'react-native-router-flux';
import VideoPlayer from 'react-native-video-player';
import memoize from 'lodash/memoize'


const ITEM_HEIGHT = 80;
//create comonente
class NewsItemList extends React.PureComponent {   
    state = { disableTouch: false };

    componentWillMount() {
        console.log('componentWillMount news');
        this.onRefresh();
    }
    onRefresh() {
        console.log('onRefresh news');
        const { newsList, weeklyVideo } = this.props;
        if (newsList.isFetching === false) {
            this.props.FetchNewsList();
        }
         if (weeklyVideo.video === null) {
            this.props.FetchWeeklyUpdateVideo();
        }
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
    _renderVideo = memoize((video) => 
            <VideoPlayer
                 endWithThumbnail
                 thumbnail={{ uri: video.thumbnailUrl }}
                 video={{ uri: video.videoUrl }}
                 videoWidth={video.video.width}
                 videoHeight={video.video.height}
                 duration={video.video.duration}
                 ref={(r) => { this.player = r; }}
                 resizeMode={'cover'}
            />)

    renderVideo = () => {
        const { weeklyVideo } = this.props;
        if (weeklyVideo.video) {
            console.log('VIDEO FOUND', this._renderVideo(weeklyVideo));
            return this._renderVideo(weeklyVideo);
        }
        return null;
    }

    render() {
        console.log('RENDERING NEWS');

        const { newsList, weeklyVideo } = this.props;
        console.log(weeklyVideo);
        console.log(newsList);
        return (
         <FlatList
            data={newsList.data}
            extraData={this.state}
            keyExtractor={this.keyExtractor}
            refreshing={false}
            renderItem={this.renderItem}
            ListHeaderComponent={this.renderVideo}
            onRefresh={() => this.onRefresh()}
            getItemLayout={(data, index) => (
                 { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index }
            )}
         />
        //   <SectionList
        //     onRefresh={() => this.onRefresh()}
        //     refreshing={false}
        //     sections={[ // heterogeneous rendering between sections
        //      { data: [weeklyVideo.data], renderItem: this.renderVideo },
        //      { data: newsList.data, renderItem: this.renderItem }
        //     ]}
        //   />


        );
   }
}
function mapStateToProps(state) {
    return {
        newsList: state.newsList,
        weeklyVideo: state.weeklyVideo
    };
}
export default connect(mapStateToProps, { FetchNewsList, FetchWeeklyUpdateVideo })(NewsItemList);
