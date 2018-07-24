import React, { Component } from 'react';
import { FlatList, Dimensions, View, WebView, Platform } from 'react-native';
import { connect } from 'react-redux';
import LessonRow from './LessonRow';
import YouTube from 'react-native-youtube';
import firebase from 'react-native-firebase';
import Colors from '@assets/colors.js';
import fetchLessonList, { selectLesson, playSelectedLesson } from './../../../Actions/LessonActions';
import { YOUTUBE } from './../../../Utils/Constants';
const windowWidth = Dimensions.get('window').width;
const ITEM_HEIGHT = 128;

class LessonList extends Component {
    componentWillMount() {
        console.log('componentWillMount lesson list');
        this.props.fetchLessonList();
    }
    onPressItem = (id) => {
        this.props.selectLesson(id);
    }
    onShouldStartLoadWithRequest = (navigator) => {
        console.log('onShouldStartLoadWithRequest');
        return true;

        // if (navigator.url.indexOf('embed') !== -1
        // ) {
        //     return true;
        // } else {
        //     this.videoPlayer.stopLoading(); //Some reference to your WebView to make it stop loading that URL
        //     return false;
        // }
    }
    keyExtractor = (item) => item.id;

    renderVideo = () => {

        const { lessonList } = this.props;

        if (lessonList.data.items === undefined) {
            return;
        }

        const lesson = lessonList.data.items.filter(item => {
            return item.id === lessonList.selectedItem;
        })[0];
        if (lesson !== undefined) {
            console.log('rendering video', this.props.lessonList.playSelected);
            return (
                <View style={{ height: windowWidth * 0.5625 }}>
                    <WebView
                        ref={(ref) => { this.videoPlayer = ref; }}
                        javaScriptEnabled
                        domStorageEnabled
                        source={{ uri: `https://www.youtube.com/embed/${lesson.contentDetails.videoId}` }}
                        onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest} //for iOS
                        onNavigationStateChange={this.onShouldStartLoadWithRequest} //for Android */
                    />
                </View>
                // <YouTube
                //     ref={component => {
                //         this.youTubeRef = component;
                //     }}
                //     apiKey={YOUTUBE}
                //     videoId={lesson.contentDetails.videoId}  // The YouTube video ID
                //     play={this.props.lessonList.playSelected}           // control playback of video with true/false
                //     style={{ alignSelf: 'stretch', height: windowWidth * 0.5625 }}
                //     showinfo={false}
                //     modestbranding
                // />

            );
        }
        return null;
    }
    renderItem = ({ item }) => {
        const selected = this.props.lessonList.selectedItem === item.id;
        return (
            <LessonRow
                id={item.id}
                item={item}
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
        const { lessonList } = this.props;
        return (
            <View style={{ flexDirection: 'column' }}>
                {this.renderVideo()}
                <FlatList
                    data={lessonList.data.items}
                    keyExtractor={this.keyExtractor}
                    refreshing={false}
                    renderItem={this.renderItem}
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
export default connect(mapStateToProps, { fetchLessonList, selectLesson, playSelectedLesson })(LessonList);
