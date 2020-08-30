import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import Home from './Home/Home';
import Register from './Register/Register';
import Login from './Login/Login';
import Auth from '../hoc/auth';

const App = () => {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Auth(Home, null)} />
          <Route path="/register" component={Auth(Register, false)} />
          <Route path="/Login" component={Auth(Login, false)} />
        </Switch>
    </Suspense>
  );
}

export default App;
