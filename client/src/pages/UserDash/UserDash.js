import React, { Component } from 'react';
import axios from 'axios';
import API from '../../utils/API';
import ProjectCard from '../../components/ProjectCard';

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

            window.location.reload();

        })
        .catch(err => alert(`There was an error while adding you as an applicant: ${err}`));

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

  componentDidUpdate() {
      console.log('--- component did update start ---');
      console.log(this.state.profile);
      console.log('--- component did update end ---');
  }

  render() {
    const { profile, projects } = this.state;
    const { isAuthenticated } = this.props.auth;

    return (

    <React.Fragment>

        { isAuthenticated() && (
            // {/* Nav bar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-light fixed-top" id="mainNav">
                <a className="navbar-brand d-flex w-30 mr-auto" href="/">Hire Local</a>
                <button className="navbar-toggler logged-in" type="button" data-toggle="collapse" data-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse w-100" id="navbarNav">
                    <ul className="navbar-nav ml-auto justify-content-end">
                        <li>
                            <div className="navbar-nav-link">
                                <a className="nav-link text-nav" href="/ProjectForm">Submit Project</a>
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
                                    {
                                        profile.isAdmin && profile.isAdmin === true ? 
                                        <a className="dropdown-item" href="/adminDashboard">
                                        Admin Dashboard
                                        </a> : ''
                                    }
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        )}

        { !isAuthenticated() && (
            //   <!-- Nav bar  -->
            <nav className="navbar navbar-expand-lg navbar-dark bg-light fixed-top" id="mainNav">
                <a className="navbar-brand d-flex w-30 mr-auto" href="/">Hire Local</a>
                <button className="navbar-toggler not-logged-in" type="button" data-toggle="collapse" data-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse w-100" id="navbarNav">
                    <ul className="navbar-nav ml-auto justify-content-end">
                        <li>
                            <div className="navbar-nav-link">
                            <a className="nav-link text-nav" href="/ProjectForm">Submit Project</a>
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
                                    <a className="dropdown-item" onClick={this.login.bind(this)}>
                                    Sign Up
                                    </a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        )}
        
        {/* <!-- Incomplete Profile Warning --> */}
        { !profile.isProfileCompleted && (
            <div className="alert alert-warning profile-incomplete" role="alert">
                This is a friendly reminder to complete your profile. <a href="./userProfileForm" className="alert-link">Click here to get started.</a>
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        )}
        

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

                                                <ProjectCard
                                                key={index}
                                                dataId={project._id}
                                                projectName={project.name}
                                                descSub={project.desc.substring(0, 50)}
                                                skills={project.reqSkills.join(", ")}
                                                desc={project.desc}
                                                teamSize={project.teamSize}
                                                duration={project.duration + "mo"}
                                                status={project.projectStage}
                                                applicants={project.teamApplicants}
                                                startDate={project.startDate.substring(5,7) + '/' + project.startDate.substring(8,10) + '/' + project.startDate.substring(0,4)} />
                                            
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

                                                <ProjectCard
                                                key={index}
                                                dataId={project._id}
                                                projectName={project.name}
                                                descSub={project.desc.substring(0, 50)}
                                                skills={project.reqSkills.join(", ")}
                                                desc={project.desc}
                                                teamSize={project.teamSize}
                                                duration={project.duration + "mo"}
                                                status={project.projectStage}
                                                applicants={project.teamApplicants}
                                                startDate={project.startDate.substring(5,7) + '/' + project.startDate.substring(8,10) + '/' + project.startDate.substring(0,4)} />
                                           
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
                                    if ( !project.teamApplicants.includes(profile.email) && project.projectStage === 'pending') {
                              
                                        return (

                                            <ProjectCard
                                            key={index}
                                            dataId={project._id}
                                            projectName={project.name}
                                            descSub={project.desc.substring(0, 50)}
                                            skills={project.reqSkills.join(", ")}
                                            desc={project.desc}
                                            teamSize={project.teamSize}
                                            duration={project.duration + "mo"} 
                                            status={project.projectStage}startDate={project.startDate.substring(5,7) + '/' + project.startDate.substring(8,10) + '/' + project.startDate.substring(0,4)} 
                                             />
                                       
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


                        {/* <!-- Profile section  --> */}
                        <div className="container">
                            <div className="col-md-12">
                                <div className="container ">
                                    <a id="profile-edit" href='/userProfileForm'>[Edit Profile]</a>
                                    <img className="img-fluid mb-1 d-block mx-auto" src={ profile.picture || './assets/images/icons/male-icon.png'} alt="Profile" style={{width:150+'px',borderRadius:50+'%'}}/>
                                    <h4 className="text-center text-uppercase text-secondary">{ profile.name }</h4>
                                    <h5 className="text-center text-secondary">{ profile.title || 'Local Devs User'}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="card profile-section">
                                    <div className="card-body">
                                        <h5 className="card-title">My Bio</h5>
                                        <p className="card-text">
                                            { 
                                                profile.bio_desc ||
                                                "Help companies understand who you are. Complete your profile and tell us about yourself."
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        
                        <div className="row">
                            
                            <div className="col-xs-12 col-sm-6">
                                <div className="card skillset-contact">
                                    <div className="card-body">
                                        <h5 className="card-title">Skill Set</h5>
                                        <p className="card-text">
                                            <span>
                                                {
                                                    profile.technologies == null ? '-' : profile.technologies.join(', ') 
                                                    ||
                                                    'No skills listed.  Please update your profile.'
                                                }   
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            

                            <div className="col-xs-12 col-sm-6">
                                <div className="card skillset-contact">
                                    <div className="card-body">
                                        <h5 className="card-title">Contact</h5>
                                        <p className="card-text">
                                            {
                                                `Email: ${profile.email}`
                                            }
                                        </p>
                                        <p className="card-text">
                                            {
                                                `Phone: ${profile.phone || 'Not Provided'}`
                                            }
                                        </p>
                                        <p className="card-text">
                                            {
                                                `Zip: ${profile.zip || 'Not Provided'}`
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="card profile-section">
                                <div className="card-body">
                                    <h5 className="card-title">Experience</h5>
                                    <p className="card-text">
                                        {
                                            profile.experience_desc == null ? 'No experience available. Please update your profile.' : profile.experience_desc 
                                        }
                                    </p>
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
                                <div className="row">
                                    <h5>Start Date</h5>
                                    <p id="startDate">
                                    {/* Project Start Date Here */}
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
                        <button type="button" className="btn btn-secondary modal-close" data-dismiss="modal">Close</button>

                        <button type="button" className="btn btn-primary" data-placement="top" id="applyButton" onClick={this.handleModalApply}>Apply</button>
                        
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