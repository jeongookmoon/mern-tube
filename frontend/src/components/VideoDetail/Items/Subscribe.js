import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Subscribe = (props) => {
  const [subscribeNumber, setSubscribeNumber] = useState(0);
  const [subscribedFlag, setSubscribedFlag] = useState(false);
  const { userFrom, userTo } = props;

  const onSubscribe = () => {

  }

  useEffect(() => {
    const subscribeParam = { userTo };
    const subscribedParam = { userTo, userFrom };

    axios.post('/api/subscribe/subscribeNumber', subscribeParam)
      .then(response => {
        if (response.data.success) {
          setSubscribeNumber(response.data.subscribeNumber);
        } else {
          alert('Unable to fetch subscribe number');
        }
      });

    axios.post('/api/subscribe/subscribed', subscribedParam)
      .then(response => {
        if (response.data.success) {
          setSubscribedFlag(response.data.subscribedFlag);
        } else {
          alert('Unable to fetch subscribed flag');
        }
      })
  }, [userTo, userFrom])

  return (
    <div>
      <button
        style={{
          backgroundColor: `${subscribedFlag ? '#AAAAAA' : '#F08686'}`, borderRadius: '4px',
          color: 'white', padding: '10px 16px',
          fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
        }}
        onClick={onSubscribe}
      >
        #{subscribeNumber} {subscribedFlag ? 'Subscribed' : 'Subscribe'}
      </button>
    </div>
  );
};

export default Subscribe;