import React from 'react';
import { useSelector } from 'react-redux';

const Home = () => {
  const user = useSelector(state => state.user);

  return (
    <div className="center_message">
      <p>Welcome to MERN Tube! <span role='img' aria-label="popcorn">🍿</span></p>
      {user.userData && user.userData.isAuth && <p>How is your day, {user.userData.username}?</p>}
    </div>
  )
}

export default Home;
