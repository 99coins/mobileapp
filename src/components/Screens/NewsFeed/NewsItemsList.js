import React, { Component } from 'react';
import { FlatList, Dimensions, View, WebView, Share } from 'react-native';
import NewsItemRow from './NewsItemRow';
import { connect } from 'react-redux';
import fetchNewsList from './../../../Actions/FetchNewsList';
import fetchWeeklyUpdateVideo from './../../../Actions/FetchWeeklyUpdateVideo';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';
import Colors from '@assets/colors.js';
import { capitalizeFirstLetter } from '../../common';

const windowWidth = Dimensions.get('window').width;
const ITEM_HEIGHT = 128;

class NewsItemList extends Component {
    state = { disableTouch: false, showVideoTitle: true };
    componentWillMount() {
        console.log('componentWillMount news');
        this.fetchNews();
    }

    shouldComponentUpdate(nextProps, nextState) {
        const shouldUpdate = (this.props.newsList.data !== nextProps.newsList.data) || (this.props.weeklyVideo.videoId !== nextProps.weeklyVideo.videoId);
        console.log('ShoulUpdateNewsList', shouldUpdate);
        return shouldUpdate;
    }
    onPressItem = (item) => {
        if (this.state.disableTouch === false) {
            this.state.disableTouch = true;
            Actions.article({ url: item.url, html: item.html, sponsored: item.sponsored, icon: item.source_info.img, title: capitalizeFirstLetter(item.source_info.name), share: true });
            setTimeout(() => {
                this.state.disableTouch = false;
            }, 2000);
        } else {
            console.log('touch disabled');
        }
    }
    onShareVideo(title, url) {
        firebase.analytics().logEvent('click_share_weekly_video', { url });
        Share.share({
            message: `${url}\n\nYou can download the 99 Bitcoins app at: https://tg55j.app.goo.gl/99bit`,
            url,
            title
        }, {
                // Android only:
                dialogTitle: url,
                // iOS only:
            });
    }
    fetchNews() {
        console.log('onRefresh news');
        this.props.fetchNewsList();
        this.props.fetchWeeklyUpdateVideo();
    }
    keyExtractor = (item) => item.guid;

    renderVideo = () => {
        console.log('RENDER VIDEO', this.youTubeRef);
        const { weeklyVideo } = this.props;

        if (this.youTubeRef) {
            return (this.youTubeRef);
        }

        if (weeklyVideo) {
            return (
                <View style={{ backgroundColor: Colors.gray900, padding: 16 }} >
                    <WebView
                        style={{ height: windowWidth * 0.5625, borderRadius: 8, overflow: 'hidden' }}
                        ref={(ref) => { this.videoPlayer = ref; }}
                        javaScriptEnabled
                        domStorageEnabled
                        source={{ uri: `https://www.youtube.com/embed/${weeklyVideo.videoId}` }}
                    />
                </View>
            );
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
                    this.fetchNews();
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
