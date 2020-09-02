import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthenticationCheck from '../hoc/auth';
import NavBar from './NavBar/NavBar';
import Home from './Home/Home';
import News from './News/News';
import Register from './Register/Register';
import Login from './Login/Login';
import UploadVideo from './UploadVideo/UploadVideo';

const App = () => {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
        <NavBar />
        <Switch>
          <Route path="/" exact component={AuthenticationCheck(Home, null)} />
          <Route path="/news" component={AuthenticationCheck(News, null)} />
          <Route path="/register" component={AuthenticationCheck(Register, false)} />
          <Route path="/login" component={AuthenticationCheck(Login, false)} />
          <Route path="/video/upload" component={AuthenticationCheck(UploadVideo, true)} />
        </Switch>
    </Suspense>
  );
}

export default App;
