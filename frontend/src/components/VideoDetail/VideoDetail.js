import React, { useEffect, useState } from 'react';
import { Row, Col, List, Avatar } from 'antd';
import axios from 'axios';
import SideBar from './Items/SideBar';
import Subscribe from './Items/Subscribe';
import './Items/VideoDetail.css';

const VideoDetail = (props) => {
  const [videoDetail, setVideoDetail] = useState({});
  const videoId = props.match.params.videoId;
  const userId = props.user.userData._id;

  useEffect(() => {
    axios.get(`/api/video/getVideoDetail/${videoId}`)
      .then(response => {
        if (response.data.success) {
          setVideoDetail(response.data.videoDetail);
        } else {
          alert('Failed to fetch a video data')
        }
      })
  }, [videoId]);

  if (videoDetail.writer && props.user.userData) {
    return (
      <Row gutter={[16, 16]}>
        <Col lg={18} xs={24} >
          <div className="leftBlock">
            <video id="video" src={videoDetail.filePath} controls autoPlay />
            <List.Item actions={[<Subscribe userTo={videoDetail.writer._id} userFrom={userId} />]}>
              <List.Item.Meta
                avatar={<Avatar src={videoDetail.writer.image} />}
                title={videoDetail.title}
                description={videoDetail.description}
              />
            </List.Item>
            {/* comments */}
          </div>
        </Col>
        <Col lg={6} xs={24}>
          <SideBar videoId={videoId} />
        </Col>
      </Row>
    );
  }
  return (<div></div>);
}

export default VideoDetail;