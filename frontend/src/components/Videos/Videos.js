import React from 'react';
import moment from 'moment';
import { Col, Row, Avatar, Card } from 'antd';
import './Items/Videos.css';
import { Link } from 'react-router-dom';

const { Meta } = Card;

const videoPlay = (event) => {
  const playPromise = event.target.play();
  if (playPromise !== undefined) {
    playPromise
      .then(response => {
        // video play auto
      })
      .catch(error => {
        // video play stop
      });
  }
}

const videoReset = (event) => {
  event.target.load();
}

const Videos = (props) => {
  const { videos, noVideoMessage } = props;

  const videoBoxes = videos.length > 0 ?
    videos.map((video, index) => {
      // Math.floor = returns largest integer
      const minutes = Math.floor(video.clipDuration / 60);
      const seconds = Math.floor(video.clipDuration - minutes * 60);

      return (
        <Col lg={6} md={8} xs={24} key={index}>
          <div className="videos_box">
            <Link to={`/video/${video._id}`}>
              <video
                className="thumbnail_image"
                poster={video.thumbnailPath}
                onMouseOver={videoPlay}
                onMouseOut={videoReset}
                src={video.filePath}
                muted
              />
              <div className="duration"><span>{minutes} : {seconds}</span></div>
            </Link>
          </div>
          <Meta avatar={<Avatar src={video.writer.image} />}
            title={video.title} />
          <span>{video.writer.username}</span><br />
          <div className="pclass">
            <p className="videos_box_detail">{video.views} {video.views && video.views > 1 ? 'views' : 'view'}</p>
            <p>{moment(video.createdAt).format("MMM Do, YYYY")}</p>
          </div>
        </Col>
      );
    })
    : <div>{noVideoMessage}</div>;


  return (
    <Row gutter={[16, 16]}>
      {videoBoxes}
    </Row>
  );
}



export default Videos;