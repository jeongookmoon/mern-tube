import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Dropzone from 'react-dropzone';
import './items/UploadVideo.css';
import { Form, Input, Button } from 'antd';
import axios from 'axios';

const { TextArea } = Input;

const PRIVACY = {
  PRIVATE: "Private",
  PUBLIC: "Public"
}

const CATEGORY = {
  MOVIE: "Movie",
  MUSIC: "Music",
  VLOG: "VLOG",
  LIVE: "Live",
  SHOW: "Show",
  ANIME: "Anime"
}

const UploadVideo = () => {
  const user = useSelector(state => state.user);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [privacy, setPrivacy] = useState(PRIVACY.PRIVATE);
  const [category, setCategory] = useState(CATEGORY.MOVIE);
  const [filePath, setFilePath] = useState("");
  const [clipDuration, setClipDuration] = useState("");
  const [thumbnailPath, setThumbnailPath] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const updateTitle = (event) => {
    setTitle(event.target.value);
  }

  const updateDescription = (event) => {
    setDescription(event.target.value);
  }

  const updatePrivacy = (event) => {
    setPrivacy(event.target.value);
  }

  const updateCategory = (event) => {
    setCategory(event.target.value);
  }

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length < 1)
      return alert("Selected video size is too big: Max supported size is 10MB");

    let formData = new FormData();
    formData.append('file', acceptedFiles[0]);
    const config = { header: { 'content-type': 'multipart/form-data' } };

    axios.post('/api/video/upload', formData, config)
      .then(async response => {
        console.log('video response', response.data);
        if (await response.data.success) {
          const fileInfo = {
            filePath: response.data.filePath,
            fileName: response.data.fileName
          }
          setFilePath(response.data.filePath);
          axios.post('/api/video/thumbnail', fileInfo)
            .then(response => {
              console.log('thumbnail response', response.data);
              if (response.data.success) {
                setClipDuration(response.data.clipDuration);
                setThumbnailPath(response.data.thumbnailPath);
              } else {
                alert('Failed to make thumbnailPath');
              }
            })
        } else {
          alert('Failed to save the video on the server');
        }
      })
  }

  const onSubmit = (event) => {
    event.preventDefault();

    if (!user.userData || !user.userData.isAuth)
      return alert("Please log in to upload video");

    if (title === "" || privacy === "" || category === "")
      return alert("Title, privacy and category are required fields");

    const uploadInfo = {
      writer: user.userData._id,
      title,
      description,
      privacy,
      filePath,
      category,
      clipDuration,
      thumbnailPath
    }

    axios.post('/api/video/uploadInfo', uploadInfo)
      .then(response => {
        if (response.data.success) {
          setUploadSuccess(true);
        } else {
          alert('Uploading video clip failed')
        }
      })
  }
  
  if (uploadSuccess === true) {
    return (
      <div className="center_message">
        <span role='img' aria-label="smile">😊</span> Thanks for uploading a video !!
        <span role='img' aria-label="shine">✨</span></div>
    )
  }

  return (
    <div className="uploadForm">
      <Form onSubmit={onSubmit}>
        {thumbnailPath !== "" ?
          <div className="thumbnail">
            <h1>Awesome <span role="img" aria-label="star">⭐</span> Here's Thumbnail</h1>
            <img src={`http://localhost:5000/${thumbnailPath}`} alt="thumbnail" />
            <br /><br />
          </div> :
          <h1>Upload Your Video Today <span role="img" aria-label="video">🎞️</span></h1>
        }
        <Dropzone
          onDrop={onDrop}
          multiple={false}
          //maxSize=10MB
          maxSize={10000000}
          accept="video/*"
        >
          {({ getRootProps, getInputProps }) => (
            <div>
              <div {...getRootProps()} className="uploadBox">
                <p><span role='img' aria-label="hedge_hog">🦔</span> Drop or Select</p>
                <input {...getInputProps()} />
              </div>
            </div>
          )}
        </Dropzone>

        <br /><br />
        <label className="sectionTitle">Title</label>
        <Input
          onChange={updateTitle}
          value={title}
          required
        />

        <br /><br />
        <label className="sectionTitle">Description</label>
        <TextArea
          onChange={updateDescription}
          value={description}
          rows={5}
        />

        <br /><br />
        <label className="sectionTitle">Privacy Setting</label>
        <br />
        <select className="sectionDropdown" onChange={updatePrivacy}>
          {Object.keys(PRIVACY).map((key, index) => {
            return <option key={index} value={PRIVACY[key]}>{PRIVACY[key]}</option>
          })}
        </select>

        <br /><br />
        <label className="sectionTitle">Category</label>
        <br />
        <select className="sectionDropdown" onChange={updateCategory}>
          {Object.keys(CATEGORY).map((key, index) => {
            return <option key={index} value={CATEGORY[key]}>{CATEGORY[key]}</option>
          })}
        </select>

        <br /><br />
        <Button type="primary" size="large" onClick={onSubmit}>
          Submit
        </Button>
      </Form>
      <br />
    </div>
  )
}

export default UploadVideo;