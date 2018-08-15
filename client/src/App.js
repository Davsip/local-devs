import React, { Component } from "react";
import { Navbar, Button } from "react-bootstrap";
import API from "./utils/API";
import ProjectCard from './components/ProjectCard';
import axios from 'axios';

// put landing / home page css in App.css
// import "./App.css";
// import Navigation from "./components/Navigation"

class App extends Component {
  state = {
    profile: {},
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

  handleModalApply = event => {
    event.preventDefault();

    let addApplicant = {
        email: this.state.profile.email
    }

    console.log('--------------------');
    console.log('--- handle apply ---');
    console.log(event.target.getAttribute('data-id'));
    console.log(this.state.profile);
    console.log('--------------------');

    axios.put('/api/projects/applicant/' + event.target.getAttribute('data-id'), addApplicant )
      .then( res => {
          console.log('----- apply res ------');
          console.log(res);
          console.log('----- apply res ------');

          alert('Applicant Submitted Successfully!');

      })
      .catch(err => alert(`There was an error while adding you as an applicant: ${err}`));

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

    // Get user profile from Auth0 API
    const { userProfile, getProfile } = this.props.auth;

    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });

        console.log(`---- profile sub ${profile.email} ------`);

        axios.get('/api/users/' + profile.email)
          .then( res => {
              console.log(`profile view res.data.length = ${res.data.length}`);
    
              if ( res.data.length === 0 ) {
                console.log(`dlafkjdkajfda`);
                console.log(profile);
                axios.post('/api/users', profile)
                  .then( res => console.log(res));
              } else {
                console.log(`setting profile state`);
                this.setState({ profile: res.data[0] });
              }
            });
          })

    } else {
      this.setState({ profile: userProfile });
    }
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
          <nav
            className="navbar navbar-expand-lg navbar-dark bg-light fixed-top"
            id="mainNav"
          >
            <a className="navbar-brand d-flex w-30 mr-auto" href="/">
              Hire Local
            </a>
            <button
              className="navbar-toggler logged-in"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse w-100" id="navbarNav">
              <ul className="navbar-nav ml-auto justify-content-end">
                <li>
                  <div className="navbar-nav-link">
                    <a href="#howitworks" className="nav-link text-nav">
                      How it Works
                    </a>
                  </div>
                </li>
                <li>
                  <div className="navbar-nav-link">
                    <a className="nav-link text-nav" href="#projects">
                      Browse Projects
                    </a>
                  </div>
                </li>
                <li>
                  <div className="navbar-nav-link">
                    <a className="nav-link text-nav" href="#social">
                      Social
                    </a>
                  </div>
                </li>
                <li>
                  <div className="navbar-nav-link">
                    <a className="nav-link text-nav" href="#mission">
                      Mission
                    </a>
                  </div>
                </li>
                <li>
                  <div className="dropdown icon-tab">
                    <button
                      className="btn btn-secondary dropdown-toggle text-nav logged-in"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fas fa-user-alt" />
                    </button>
                    <div
                      className="dropdown-menu dropdown-menu-right"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <a
                        className="dropdown-item"
                        onClick={this.logout.bind(this)}
                      >
                        Log Out
                      </a>
                      <a className="dropdown-item" href="/myDashboard">
                        My Dashboard
                      </a>

                      {
                        this.state.profile.isAdmin === true ? 
                        <a className="dropdown-item" href="/adminDashboard">
                        Admin Dashboard
                        </a>: ''
                      }
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
        )}

        {!isAuthenticated() && (
          //   <!-- Nav bar  -->
          <nav
            className="navbar navbar-expand-lg navbar-dark bg-light fixed-top"
            id="mainNav"
          >
            <a className="navbar-brand d-flex w-30 mr-auto" href="/">
              Hire Local
            </a>
            <button
              className="navbar-toggler not-logged-in"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse w-100" id="navbarNav">
              <ul className="navbar-nav ml-auto justify-content-end">
                <li>
                  <div className="navbar-nav-link">
                    <a href="#howitworks" className="nav-link text-nav">
                      How it Works
                    </a>
                  </div>
                </li>
                <li>
                  <div className="navbar-nav-link">
                    <a className="nav-link text-nav" href="#projects">
                      Browse Projects
                    </a>
                  </div>
                </li>
                <li>
                  <div className="navbar-nav-link">
                    <a className="nav-link text-nav" href="#social">
                      Social
                    </a>
                  </div>
                </li>
                <li>
                  <div className="navbar-nav-link">
                    <a className="nav-link text-nav" href="#mission">
                      Mission
                    </a>
                  </div>
                </li>
                <li>
                  <div className="dropdown icon-tab">
                    <button
                      className="btn btn-secondary dropdown-toggle text-nav not-logged-in"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fas fa-user-alt" />
                    </button>
                    <div
                      className="dropdown-menu dropdown-menu-right"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <a
                        className="dropdown-item"
                        onClick={this.login.bind(this)}
                      >
                        Log In
                      </a>
                      <a
                        className="dropdown-item"
                        onClick={this.login.bind(this)}
                      >
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
              <div className="col-sm-5 col-md-4 col-lg-4 icons-section">
                <img
                  className="icons-work "
                  src="./assets/images/icons/apply-icon.png "
                  alt="Apply Icom"
                />
                <br />
                <br />
                <p className="text-justify">
                  Clients, wheather a Company or Individual, can post projects
                  to our platform for review by our Solution Experts.{" "}
                  <b>Local Devs</b> can then apply to join a team responsible
                  for developing the full scope of each project.
                </p>
              </div>
              <div className="col-md-5 col-lg-4 icons-section">
                <img
                  className="icons-work"
                  src="./assets/images/icons/code-browser.png"
                  alt="Code Browser"
                />
                <br />
                <br />
                <p className="text-justify">
                  Once accepted to the project, our Solution Experts will
                  connect the <b>Local Devs</b> and provide an in-depth review
                  of the Client’s project.
                </p>
              </div>
              <div className="col-md-5 col-lg-4 icons-section">
                <img
                  className="icons-work"
                  src="./assets/images/icons/get-paid.png "
                  alt="Get Paid"
                />
                <br />
                <br />
                <p className="text-justify">
                  <b>Local Devs</b> will get paid as they complete sections of
                  each project. Manage your own time, take on more projects,
                  earn more money. The opportunities are endless. Our Solution
                  Experts are here to make sure we always have meaningful
                  projects for <b>Local Devs</b>. It will not be just work. It
                  will be fun to work.
                </p>
              </div>
            </div>
          </div>
        </div>

       {/*  <section className="section-2">
          <div className="container">
            <h2 className="text-center text-uppercase text-secondary">
              How it Works
            </h2>
            <hr className="star-dark mb-6" />
            <div className="row">
              <div className="col-sm-6 col-md-6 col-lg-6 ">
                <div className="media">
                  <div className="media-left media-middle">
                    <img
                      className="icon-how"
                      src="./assets/images/icons/apply-icon.png"
                      alt="Code Browser"
                    />
                  </div>
                  <div className="media-body">
                    <h4 className="media-heading">Are you a Developer?</h4>
                    <p class="hiw-card">
                    <b>Local Devs</b> will create a team of developers for each project and the technologies need it. The developer can choose the technology that wants to work with an easy quick apply form.
                    </p>
                  </div>
                </div>

                <div className="media">
                  <div className="media-left media-middle">
                    <img
                      className="icon-how"
                      src="./assets/images/icons/code-browser.png"
                      alt="Code Browser"
                    />
                  </div>
                  <div className="media-body">
                    <p class="hiw-card">
                    The developer will have a deadine for each project. You can either work remote or work on our open space offices, with a great team in a healthy environment. It will not be just work. It will be fun to work.
                    </p>
                  </div>
                </div>

                <div className="media">
                  <div className="media-left media-middle">
                    <img
                      className="icon-how"
                      src="./assets/images/icons/code-browser.png"
                      alt="Code Browser"
                    />
                  </div>
                  <div className="media-body">
                  <p>
                  The developer will get paid per project or sections of the project. Each day you will submit a quick update on your job through github or your personal dashboard. Communication with the team and the The Solution's Expert Manager will be requiredpw.
                    </p>   
                  </div>
                </div>
              </div>

              <div className="col-sm-6 col-md-6 col-lg-6 ">
                <div className="media">
                <div className="media-left media-middle">
                    <img
                      className="icon-how"
                      src="./assets/images/icons/Asset-1.png"
                      alt="Code Browser"
                    />
                  </div>
                  <div className="media-body">
                    <h4 className="media-heading">Are you a Company?</h4>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Deleniti neque quam at, exercitationem maiores explicabo
                      veniam beatae voluptatum consequatur. Temporibus magni
                      nulla corporis eaque non ducimus quod quia fugit error!
                    </p>
                  </div>
                </div>

                <div className="media">
                  <div className="media-left media-middle" />
                  <div className="media-left media-middle">
                    <img
                      className="icon-how"
                      src="./assets/images/icons/Asset-2.png"
                      alt="Code Browser"
                    />
                  </div>
                  <div className="media-body">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Deleniti neque quam at, exercitationem maiores explicabo
                      veniam beatae voluptatum consequatur. Temporibus magni
                      nulla corporis eaque non ducimus quod quia fugit error!
                    </p>
                  </div>
                </div>

                <div className="media">
                  <div className="media-left media-middle" />
                  <div className="media-left media-middle">
                    <img
                      className="icon-how"
                      src="./assets/images/icons/Asset-3.png"
                      alt="Code Browser"
                    />
                  </div>
                  <div className="media-body">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Deleniti neque quam at, exercitationem maiores explicabo
                      veniam beatae voluptatum consequatur. Temporibus magni
                      nulla corporis eaque non ducimus quod quia fugit error!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}

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
                    <ProjectCard
                      key={index}
                      dataId={project._id}
                      projectName={project.name}
                      descSub={project.desc.substring(0, 50)}
                      skills={project.reqSkills.join(", ")}
                      desc={project.desc}
                      teamSize={project.teamSize}
                      duration={project.duration + "mo"} />
                  )}
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
              <div className="col-sm-5 col-md-4 col-lg-4 icons-section">
                <img
                  className="icons-work "
                  src="./assets/images/icons/meet-dev.png"
                  alt="Meet Dev"
                />
                <br />
                <br />
                <p className="text-justify">Socializing</p>
              </div>
              <div className="col-md-5 col-lg-4 icons-section">
                <img
                  className="icons-work"
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
              <div className="col-md-5 col-lg-4 icons-section">
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
                {!isAuthenticated() && (
                  <button
                    type="button"
                    className="btn btn-primary"
                    id="applyButton"
                    disabled
                  >
                    Apply
                  </button>
                )}
                {isAuthenticated() && (
                  <button
                    type="button"
                    className="btn btn-primary"
                    id="applyButton"
                    onClick={this.handleModalApply}
                  >
                    Apply
                  </button>
                )}
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
            <p className="text-justify">
              Local Devs was founded on strong values, integrity, communication
              and passion. We are not just another freelance company. Our
              company was created by passionate developers who believe that each
              project is unique and deserves a team setting to inspire the very
              passion that we possess. Our ultimate goal and mission is to
              connect local developers to quality projects.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
