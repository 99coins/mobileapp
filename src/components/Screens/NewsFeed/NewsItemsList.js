import React, { Component } from 'react';
import { FlatList } from 'react-native';
import NewsItemRow from './NewsItemRow';
import { connect } from 'react-redux';
import { fetchNewsList, updateViewableNewsItems } from './../../../Actions/FetchNewsList';
import fetchWeeklyUpdateVideo from './../../../Actions/FetchWeeklyUpdateVideo';
import { Actions } from 'react-native-router-flux';
import VideoPlayer from 'react-native-video-player';
import memoize from 'lodash/memoize'

const ITEM_HEIGHT = 80;

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
            Actions.News_2({ url: item.url, html: item.html });
            setTimeout(() => {
                this.state.disableTouch = false;
            }, 2000);
        } else {
            console.log('touch disabled');
        }
    }
    keyExtractor = (item, index) => item.id;
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
    renderItem = ({ item }) => {
        return (
            <NewsItemRow
                id={item.id}
                item={item}
                onPressItem={this.onPressItem}
            />
        );
    }

    render() {
        console.log('RENDERING NEWS LIST');
        const { newsList } = this.props;
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
        );
    }
}
function mapStateToProps(state) {
    return {
        newsList: state.newsList,
        weeklyVideo: state.weeklyVideo,
    };
}
export default connect(mapStateToProps, { fetchNewsList, updateViewableNewsItems, fetchWeeklyUpdateVideo })(NewsItemList);
