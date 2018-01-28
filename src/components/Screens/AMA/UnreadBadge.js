import React, { Component } from 'react';
import { getUnreadCount } from '../../../Actions/ChatActions';
import { connect } from 'react-redux';
import { Badge } from '../../common';

class UnreadBadge extends Component {

    shouldComponentUpdate(nextProps) {
        return (this.props.chatState.badgeCount !== nextProps.chatState.badgeCount);
    }

    render() {
       console.log('RENDER BADGE');
       const { chatState } = this.props;
        if (chatState.badgeCount > 0) {
            return <Badge number={chatState.badgeCount} />;
        }
        return null;
    }
}
function mapStateToProps(state) {
    return {
        chatState: state.chatState
    };
}
export default connect(mapStateToProps, { 
    getUnreadCount, 
})(UnreadBadge);
