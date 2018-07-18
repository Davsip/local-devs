import React, { Component } from "react";
import { Navbar, Button } from "react-bootstrap";
import API from "./utils/API";

// put landing / home page css in App.css
import "./App.css";
// import Navigation from "./components/Navigation"

class App extends Component {
  state = {
    projects: []
  };

  goTo(route) {
    this.props.history.replace(`/${route}`);
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  componentWillMount() {
    this.setState({
      projects: []
    });

    // Get projects from Projects API
    API.getSavedProjects().then(res => {
      console.log(res.data);

      this.setState({
        projects: res.data
      });
    });
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const { projects } = this.state;

    return (
      <div>
        {/* <Navigation /> */}
        {/* all other landing / home page codes goes below here */}
        {/* remove navbar code below as needed */}
        {/* isAuthenticated() returns true or false, true if authenticated, false if not */}
        {/* use that to render certain features */}
        {/* i.e. user logo dropdown login / signup, log out / mydashboard */}

        {isAuthenticated() && (
        // {/* Nav bar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-light" id="mainNav">
            <a className="navbar-brand d-flex w-30 mr-auto" href="/">Hire Local</a>
            <button className="navbar-toggler logged-in" type="button" data-toggle="collapse" data-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse w-100" id="navbarNav">
              <ul className="navbar-nav ml-auto justify-content-end">
              <li>
                <div className="navbar-nav-link">
                  <a href="#howitworks" className="nav-link text-nav">How it Works</a>
                </div>
              </li>
              <li>
                <div className="navbar-nav-link">
                  <a className="nav-link text-nav" href="#projects">Browse Projects</a>
                </div>
              </li>
              <li>
                <div className="navbar-nav-link">
                  <a className="nav-link text-nav" href="#social">Social</a>
                </div>
              </li>
              <li>
                <div className="navbar-nav-link">
                  <a className="nav-link text-nav" href="#mission">Mission</a>
                </div>
              </li>
              <li>
                <div className="dropdown icon-tab">
                  <button className="btn btn-secondary dropdown-toggle text-nav logged-in" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fas fa-user-alt"></i>
                  </button>
                  <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item" onClick={this.logout.bind(this)}>
                    Log Out
                    </a>
                    <a className="dropdown-item" href="/myDashboard">
                    My Dashboard
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </nav>
        )}

        {!isAuthenticated() && (
          //   <!-- Nav bar  -->
        <nav className="navbar navbar-expand-lg navbar-dark bg-light" id="mainNav">
          <a className="navbar-brand d-flex w-30 mr-auto" href="/">Hire Local</a>
          <button className="navbar-toggler not-logged-in" type="button" data-toggle="collapse" data-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse w-100" id="navbarNav">
            <ul className="navbar-nav ml-auto justify-content-end">
              <li>
                <div className="navbar-nav-link">
                  <a href="#howitworks" className="nav-link text-nav">How it Works</a>
                </div>
              </li>
              <li>
                <div className="navbar-nav-link">
                  <a className="nav-link text-nav" href="#projects">Browse Projects</a>
                </div>
              </li>
              <li>
                <div className="navbar-nav-link">
                  <a className="nav-link text-nav" href="#social">Social</a>
                </div>
              </li>
              <li>
                <div className="navbar-nav-link">
                  <a className="nav-link text-nav" href="#mission">Mission</a>
                </div>
              </li>
              <li>
                <div className="dropdown icon-tab">
                  <button className="btn btn-secondary dropdown-toggle text-nav not-logged-in" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fas fa-user-alt"></i>
                  </button>
                  <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item" onClick={this.login.bind(this)}>
                    Log In
                    </a>
                    <a className="dropdown-item" href="/userProfileForm" onClick={this.login.bind(this)}>
                    Sign Up
                    </a>
                  </div>
                </div>
              </li>
          </ul>
        </div>
      </nav>

        )}

        {/* <!-- SECTION 1 MAIN LANDING PAGE  --> */}

        <div className="section-1">
          <div className="text-white text-center">
            <div className="container">
              <img
                className="img-fluid mb-5 d-block mx-auto img-logo"
                src="./assets/images/main-image-icon.png"
                alt="main image icon"
              />
              <h1 className="text-uppercase main-text">Local Devs</h1>

              <img className="pinlogo" src="./assets/images/icons/here.png" />

              <h2 className="main-text-2">
                Connecting Local Developers to Cool Projects
              </h2>
            </div>
          </div>
        </div>

        {/* <!-- SECTION 2 / HOW IT WORKS --> */}
        <div className="howitworks" id="howitworks">
          <div className="container">
            <h2 className="text-center text-uppercase text-secondary">
              How it Works
            </h2>
            <hr className="star-dark mb-6" />
            <div className="row ">
              <div className="col-sm-5 col-md-4 col-lg-4">
                <img
                  className="icons-work "
                  src="./assets/images/icons/apply-icon.png "
                  alt="Apply Icom"
                />
                <br />
                <br />
                <p className="text-justify">
                  Companies and individuals post projects to out site.{" "}
                  <b>Local Devs</b> will create a team of developers for each
                  project and the technologies need it. The developer can choose
                  the technology that wants to work with an easy quick apply
                  form.The Solution's Expert Manager will contact the developer
                  for setting up an interview.
                </p>
              </div>
              <div className="col-md-5 col-lg-4">
                <img
                  className="icons-work"
                  src="./assets/images/icons/code-browser.png"
                  alt="Code Browser"
                />
                <br />
                <br />
                <p className="text-justify">
                  The developer will have a deadine for each project. You can
                  either work remote or work on our open space offices, with a
                  great team in a healthy environment. It will not be just work.
                  It will be fun to work.
                </p>
              </div>
              <div className="col-md-5 col-lg-4 ">
                <img
                  className="icons-work "
                  src="./assets/images/icons/get-paid.png "
                  alt="Get Paid"
                />
                <br />
                <br />
                <p className="text-justify">
                  The developer will get paid per project or sections of the
                  project. Each day you will submit a quick update on your job
                  thru github or your personal dashboard. Also will be always in
                  contact with the team and the The Solution's Expert Manager .{" "}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- SECTION 3 PROJECTS --> */}
        <div className="projects" id="projects">
          <div className="container">
            <h2 className="text-center text-uppercase text-secondary mb-0">
              Projects
            </h2>
            <hr className="star-dark mb-5" />
            <div className="row">
              {/* <!-- Avail Projs Content --> */}
              <div className="row">
                {projects.map((project, index) => {
                  if (project.projectStage === "pending") {
                    return (
                      <div
                        className="col-md-6 col-lg-4"
                        key={index}
                        data-id={project.sub}
                      >
                        <div className="card" style={{ width: 18 + "rem" }}>
                          <div className="card-body">
                            <h5 className="card-title">{project.name}</h5>
                            <p className="card-text">
                              {project.desc.substring(0, 50)}...
                            </p>
                            <p className="card-text" id="techNeeded">
                              {project.reqSkills.join(", ")}
                            </p>
                            <a
                              href="#"
                              className="btn btn-primary"
                              data-target="#projectModal"
                              data-toggle="modal"
                              data-desc={project.desc}
                              data-team={project.teamSize}
                              data-time={project.duration + "mo"}
                              data-title={project.name}
                            >
                              View Details / Apply
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        {/* <!-- SECTION 5- SOCIAL  --> */}
        <div className="social" id="social">
          <div className="container">
            <h2 className="text-center text-uppercase text-secondary">
              Social
            </h2>
            <hr className="star-dark mb-6 " />
            <div className="row ">
              <div className="col-sm-5 col-md-4 col-lg-4">
                <img
                  className="icons-work "
                  src="./assets/images/icons/meet-dev.png"
                  alt="Meet Dev"
                />
                <br />
                <br />
                <p className="text-justify">
                  Science Says Small Talk Is Good For Your Brain! Socializing
                  with people is a very healthy habit. Frequent socialisation is
                  exceedingly important in maintaining quality of life.
                   Interact with colleagues that speak the same language,
                  exchange ideas, learn, advice, relax. Check calendar for
                  weekly activities.
                </p>
              </div>
              <div className="col-md-5 col-lg-4 ">
                <img
                  className="icons-work "
                  src="./assets/images/icons/meet-comp.png"
                  alt=" "
                />
                <br />
                <br />
                <p className="text-justify">
                  Comnication, it's everything, as part of our work culture,
                  developers will have the chance to meet the project owner,
                  interact, exchange ideas and socialize on a relax enviroment.
                </p>
              </div>
              <div className="col-md-5 col-lg-4">
                <img
                  className="icons-work"
                  src="./assets/images/icons/activities.png"
                  alt="Activities"
                />
                <br />
                <br />
                <p className="text-justify">
                  The human brain requires social stimulation on a regular
                  basis. To have a balance healthy life, Local Devs will
                  organize activities for recreation.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/*   <!-- Project Modal - Loads Dynamic Content --> */}
        <div
          className="modal fade"
          id="projectModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="projectModal"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            {/*  <!-- Header --> */}
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="projectTitle">
                  {/* <!-- Project Title Here -->  */}
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              {/*  <!-- Content --> */}
              <div className="modal-body">
                <div className="row">
                  {/*   <!-- Full Description --> */}
                  <div className="col">
                    <div className="row">
                      <h5>Overview</h5>
                      <p id="description">
                        {/*   <!-- Project Description Here -->  */}
                      </p>
                    </div>
                    <div className="row" id="time">
                      {/*  <!-- Project Time Img Here -->   */}
                    </div>
                  </div>

                  {/*   <!-- Technology --> */}
                  <div className="col" id="tech">
                    <h5>Technologies</h5>
                    {/*  <!-- Technologies Load Here (in p tags) --> */}
                  </div>

                  {/*   <!-- Team Info --> */}
                  <div className="col" id="team-info">
                    <h5>Team</h5>
                    <div className="row" id="team-display">
                      {/*     <!-- Team Here --> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  id="applyButton"
                >
                  Apply
                </button>
              </div>
            </div>
            {/*   <!-- End Content --> */}
          </div>
        </div>
        {/*   <!-- End Modal --> */}
        <br />
        <br />
        <br />
        

        {/* <!-- Mission section -->  */}
        <div className="portfolio" id="mission">
          <div className="container">
            <h2 className="text-center text-uppercase text-secondary mb-0">
              Mission
            </h2>
            <hr className="star-dark mb-6" />
            <blockquote class="blockquote">
              Local Devs was founded on strong values, integrity, communication
              and passion. We are not just another freelance company. Our
              company was created by passionate developers who believe that each
              project is unique and deserves a team setting to inspire the very
              passion that we possess. Our ultimate goal and mission is to
              connect local developers to quality projects.
            </blockquote>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
