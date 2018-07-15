import React, { Component } from "react";
import navLogo from "../Images/icon-login.png";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg fixed-top" id="mainNav">
        <div className="hire-tab">
          <a className="navbar-brand text-nav" href="#">
            Hire Locals
          </a>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="nav-tabs">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li>
                <div className="post-tab">
                  <a className="nav-link text-nav" href="#">
                    Post Projects
                  </a>
                </div>
              </li>
              <li>
                <div className="work-tab">
                  <a className="nav-link text-nav" href="#">
                    How it Works
                  </a>
                </div>
              </li>
              <li>
                <div className="browse-tab">
                  <a className="nav-link text-nav" href="#">
                    Browse Projects
                  </a>
                </div>
              </li>
              <li>
                <div className="social-tab">
                  <a className="nav-link text-nav" href="#">
                    Social
                  </a>
                </div>
              </li>
              <li>
                <div className="icon-tab">
                  <a className="nav-link text-nav" href="#">
                    <img src={navLogo} className="nav-icon" alt={"text"} />
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
