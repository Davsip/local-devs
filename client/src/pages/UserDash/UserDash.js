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
    const { profile, projects } = this.state;
    const { isAuthenticated } = this.props.auth;

    return (

    <React.Fragment>

        { isAuthenticated() && (
            // {/* Nav bar */}
            <nav className="navbar navbar-expand-lg fixed-top" id="mainNav">
            <div className="hire-tab">
                <a className="navbar-brand text-nav" href="#">Hire Local</a>
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

                        <div className='row'>
                            {
                                projects.map( (project, index) => {
                                    if ( project.teamMembers != null ){
                                        if ( project.teamMembers.includes(profile.email) && project.projectStage === 'started' ) {
                                        
                                            return (
                                            <div className="col-md-6 col-lg-4" key={index} data-id={project.sub}>
                                                <div className="card" style={{width: 18 + 'rem'}}>
                                                    <div className="card-body">
                                                        <h5 className="card-title">{project.name}</h5>
                                                        <p className="card-text">{project.desc.substring(0,50)}...</p>
                                                        <p className="card-text" id="techNeeded">{project.reqSkills.join(', ')}</p>
                                                        <a href="#" className="btn btn-primary" data-target="#projectModal" data-toggle="modal" data-desc={project.desc}
                                                        data-team={project.teamSize} data-time={project.duration + 'mo'} data-title={project.name}>View Details / Apply</a>
                                                    </div>
                                                </div>
                                            </div>
                                            )                     
                                
                                        }
                                    }
                                })
                            }
                        </div>                        

                        {/* <!-- End Curr Projs --> */}
                    </div>

                    {/* <!-- My Applications --> */}
                    <div className="tab-pane fade" id="applications" role="tabpanel" aria-labelledby="profile-tab">
                        {/* <!-- Applications Content --> */}
                        <div className='row'>
                            {                                
                                projects.map( (project, index) => {
                                    if (project.teamApplicants != null){
                                        if ( project.teamApplicants.includes(profile.email) && project.projectStage === 'pending' ) {
                                                                                    
                                            return (
                                                <div className="col-md-6 col-lg-4" key={index} data-id={project.sub}>
                                                    <div className="card" style={{width: 18 + 'rem'}}>
                                                        <div className="card-body">
                                                            <h5 className="card-title">{project.name}</h5>
                                                            <p className="card-text">{project.desc.substring(0,50)}...</p>
                                                            <p className="card-text" id="techNeeded">{project.reqSkills.join(', ')}</p>
                                                            <a href="#" className="btn btn-primary" data-target="#projectModal" data-toggle="modal" data-desc={project.desc}
                                                            data-team={project.teamSize} data-time={project.duration + 'mo'} data-title={project.name}>View Details / Apply</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            )                     
                                        
                                        }
                                    }                                    
                                })
                            }
                        </div>
                        {/* <!-- End Applications Content --> */}
                    </div>

                    {/* <!-- Available Projects --> */}
                    <div className="tab-pane fade show active" id="availProjs" role="tabpanel" aria-labelledby="contact-tab">
                        
                        {/* <!-- Avail Projs Content --> */}
                        <div className='row'>
                            {
                                projects.map( (project, index) => {
                                    if (project.projectStage === 'pending') {
                              
                                        return (
                                        <div className="col-md-6 col-lg-4" key={index} data-id={project.sub}>
                                            <div className="card" style={{width: 18 + 'rem'}}>
                                                <div className="card-body">
                                                    <h5 className="card-title">{project.name}</h5>
                                                    <p className="card-text">{project.desc.substring(0,50)}...</p>
                                                    <p className="card-text" id="techNeeded">{project.reqSkills.join(', ')}</p>
                                                    <a href="#" className="btn btn-primary" data-target="#projectModal" data-toggle="modal" data-desc={project.desc}
                                                    data-team={project.teamSize} data-time={project.duration + 'mo'} data-title={project.name}>View Details / Apply</a>
                                                </div>
                                            </div>
                                        </div>
                                        )                     
                            
                                    }                                    
                                })
                            }
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
                        {/* <div className="jumbotron jumbotron-fluid">
                            <div className="container">
                                <h1 className="display-4">My Profile!!!</h1>
                                <p className="lead">Check Me Out!</p>
                            </div>
                        </div> */}

                        {/* <!-- Begin Profile --> */}

                        <div className="container">
                            <img className="img-fluid mb-1 d-block mx-auto img-logo" src={ profile.picture || './assets/images/icons/male-icon.png'} alt="Profile" style={{width: 80 + 'px'}}/>
                            <h4 className="text-center text-uppercase text-secondary "></h4>

                            {/* Set Default to Local Devs User */}
                            <h5 className="text-center text-secondary ">{ profile.title || 'Local Devs User'}</h5>
                        </div>


                        {/* <!-- Profile section  --> */}
                        <div className="container">
                            <div className="col-md-12">
                                <div className=" jumbotron jumbotron-fluid profile-section ">
                                    <div className="container ">
                                        <h1 className="display-4 ">My Bio</h1>
                                        <p className="lead">
                                            { 
                                                profile.bio_desc ||
                                                "Help companies understand who you are. Complete your profile and tell us about yourself."               
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row ">
                            <div className="col-md-6 col-lg-4 ">
                                <div className="card profile-section " style={{width: 18 + 'rem'}}>
                                    <div className="card-body ">
                                        <h5 className="card-title ">Skill Set</h5>
                                        <p className="card-text ">
                                            <span>
                                                {
                                                    
                                                    // profile.technologies != '' ? profile.technologies : 'no tech'
                                                    
                                                    profile.technologies == null ? '-' : profile.technologies.join(', ') 

                                                    ||
                                                
                                                    'No skills listed.  Please update your profile.'
                                                }   
                                                
                                            </span>
                                        </p>
                                        <a href="# " className="btn btn-primary ">Edit</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4 ">
                                <div className="card profile-section " style={{width: 18 + 'rem'}}>
                                    <div className="card-body ">
                                        <h5 className="card-title ">Experience</h5>
                                        <p className="card-text ">
                                            {
                                                profile.experience_desc ||
                                                "Some quick example text to build on the card title and make up the bulk of the card's content."                         
                                            }
                                        </p>
                                        <a href="# " className="btn btn-primary ">Edit</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4 ">
                                <div className="card profile-section " style={{width: 18 + 'rem'}}>
                                    <div className="card-body ">
                                        <h5 className="card-title ">Contact</h5>
                                        <p className="card-text ">
                                            {
                                                `Email: ${profile.email}`
                                            }
                                        </p>
                                        <p className="card-text ">
                                            {
                                                `Phone: ${profile.phone || 'Not Provided'}`
                                            }
                                        </p>
                                        <p className="card-text ">
                                            {
                                                `Zip: ${profile.zip || 'Not Provided'}`
                                            }
                                        </p>
                                        <a href="# " className="btn btn-primary ">Edit</a>
                                    </div>
                                </div>
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