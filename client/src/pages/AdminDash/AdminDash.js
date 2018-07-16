import React, { Component } from 'react';
import axios from 'axios';
import API from '../../utils/API';

class AdminDash extends Component {

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

    // if (!userProfile) {
    //   getProfile((err, profile) => {
    //     this.setState({ profile });

    //     console.log(`---- profile sub ${profile.email} ------`);

    //     axios.get('/api/users/' + profile.email)
    //       .then( res => {
    //           console.log(`profile view res.data.length = ${res.data.length}`);
    
    //           if ( res.data.length === 0 ) {
    //             console.log(`dlafkjdkajfda`);
    //             console.log(profile);
    //             axios.post('/api/users', profile)
    //               .then( res => console.log(res));
    //           } else {
    //             console.log(`setting profile state`);
    //             this.setState({ profile: res.data[0] });
    //           }
    //         });
    //       })

    // } else {
    //   this.setState({ profile: userProfile });
    // }

  }

  render() {
    const { profile } = this.state;
    const { isAuthenticated } = this.props.auth;

    // console.log('--- component will mount ---');
    // console.log(this.state.profile);
    // console.log(this.state.profile.technologies);

    return (

            <React.Fragment>

{ isAuthenticated() && (
// {/* Nav bar */}
<nav className="navbar navbar-expand-lg fixed-top" id="mainNav">
    <div className="hire-tab">
        <a className="navbar-brand text-nav">Hire Locals</a>
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
                            <a className="dropdown-item">My Dashboard</a>
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
        <a className="navbar-brand text-nav">Hire Locals</a>
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
                        <a className="nav-link text-nav">How it Works
                        </a>
                    </div>
                </li>
                <li>
                    <div className="browse-tab">
                        <a className="nav-link text-nav">Browse Jobs
                        </a>
                    </div>
                </li>
                <li>
                    <div className="social-tab">
                        <a className="nav-link text-nav">Social
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





{/* <!-- Admin Dashboard Nav Pills, Form, Accordian View--> */}
    <section className="dashboard">
        <div className="container">
            <h2 className="text-center text-uppercase text-secondary ">Admin Dashboard</h2>
            <hr className="star-dark mb-6 " />

            <ul className="nav nav-pills nav-fill" id="pills-tab" role="tablist">
                <li className="nav-item">
                    <a className="nav-link nav-dashboard active" data-toggle="pill" href="#postProj">Post Project</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link nav-dashboard" data-toggle="pill" href="#pendingProjs">Pending Projects</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link nav-dashboard" data-toggle="pill" href="#startedProjs">Started Projects</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link nav-dashboard" data-toggle="pill" href="#completedProjs">Completed Projects</a>
                </li>
            </ul>

{/* <!--    ***** BEGIN ALL PILLS CONTENT (inludes all content in tabs)****    --> */}
            <div className="tab-content" id="pills-tabContent">
                
                
{/* <!-- ***************** BEGIN POST A PROJECT FORM *************************** --> */}

                <div className="tab-pane fade active show" id="postProj" role="tabpanel" aria-labelledby="home-tab">

                    <form>
                        <div className="form-group">
                            <label for="FormControlInput1">Project Title</label>
                            <input type="text" className="form-control" id="title" />
                        </div>
                        <div className="form-group">
                            <label for="FormControlInput1">Budget</label>
                            <input type="currency" className="form-control" id="budget" />
                        </div>
                        <div className="form-group">
                            <label for="FormControlInput1">Location Zip Code</label>
                            <input type="text" className="form-control" id="location" />
                        </div>
                        <div className="form-group">
                            <label for="FormControlInput1">Start Date (mm/dd/yyyy)</label>
                            <input type="text" className="form-control" id="start-date" />
                        </div>
                        <div className="form-group">
                            <label for="FormControlInput1">Team Size</label>
                            <input type="text" className="form-control" id="team-size" />
                        </div>
                        <div className="form-group">
                            <label>Duration</label>
                            <select className="form-control" id="duration">
                                <option selected>Choose Duration...</option>
                                <option value="3mo">3 Months</option>
                                <option value="5mo">5 Months</option>
                                <option value="7mo">7 Months</option>
                                <option value="8mo">8 Months</option>
                                <option value="11mo">11 Months</option>
                                <option value="18mo">18 Months</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>SE Led</label><br />
                            <div className="form-check form-check-inline seled">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="seledTrue" value="true" />
                                <label className="form-check-label" for="inlineRadio1">True</label>
                            </div>
                            <div className="form-check form-check-inline seled">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="seledFalse" value="false" />
                                <label className="form-check-label" for="inlineRadio2">False</label>
                            </div>
                        </div>
                        {/* <!-- Technologies Checkboxes --> */}
                        <div className="form-group">
                            <label for="FormControlInput1">Technologies</label><br />
                            
                            <div className="form-check form-check-inline tech">
                                <input className="form-check-input" type="checkbox" id="angular" value="angular" />
                                <label className="form-check-label" for="inlineCheckbox1">Angular</label>
                            </div>
                            <div className="form-check form-check-inline tech">
                                <input className="form-check-input" type="checkbox" id="bootstrap" value="bootstrap" />
                                <label className="form-check-label" for="inlineCheckbox2">Bootstrap</label>
                            </div>
                            <div className="form-check form-check-inline tech">
                                <input className="form-check-input" type="checkbox" id="chart" value="chart" />
                                <label className="form-check-label" for="inlineCheckbox3">Chart</label>
                            </div>
                            <div className="form-check form-check-inline tech">
                                <input className="form-check-input" type="checkbox" id="cplusplus" value="cplusplus" />
                                <label className="form-check-label" for="inlineCheckbox4">C++</label>
                            </div>
                            <div className="form-check form-check-inline tech">
                                <input className="form-check-input" type="checkbox" id="csharp" value="csharp" />
                                <label className="form-check-label" for="inlineCheckbox5">C#</label>
                            </div>
                            <div className="form-check form-check-inline tech">
                                <input className="form-check-input" type="checkbox" id="css" value="css" />
                                <label className="form-check-label" for="inlineCheckbox6">CSS</label>
                            </div>
                            <div className="form-check form-check-inline tech">
                                <input className="form-check-input" type="checkbox" id="github" value="github" />
                                <label className="form-check-label" for="inlineCheckbox7">GitHub</label>
                            </div>
                            <div className="form-check form-check-inline tech">
                                <input className="form-check-input" type="checkbox" id="handlebars" value="handlebars" />
                                <label className="form-check-label" for="inlineCheckbox8">Handlebars</label>
                            </div>
                            <div className="form-check form-check-inline tech">
                                <input className="form-check-input" type="checkbox" id="heroku" value="heroku" />
                                <label className="form-check-label" for="inlineCheckbox9">Heroku</label>
                            </div>
                            <div className="form-check form-check-inline tech">
                                <input className="form-check-input" type="checkbox" id="html" value="html" />
                                <label className="form-check-label" for="inlineCheckbox10">HTML</label>
                            </div>
                            <div className="form-check form-check-inline tech">
                                <input className="form-check-input" type="checkbox" id="illustrator" value="illustrator" />
                                <label className="form-check-label" for="inlineCheckbox11">Illustrator</label>
                            </div>
                            <div className="form-check form-check-inline tech">
                                <input className="form-check-input" type="checkbox" id="java" value="java" />
                                <label className="form-check-label" for="inlineCheckbox12">Java</label>
                            </div>
                            <div className="form-check form-check-inline tech">
                                <input className="form-check-input" type="checkbox" id="javascript" value="javascript" />
                                <label className="form-check-label" for="inlineCheckbox13">JavaScript</label>
                            </div>
                            <div className="form-check form-check-inline tech">
                                <input className="form-check-input" type="checkbox" id="jquery" value="jquery" />
                                <label className="form-check-label" for="inlineCheckbox14">JQuery</label>
                            </div>
                            <div className="form-check form-check-inline tech">
                                <input className="form-check-input" type="checkbox" id="mongodb" value="mongodb" />
                                <label className="form-check-label" for="inlineCheckbox15">MongoDB</label>
                            </div>
                            <div className="form-check form-check-inline tech">
                                <input className="form-check-input" type="checkbox" id="mysql" value="mysql" />
                                <label className="form-check-label" for="inlineCheckbox16">MySQL</label>
                            </div>
                            <div className="form-check form-check-inline tech">
                                <input className="form-check-input" type="checkbox" id="node" value="node" />
                                <label className="form-check-label" for="inlineCheckbox17">Node</label>
                            </div>
                            <div className="form-check form-check-inline tech">
                                <input className="form-check-input" type="checkbox" id="photoshop" value="photoshop" />
                                <label className="form-check-label" for="inlineCheckbox18">PhotoShop</label>
                            </div>
                            <div className="form-check form-check-inline tech">
                                <input className="form-check-input" type="checkbox" id="python" value="python" />
                                <label className="form-check-label" for="inlineCheckbox19">Python</label>
                            </div>
                            <div className="form-check form-check-inline tech">
                                <input className="form-check-input" type="checkbox" id="react" value="react" />
                                <label className="form-check-label" for="inlineCheckbox20">React</label>
                            </div>
                            <div className="form-check form-check-inline tech">
                                <input className="form-check-input" type="checkbox" id="sass" value="sass" />
                                <label className="form-check-label" for="inlineCheckbox21">Sass</label>
                            </div>
                        </div>
                        {/* <!-- End Technologies Checkboxes --> */}
                        <div className="form-group">
                            <label for="exampleFormControlTextarea1">Brief Project Description</label>
                            <textarea className="form-control description" id="brief-description" rows="2"></textarea>
                        </div>
                        <div className="form-group">
                            <label for="exampleFormControlTextarea1">Full Project Description</label>
                            <textarea className="form-control description" id="full-description" rows="5"></textarea>
                        </div>
                        <button type="button" className="btn btn-primary btn-lg" id="submit-new-project">Submit Project</button>
                    </form>
                </div>

{/* <!-- ******************* END POST PROJECT FORM *************************** --> */}
{/* <!-- ******************* BEGIN PENDING PROJECTS ************************** --> */}

                <div className="tab-pane fade" id="pendingProjs" role="tabpanel" aria-labelledby="profile-tab">

                    {/* <!-- All Pending Projs Content in Accordian --> */}
                    
                    <div id="accordion">

                        {/* <!-- Proj 1 --> */}

                        <div className="card card-proj">
                            <div className="card-header" id="headingOne">
                                <h5 className="mb-0">
                                <button className="btn btn-link" data-toggle="collapse" data-target="#pendingCollapseOne" aria-expanded="true" aria-controls="pendingCollapseOne">
                                    Project 1 (ID) - AD Web App
                                    </button>
                                </h5>
                            </div>
                        
                            <div id="pendingCollapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                <div className="card-body">
                                    
                                    {/* <!-- Begin Proj 1 Details --> */}

                                    <div className="row">
                                        <div className="col-sm-6">
                                            {/* <!-- Details --> */}
                                            <h6><span className="projTitle">AD Web App</span></h6>
                                            <p>
                                                <em>Budget</em>: $<span className="projBudget">60,000</span><br />
                                            
                                                <em>Location</em>: <span className="projLocation">75126</span><br />

                                                <em>Technologies</em>: <span className="projTech">C#, HTML, JavaScript, CSS, JQuery, Angular</span><br />

                                                <em>Start Date</em>: <span className="projStartDate">8/15/2018</span><br />
                                            
                                                <em>Duration</em>: <span className="projDuration">4 Months</span><br />

                                                <em>SE Led</em>: <span className="seLed">false</span>
                                            </p>
                                            
                                        </div>
                                        <div className="col-sm-6">
                                            {/* <!-- Desc --> */}
                                            <p>Client needs clean, dynamic Active Directory personnel resource site. This is an eleven month project and the team will consist of four developers. Client expects developers to have great teamwork and communication skills. Weekly deliverables are expected.</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12">

                                            {/* <!-- Editable --> */}
                                            <h6 className="projDetails">Applicants</h6>

                                            {/* <!-- Each Applicant 1 --> */}
                                            <span className="dropdown">
                                                <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    David Sipala
                                                </button>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <a className="dropdown-item applicant-move">Copy to Team</a>
                                                </div>
                                            </span>
                                            {/* <!-- End Applicant 1 --> */}
                                                    
                                            {/* <!-- Applicant 2 --> */}
                                            <span className="dropdown">
                                                <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Doug Henderson
                                                </button>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <a className="dropdown-item applicant-move">Copy to Team</a>
                                                </div>
                                            </span>
                                            {/* <!-- End Applicant 2 --> */}
                                            {/* <!-- Applicant 3 --> */}
                                            <span className="dropdown">
                                                <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Jason Warner
                                                </button>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <a className="dropdown-item applicant-move">Copy to Team</a>
                                                </div>
                                            </span>
                                            {/* <!-- End Applicant 3 --> */}
                                            {/* <!-- Applicant 4 --> */}
                                            <span className="dropdown">
                                                <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Bryan Aber
                                                </button>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <a className="dropdown-item applicant-move">Copy to Team</a>
                                                </div>
                                            </span>
                                            {/* <!-- End Applicant 4 --> */}
                                            {/* <!-- Applicant 5 --> */}
                                            <span className="dropdown">
                                                <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Bill Bradsky
                                                </button>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <a className="dropdown-item applicant-move">Copy to Team</a>
                                                </div>
                                            </span>
                                            {/* <!-- End Applicant 5 --> */}

                                        </div>

                                        {/* <!-- Team Members --> */}

                                        <div className="col-sm-12" id="team-members">
                                            {/* <!-- Editable --> */}
                                            <h6 className="projDetails">Team Members</h6>

                                            {/* <!-- Each Team Member 1 --> */}
                                            <span className="dropdown">
                                                <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Bill Bradsky
                                                </button>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <a className="dropdown-item member-remove">Remove From Team</a>
                                                </div>
                                            </span>
                                            {/* <!-- End Team Member 1 --> */}

                                            {/* <!-- Each Team Member 2 --> */}
                                            <span className="dropdown">
                                                <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Doug Henderson
                                                </button>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <a className="dropdown-item member-remove">Remove From Team</a>
                                                </div>
                                            </span>
                                            {/* <!-- End Team Member 2 --> */}
                                            
                                        </div>

                                        {/* <!-- End Team Members --> */}

                                        {/* <!-- Project Stage --> */}
                                        <div className="col-sm-12">

                                            <h6 className="projDetails">Project Stage</h6>

                                            {/* <!-- Each Applicant 1 --> */}
                                            <span className="dropdown">
                                                <button className="btn btn-secondary btn-sm dropdown-toggle proj-state" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Pending
                                                </button>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <a className="dropdown-item pstage" id='Started'>Started</a>
                                                    <a className="dropdown-item pstage" id='Completed'>Completed</a>
                                                </div>
                                            </span>
                                            {/* <!-- End Applicant 1 --> */}

                                        </div>
                                        <div className="col-sm-12">
                                            <button type="button" className="btn btn-primary" id="update-project">Update Project</button>
                                        </div>
                                    </div>
                                </div>


                                    {/* <!-- End Proj 1 Details --> */}
                            </div>
                        </div>

                        {/* <!-- End Proj 1 / Beg Proj 2 --> */}

                        <div className="card card-proj">
                            <div className="card-header" id="headingTwo">
                                <h5 className="mb-0">
                                <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#pendingCollapseTwo" aria-expanded="false" aria-controls="pendingCollapseTwo">
                                Project 32 - Company Branding
                                </button>
                                </h5>
                            </div>
                            <div id="pendingCollapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                                <div className="card-body">
                                    Project 32 Details Here
                                </div>
                            </div>
                        </div>

                        {/* <!-- End Proj 2 --> */}
                        {/* <!-- Proj 3 --> */}
                        <div className="card card-proj">
                            <div className="card-header" id="headingThree">
                                <h5 className="mb-0">
                                <button className="btn btn-link" data-toggle="collapse" data-target="#pendingCollapseThree" aria-expanded="false" aria-controls="pendingCollapseThree">
                                Project 33 - Company Static Website
                                </button>
                                </h5>
                            </div>
                            <div id="pendingCollapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                                <div className="card-body">
                                    Project 33 Details Here
                                </div>
                            </div>
                        </div>
                        {/* <!-- End Proj 3 --> */}

                    {/* <!-- End Accordian --> */}
                    </div>

                </div>
                
{/* <!-- ******************* END PENDING PROJECTS ************************** --> */}
{/* <!-- ******************* BEGIN STARTED PROJECTS ************************ --> */}

                <div className="tab-pane fade" id="startedProjs" role="tabpanel" aria-labelledby="contact-tab">

                    {/* <!-- Started Projs Content --> */}

                    <div id="accordion">

                    {/* <!-- Accordian - Started Proj 1 --> */}

                        <div className="card card-proj">
                            <div className="card-header" id="headingOne">
                                <h5 className="mb-0">
                                <button className="btn btn-link" data-toggle="collapse" data-target="#startedCollapseOne" aria-expanded="true" aria-controls="startedCollapseOne">
                                    Project 4 (ID) - Professional ToDo App
                                    </button>
                                </h5>
                            </div>
                        
                            <div id="startedCollapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                <div className="card-body">
                                    
                                    {/* <!-- Begin Started Proj 1 Details --> */}

                                    <div className="row">
                                        <div className="col-sm-6">
                                            {/* <!-- Details --> */}
                                            <h6><span className="projTitle">AD Web App</span></h6>
                                            <p>
                                                <em>Budget</em>: $<span className="projBudget">60,000</span><br />
                                            
                                                <em>Location</em>: <span className="projLocation">75126</span><br />

                                                <em>Technologies</em>: <span className="projTech">C#, HTML, JavaScript, CSS, JQuery, Angular</span><br />

                                                <em>Start Date</em>: <span className="projStartDate">8/15/2018</span><br />
                                            
                                                <em>Duration</em>: <span className="projDuration">4 Months</span><br />

                                                <em>SE Led</em>: <span className="seLed">false</span>
                                            </p>

                                            
                                        </div>
                                        <div className="col-sm-6">
                                            {/* <!-- Desc --> */}
                                            <p>Client needs clean, dynamic Active Directory personnel resource site. This is an eleven month project and the team will consist of four developers. Client expects developers to have great teamwork and communication skills. Weekly deliverables are expected.</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12">

                                            {/* <!-- Editable --> */}
                                            <h6 className="projDetails">Applicants</h6>

                                            {/* <!-- Each Applicant 1 --> */}
                                            <span className="dropdown">
                                                <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    David Sipala
                                                </button>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <a className="dropdown-item applicant-move">Copy to Team</a>
                                                </div>
                                            </span>
                                            {/* <!-- End Applicant 1 --> */}
                                                    
                                            {/* <!-- Applicant 2 --> */}
                                            <span className="dropdown">
                                                <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Doug Henderson
                                                </button>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <a className="dropdown-item applicant-move">Copy to Team</a>
                                                </div>
                                            </span>
                                            {/* <!-- End Applicant 2 --> */}
                                            {/* <!-- Applicant 3 --> */}
                                            <span className="dropdown">
                                                <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Jason Warner
                                                </button>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <a className="dropdown-item applicant-move">Copy to Team</a>
                                                </div>
                                            </span>
                                            {/* <!-- End Applicant 3 --> */}
                                            {/* <!-- Applicant 4 --> */}
                                            <span className="dropdown">
                                                <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Bryan Aber
                                                </button>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <a className="dropdown-item applicant-move">Copy to Team</a>
                                                </div>
                                            </span>
                                            {/* <!-- End Applicant 4 --> */}
                                            {/* <!-- Applicant 5 --> */}
                                            <span className="dropdown">
                                                <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Bill Bradsky
                                                </button>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <a className="dropdown-item applicant-move">Copy to Team</a>
                                                </div>
                                            </span>
                                            {/* <!-- End Applicant 5 --> */}

                                        </div>

                                        {/* <!-- Team Members --> */}

                                        <div className="col-sm-12">
                                            {/* <!-- Editable --> */}
                                            <h6 className="projDetails">Team Members</h6>

                                            {/* <!-- Each Team Member 1 --> */}
                                            <span className="dropdown">
                                                <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Bill Bradsky
                                                </button>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <a className="dropdown-item member-remove">Remove From Team</a>
                                                </div>
                                            </span>
                                            {/* <!-- End Team Member 1 --> */}

                                            {/* <!-- Each Team Member 2 --> */}
                                            <span className="dropdown">
                                                <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Doug Henderson
                                                </button>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <a className="dropdown-item member-remove">Remove From Team</a>
                                                </div>
                                            </span>
                                            {/* <!-- End Team Member 2 --> */}
                                            
                                        </div>

                                        {/* <!-- End Team Members --> */}

                                        {/* <!-- Project Stage --> */}
                                        <div className="col-sm-12">

                                            <h6 className="projDetails">Project Stage</h6>

                                            {/* <!-- Each Applicant 1 --> */}
                                            <span className="dropdown">
                                                <button className="btn btn-secondary btn-sm dropdown-toggle proj-state" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Pending
                                                </button>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <a className="dropdown-item">Started</a>
                                                    <a className="dropdown-item">Completed</a>
                                                </div>
                                            </span>
                                            {/* <!-- End Applicant 1 --> */}


                                        </div>



                                    </div>

                                </div>

                            {/* <!-- End Started Proj 1 Details --> */}
                            </div>
                        </div>

                        <div className="card card-proj">
                            <div className="card-header" id="headingTwo">
                                <h5 className="mb-0">
                                <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#startedCollapseTwo" aria-expanded="false" aria-controls="startedcollapseTwo">
                                Project 5 - Auto Market Site
                                </button>
                                </h5>
                            </div>
                            <div id="startedCollapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                                <div className="card-body">
                                    Project 5 Details
                                </div>
                            </div>
                        </div>
    
                            {/* <!-- End Proj 2 --> */}

                    </div>
                    
                </div>

{/* <!-- ******************* END STARTED PROJECTS ************************ --> */}
{/* <!-- ******************* BEGIN COMPLETED PROJECTS ******************** --> */}

                <div className="tab-pane fade" id="completedProjs" role="tabpanel" aria-labelledby="contact-tab">

                    {/* <!-- Completed Projs Content --> */}

                    <div id="accordion">

                        {/* <!-- Accordian - Compl Proj 1 --> */}

                        <div className="card card-proj">
                            <div className="card-header" id="headingOne">
                                <h5 className="mb-0">
                                <button className="btn btn-link" data-toggle="collapse" data-target="#completedCollapseOne" aria-expanded="true" aria-controls="completedCollapseOne">
                                    Project 4 (ID) - Professional ToDo App
                                    </button>
                                </h5>
                            </div>
                        
                            <div id="completedCollapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                <div className="card-body">
                                    
                                    {/* <!-- Begin Compl Proj 1 Details --> */}

                                    <div className="row">
                                        <div className="col-sm-6">
                                            {/* <!-- Details --> */}
                                            <h6><span className="projTitle">AD Web App</span></h6>
                                            <p>
                                                <em>Budget</em>: $<span className="projBudget">60,000</span><br />
                                            
                                                <em>Location</em>: <span className="projLocation">75126</span><br />

                                                <em>Technologies</em>: <span className="projTech">C#, HTML, JavaScript, CSS, JQuery, Angular</span><br />

                                                <em>Start Date</em>: <span className="projStartDate">8/15/2018</span><br />
                                            
                                                <em>Duration</em>: <span className="projDuration">4 Months</span><br />

                                                <em>SE Led</em>: <span className="seLed">false</span>
                                            </p>

                                        </div>
                                        <div className="col-sm-6">
                                            {/* <!-- Desc --> */}
                                            <p>Client needs clean, dynamic Active Directory personnel resource site. This is an eleven month project and the team will consist of four developers. Client expects developers to have great teamwork and communication skills. Weekly deliverables are expected.</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12">

                                            {/* <!-- Editable --> */}
                                            <h6 className="projDetails">Applicants</h6>

                                            {/* <!-- Each Applicant 1 --> */}
                                            <span className="dropdown">
                                                <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    David Sipala
                                                </button>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <a className="dropdown-item applicant-move">Copy to Team</a>
                                                </div>
                                            </span>
                                            {/* <!-- End Applicant 1 --> */}
                                                    
                                            {/* <!-- Applicant 2 --> */}
                                            <span className="dropdown">
                                                <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Doug Henderson
                                                </button>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <a className="dropdown-item applicant-move">Copy to Team</a>
                                                </div>
                                            </span>
                                            {/* <!-- End Applicant 2 --> */}
                                            {/* <!-- Applicant 3 --> */}
                                            <span className="dropdown">
                                                <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Jason Warner
                                                </button>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <a className="dropdown-item applicant-move">Copy to Team</a>
                                                </div>
                                            </span>
                                            {/* <!-- End Applicant 3 --> */}
                                            {/* <!-- Applicant 4 --> */}
                                            <span className="dropdown">
                                                <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Bryan Aber
                                                </button>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <a className="dropdown-item applicant-move">Copy to Team</a>
                                                </div>
                                            </span>
                                            {/* <!-- End Applicant 4 --> */}
                                            {/* <!-- Applicant 5 --> */}
                                            <span className="dropdown">
                                                <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Bill Bradsky
                                                </button>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <a className="dropdown-item applicant-move">Copy to Team</a>
                                                </div>
                                            </span>
                                            {/* <!-- End Applicant 5 --> */}

                                        </div>

                                        {/* <!-- Team Members --> */}

                                        <div className="col-sm-12">
                                            {/* <!-- Editable --> */}
                                            <h6 className="projDetails">Team Members</h6>

                                            {/* <!-- Each Team Member 1 --> */}
                                            <span className="dropdown">
                                                <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Bill Bradsky
                                                </button>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <a className="dropdown-item member-remove">Remove From Team</a>
                                                </div>
                                            </span>
                                            {/* <!-- End Team Member 1 --> */}

                                            {/* <!-- Each Team Member 2 --> */}
                                            <span className="dropdown">
                                                <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Doug Henderson
                                                </button>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <a className="dropdown-item member-remove">Remove From Team</a>
                                                </div>
                                            </span>
                                            {/* <!-- End Team Member 2 --> */}
                                            
                                        </div>

                                        {/* <!-- End Team Members --> */}

                                        {/* <!-- Project Stage --> */}
                                        <div className="col-sm-12">

                                            <h6 className="projDetails">Project Stage</h6>

                                            {/* <!-- Each Applicant 1 --> */}
                                            <span className="dropdown">
                                                <button className="btn btn-secondary btn-sm dropdown-toggle proj-state" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Pending
                                                </button>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <a className="dropdown-item">Started</a>
                                                    <a className="dropdown-item">Completed</a>
                                                </div>
                                            </span>
                                            {/* <!-- End Applicant 1 --> */}

                                        </div>
                                    </div>
                                </div>

                            {/* <!-- End Compl Proj 1 Details --> */}
                            </div>
                        </div>

                        <div className="card card-proj">
                            <div className="card-header" id="headingTwo">
                                <h5 className="mb-0">
                                <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#completedCollapseTwo" aria-expanded="false" aria-controls="completedCollapseTwo">
                                Project 5 - Auto Market Site
                                </button>
                                </h5>
                            </div>
                            <div id="completedCollapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                                <div className="card-body">
                                    Project 5 Details
                                </div>
                            </div>
                        </div>
    
                            {/* <!-- End Proj 2 --> */}

                    </div>
                </div>

{/* <!-- ******************* END COMPLETED PROJECTS ******************** --> */}

            </div>

{/* <!--    ***** END ALL PILLS CONTENT (inludes all content in tabs)****    --> */}

        </div>
        {/* <!-- End page container (above) --> */}

    </section>





            </React.Fragment>
    );
  }
}

export default AdminDash;