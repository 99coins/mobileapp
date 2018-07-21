import React, { Component } from 'react';
import { FlatList, Dimensions, View, Text, Share } from 'react-native';
import { connect } from 'react-redux';
import LessonRow from './LessonRow';
import { Actions } from 'react-native-router-flux';
import VideoPlayer from 'react-native-video-player';
import YouTube from 'react-native-youtube';
import memoize from 'lodash/memoize';
import firebase from 'react-native-firebase';
import Colors from '@assets/colors.js';
import Images from '@assets/images.js';
import moment from 'moment';
import { capitalizeFirstLetter } from '../../common';
import fetchLessonList, { selectLesson } from './../../../Actions/LessonActions';

const windowWidth = Dimensions.get('window').width;
const ITEM_HEIGHT = 128;

class LessonList extends Component {
    state = { disableTouch: false };
    componentWillMount() {
        console.log('componentWillMount news');
        this.props.fetchLessonList();
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     const shouldUpdate = (this.props.newsList.data !== nextProps.newsList.data) || (this.props.weeklyVideo.video !== nextProps.weeklyVideo.video) || (this.state.showVideoTitle !== nextState.showVideoTitle);
    //     console.log('ShoulUpdateLessonList', shouldUpdate);
    //     return shouldUpdate;
    // }
    onPressItem = (id) => {
        this.props.selectLesson(id);
        if (this.player) {
            this.player.setState({ isStarted: false });
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
    // fetchNews() {
    //     console.log('onRefresh news');
    //     this.props.fetchNewsList();
    //     this.props.fetchWeeklyUpdateVideo();
    // }
    keyExtractor = (item) => item.id;

    renderVideo = () => {
        const { lessonList } = this.props;
        const lessonRaw = lessonList.data.filter(item => {
            return item.id === lessonList.selectedItem;
        })[0];
        const lesson = lessonRaw ? lessonRaw._data : undefined;
        if (lesson !== undefined) {
            return (
                <YouTube
                    videoId={lesson.youtubeVideoId}  // The YouTube video ID
                    play            // control playback of video with true/false
                    onReady={e => this.setState({ isReady: true })}
                    onChangeState={e => this.setState({ status: e.state })}
                    onChangeQuality={e => this.setState({ quality: e.quality })}
                    onError={e => this.setState({ error: e.error })}

                    style={{ alignSelf: 'stretch', height: windowWidth * 0.5625 }}
                    showinfo={false}
                    modestbranding
                />

            );
        }
        return null;
    }
    renderItem = ({ item }) => {
        const selected = this.props.lessonList.selectedItem === item.id;
        console.log(selected);
        return (
            <LessonRow
                id={item.id}
                item={item._data}
                onPressItem={this.onPressItem}
                selected={selected}
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
        console.log('RENDERING LESSON LIST');
        console.log(windowWidth);
        const { lessonList } = this.props;

        return (
            <View style={{ flexDirection: 'column' }}>
                {this.renderVideo()}
            <FlatList
                data={lessonList.data}
                //extraData={this.state}
                keyExtractor={this.keyExtractor}
                refreshing={false}
                renderItem={this.renderItem}
                //ListHeaderComponent={this.renderVideo}
                ListFooterComponent={() => <View style={{ height: 211 }} />}
                ItemSeparatorComponent={this.renderSeparator}
                getItemLayout={(data, index) => (
                    { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index }
                )}
            />
            </View>
     
        );
    }
}
function mapStateToProps(state) {
    return {
        lessonList: state.lessonList
    };
}
export default connect(mapStateToProps, { fetchLessonList, selectLesson })(LessonList);
