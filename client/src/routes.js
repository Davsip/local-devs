import React from 'react';
import { Route, Router } from 'react-router-dom';
import App from './App';
import Home from './pages/Home/Home';
import Callback from './pages/Callback/Callback';
import Auth from './pages/Auth/Auth';
import history from './history';
import ProjectsAPI from './pages/projectsAPI';
import Profile from './pages/Profile/Profile';

const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

export const makeMainRoutes = () => {
  return (
      <Router history={history}>
        <div>
          <Route path="/" render={(props) => <App auth={auth} {...props} />} />
          <Route path="/home" render={(props) => <Home auth={auth} {...props} />} />
          <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} /> 
          }}/>
          <Route path="/api/projects" component={ProjectsAPI} />
          <Route path="/profile" render={(props) => <Profile auth={auth} {...props} />} />
        </div>
      </Router>
  );
}
