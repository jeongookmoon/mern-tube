import React from 'react';
import { useSelector } from 'react-redux';

const Home = () => {
  const user = useSelector(state => state.user);
  
  return (
    <div className="center_message">
      Welcome to MERN Tube! <span role='img' aria-label="popcorn">🍿</span>
      {user.userData && user.userData.isAuth && <div>How is your day {user.userData.name}?</div>}
    </div>
  )
}

export default Home;
