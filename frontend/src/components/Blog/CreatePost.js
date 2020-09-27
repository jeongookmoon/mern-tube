import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import { Typography, Button, Form } from 'antd';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.core.css';

const { Title } = Typography;

const Blogs = (props) => {
  const [content, setContent] = useState('');
  const { userData } = props;

  if (userData && !userData.isAuth) {
    return alert('Please login first');
  }

  const onSubmit = (event) => {
    event.preventDefault();

  }

  const onEditorChange = () => {

  }

  const onFilesChange = () => {

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

        <Form onSubmit={onSubmit}>
          <div style={{ textAlign: 'center', margin: '2rem', }}>
            <Button
              size="large"
              htmlType="submit"
              className="as"
              onSubmit={onSubmit}
            >
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Blogs;