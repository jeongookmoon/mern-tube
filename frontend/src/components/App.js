import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthenticationCheck from '../hoc/auth';
import NavBar from './NavBar/NavBar';
import Home from './Home/Home';
import News from './News/News';
import Register from './Register/Register';
import Login from './Login/Login';
import UploadVideo from './UploadVideo/UploadVideo';
import VideoDetail from './VideoDetail/VideoDetail';
import Subscription from './Subscription/Subscription';
import CreatePost from './Blog/CreatePost';

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
          <Route path="/video/:videoId" component={AuthenticationCheck(VideoDetail, null)} />
          <Route path="/subscription" component={AuthenticationCheck(Subscription, true)} />
          <Route path="/blog/createpost" component={AuthenticationCheck(CreatePost, null)} />
        </Switch>
    </Suspense>
  );
}

export default App;
