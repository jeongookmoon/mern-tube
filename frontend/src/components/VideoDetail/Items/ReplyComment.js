import React, { useState, useEffect } from 'react';
import SingleComment from './SingleComment';
import { IDLE, FETCHING, DONE } from '../../../items/fetchingStatus';
import Loading from '../../../items/Loading';

const ReplyComment = (props) => {
  const { currentUserId, videoId, addComment, parentCommentId, commentList } = props;
  const [replyNumber, setReplyNumber] = useState(0);
  const [openReplyFlag, setOpenReplyFlag] = useState(false);
  const [fetchingStatus, setFetchingStatus] = useState(IDLE);

  useEffect(() => {
    setFetchingStatus(FETCHING);
    const commentNumber = commentList.filter(comment => comment.responseTo === parentCommentId).length;
    setReplyNumber(commentNumber);
    setFetchingStatus(DONE);
  }, [commentList, parentCommentId]);

  const RenderReplyComment = (targetId) =>
    commentList.map((eachComment, index) => {
      if (eachComment.responseTo) {
        return (
          <React.Fragment key={index}>
            {
              eachComment.responseTo === targetId &&
              <div style={{ marginLeft: '42px', width: '80%' }}>
                <SingleComment key={'single' + eachComment._id} commentData={eachComment} currentUserId={currentUserId} videoId={videoId} addComment={addComment} placeholder='Reply here' />
                <ReplyComment key={'reply' + eachComment._id} parentCommentId={eachComment._id} commentList={commentList} currentUserId={currentUserId} videoId={videoId} addComment={addComment} />
              </div>
            }
          </React.Fragment>
        )
      }
      return <div key={index}></div>
    });

  const onHandleChange = () => {
    setOpenReplyFlag(!openReplyFlag);
  }

  const viewReplyWord = (number) => {
    if (number === 1) return `View #${number} reply`;
    else if (number > 1) return `View #${number} replies`;
  }

  if (fetchingStatus !== DONE) return (<Loading />);
  return (
    <div>
      { replyNumber > 3 &&
        <p style={{ marginLeft: '42px', fontSize: '14px', margin: 0, color: 'darkgrey', cursor: 'pointer' }} onClick={onHandleChange}>
          {viewReplyWord(replyNumber)} {openReplyFlag ? <span> ▲</span> : <span> ▼</span>}</p>
      }


      {(openReplyFlag || replyNumber <= 3) && RenderReplyComment(parentCommentId)}
    </div>
  );
};

export default ReplyComment;