import React, { Component } from 'react';
import { FlatList, Dimensions, View, Text } from 'react-native';
import NewsItemRow from './NewsItemRow';
import { connect } from 'react-redux';
import fetchNewsList from './../../../Actions/FetchNewsList';
import fetchWeeklyUpdateVideo from './../../../Actions/FetchWeeklyUpdateVideo';
import { Actions } from 'react-native-router-flux';
import VideoPlayer from 'react-native-video-player';
import memoize from 'lodash/memoize';
import firebase from 'react-native-firebase';
import Colors from '@assets/colors.js';
import Images from '@assets/images.js';
import moment from 'moment';



const windowWidth = Dimensions.get('window').width;
const ITEM_HEIGHT = 128;

class NewsItemList extends Component {
    state = { disableTouch: false, showVideoTitle: true };
    componentWillMount() {
        console.log('componentWillMount news');
        this.fetchNews();
    }

    shouldComponentUpdate(nextProps, nextState) {
        const shouldUpdate = (this.props.newsList.data !== nextProps.newsList.data) || (this.props.weeklyVideo.video !== nextProps.weeklyVideo.video) || (this.state.showVideoTitle !== nextState.showVideoTitle);
        console.log('ShoulUpdateNewsList', shouldUpdate);
        return shouldUpdate;
    }
    onPressItem = (item) => {
        if (this.state.disableTouch === false) {
            this.state.disableTouch = true;
            Actions.article({ url: item.url, html: item.html, sponsored: item.sponsored });
            setTimeout(() => {
                this.state.disableTouch = false;
            }, 2000);
        } else {
            console.log('touch disabled');
        }
    }
    fetchNews() {
        console.log('onRefresh news');
        this.props.fetchNewsList();
        this.props.fetchWeeklyUpdateVideo();
    }
    keyExtractor = (item) => item.guid;
    _renderVideo = memoize((video) =>
                  <View style={{ backgroundColor: Colors.gray900, padding: 16 }}>
                    <View>
                    <VideoPlayer
                        endWithThumbnail
                        thumbnail={Images.weeklyVideoThumb}
                        video={{ uri: video.videoUrl }}
                        videoWidth={windowWidth - 32}
                        videoHeight={(windowWidth - 32) / 1.78}
                        duration={video.video.duration}
                        ref={(r) => { this.player = r; }}
                        resizeMode={'stretch'}
                        onPlayPress={() => {
                            console.log('onPlayPress');
                            firebase.analytics().logEvent('click_play_weekly_video', { url: video.videoUrl });
                            this.setState({ showVideoTitle: false });
                        }}
                        onEnd={() => {
                            firebase.analytics().logEvent('weekly_video_end', { url: video.videoUrl });
                        }}
                        style={{ borderRadius: 4 }}
                        customStyles={{
                            thumbnail: {
                            overflow: 'hidden'
                            }
                         }}
                    />
                    { this.state.showVideoTitle && 
                         <View style={{ position: 'absolute', marginLeft: 16, marginTop: 16 }}>
                         <Text style={{ color: 'blue', fontWeight: 'bold', fontSize: 16 }}>WEEKLY VIDEO</Text>
                         <Text style={{ color: 'white', fontSize: 12, width: 140 }}>ALL YOUR BITCOIN NEWS IN 99 SECONDS</Text>
                        </View>
                    }
                    </View>
              </View>
    );

    renderVideo = () => {
        const { weeklyVideo } = this.props;
        if (weeklyVideo.video) {
            console.log('VIDEO FOUND', this._renderVideo(weeklyVideo));
            //return this._renderVideo(weeklyVideo);


            return (
                 <View style={{ backgroundColor: Colors.gray900, padding: 16 }}>
                    <View>
                    <VideoPlayer
                        endWithThumbnail
                        thumbnail={Images.weeklyVideoThumb}
                        video={{ uri: weeklyVideo.videoUrl }}
                        videoWidth={windowWidth - 32}
                        videoHeight={(windowWidth - 32) / 1.78}
                        duration={weeklyVideo.video.duration}
                        ref={(r) => { this.player = r; }}
                        resizeMode={'stretch'}
                        onStart={() => {
                            firebase.analytics().logEvent('click_play_weekly_video', { url: weeklyVideo.videoUrl });
                            this.setState({ showVideoTitle: false });
                         }}
                        onEnd={() => {
                            firebase.analytics().logEvent('weekly_video_end', { url: weeklyVideo.videoUrl });
                        }}
                        style={{ borderRadius: 4 }}
                        customStyles={{
                            thumbnail: {
                            overflow: 'hidden'
                            }
                         }}
                    />
                    { this.state.showVideoTitle && 
                         <View style={{ position: 'absolute', marginLeft: 16, marginTop: 16 }}>
                         <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>BITCOIN NEWS SUMMARY</Text>
                         <Text style={{ color: 'white', fontSize: 14, width: 140 }}>{moment().startOf('isoWeek').format('MMM DD, YYYY')}</Text>
                        </View>
                    }
                    </View>
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
