import React from 'react';
import moment from 'moment';
import { Col, Row, Avatar, Card } from 'antd';
import './Videos.css';
import { Link } from 'react-router-dom';

const { Meta } = Card;

const Videos = (props) => {
  const { videos } = props;

  const videoBoxes = videos.length > 0 ?
    videos.map((video, index) => {
      // Math.floor = returns largest integer
      const minutes = Math.floor(video.clipDuration / 60);
      const seconds = Math.floor(video.clipDuration - minutes * 60);

      return (
        <Col lg={6} md={8} xs={24} key={index}>
          <div className="videos_box">
            <Link to={`/video/${video._id}`}>
              <img alt="thumbnail" className="thumbnail_image" src={video.thumbnailPath} />
              <div className="duration"><span>{minutes} : {seconds}</span></div>
            </Link>
          </div> <br />
          <Meta avatar={<Avatar src={video.writer.image} />}
            title={video.title} />
          <span>{video.writer.username}</span><br />
          <div className="pclass">
            <p className="videos_box_detail">{video.views} views</p>
            <p>{moment(video.createdAt).format("MMM Do, YYYY")}</p>
          </div>
        </Col>
      );
    })
    : <div>No subscription found</div>;


  return (
    <Row gutter={[16, 16]}>
      {videoBoxes}
    </Row>
  );
}



export default Videos;