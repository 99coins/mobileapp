import React, { Component } from 'react';
import { FlatList, Text, Button, View } from 'react-native';
import NewsItemRow from './NewsItemRow';
import { connect } from 'react-redux';
import FetchNewsList from './../../../Actions/FetchNewsList';
import FetchWeeklyUpdateVideo from './../../../Actions/FetchWeeklyUpdateVideo';

import { Actions } from 'react-native-router-flux';
import VideoPlayer from 'react-native-video-player';

//create comonente
class NewsItemList extends React.PureComponent {   
    state = { disableTouch: false };

    componentWillMount() {
        console.log('componentWillMount news');
        this.props.FetchNewsList();
        this.props.FetchWeeklyUpdateVideo();
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

    renderVideo = () => {
       const { weeklyVideo } = this.props;
       if (weeklyVideo.video) {
       return (
             <VideoPlayer
                 endWithThumbnail
                 thumbnail={{ uri: weeklyVideo.thumbnailUrl }}
                 video={{ uri: weeklyVideo.videoUrl }}
                 videoWidth={weeklyVideo.video.width}
                 videoHeight={weeklyVideo.video.height}
                 duration={weeklyVideo.video.duration}
                 ref={(r) => { this.player = r; }}
             />
         );
       }
        return <View />;
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
            renderItem={this.renderItem}
            ListHeaderComponent={this.renderVideo}
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
