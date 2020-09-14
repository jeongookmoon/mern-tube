import React, { useState } from 'react';
import { Comment, Avatar } from 'antd';
import CommentForm from './CommentForm';
import axios from 'axios';
import moment from 'moment';

const SingleComment = (props) => {
  const [openReply, setOpenReply] = useState(false);
  const [content, setContent] = useState('');

  const { videoId, commentData, currentUserId, addComment } = props
  const commentOwner = commentData.writer;
  
  const toggleOpenReply = () => {
    setOpenReply(!openReply);
  }

  const updateComment = (newComment) => {
    setContent(newComment);
  }

  const submit = () => {
    const commentInfo = {
      content,
      writer: currentUserId,
      videoId: videoId,
      responseTo: commentData._id
    };

    axios.post('/api/comment/saveComment', commentInfo)
      .then(response => {
        if (response.data.success) {
          setContent('');
          updateComment('');
          addComment(response.data.comments);
        } else {
          alert('Failed to save a reply')
        }
      });
  }

  const actions = [
    <span onClick={toggleOpenReply} key="comment-basic-reply-to">Reply to</span>
  ];


  return (
    <div>
      <Comment
        actions={actions}
        author={commentOwner.username}
        avatar={<Avatar src={commentOwner.image} alt="userAvatar" />}
        content={commentData.content}
        datetime={<span>{moment(commentData.createdAt).calendar()}</span>}
      />
      {openReply && <div style={{ marginLeft: '42px', width: '80%' }}><CommentForm userId={currentUserId} updateComment={updateComment} submit={submit} placeholder='Reply here' /></div>}
      <br />
    </div>
  );
};

export default SingleComment;