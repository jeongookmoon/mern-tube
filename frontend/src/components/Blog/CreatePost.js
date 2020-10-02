import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ReactQuill from 'react-quill';
import axios from 'axios';
import { Typography, Button, Form } from 'antd';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.core.css';

const { Title } = Typography;

const CreatePost = () => {
  const [content, setContent] = useState('');
  const [files, setFiles] = useState([]);
  const User = useSelector(state => state.user);
  const { userData } = User

  const submit = () => {
    if (content === '') return;
    
    const params = {
      content,
      userId: userData._id
    }

    axios.post('/api/blog/createPost', params)
      .then(response => {
        console.log('response', response);
      })

  }

  const onEditorChange = (value) => {
    setContent(value)
  }

  const onFilesChange = (files) => {
    setFiles(files)
  }

  console.log('User', User);

  if (userData && !userData.isAuth) {
    return alert('Please login first');
  }

  return (
    <div>
      <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
        <div style={{ textAlign: 'center' }}>
          <Title level={2}> Editor </Title>
        </div>
        <ReactQuill
          placeholder="Post here"
          onEditorChange={onEditorChange}
          onFilesChange={onFilesChange}
          value={content}
          onChange={setContent}
          theme="snow"
        />

        <div style={{ textAlign: 'center', margin: '2rem', }}>
          <Button
            size="large"
            htmlType="submit"
            className="as"
            onClick={submit}
          >
            Submit
            </Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;