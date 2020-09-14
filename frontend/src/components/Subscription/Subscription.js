import React, { useState, useEffect } from 'react';
import { Typography } from 'antd';
import axios from 'axios';
import Videos from '../Videos/Videos';
import { useSelector } from 'react-redux';
import { IDLE, FETCHING, DONE } from '../../items/fetchingStatus'

const { Title } = Typography;

const Subscription = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(IDLE);
  const user = useSelector(state => state.user);

  useEffect(() => {
    console.log('3');
    let currentUserInfo;
    if (user.userData && user.userData._id) {
      currentUserInfo = user.userData._id;
      setLoading(FETCHING);
      axios.get(`/api/video/getSubscriptionVideos/${currentUserInfo}`)
        .then(response => {
          if (response.data.success) {
            setVideos(response.data.videos.slice(0).reverse());
          } else {
            alert('Failed to load subscription videos');
          }
          setLoading(DONE);
        })
    }
  }, [user.userData]);

  if (loading === DONE) {
    return (
      <div className="browse_videos">
        <Title level={2} >My Subscription Videos</Title>
        <hr />
        <br /><br />
        <Videos videos={videos} noVideoMessage='No subscription found'/>
      </div>
    );
  }
  return (<div></div>);
}

export default Subscription;