import React, { useEffect, useState } from 'react';
import { Tooltip } from 'antd';
import { LikeTwoTone, DislikeTwoTone } from '@ant-design/icons';
import { IDLE, FETCHING, DONE } from '../../../items/fetchingStatus';
import Loading from '../../../items/Loading';
import axios from 'axios';

const Likes = (props) => {
  const [likes, setLikes] = useState(0);
  const [likeClicked, setLikeClicked] = useState(false);
  const [dislikes, setDislikes] = useState(0);
  const [dislikeClicked, setDislikeClicked] = useState(false);
  const [loadingLike, setLoadingLike] = useState(IDLE);
  const [loadingDislike, setLoadingDislike] = useState(IDLE);

  const { userId } = props;

  const updateParameters = (property) => {
    if (property.videoId)
      return { videoId: property.videoId, userId: property.userId };

    return { commentId: property.commentId, userId: property.userId };
  }

  const parameters = updateParameters(props);

  useEffect(() => {
    setLoadingLike(FETCHING);
    axios.post('/api/like/getLikes', parameters)
      .then(response => {
        if (response.data.success) {
          // how many likes
          setLikes(response.data.likes.length);

          // if user clicked like
          const likeFlag = response.data.likes.filter(eachLike => eachLike.userId === props.userId).length > 0;
          setLikeClicked(likeFlag);
        } else alert('Failed to fetch Likes data');
        setLoadingLike(DONE);
      })

    setLoadingDislike(FETCHING);
    axios.post('/api/like/getDislikes', parameters)
      .then(response => {
        if (response.data.success) {
          // how many dislikes
          setDislikes(response.data.dislikes.length);

          // if user clicked like
          const dislikeFlag = response.data.dislikes.filter(eachDislike => eachDislike.userId === props.userId).length > 0;
          setDislikeClicked(dislikeFlag);
        } else {
          alert('Failed to fetch Dislikes data')
        }
        setLoadingDislike(DONE);
      })
  }, [props.userId]);

  const updateLike = () => {
    if (!userId) return alert('Please login to like');
    if (!likeClicked) {
      axios.post('/api/like/postLike', parameters)
        .then(response => {
          if (response.data.success) {
            setLikes(likes + 1);
            setLikeClicked(true);

            if (dislikeClicked) {
              setDislikes(dislikes - 1);
              setDislikeClicked(false);
            }
          } else alert('Failed to post like action');
        });
    } else {
      axios.post('/api/like/deleteLike', parameters)
        .then(response => {
          if (response.data.success) {
            setLikes(likes - 1);
            setLikeClicked(false);

          } else alert('Failed to delete like');
        });
    }
  }

  const updateDislike = () => {
    if (!userId) return alert('Please login to dislike');
    if (!dislikeClicked) {
      axios.post('/api/like/postDislike', parameters)
        .then(response => {
          if (response.data.success) {
            setDislikes(dislikes + 1);
            setDislikeClicked(true);

            if (likeClicked) {
              setLikes(likes - 1);
              setLikeClicked(false);
            }
          } else alert('Failed to post dislike action');
        });
    } else {
      axios.post('/api/like/deleteDislike', parameters)
        .then(response => {
          if (response.data.success) {
            setDislikes(dislikes - 1);
            setDislikeClicked(false);

          } else alert('Failed to delete dislike');
        });
    }
  }

  if (loadingLike !== DONE || loadingDislike !== DONE) return (<Loading />);
  return (
    <div>
      <span key="video-like">
        <Tooltip title="Like">
          <LikeTwoTone twoToneColor={likeClicked ? "" : "#c2c2c2"} onClick={updateLike} />
        </Tooltip>
        <span style={{ marginLeft: '5px', marginRight: '10px', cursor: 'auto' }}>{likes}</span>
      </span>
      <span key="video-dislike">
        <Tooltip title="Dislike">
          <DislikeTwoTone twoToneColor={dislikeClicked ? "#eb2f96" : "#c2c2c2"} onClick={updateDislike} />
        </Tooltip>
        <span style={{ marginLeft: '5px', marginRight: '10px', cursor: 'auto' }}>{dislikes}</span>
      </span>
    </div>
  );
};

export default Likes;
