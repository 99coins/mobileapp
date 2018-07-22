import React, { Component } from 'react';
import { FlatList, Dimensions, View, Share } from 'react-native';
import { connect } from 'react-redux';
import LessonRow from './LessonRow';
import YouTube from 'react-native-youtube';
import firebase from 'react-native-firebase';
import Colors from '@assets/colors.js';
import fetchLessonList, { selectLesson } from './../../../Actions/LessonActions';

const windowWidth = Dimensions.get('window').width;
const ITEM_HEIGHT = 128;

class LessonList extends Component {
    componentWillMount() {
        console.log('componentWillMount news');
        this.props.fetchLessonList();
    }
    onPressItem = (id) => {
        this.props.selectLesson(id);
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
            return (
                <YouTube
                    videoId={lesson.contentDetails.videoId}  // The YouTube video ID
                    play            // control playback of video with true/false
                    //onReady={e => this.player}
                    /* onChangeState={e => this.setState({ status: e.state })}
                    onChangeQuality={e => this.setState({ quality: e.quality })}
                    onError={e => this.setState({ error: e.error })} */

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
                item={item}
                onPressItem={this.onPressItem}
                selected={selected}
            />
        );
    }

    // stopVideo = () => {
    //     this.setState({ status: e.state }
    // }
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
                data={lessonList.data.items}
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
