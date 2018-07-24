import React, { Component } from 'react';
import { FlatList, Dimensions, View, WebView } from 'react-native';
import { connect } from 'react-redux';
import LessonRow from './LessonRow';
import Colors from '@assets/colors.js';
import fetchLessonList, { selectLesson, playSelectedLesson } from './../../../Actions/LessonActions';

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
                    />
                </View>
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
