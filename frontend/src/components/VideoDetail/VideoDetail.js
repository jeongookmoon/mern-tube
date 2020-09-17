import React, { useEffect, useState } from 'react';
import { Row, Col, List, Avatar } from 'antd';
import axios from 'axios';
import SideBar from './Items/SideBar';
import Subscribe from './Items/Subscribe';
import CommentSection from './Items/CommentSection';
import Likes from './Items/Likes';
import './Items/VideoDetail.css';
import Loading from '../../items/Loading';

const VideoDetail = (props) => {
  const [videoDetail, setVideoDetail] = useState({});

  const videoId = props.match.params.videoId;
  const userId = props.user.userData._id;
  const { username } = props.user.userData;
  const { userData } = props.user;

  useEffect(() => {
    // const getVideoInfo = async () => {
    //   await axios.get(`/api/video/getVideoDetail/${videoId}`)
    //     .then(response => {
    //       if (response.data.success)
    //         setVideoDetail(response.data.videoDetail);
    //       else
    //         alert('Failed to fetch video data');
    //     });
    // }

    const getUpdatedVideoInfo = async () => {
      await axios.put(`/api/video/updateView/${videoId}`)
        .then(response => {
          if (response.data.success)
            setVideoDetail(response.data.videoDetail);
          else
            alert('Failed to update video data');
        });
    }

    getUpdatedVideoInfo();
  }, [videoId]);

  if (videoDetail.writer && props.user.userData) {
    const writerId = videoDetail.writer._id;

    const SubscribeButton = writerId === userId ?
      <button className="myVideoButton">{username}'s Video</button>
      :
      <Subscribe userTo={videoDetail.writer._id} userFrom={userId} />

    return (
      <Row gutter={[16, 16]}>
        <Col lg={18} xs={24} >
          <div className="leftBlock">
            <video id="video" src={videoDetail.filePath} controls autoPlay />
            <List.Item actions={[<p>{videoDetail.views + 1} {videoDetail.views && videoDetail.views > 1 ? 'views' : 'view'}</p>, <Likes userId={userId} videoId={videoId} />, SubscribeButton]}>
              <List.Item.Meta
                avatar={<Avatar src={videoDetail && videoDetail.writer.image} />}
                title={videoDetail.title}
                description={videoDetail.writer.username}
              />
            </List.Item>
            <p style={{ marginLeft: '47px' }}>{videoDetail.description}</p>
            <CommentSection videoId={videoId} userData={userData} />
          </div>
        </Col>
        <Col lg={6} xs={24}>
          <SideBar videoId={videoId} />
        </Col>
      </Row>
    );
  }
  return (<Loading />);
}

export default VideoDetail;