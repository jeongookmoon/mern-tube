import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentForm from './CommentForm';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';
import { IDLE, FETCHING, DONE } from '../../../items/fetchingStatus';
import Loading from '../../../items/Loading';

const CommentSection = (props) => {
  const [newComment, setNewComment] = useState('');
  const [commentList, setCommentList] = useState([]);
  const [fetchingStatus, setFetchingStatus] = useState(IDLE);

  const { videoId, userData } = props

  useEffect(() => {
    setFetchingStatus(FETCHING);
    axios.get(`/api/comment/getComments/${videoId}`)
      .then(response => {
        if (response.data.success) {
          setCommentList(response.data.comments);
        } else {
          alert('Failed to fetch comments data')
        }
        setFetchingStatus(DONE);
      })
  }, [videoId]);

  const addComment = (newComment) => {
    setCommentList(commentList.concat(newComment));
  }

  const updateComment = (newValue) => {
    setNewComment(newValue);
  }

  const submit = () => {
    const commentInfo = {
      content: newComment,
      writer: userData._id,
      videoId: videoId
    };

    axios.post('/api/comment/saveComment', commentInfo)
      .then(response => {
        if (response.data.success) {
          updateComment('')
          addComment(response.data.comments);
        } else {
          alert('Failed to save comment');
        }
      });
  }
  if (fetchingStatus !== DONE) return (<Loading />);
  return (
    <div>
      <br />
      <CommentForm userId={userData._id} updateComment={updateComment} submit={submit} addComment={addComment} placeholder='Leave your comment here' />
      <br /><br />
      <p> Comments</p>
      <hr />

      {commentList && commentList.length > 0 &&
        commentList.slice(0).reverse().map((eachComment, index) =>
          !eachComment.responseTo &&
          <React.Fragment key={index}>
            <SingleComment key={'singleComment' + index} commentData={eachComment} currentUserId={userData._id} videoId={videoId} addComment={addComment} placeholder='Reply here' />
            <ReplyComment key={'replyComment' + index} parentCommentId={eachComment._id} commentList={commentList} currentUserId={userData._id} videoId={videoId} addComment={addComment} />
          </React.Fragment>
        )
      }
    </div>
  );
};

export default CommentSection;