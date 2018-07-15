import React, { Component } from 'react';
import axios from 'axios';
import API from '../../utils/API';

class UserDash extends Component {

  state = {
    profile: {},
    projects: []
  };

  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }
  
  componentWillMount() {

    this.setState({ 
      profile: {},
      projects: [] 
    });

    // Get projects from Projects API
    API.getSavedProjects().then( res => {
        console.log (res.data);

        this.setState({
            projects: res.data
        })
    })

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
    const { profile } = this.state;
    const { isAuthenticated } = this.props.auth;

    return (

    <React.Fragment>

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
                                    <a className="dropdown-item" onClick={this.logout.bind(this)}>Log Out</a>
                                    <a className="dropdown-item" href="#">My Dashboard</a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            </nav>
        )}

        { !isAuthenticated() && (
            //   <!-- Nav bar  -->
            <nav className=" navbar navbar-expand-lg fixed-top" id="mainNav">
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
                                <div className="post-tab">
                                    <a className="nav-link text-nav" href="#portfolio">Post Projects</a>
                                </div>                       
                            </li>
                            <li>
                                <div className="work-tab">
                                    <a className="nav-link text-nav" href="#">How it Works
                                    </a>
                                </div>
                            </li>
                            <li>
                                <div className="browse-tab">
                                    <a className="nav-link text-nav" href="#">Browse Jobs
                                    </a>
                                </div>
                            </li>
                            <li>
                                <div className="social-tab">
                                    <a className="nav-link text-nav" href="#">Social
                                    </a>
                                </div>
                            </li>
                            <li>        
                                <div className="dropdown icon-tab ">
                                    <button className="btn btn-secondary dropdown-togglen text-nav" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                                        aria-haspopup="true" aria-expanded="false">
                                        <i className="fas fa-user-alt"></i>
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <a className="dropdown-item" onClick={this.login.bind(this)}>Log in</a>
                                        <a className="dropdown-item" onClick={this.login.bind(this)}>Sign up</a>
                                    </div>
                                </div>        
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )}
        
        {/* <!-- Incomplete Profile Warning --> */}
        <div className="alert alert-warning profile-incomplete" role="alert">
            This is a friendly reminder to complete your profile. <a href="./user_profile_form.html" className="alert-link">Click here to get started.</a>
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>

        {/* <!-- Dashboard --> */}
        <section className="dashboard">
            <div className="container">
                <h2 className="text-center text-uppercase text-secondary ">My Dashboard</h2>
                <hr className="star-dark mb-6" />

                <ul className="nav nav-pills nav-fill" id="pills-tab" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link nav-dashboard active" data-toggle="pill" href="#availProjs">Available Projects</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link nav-dashboard" data-toggle="pill" href="#currProjs">Current Projects</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link nav-dashboard" data-toggle="pill" href="#applications">Pending Applications</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link nav-dashboard" data-toggle="pill" href="#social">Social Events</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link nav-dashboard" data-toggle="pill" href="#profile">My Profile</a>
                    </li>
                </ul>

                <div className="tab-content" id="pills-tabContent">

                    {/* <!-- Current Projects --> */}
                    <div className="tab-pane fade" id="currProjs" role="tabpanel" aria-labelledby="home-tab">
                        {/* <!-- Curr Projs Content --> */}
                        <div className="row">
                            <div className="col-md-6 col-lg-4">
                                <div className="card" style={{width: 18 + 'rem'}}>
                                    <div className="card-body">
                                        <h5 className="card-title">Mobile Weather App</h5>
                                        <p className="card-text">Two developers needed for a five month project.</p>
                                        <p className="card-text" id="techNeeded">Python, HTML, JavaScript, Sass, JQuery, React</p>
                                        <div className="btn btn-primary disabled">In Progress</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- End Curr Projs --> */}
                    </div>

                    {/* <!-- My Applications --> */}
                    <div className="tab-pane fade" id="applications" role="tabpanel" aria-labelledby="profile-tab">
                        {/* <!-- Applications Content --> */}
                        <div className="row">
                            <div className="col-md-6 col-lg-4">
                                <div className="card" style={{width: 18 + 'rem'}}>
                                    <div className="card-body">
                                        <h5 className="card-title">AD Web App</h5>
                                        <p className="card-text">Four developers needed for an eleven month project.</p>
                                        <p className="card-text" id="techNeeded">C#, HTML, JavaScript, CSS, JQuery, Angular</p>
                                        <div className="btn btn-primary disabled">Pending</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <div className="card" style={{width: 18 + 'rem'}}>
                                    <div className="card-body">
                                        <h5 className="card-title">Tuition System</h5>
                                        <p className="card-text">Two developers needed for a five month project.</p>
                                        <p className="card-text" id="techNeeded">JavaScript, Handlebars, HTML, Bootstrap, CSS, Node, MongoDB</p>
                                        <div className="btn btn-primary disabled">In Review</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- End Applications Content --> */}
                    </div>

                    {/* <!-- Available Projects --> */}
                    <div className="tab-pane fade show active" id="availProjs" role="tabpanel" aria-labelledby="contact-tab">
                        {/* <!-- Avail Projs Content --> */}
                        <div className="row">
                            <div className="col-md-6 col-lg-4">
                                <div className="card" style={{width: 18 + 'rem'}}>
                                    <div className="card-body">
                                        <h5 className="card-title">AD Web App</h5>
                                        <p className="card-text">Four developers needed for an eleven month project.</p>
                                        <p className="card-text" id="techNeeded">C#, HTML, JavaScript, CSS, JQuery, Angular</p>
                                        <a href="#" className="btn btn-primary" data-target="#projectModal" data-toggle="modal" data-desc="Client needs clean, dynamic Active Directory personnel resource site.  This is an eleven month project and the team will consist of four developers. Client expects developers to have great teamwork and communication skills. Weekly deliverables are expected."
                                            data-team="4" data-time="11mo" data-title="Active Directory Web Application">View Details / Apply</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <div className="card" style={{width: 18 + 'rem'}}>
                                    <div className="card-body">
                                        <h5 className="card-title">Tuition System</h5>
                                        <p className="card-text">Two developers needed for a five month project.</p>
                                        <p className="card-text" id="techNeeded">JavaScript, Handlebars, HTML, Bootstrap, CSS, Node, MongoDB</p>
                                        <a href="#" className="btn btn-primary" data-target="#projectModal" data-toggle="modal" data-desc="On this project, you'll be working with our Solutions Expert.  Client needs a user-friendly tuition reimbursement system.  This is an five month project and the team will consist of two developers. Weekly deliverables are expected."
                                            data-team="2" data-time="5mo" data-title="Tuition Reimbursement System">View Details / Apply</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <div className="card" style={{width: 18 + 'rem'}}>
                                    <div className="card-body">
                                        <h5 className="card-title">Website Redesign</h5>
                                        <p className="card-text">Five developers needed for a seven month project.</p>
                                        <p className="card-text" id="techNeeded">JavaScript, React, HTML, Bootstrap, Node</p>
                                        <a href="#" className="btn btn-primary" data-target="#projectModal" data-toggle="modal" data-desc="For this project, five developers will be working with one of our Solutions Experts to redesign the client's current website for mobility.  This project is expected to take seven months.  Need to be able to work well in a team.  Weekly deliverables are expected."
                                            data-team="5" data-time="7mo" data-title="Website Redesign">View Details / Apply</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <div className="card" style={{width: 18 + 'rem'}}>
                                    <div className="card-body">
                                        <h5 className="card-title">Company ReBranding</h5>
                                        <p className="card-text">Two graphic design experts needed for a three month project.</p>
                                        <p className="card-text" id="techNeeded">Photoshop, Illustrator</p>
                                        <a href="#" className="btn btn-primary" data-target="#projectModal" data-toggle="modal" data-desc="Client is looking for two graphics design experts for company re-branding. Your team will work directly with the client to discuss culture and history of the company to come up with a clean design.  This project will be three months."
                                            data-team="2" data-time="3mo" data-title="Company ReBranding">View Details / Apply</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <div className="card" style={{width: 18 + 'rem'}}>
                                    <div className="card-body">
                                        <h5 className="card-title">Accounting System</h5>
                                        <p className="card-text">Seven developers needed for an eleven month project.</p>
                                        <p className="card-text" id="techNeeded">Java, MySQL, CSS, JavaScript, JQuery, Bootstrap</p>
                                        <a href="#" className="btn btn-primary" data-target="#projectModal" data-toggle="modal" data-desc="For this project, you'll work with seven other developers and a Solutions Expert to overhaul our client's current accounting system.  This project will last eleven months and will require a good amount of collaboration.  Excellent written and oral communication required.  Weekly deliverables will be required."
                                            data-team="7" data-time="11mo" data-title="Accounting Systems Build">View Details / Apply</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <div className="card" style={{width: 18 + 'rem'}}>
                                    <div className="card-body">
                                        <h5 className="card-title">Customer Feedback Site</h5>
                                        <p className="card-text">Two developers needed for a five month project.</p>
                                        <p className="card-text" id="techNeeded">Python, MongoDB, Angular, HTML, Bootstrap, Sass</p>
                                        <a href="#" className="btn btn-primary" data-target="#projectModal" data-toggle="modal" data-desc="Our client is wanting two developers to create a customer feedback site.  This project will take 5 months."
                                            data-team="2" data-time="5mo" data-title="Customer Feedback Site">View Details / Apply</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- End Available Projects --> */}
                    </div>

                    {/* <!-- Social Events --> */}
                    <div className="tab-pane fade" id="social" role="tabpanel" aria-labelledby="contact-tab">
                        {/* <!-- Social content --> */}
                        <div className="jumbotron jumbotron-fluid">
                            <div className="container">
                                <h1 className="display-4">Code &amp; Coffee</h1>
                                <p className="lead">Meets every Tuesday at 8am at Toasted. Bring all your nerdy friends!</p>
                                <p>Toasted
                                    <br /> 5420 Ross Ave #180
                                    <br /> Dallas, TX 75206</p>
                            </div>
                        </div>
                        {/* <!-- End Social --> */}
                    </div>

                    {/* <!-- My Profile --> */}
                    <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="contact-tab">
                        {/* <!-- Begin Profile --> */}
                        <div className="jumbotron jumbotron-fluid">
                            <div className="container">
                                <h1 className="display-4">My Profile!!!</h1>
                                <p className="lead">Check Me Out!</p>
                            </div>
                        </div>
                        {/* <!-- End Profile --> */}
                    </div>
                    
                </div>
            </div>
        </section>

        {/* <!-- Project Modal - Loads Dynamic Content --> */}
        <div className="modal fade" id="projectModal" tabIndex="-1" role="dialog" aria-labelledby="projectModal" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">

                {/* <!-- Header --> */}
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="projectTitle">
                            {/* <!-- Project Title Here --> */}
                        </h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    {/* <!-- Content --> */}
                    <div className="modal-body">
                        <div className="row">

                            {/* <!-- Full Description --> */}
                            <div className="col">
                                <div className="row">
                                    <h5>Overview</h5>
                                    <p id="description">
                                        {/* <!-- Project Description Here --> */}
                                    </p>
                                </div>
                                <div className="row" id="time">
                                    {/* <!-- Project Time Img Here --> */}
                                </div>
                            </div>

                            {/* <!-- Technology --> */}
                            <div className="col" id="tech">
                                <h5>Technologies</h5>
                                {/* <!-- Technologies Load Here (in p tags) --> */}
                            </div>

                            {/* <!-- Team Info --> */}
                            <div className="col" id="team-info">
                                <h5>Team</h5>
                                <div className="row" id="team-display">
                                    {/* <!-- Team Here --> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary disabled" data-toggle="tooltip" data-placement="top" id="applyButton" title="Please sign-up/login to Apply">Apply</button>
                    </div>
                </div>
                {/* <!-- End Content --> */}
            </div>
        </div>
        {/* <!-- End Modal --> */}
    </React.Fragment>
    );
  }
}

export default UserDash;