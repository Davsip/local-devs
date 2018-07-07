import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import ProjectsAPI from './pages/projectsAPI';

const App = () => (
  <Router>
    <React.Fragment>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/api/projects' component={ProjectsAPI} />
      </Switch>    
    </React.Fragment>
  </Router>

);

export default App;