import React, { useState } from 'react';
import { Menu } from 'antd';
import './Items/NavBar.css';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
  const [visible, setVisible] = useState(false);
  const location = useLocation ();

  return (
    <div className="navbar">
      <div className="logo"><a href="/">Youtube Clone</a></div>
      {/* To highlight menu based on current path */}
      <Menu mode="horizontal" className="menu" defaultSelectedKeys={['/']} selectedKeys={[location.pathname]}>
        <Menu.Item key="/"><Link to="/">Home</Link></Menu.Item>
        <Menu.Item key="/register" className="menu_right"><Link to="/register">Register</Link></Menu.Item>
        <Menu.Item key="/login" className="menu_right"><Link to="/login">Login</Link></Menu.Item>
      </Menu>
    </div>
  )
}

export default NavBar;
