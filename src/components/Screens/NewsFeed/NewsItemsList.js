import React, { Component } from 'react';
import { FlatList, Dimensions, View } from 'react-native';
import NewsItemRow from './NewsItemRow';
import { connect } from 'react-redux';
import fetchNewsList from './../../../Actions/FetchNewsList';
import fetchWeeklyUpdateVideo from './../../../Actions/FetchWeeklyUpdateVideo';
import { Actions } from 'react-native-router-flux';
import VideoPlayer from 'react-native-video-player';
import memoize from 'lodash/memoize';
import firebase from 'react-native-firebase';
import Colors from '@assets/colors.js';



const windowWidth = Dimensions.get('window').width;
const ITEM_HEIGHT = 128;

class NewsItemList extends Component {
    state = { disableTouch: false };

    componentWillMount() {
        console.log('componentWillMount news');
        this.onRefresh();
    }
    shouldComponentUpdate(nextProps) {
        const shouldUpdate = (this.props.newsList.data !== nextProps.newsList.data) || (this.props.weeklyVideo.video !== nextProps.weeklyVideo.video);
        console.log('ShoulUpdateNewsList', shouldUpdate);
        return shouldUpdate;
    }
    onRefresh() {
        console.log('onRefresh news');
        this.props.fetchNewsList();
        this.props.fetchWeeklyUpdateVideo();
    }
    onPressItem = (item) => {
        if (this.state.disableTouch === false) {
            this.state.disableTouch = true;
            Actions.article({ url: item.url, html: item.html });
            setTimeout(() => {
                this.state.disableTouch = false;
            }, 2000);
        } else {
            console.log('touch disabled');
        }
    }
    keyExtractor = (item) => item.guid;
    _renderVideo = memoize((video) =>
        <VideoPlayer
            endWithThumbnail
            thumbnail={{ uri: video.thumbnailUrl }}
            video={{ uri: video.videoUrl }}
            videoWidth={windowWidth}
            videoHeight={windowWidth / 1.78}
            duration={video.video.duration}
            ref={(r) => { this.player = r; }}
            resizeMode={'stretch'}
            onPlayPress={() => {
                firebase.analytics().logEvent('click_play_weekly_video', { url: video.videoUrl });
            }}
            onEnd={() => {
                firebase.analytics().logEvent('weekly_video_end', { url: video.videoUrl });
            }}
        />)

    renderVideo = () => {
        const { weeklyVideo } = this.props;
        if (weeklyVideo.video) {
            console.log('VIDEO FOUND', this._renderVideo(weeklyVideo));
            return this._renderVideo(weeklyVideo);
        }
        return null;
    }
    renderItem = ({ item }) => {
        return (
            <NewsItemRow
                id={item.id}
                item={item}
                onPressItem={this.onPressItem}
            />
        );
    }
   renderSeparator = () => {
        return (
            <View
             style={{
             height: 1,
             width: windowWidth - 32,
             backgroundColor: Colors.gray100,
             marginLeft: 16
            }}
            />
        );
    };

    render() {
        console.log('RENDERING NEWS LIST');
        console.log(windowWidth);
        const { newsList } = this.props;
        return (
            <FlatList
                data={newsList.data}
                extraData={this.state}
                keyExtractor={this.keyExtractor}
                refreshing={false}
                renderItem={this.renderItem}
                ListHeaderComponent={this.renderVideo}
                ItemSeparatorComponent={this.renderSeparator}
                onRefresh={() => {
                    firebase.analytics().logEvent('pull_to_refresh_newslist', {});
                    this.onRefresh();
                }}
                getItemLayout={(data, index) => (
                    { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index }
                )}
            />
        );
    }
}
function mapStateToProps(state) {
    return {
        newsList: state.newsList,
        weeklyVideo: state.weeklyVideo,
    };
}
export default connect(mapStateToProps, { fetchNewsList, fetchWeeklyUpdateVideo })(NewsItemList);
