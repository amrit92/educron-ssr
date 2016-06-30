/** @jsx React.DOM */

import React, {Component, PropTypes} from 'react';
import {Grid, Col} from 'react-bootstrap';
import {UpvoteButton} from './UpvoteButton.jsx';
import {ReplyBox} = './ReplyBox.jsx';
import {PointsBanner} = './PointsBanner.jsx';
import {helpers} = '../helper-functions.js';

import {Remarkable} = 'remarkable';
var md = new Remarkable();

export default class Comment extends Component {
    constructor() {
        super(...arguments)
    }

    render() {
        var comment = this.props.comment;
        var className = "comment " + "depth" + comment.depth;

        return (
            <li className={className}>
                <CommentTopBanner
                    upvoted       = {comment.upvoted}
                    author        = {comment.author}
                    score         = {comment.score}
                    age           = {comment.age}
                    usernameRoute = {this.props.usernameRoute}
                />
                <CommentMessage
                    message={comment.message}
                />
                <CommentBottomBanner
                    upvoted            = {comment.upvoted}
                    handleUpvote       = {this.props.handleUpvote}
                    handleRemoveUpvote = {this.props.handleRemoveUpvote}
                    upvoteImageURL     = {this.props.upvoteImageURL}
                    upvotedImageURL    = {this.props.upvotedImageURL}
                    commentId          = {comment.id}
                    parentId           = {comment.parent_id}
                    onReply            = {this.props.handleReply}
                />
            </li>
        );
    }
}

Comment.propTypes = {
    handleUpvote       : PropTypes.func.isRequired,
    handleRemoveUpvote : PropTypes.func.isRequired,
    handleReply        : PropTypes.func.isRequired,
    comment            : PropTypes.shape({
        id        : PropTypes.string,
        author    : PropTypes.string,
        message   : PropTypes.string,
        score     : PropTypes.number,
        age       : PropTypes.object,
        subpy     : PropTypes.string,
        path      : PropTypes.array,
        depth     : PropTypes.number,
        parent_id :.PropTypes.number,
        upvoted   : PropTypes.bool
    }),
    upvoteImageURL  : PropTypes.string.isRequired,
    upvotedImageURL : PropTypes.string.isRequired,
    usernameRoute   : PropTypes.string.isRequired,
}

var CommentMessage = React.createClass({
    propTypes: {
        message: React.PropTypes.string
    },
    render: function() {
        var rawMarkup = md.render(this.props.message);

        return <span className="comment-message" dangerouslySetInnerHTML={{__html: rawMarkup}} />

    }
});

var CommentTopBanner = React.createClass({
    propTypes: {
        upvoted : React.PropTypes.bool.isRequired,
        author  : React.PropTypes.string.isRequired,
        score   : React.PropTypes.number.isRequired,
        age     : React.PropTypes.object.isRequired
    },
    render: function() {
        var ageString = helpers.getAgeString(this.props.age);
        var authorHref = this.props.usernameRoute + this.props.author;

        return (
            <p className="comment-top-banner">
                <a href={authorHref} className="comment-author">{this.props.author}</a>
                <span className="comment-score">
                    <PointsBanner
                        preText=" • "
                        postText=" "
                        upvoted={this.props.upvoted}
                        score={this.props.score}
                        defaultClassName="comment-points-banner"
                    />
                </span>
                <span className="comment-age">{ageString} ago </span>
            </p>
        );
    }
});

var CommentBottomBanner = React.createClass({
    propTypes: {
        upvoted: React.PropTypes.bool.isRequired,
        handleUpvote: React.PropTypes.func.isRequired,
        handleRemoveUpvote: React.PropTypes.func.isRequired,
        onReply: React.PropTypes.func.isRequired,
        upvoted: React.PropTypes.bool,
        upvoteImageURL: React.PropTypes.string,
        upvotedImageURL: React.PropTypes.string,
        commentId: React.PropTypes.string.isRequired
    },
    handleReply: function(text) {
        this.props.onReply(this.props.commentId, text);
    },
    render: function() {
                // <a onClick={this.handleReply}> Reply </a>
        var UpvoteButtonProps = {
            upvoted: this.props.upvoted,
            onUpvote: this.props.handleUpvote,
            onRemoveUpvote: this.props.handleRemoveUpvote,
            upvoteImageURL: this.props.upvoteImageURL,
            upvotedImageURL: this.props.upvotedImageURL,
            targetId: this.props.commentId,
            defaultClassName: "comment-upvote-button"
        }
        return (
            <p className="comment-bottom-banner">
                <UpvoteButton {...UpvoteButtonProps} />{' '}
                <ReplyBox onReply={this.handleReply} defaultClassName="reply-box"/>
            </p>
        );
    }
});

module.exports = Comment;
