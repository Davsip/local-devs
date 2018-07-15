import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';

// put landing / home page css in App.css
import './App.css';

// import Navigation from "./components/Navigation"

class App extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div>

        {/* <Navigation /> */}
        {/* all other landing / home page codes goes below here */}
        {/* remove navbar code below as needed */}
        {/* isAuthenticated() returns true or false, true if authenticated, false if not */}
        {/* use that to render certain features */}
        {/* i.e. user logo dropdown login / signup, log out / mydashboard */}
        { !isAuthenticated() && (
          <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Auth0 - React</a>
            </Navbar.Brand>
            <Button
              bsStyle="primary"
              className="btn-margin"
              onClick={this.goTo.bind(this, 'home')}
            >
              Home
            </Button>
            {
              !isAuthenticated() && (
                  <Button
                    id="qsLoginBtn"
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.login.bind(this)}
                  >
                    Log In
                  </Button>
                )
            }
            {
              isAuthenticated() && (
                  <Button
                    id="qsLogoutBtn"
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.logout.bind(this)}
                  >
                    Log Out
                  </Button>
                )
            }
          </Navbar.Header>
        </Navbar>
        )}

        { isAuthenticated() && (
          // {/* Nav bar */}
          <nav className="navbar navbar-expand-lg fixed-top" id="mainNav">
          <div className="hire-tab">
              <a className="navbar-brand text-nav" href="#">Hire Locals</a>
          </div>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
          </button>
          <div className="nav-tabs">
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav mr-auto">
                      <li>
                          <div className="dropdown icon-tab ">
                              <button className="btn btn-secondary dropdown-togglen text-nav " type="button" id="dropdownMenuButton" data-toggle="dropdown"
                                  aria-haspopup="true" aria-expanded="false">
                                  <i className="fas fa-user-alt"></i>
                              </button>
                              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                  <a className="dropdown-item" href="#">Log in</a>
                                  <a className="dropdown-item" href="#">Sign up</a>
                                  <a className="dropdown-item" href="#">My Dashboard</a>
                              </div>
                          </div>
                      </li>
                  </ul>
              </div>
          </div>
          </nav>
        )}
        
      </div>
    );
  }
}

export default App;