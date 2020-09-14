import React, { useState } from 'react';

const Comment = (props) => {
  const { userId, placeholder } = props
  const [newComment, setNewComment] = useState('');

  const handleComment = (event) => {
    setNewComment(event.currentTarget.value);
    props.updateComment(event.currentTarget.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!userId)
      return alert('Please log-in to leave a comment');
    setNewComment('');
    props.submit();
  }

  return (
    <div>
      <form style={{ display: "flex" }} onSubmit={handleSubmit}>
        <textarea
          style={{ width: "100%", borderRadius: "5px" }}
          onChange={handleComment}
          value={newComment}
          placeholder={placeholder}
        />
        <br />
        <button style={{ width: "20%", height: "52px" }} onClick={handleSubmit} >Submit</button>
      </form>
    </div>
  );
};

export default Comment;