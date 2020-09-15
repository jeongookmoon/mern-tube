import React, { useState, useEffect } from 'react';
import { Typography } from 'antd';
import axios from 'axios';
import Videos from '../Videos/Videos';
import { IDLE, FETCHING, DONE } from '../../items/fetchingStatus'
import Loading from '../../items/Loading';

const { Title } = Typography;

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(IDLE);

  useEffect(() => {
    console.log('1');
    setLoading(FETCHING);
    axios.get('/api/video/getVideos')
      .then(response => {
        if (response.data.success) {
          // https://stackoverflow.com/questions/36415904/is-there-a-way-to-use-map-on-an-array-in-reverse-order-with-javascript
          // reverse order of videos
          setVideos(response.data.videos.slice(0).reverse());
        } else {
          alert('Failed to load videos');
        }
        setLoading(DONE);
      })
  }, []);

  if (loading === DONE) {
    return (
      <div className="browse_videos">
        <Title level={2} >Browse Videos</Title>
        <hr />
        <br /><br />
        <Videos videos={videos} noVideoMessage='No video found' />
      </div>
    );
  }
  return (<Loading />);
}

export default Home;
