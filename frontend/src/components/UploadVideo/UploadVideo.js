import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Dropzone from 'react-dropzone';
import './items/UploadVideo.css';
import { Form, Input } from 'antd';

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
    let formData = new FormData();
    formData.append('file', acceptedFiles[0]);
    console.log('acceptedFiles', acceptedFiles);
    console.log('formData.get("file")', formData.get("file"));
    const config = { header: { 'content-type': 'multipart/form-data' } };

  }

  const onSubmit = (event) => {
    event.preventDefault();

    if (!user.userData || !user.userData.isAuth) {
      return alert("Please log in to upload video");
    }

    if (title === "" || privacy === "" || category === "") {
      return alert("Title, privacy and category are required fields");
    }
  }

  return (
    <div className="uploadForm">
      <Form onSubmit={onSubmit}>
        <h1>Upload Your Video Today <span role="img" aria-label="video">🎞️</span></h1>
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
      </Form>
    </div>
  )
}

export default UploadVideo;