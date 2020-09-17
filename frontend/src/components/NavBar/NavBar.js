import React, { useEffect } from 'react';
import { Menu } from 'antd';
import './Items/NavBar.css';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser, authenticateUser } from '../../_actions/user_actions';
import Loading from '../../items/Loading';

const NavBar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.user);
  useEffect(() => {
    dispatch(authenticateUser());
  }, [dispatch, history.location])

  const logout = () => {
    dispatch(logoutUser()).then(response => {
      if (response.payload.logoutSuccess) {
        history.push('/login');
      } else {
        alert('Logout fail');
      }
    });
  }

  if (!user.userData) {
    return (<Loading />);
  }

  if (user.userData && user.userData.isAuth) {
    return (
      <div className="navbar">
        <div className="logo"><Link to="/">MERN Tube <span role='img' aria-label="unicorn">🦄</span></Link></div>
        <div className="navbar-username">| <span className="menu_right_username">{user.userData.username}</span></div>
        {/* To highlight menu based on current path */}
        <Menu mode="horizontal" className="menu" defaultSelectedKeys={['/']} selectedKeys={[location.pathname]}>
          <Menu.Item key="/"><Link to="/">Home</Link></Menu.Item>
          <Menu.Item key="/news"><Link to="/news">News</Link></Menu.Item>
          <Menu.Item key="/subscription"><Link to="/subscription">Subscription</Link></Menu.Item>
          <Menu.Item key="/register" className="menu_right" onClick={logout}>Logout</Menu.Item>
          <Menu.Item key="/video/upload" className="menu_right"><Link to="/video/upload">Upload</Link></Menu.Item>
        </Menu>
      </div>
    );
  }

  return (
    <div className="navbar">
      <div className="logo"><a href="/">MERN Tube <span role='img' aria-label="dog">🐶</span></a></div>
      {/* To highlight menu based on current path */}
      <Menu mode="horizontal" className="menu" defaultSelectedKeys={['/']} selectedKeys={[location.pathname]}>
        <Menu.Item key="/"><Link to="/">Home</Link></Menu.Item>
        <Menu.Item key="/news"><Link to="/news">News</Link></Menu.Item>
        <Menu.Item key="/register" className="menu_right"><Link to="/register">Register</Link></Menu.Item>
        <Menu.Item key="/login" className="menu_right"><Link to="/login">Login</Link></Menu.Item>
      </Menu>
    </div>
  );
}

export default NavBar;
