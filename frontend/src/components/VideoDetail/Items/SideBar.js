import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../../items/Loading';

const SideBar = (props) => {
  const [sideVideos, setSideVideos] = useState([]);
  const { videoId } = props;

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
    sideVideos
      .filter(video => video._id !== videoId)
      .map((video, index) => {
        // Math.floor = returns largest integer
        const minutes = Math.floor(video.clipDuration / 60);
        const seconds = Math.floor(video.clipDuration - minutes * 60);

        return (
          <div className="sidebar" key={index}>
            <div className="sidebar_video_container">
              <Link to={`/video/${video._id}`}>
                <img className="sidebar_video_thumbnail" src={video.thumbnailPath} alt="sidebar_thumbnail" />
              </Link>
            </div>
            <div className="sidebar_video_description">
              <span className="sidebar_video_description_title">{video.title && video.title.length > 15 ? video.title.substring(0, 14) + "..." : video.title}</span><br />
              <span>{video.writer.username}</span><br />
              <span>{video.views} {video.views && video.views > 1 ? 'views' : 'view'}</span><br />
              <span className="sidebar_duration">{minutes} : {seconds}</span>
            </div>
          </div>
        );
      })
    : <Loading />;

  return (
    <React.Fragment>
      <div style={{ marginTop: '3rem' }}></div>
      {sideVideoBoxes}
    </React.Fragment>
  );
}

export default SideBar;