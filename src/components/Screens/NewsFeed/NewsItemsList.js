import React, { Component } from 'react';
import { FlatList, Dimensions, View, Share, Platform } from 'react-native';
import NewsItemRow from './NewsItemRow';
import { connect } from 'react-redux';
import fetchNewsList from './../../../Actions/FetchNewsList';
import fetchWeeklyUpdateVideo from './../../../Actions/FetchWeeklyUpdateVideo';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';
import Colors from '@assets/colors.js';
import { capitalizeFirstLetter } from '../../common';
import WebView from 'react-native-android-fullscreen-webview-video';

const windowWidth = Dimensions.get('window').width;
const ITEM_HEIGHT = 128;

class NewsItemList extends Component {
    state = { disableTouch: false, showVideoTitle: true };
    componentWillMount() {
        console.log('componentWillMount news');
        this.fetchNews();
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if (this.props.routes.scene !== nextProps.routes.scene && nextProps.routes.scene === 'News') {
            this.fetchNews();
        }
        if (this.videoPlayer && nextProps.routes.scene !== 'News' && Platform.OS === 'android') {
            this.videoPlayer.reload();
        }
    }

    shouldComponentUpdate(nextProps) {
        const shouldUpdate = (this.props.newsList.data !== nextProps.newsList.data) || (this.props.weeklyVideo.videoId !== nextProps.weeklyVideo.videoId) || (this.props.routes.scene !== nextProps.routes.scene);
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
    keyExtractor = (item) => item.guid;

    fetchNews() {
        console.log('onRefresh news');
        this.props.fetchNewsList();
        this.props.fetchWeeklyUpdateVideo();
    }

    renderVideo = () => {
        console.log('RENDER VIDEO', );
        const { weeklyVideo, routes } = this.props;
        const videoUrl = weeklyVideo ? `https://www.youtube.com/embed/${weeklyVideo.videoId}` + `?modestbranding=1&playsinline=1&showinfo=0&rel=0"` : null;

        if (videoUrl !== null && this.props.appState === 'active'){
            console.log('VIDEO', videoUrl);
            return (
                <View style={{ backgroundColor: Colors.gray900, padding: 16 }} >
                 <WebView
                        style={{ height: windowWidth * 0.5625, borderRadius: 8, overflow: 'hidden' }}
                        ref={(ref) => { this.videoPlayer = ref; }}
                        source={{ uri: videoUrl }}
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
        routes: state.routes,
        appState: AppStateReducer
    };
}
export default connect(mapStateToProps, { fetchNewsList, fetchWeeklyUpdateVideo })(NewsItemList);
