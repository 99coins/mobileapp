import React, { Component } from 'react';
import { FlatList, Dimensions, View, Text, Share } from 'react-native';
import { connect } from 'react-redux';
import LessonRow from './LessonRow';
import { Actions } from 'react-native-router-flux';
import VideoPlayer from 'react-native-video-player';
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
                <View style={{ backgroundColor: Colors.gray900 }}>
                    <View>
                        <VideoPlayer
                            autoplay={false}
                            endWithThumbnail
                            hideControlsOnStart
                            thumbnail={{ uri: lesson.thumbnail }}
                            video={{ uri: lesson.url }}
                            /* videoWidth={windowWidth - 32}
                            videoHeight={(windowWidth - 32) / 1.78} */
                            ref={(r) => { this.player = r; }}
                            resizeMode={'stretch'}
                            onStart={() => {
                                firebase.analytics().logEvent('click_play_lesson', { id: lesson.id });
                                //this.setState({ showVideoTitle: false });
                            }}
                            onSharePress={() => {
                                this.onShareVideo(lesson.title, lesson.shareUrl);
                            }}
                            onEnd={() => {
                                //firebase.analytics().logEvent('lesson_end', { url: weeklyVideo.videoUrl });
                                console.log('on end');
                            }}
              
                        />
                        {/* {this.state.showVideoTitle &&
                            <View style={{ position: 'absolute', marginLeft: 16, marginTop: 16 }}>
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>{weeklyVideo.title}</Text>
                                <Text style={{ color: 'white', fontSize: 14, width: 140 }}>{weeklyVideo.subtitle}</Text>
                            </View>
                        } */}
                    </View>
                </View>

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
            <FlatList
                data={lessonList.data}
                extraData={this.state}
                keyExtractor={this.keyExtractor}
                refreshing={false}
                renderItem={this.renderItem}
                ListHeaderComponent={this.renderVideo}
                ItemSeparatorComponent={this.renderSeparator}
                getItemLayout={(data, index) => (
                    { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index }
                )}
            />
        );
    }
}
function mapStateToProps(state) {
    return {
        lessonList: state.lessonList
    };
}
export default connect(mapStateToProps, { fetchLessonList, selectLesson })(LessonList);
