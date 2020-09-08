import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SideBar = (props) => {
  const [sideVideos, setSideVideos] = useState([]);
  const videoId = props.videoId;

  useEffect(() => {
    axios.get('/api/video/getVideos')
      .then(response => {
        if (response.data.success) {
          setSideVideos(response.data.videos.slice(0).reverse());
        }
      })
  }, []);

  // let skipped = 0;
  // if (index > 7 + skipped) break;
  // if (video._id === videoId) skipped = 1; continue;

  const sideVideoBoxes = sideVideos.length > 0 ?
    sideVideos.map((video, index) => {
      // Math.floor = returns largest integer
      const minutes = Math.floor(video.clipDuration / 60);
      const seconds = Math.floor(video.clipDuration - minutes * 60);
      console.log('video.thumbnailPath', video.thumbnailPath);
      return (
        <div className="sidebar" key={index}>
          <div className="sidebar_video_container">
            <img className="sidebar_video_thumbnail" src={video.thumbnailPath} alt="sidebar_thumbnail" />
          </div>
          <div className="sidebar_video_description">
            <span className="sidebar_video_description_title">{video.title}</span><br />
            <span>{video.writer.username}</span><br />
            <span>{video.views} views</span><br />
            <span>{minutes} : {seconds}</span><br />
          </div>
        </div>
      );
    })
    : <div></div>;

  return (
    <React.Fragment>
      <div style={{ marginTop: '3rem' }}></div>
      {sideVideoBoxes}
    </React.Fragment>
  );
}

export default SideBar;