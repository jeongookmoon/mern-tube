import React, { useState } from 'react';
import axios from 'axios';

const Comment = (props) => {
  const [content, setContent] = useState('');
  const { userId, videoId } = props

  const updateComment = (event) => {
    setContent(event.currentTarget.value);
  }

  const submit = (event) => {
    event.preventDefault();

    const commentInfo = {
      content,
      writer: userId,
      videoId: videoId
    }

    axios.post('/api/comment/saveComment', commentInfo)
      .response(response => {
        if (response.data.success) {

        } else {

        }
      })
  }

  return (
    <div>
      <br />
      <p> Replies </p>
      <hr />

      {/* Comment Lists */}

      {/* Root Command Form */}

      <form style={{ display: "flex" }} onSubmit={submit}>
        <textarea
          style={{ width: "100%", borderRadius: "5px" }}
          onChange={updateComment}
          value={content}
          placeholder="Type a comment here"
        />
        <br />
        <button style={{ width: "20%", height: "52px" }} onClick={submit} >Submit</button>
      </form>
    </div>
  );
};

export default Comment;